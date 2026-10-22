import Link from "next/link";
import type { ClassSlot } from "@/lib/types";
import { timetable, dayNames } from "@/data/timetable";
import { subjects } from "@/data/subjects";
import { classKindMeta } from "@/lib/events";

function subjectOf(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// A rács idő-tartománya (10:00–17:30) és felbontása.
const START = 10 * 60;
const END = 17 * 60 + 30;
const PX_PER_MIN = 1.35;
const GRID_HEIGHT = (END - START) * PX_PER_MIN;
const HOURS = Array.from({ length: (END - START) / 60 + 1 }, (_, i) => 10 + i);

interface Placed {
  slot: ClassSlot;
  top: number;
  height: number;
  leftPct: number;
  widthPct: number;
}

/** Egy nap órái elhelyezve; az egyszerre futó órák egymás mellé kerülnek (sávok). */
function layoutDay(slots: ClassSlot[]): Placed[] {
  const sorted = [...slots].sort(
    (a, b) => toMin(a.start) - toMin(b.start) || toMin(a.end) - toMin(b.end)
  );
  const placed: Placed[] = [];
  let i = 0;
  while (i < sorted.length) {
    // Összefüggő, időben átfedő csoport (klaszter) kigyűjtése.
    const cluster: ClassSlot[] = [sorted[i]];
    let clusterEnd = toMin(sorted[i].end);
    let j = i + 1;
    while (j < sorted.length && toMin(sorted[j].start) < clusterEnd) {
      cluster.push(sorted[j]);
      clusterEnd = Math.max(clusterEnd, toMin(sorted[j].end));
      j++;
    }
    // Sávok kiosztása a klaszteren belül.
    const laneEnds: number[] = [];
    const laneOf: number[] = [];
    for (const s of cluster) {
      let lane = laneEnds.findIndex((e) => e <= toMin(s.start));
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(0);
      }
      laneEnds[lane] = toMin(s.end);
      laneOf.push(lane);
    }
    const laneCount = laneEnds.length;
    cluster.forEach((s, k) => {
      placed.push({
        slot: s,
        top: (toMin(s.start) - START) * PX_PER_MIN,
        height: (toMin(s.end) - toMin(s.start)) * PX_PER_MIN,
        leftPct: (laneOf[k] * 100) / laneCount,
        widthPct: 100 / laneCount,
      });
    });
    i = j;
  }
  return placed;
}

export function TimetableGrid({ highlightDay }: { highlightDay?: number }) {
  const days = [1, 2, 3, 4, 5];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        {/* Fejléc: napok */}
        <div className="flex">
          <div className="w-12 shrink-0" />
          <div className="grid flex-1 grid-cols-5 gap-2">
            {days.map((day) => {
              const isToday = highlightDay === day;
              return (
                <div
                  key={day}
                  className={`rounded-lg px-2 py-1.5 text-center text-sm font-bold ${
                    isToday ? "bg-indigo-500/15 text-indigo-200" : "text-white/70"
                  }`}
                >
                  {dayNames[day]}
                  {isToday && <span className="ml-1 text-[10px] text-indigo-300">· ma</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Törzs: bal oldalt óra-tengely, jobbra a napok oszlopai */}
        <div className="mt-2 flex">
          {/* Idő-tengely */}
          <div className="relative w-12 shrink-0" style={{ height: GRID_HEIGHT }}>
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute right-2 -translate-y-1/2 text-[11px] tabular-nums text-white/35"
                style={{ top: (h * 60 - START) * PX_PER_MIN }}
              >
                {h}:00
              </div>
            ))}
          </div>

          {/* Naposzlopok + vízszintes óravonalak */}
          <div className="relative flex-1" style={{ height: GRID_HEIGHT }}>
            {HOURS.map((h) => (
              <div
                key={h}
                className="pointer-events-none absolute inset-x-0 border-t border-white/[0.06]"
                style={{ top: (h * 60 - START) * PX_PER_MIN }}
              />
            ))}
            <div className="grid h-full grid-cols-5 gap-2">
              {days.map((day) => {
                const placed = layoutDay(timetable.filter((s) => s.day === day));
                const isToday = highlightDay === day;
                return (
                  <div
                    key={day}
                    className={`relative rounded-lg ${
                      isToday ? "bg-indigo-500/[0.07]" : "bg-white/[0.015]"
                    }`}
                  >
                    {placed.map((p, idx) => {
                      const k = classKindMeta[p.slot.kind];
                      const subj = subjectOf(p.slot.subjectSlug);
                      const accent = subj?.accent ?? "#818cf8";
                      return (
                        <Link
                          key={idx}
                          href={`/targyak/${p.slot.subjectSlug}`}
                          className="absolute overflow-hidden rounded-md border-l-[3px] px-1.5 py-1 transition hover:brightness-125"
                          style={{
                            top: p.top + 1,
                            height: p.height - 2,
                            left: `calc(${p.leftPct}% + 1px)`,
                            width: `calc(${p.widthPct}% - 2px)`,
                            borderColor: accent,
                            background: `${accent}1f`,
                          }}
                          title={`${p.slot.label} · ${p.slot.start}–${p.slot.end}`}
                        >
                          <div className="text-[10px] leading-tight text-white/45">
                            {p.slot.start}–{p.slot.end}
                          </div>
                          <div className="text-[12px] font-semibold leading-tight text-white/90">
                            {subj?.short ?? p.slot.subjectSlug}
                          </div>
                          <div className="text-[10px] leading-tight text-white/45">{k.label}</div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
