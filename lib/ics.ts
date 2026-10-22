import { subjects, allDatedEvents } from "@/data/subjects";
import { timetable, dayNames } from "@/data/timetable";
import { eventMeta, classKindMeta } from "@/lib/events";

/**
 * iCalendar (.ics) feed a félév eseményeiből és órarendjéből, hogy Google/Apple
 * naptárba importálva (vagy URL-ként feliratkozva) telefonon is szóljon.
 *
 * A tanítási időszak határai — igazítsd, ha eltér (a heti órák eddig ismétlődnek).
 */
export const SEMESTER_START = "2026-09-08"; // hétfő
export const SEMESTER_END = "2026-12-18";

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** "YYYY-MM-DD" → "YYYYMMDD" */
function dateCompact(iso: string): string {
  return iso.replace(/-/g, "");
}

/** "YYYY-MM-DD" + "HH:MM" → "YYYYMMDDTHHMMSS" (helyi idő, TZID-hez) */
function dateTimeCompact(iso: string, hhmm: string): string {
  return `${dateCompact(iso)}T${hhmm.replace(":", "")}00`;
}

/** Következő adott hét­napra eső dátum (>= kezdő). weekday: 1=hétfő…5=péntek */
export function firstOccurrence(startISO: string, weekday: number): string {
  const d = new Date(startISO + "T00:00:00");
  const jsTarget = weekday; // hétfő=1 … péntek=5 megegyezik a JS getDay-jel (0=vas)
  while (d.getDay() !== jsTarget) d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** ISO dátumot eltol néhány nappal, compact formában (all-day DTEND-hez). */
function isoPlusDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

/** Szöveges idő-mezőből (pl. "17:30–19:30 / 19:15") kiszedi az első kezdő/vég HH:MM-et. */
export function extractTimes(time?: string): { start?: string; end?: string } {
  if (!time) return {};
  const m = time.match(/\d{1,2}:\d{2}/g);
  if (!m || m.length === 0) return {};
  // Előbb kiegészítjük kétjegyű órára, csak utána hasonlítunk: szövegként "10:30" < "9:00".
  const [start, second] = m.slice(0, 2).map((t) => t.padStart(5, "0"));
  let end: string | undefined;
  if (second && second > start) end = second;
  return { start, end };
}

/** "HH:MM"-hez perc hozzáadása, HH:MM-ként. */
export function addMinutes(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}

export function esc(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

const utf8 = new TextEncoder();
const octets = (s: string) => utf8.encode(s).length;

/**
 * 75 oktettnél hosszabb sorok tördelése (RFC 5545 3.1). A határ UTF-8 bájtban
 * értendő, nem karakterben (az ékezetes betű 2, az emoji 4 bájt), és több bájtos
 * karaktert nem szabad kettévágni — ezért kódpontonként haladunk.
 */
export function fold(line: string): string {
  if (octets(line) <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let size = 0;
  let limit = 75; // a folytatósorok vezető szóköze is beleszámít: ott 74 bájt marad
  for (const ch of line) {
    const n = octets(ch);
    if (size + n > limit) {
      parts.push(current);
      current = "";
      size = 0;
      limit = 74;
    }
    current += ch;
    size += n;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

const TZ = "Europe/Budapest";
const DTSTAMP = (() => {
  const d = new Date();
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
    d.getUTCHours()
  )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
})();

// Europe/Budapest VTIMEZONE (CET/CEST) — a legtöbb kliens így pontosan értelmezi.
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Budapest",
  "X-LIC-LOCATION:Europe/Budapest",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

function alarm(desc: string, trigger: string): string[] {
  return [
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(desc)}`,
    `TRIGGER:${trigger}`,
    "END:VALARM",
  ];
}

export function buildIcs(): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//7.felev tanuloportal//HU//",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:7. félév",
    "X-WR-TIMEZONE:Europe/Budapest",
    ...VTIMEZONE,
  ];

  // 1) Dátumos számonkérések / események
  for (const e of allDatedEvents()) {
    const meta = eventMeta[e.type];
    const summary = `${meta.icon} ${e.subjectShort}: ${e.title}`;
    const descParts = [e.topic, e.note, e.location && `Helyszín: ${e.location}`].filter(
      Boolean
    ) as string[];
    const { start, end } = extractTimes(e.time);

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${e.subjectSlug}-${e.id}@7felev`);
    lines.push(`DTSTAMP:${DTSTAMP}`);
    if (start) {
      const endHHMM = end ?? addMinutes(start, 90);
      lines.push(`DTSTART;TZID=${TZ}:${dateTimeCompact(e.date!, start)}`);
      lines.push(`DTEND;TZID=${TZ}:${dateTimeCompact(e.date!, endHHMM)}`);
    } else {
      // egész napos
      lines.push(`DTSTART;VALUE=DATE:${dateCompact(e.date!)}`);
      lines.push(`DTEND;VALUE=DATE:${isoPlusDays(e.date!, 1)}`);
    }
    lines.push(`SUMMARY:${esc(summary)}`);
    if (descParts.length) lines.push(`DESCRIPTION:${esc(descParts.join("\n"))}`);
    if (e.tba) lines.push("STATUS:TENTATIVE");
    // Emlékeztetők: 1 nappal és (időpontos eseménynél) 1 órával előtte.
    lines.push(...alarm(summary, "-P1D"));
    if (start) lines.push(...alarm(summary, "-PT1H"));
    lines.push("END:VEVENT");
  }

  // 2) Heti órarend — ismétlődő órák a tanítási időszakra
  const untilUtc = `${dateCompact(SEMESTER_END)}T235959Z`;
  for (const s of timetable) {
    const subj = subjects.find((x) => x.slug === s.subjectSlug);
    const kind = classKindMeta[s.kind].label;
    const firstDate = firstOccurrence(SEMESTER_START, s.day);
    const summary = `${subj?.short ?? s.subjectSlug} — ${kind}`;

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:class-${s.day}-${s.start.replace(":", "")}-${s.subjectSlug}@7felev`);
    lines.push(`DTSTAMP:${DTSTAMP}`);
    lines.push(`DTSTART;TZID=${TZ}:${dateTimeCompact(firstDate, s.start)}`);
    lines.push(`DTEND;TZID=${TZ}:${dateTimeCompact(firstDate, s.end)}`);
    lines.push(`RRULE:FREQ=WEEKLY;UNTIL=${untilUtc}`);
    lines.push(`SUMMARY:${esc(summary)}`);
    lines.push(`DESCRIPTION:${esc(`${s.label} · ${dayNames[s.day]} ${s.start}–${s.end}`)}`);
    if (s.location) lines.push(`LOCATION:${esc(s.location)}`);
    lines.push(...alarm(summary, "-PT30M"));
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}
