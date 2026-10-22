import type { Subject, CourseEvent } from "@/lib/types";
import { adatbazisok2 } from "./adatbazisok-2";
import { diszkretModellek } from "./diszkret-modellek";
import { funkcionalisProgramozas } from "./funkcionalis-programozas";
import { konkurensProgramozas } from "./konkurens-programozas";
import { programozasiTechnologia } from "./programozasi-technologia";
import { python } from "./python";
import { szamitaselmelet2 } from "./szamitaselmelet-2";
import { tipuselmelet } from "./tipuselmelet";
import { webprogramozas } from "./webprogramozas";

export const subjects: Subject[] = [
  webprogramozas,
  python,
  funkcionalisProgramozas,
  adatbazisok2,
  tipuselmelet,
  szamitaselmelet2,
  konkurensProgramozas,
  programozasiTechnologia,
  diszkretModellek,
];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export interface DatedEvent extends CourseEvent {
  subjectSlug: string;
  subjectName: string;
  subjectShort: string;
  accent: string;
}

/** Minden konkrét dátumú (nem recurring, nem tba) esemény, dátum szerint rendezve. */
export function allDatedEvents(): DatedEvent[] {
  const out: DatedEvent[] = [];
  for (const s of subjects) {
    for (const e of s.events) {
      if (e.date && !e.recurring) {
        out.push({
          ...e,
          subjectSlug: s.slug,
          subjectName: s.name,
          subjectShort: s.short,
          accent: s.accent,
        });
      }
    }
  }
  out.sort((a, b) => (a.date! < b.date! ? -1 : a.date! > b.date! ? 1 : 0));
  return out;
}

/** Közelgő események mától (opcionálisan a múltbeliek kihagyásával). */
export function upcomingEvents(fromISO: string, limit?: number): DatedEvent[] {
  const list = allDatedEvents().filter((e) => e.date! >= fromISO);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
