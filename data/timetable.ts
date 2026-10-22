import type { ClassSlot } from "@/lib/types";

/**
 * Heti órarend az orarend.jpg alapján (2026. szeptember).
 * day: 1=hétfő … 5=péntek
 */
export const timetable: ClassSlot[] = [
  // Hétfő
  { day: 1, start: "12:00", end: "14:00", subjectSlug: "adatbazisok-2", kind: "labor", label: "Adatbázisok II. — Labor" },
  { day: 1, start: "12:00", end: "14:00", subjectSlug: "funkcionalis-programozas", kind: "ea", label: "Funkcionális programozás — Előadás" },
  { day: 1, start: "14:00", end: "16:00", subjectSlug: "funkcionalis-programozas", kind: "labor", label: "Funkcionális programozás — Labor" },

  // Kedd
  { day: 2, start: "10:00", end: "12:00", subjectSlug: "tipuselmelet", kind: "gy", label: "Típuselmélet — Gyakorlat" },
  { day: 2, start: "12:00", end: "14:00", subjectSlug: "szamitaselmelet-2", kind: "gy", label: "Számításelmélet alapjai II. — Gyakorlat" },
  { day: 2, start: "14:00", end: "16:00", subjectSlug: "adatbazisok-2", kind: "ea", label: "Adatbázisok II. — Előadás" },
  { day: 2, start: "14:00", end: "16:00", subjectSlug: "diszkret-modellek", kind: "labor", label: "Diszkrét modellek alkalmazásai — Labor" },
  { day: 2, start: "16:00", end: "17:30", subjectSlug: "programozasi-technologia", kind: "ea+gy", label: "Programozási technológia — Ea+Gy" },
  { day: 2, start: "16:00", end: "17:30", subjectSlug: "python", kind: "ea", label: "Python — Előadás" },

  // Szerda
  { day: 3, start: "14:00", end: "15:00", subjectSlug: "webprogramozas", kind: "ea+gy", label: "Webprogramozás — Ea+Gy" },

  // Csütörtök
  { day: 4, start: "12:00", end: "14:00", subjectSlug: "szamitaselmelet-2", kind: "ea", label: "Számításelmélet alapjai II. — Előadás" },

  // Péntek
  { day: 5, start: "12:00", end: "14:00", subjectSlug: "python", kind: "labor", label: "Python — Labor" },
  { day: 5, start: "14:00", end: "16:00", subjectSlug: "tipuselmelet", kind: "ea", label: "Típuselmélet — Előadás" },
  { day: 5, start: "14:00", end: "16:00", subjectSlug: "webprogramozas", kind: "labor", label: "Webprogramozás — Labor" },
];

export const dayNames = ["", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
