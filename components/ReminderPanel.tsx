"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { timetable, dayNames } from "@/data/timetable";
import type { ClassSlot } from "@/lib/types";
import { eventMeta } from "@/lib/events";

interface SerializableEvent {
  id: string;
  type: keyof typeof eventMeta;
  title: string;
  date: string;
  topic?: string;
  subjectSlug: string;
  subjectName: string;
  accent: string;
}

function parseHM(hm: string): { h: number; m: number } {
  const [h, m] = hm.split(":").map(Number);
  return { h, m };
}

/** A most utáni legközelebbi óra (a heti ismétlődő órarendből). */
function nextClass(now: Date): { slot: ClassSlot; at: Date } | null {
  let best: { slot: ClassSlot; at: Date } | null = null;
  for (let addDays = 0; addDays < 8; addDays++) {
    const d = new Date(now);
    d.setDate(now.getDate() + addDays);
    const dow = d.getDay(); // 0=vas..6=szo
    if (dow < 1 || dow > 5) continue;
    for (const slot of timetable) {
      if (slot.day !== dow) continue;
      const { h, m } = parseHM(slot.start);
      const at = new Date(d);
      at.setHours(h, m, 0, 0);
      if (at.getTime() <= now.getTime()) continue;
      if (!best || at.getTime() < best.at.getTime()) best = { slot, at };
    }
    if (best) break;
  }
  return best;
}

function fmtCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d} nap ${h} óra ${m} perc`;
  if (h > 0) return `${h} óra ${m} perc ${sec} mp`;
  return `${m} perc ${sec} mp`;
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function ReminderPanel({ events }: { events: SerializableEvent[] }) {
  const [now, setNow] = useState<Date | null>(null);
  const [notifyOn, setNotifyOn] = useState(false);
  const todayISO = now ? toISODate(now) : "9999-12-31";

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      setNotifyOn(true);
    }
  }, []);

  const next = useMemo(() => (now ? nextClass(now) : null), [now]);

  const upcoming = useMemo(() => {
    return events
      .filter((e) => e.date >= todayISO)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  }, [events, todayISO]);

  // Böngésző-értesítés: óra előtt 30 perccel + esemény aznap.
  useEffect(() => {
    if (!notifyOn || !now || typeof Notification === "undefined") return;
    if (Notification.permission !== "granted") return;
    const fired: Record<string, boolean> = (window as any).__firedNotif ?? {};
    (window as any).__firedNotif = fired;

    if (next) {
      const mins = (next.at.getTime() - now.getTime()) / 60000;
      const key = `class-${next.slot.subjectSlug}-${next.at.toDateString()}`;
      if (mins <= 30 && mins > 0 && !fired[key]) {
        fired[key] = true;
        new Notification("Közelgő óra", {
          body: `${next.slot.label} — ${next.slot.start}-kor kezdődik`,
        });
      }
    }
    for (const e of upcoming) {
      if (e.date === todayISO) {
        const key = `event-${e.id}`;
        if (!fired[key]) {
          fired[key] = true;
          new Notification(`Ma: ${eventMeta[e.type].label}`, {
            body: `${e.subjectName} — ${e.title}`,
          });
        }
      }
    }
  }, [notifyOn, now, next, upcoming, todayISO]);

  async function enableNotifications() {
    if (typeof Notification === "undefined") return;
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setNotifyOn(true);
      new Notification("Értesítések bekapcsolva", {
        body: "Szólok a közelgő óráidról és határidőidről.",
      });
    }
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {/* Következő óra */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300/80">
          Következő óra
        </div>
        {next ? (
          <Link href={`/targyak/${next.slot.subjectSlug}`} className="mt-2 block group">
            <div className="text-lg font-bold text-white group-hover:underline">
              {next.slot.label.split(" — ")[0]}
            </div>
            <div className="text-sm text-white/60">
              {dayNames[next.slot.day]} {next.slot.start}–{next.slot.end} ·{" "}
              {next.slot.label.split(" — ")[1] ?? ""}
            </div>
            <div className="mt-3 font-mono text-2xl font-black tabular-nums text-indigo-200">
              {now ? fmtCountdown(next.at.getTime() - now.getTime()) : "…"}
            </div>
            <div className="text-[11px] text-white/40">múlva kezdődik</div>
          </Link>
        ) : (
          <div className="mt-2 text-white/50">Nincs több óra a héten 🎉</div>
        )}

        <button
          onClick={enableNotifications}
          disabled={notifyOn}
          className="mt-4 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:opacity-50"
        >
          {notifyOn ? "🔔 Böngésző-értesítések bekapcsolva" : "🔔 Értesítések bekapcsolása"}
        </button>
      </div>

      {/* Közelgő határidők */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Közelgő számonkérések
        </div>
        <ul className="mt-2 space-y-2">
          {upcoming.length === 0 && (
            <li className="text-sm text-white/40">Nincs közelgő dátumos esemény.</li>
          )}
          {upcoming.map((e) => {
            const days = daysBetween(todayISO, e.date);
            const m = eventMeta[e.type];
            return (
              <li key={e.id}>
                <Link
                  href={`/targyak/${e.subjectSlug}`}
                  className="flex items-center gap-3 rounded-lg border-l-2 bg-white/[0.03] p-2 transition hover:bg-white/[0.07]"
                  style={{ borderColor: e.accent }}
                >
                  <span className="text-base">{m.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white/90">
                      {e.subjectName} — {e.title}
                    </span>
                    {e.topic && (
                      <span className="block truncate text-[11px] text-white/45">{e.topic}</span>
                    )}
                  </span>
                  <span
                    className="shrink-0 rounded-md px-2 py-1 text-center text-[11px] font-bold leading-tight"
                    style={{ background: `${m.color}22`, color: m.color }}
                  >
                    {days === 0 ? "MA" : days === 1 ? "holnap" : `${days} nap`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function daysBetween(fromISO: string, toISO: string): number {
  const a = new Date(fromISO + "T00:00:00").getTime();
  const b = new Date(toISO + "T00:00:00").getTime();
  return Math.round((b - a) / 86_400_000);
}
