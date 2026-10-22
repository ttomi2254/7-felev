import type { EventType, ClassKind } from "./types";

// Letisztult, visszafogott paletta: piros = súlyos számonkérés, borostyán =
// határidő/kisebb, indigó = beadandó, pala = semleges.
export const eventMeta: Record<EventType, { label: string; color: string; icon: string }> = {
  zh: { label: "ZH", color: "#e5484d", icon: "📝" },
  potzh: { label: "Pót/Javító ZH", color: "#f5a524", icon: "🔁" },
  beadando: { label: "Beadandó", color: "#6366f1", icon: "📦" },
  ropzh: { label: "Röpzh", color: "#f5a524", icon: "⚡" },
  kviz: { label: "Kvíz", color: "#8b93a7", icon: "❓" },
  vizsga: { label: "Vizsga", color: "#e5484d", icon: "🎓" },
  konzultacio: { label: "Konzultáció", color: "#8b93a7", icon: "💬" },
  egyeb: { label: "Egyéb", color: "#8b93a7", icon: "•" },
};

// Egységes hűvös tónusok, hogy az órarend rácsa nyugodt maradjon.
export const classKindMeta: Record<ClassKind, { label: string; color: string }> = {
  ea: { label: "Előadás", color: "#818cf8" },
  gy: { label: "Gyakorlat", color: "#6ea8fe" },
  labor: { label: "Labor", color: "#93a3b8" },
  "ea+gy": { label: "Ea+Gy", color: "#a78bfa" },
};

const HU_MONTHS = [
  "január", "február", "március", "április", "május", "június",
  "július", "augusztus", "szeptember", "október", "november", "december",
];
const HU_DAYS = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];

export function formatHuDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getFullYear()}. ${HU_MONTHS[d.getMonth()]} ${d.getDate()}. (${HU_DAYS[d.getDay()]})`;
}

export function daysUntil(iso: string, fromISO: string): number {
  const a = new Date(iso + "T00:00:00").getTime();
  const b = new Date(fromISO + "T00:00:00").getTime();
  return Math.round((a - b) / 86_400_000);
}

export function relativeHu(days: number): string {
  if (days < 0) return `${-days} napja volt`;
  if (days === 0) return "ma";
  if (days === 1) return "holnap";
  if (days < 7) return `${days} nap múlva`;
  if (days < 14) return "jövő héten";
  return `${days} nap múlva`;
}
