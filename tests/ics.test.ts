import { describe, expect, it } from "vitest";
import {
  addMinutes,
  buildIcs,
  esc,
  extractTimes,
  firstOccurrence,
  fold,
  SEMESTER_END,
  SEMESTER_START,
} from "@/lib/ics";
import { timetable } from "@/data/timetable";

const octets = (s: string) => Buffer.byteLength(s, "utf8");
/** RFC 5545 3.1: a tördelt sorok visszaillesztése (CRLF + szóköz törlése). */
const unfold = (s: string) => s.replace(/\r\n /g, "");

/** A VEVENT-ek saját mezői (a beágyazott VALARM-ok nélkül). */
function events(ics: string): Record<string, string>[] {
  return unfold(ics)
    .split("BEGIN:VEVENT\r\n")
    .slice(1)
    .map((chunk) => {
      const props: Record<string, string> = {};
      for (const line of chunk.split("END:VEVENT")[0].split("\r\n")) {
        if (line.startsWith("BEGIN:VALARM")) break;
        const i = line.indexOf(":");
        if (i > 0) props[line.slice(0, i)] = line.slice(i + 1);
      }
      return props;
    });
}
const prop = (e: Record<string, string>, name: string) =>
  e[Object.keys(e).find((k) => k === name || k.startsWith(name + ";"))!];

describe("fold (RFC 5545 sortördelés)", () => {
  it("rövid sort változatlanul hagy", () => {
    expect(fold("SUMMARY:rövid")).toBe("SUMMARY:rövid");
  });

  it("minden fizikai sor legfeljebb 75 oktett, ékezetes szövegnél is", () => {
    const line = "DESCRIPTION:" + "árvíztűrő tükörfúrógép ".repeat(12);
    for (const physical of fold(line).split("\r\n")) {
      expect(octets(physical)).toBeLessThanOrEqual(75);
    }
  });

  it("emojit és más több bájtos karaktert nem vág ketté", () => {
    const line = "SUMMARY:" + "📝 Számításelmélet — ZH ".repeat(8);
    const folded = fold(line);
    expect(folded).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/); // árva surrogate
    expect(unfold(folded)).toBe(line);
  });

  it("visszaillesztve az eredeti sort adja", () => {
    const line = "X:" + "abcdefghij".repeat(30);
    expect(unfold(fold(line))).toBe(line);
  });
});

describe("esc (TEXT értékek escape-elése)", () => {
  it("escape-eli a backslasht, a pontosvesszőt, a vesszőt és az új sort", () => {
    expect(esc("a\\b;c,d\ne")).toBe("a\\\\b\\;c\\,d\\ne");
  });
  it("a CRLF-et is egyetlen \\n-né alakítja", () => {
    expect(esc("a\r\nb")).toBe("a\\nb");
  });
});

describe("extractTimes", () => {
  it("kezdő és záró időt ad", () => {
    expect(extractTimes("17:30–19:30")).toEqual({ start: "17:30", end: "19:30" });
  });
  it("egyjegyű órát kétjegyűre egészít ki, és a záró időt is megtartja", () => {
    expect(extractTimes("9:00–10:30")).toEqual({ start: "09:00", end: "10:30" });
  });
  it("több idősávból az elsőt veszi", () => {
    expect(extractTimes("17:30–19:30 / 19:15–21:15")).toEqual({ start: "17:30", end: "19:30" });
  });
  it("csak kezdő idő esetén nincs záró idő", () => {
    expect(extractTimes("14:00")).toEqual({ start: "14:00", end: undefined });
  });
  it("idő nélkül üres", () => {
    expect(extractTimes(undefined)).toEqual({});
    expect(extractTimes("TBA")).toEqual({});
  });
});

describe("addMinutes", () => {
  it("átlép az órán", () => {
    expect(addMinutes("12:45", 90)).toBe("14:15");
  });
});

describe("firstOccurrence", () => {
  it("a félév kezdetétől számított első adott hétköznapot adja", () => {
    expect(SEMESTER_START).toBe("2026-09-08");
    expect(firstOccurrence("2026-09-08", 2)).toBe("2026-09-08"); // kedd: maga a kezdőnap
    expect(firstOccurrence("2026-09-08", 1)).toBe("2026-09-14"); // hétfő: a következő hét
    expect(firstOccurrence("2026-09-08", 5)).toBe("2026-09-11"); // péntek
  });
});

describe("buildIcs (a teljes naptár)", () => {
  const ics = buildIcs();
  const evs = events(ics);

  it("CRLF sorvégeket használ, és CRLF-fel zárul", () => {
    expect(ics.endsWith("\r\n")).toBe(true);
    expect(ics.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
  });

  it("VCALENDAR-ral kezdődik és zárul, a BEGIN/END blokkok párosak", () => {
    const lines = unfold(ics).trimEnd().split("\r\n");
    expect(lines[0]).toBe("BEGIN:VCALENDAR");
    expect(lines.at(-1)).toBe("END:VCALENDAR");
    const stack: string[] = [];
    for (const l of lines) {
      if (l.startsWith("BEGIN:")) stack.push(l.slice(6));
      if (l.startsWith("END:")) expect(stack.pop()).toBe(l.slice(4));
    }
    expect(stack).toEqual([]);
  });

  it("egyetlen fizikai sor sem hosszabb 75 oktettnél", () => {
    const tooLong = ics.split("\r\n").filter((l) => octets(l) > 75);
    expect(tooLong).toEqual([]);
  });

  it("a UID-k egyediek", () => {
    const uids = evs.map((e) => e.UID);
    expect(new Set(uids).size).toBe(uids.length);
  });

  it("minden eseménynek van UID, DTSTAMP, DTSTART, DTEND és SUMMARY mezője", () => {
    for (const e of evs) {
      expect(e.UID).toBeTruthy();
      expect(e.DTSTAMP).toMatch(/^\d{8}T\d{6}Z$/);
      expect(prop(e, "DTSTART"), e.UID).toBeTruthy();
      expect(prop(e, "DTEND"), e.UID).toBeTruthy();
      expect(e.SUMMARY, e.UID).toBeTruthy();
    }
  });

  it("minden esemény a kezdete után ér véget", () => {
    for (const e of evs) {
      const start = prop(e, "DTSTART");
      const end = prop(e, "DTEND");
      expect(end > start, `${e.UID}: ${start} → ${end}`).toBe(true);
    }
  });

  it("minden órarendi óra hetente ismétlődik a félév végéig", () => {
    const weekly = evs.filter((e) => e.UID.startsWith("class-"));
    expect(weekly).toHaveLength(timetable.length);
    for (const e of weekly) {
      expect(e.RRULE).toBe(`FREQ=WEEKLY;UNTIL=${SEMESTER_END.replace(/-/g, "")}T235959Z`);
    }
  });
});
