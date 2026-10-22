export type EventType =
  | "zh"
  | "potzh"
  | "beadando"
  | "ropzh"
  | "kviz"
  | "vizsga"
  | "konzultacio"
  | "egyeb";

export interface CourseEvent {
  id: string;
  type: EventType;
  title: string;
  /** ISO dátum, pl. "2026-10-19". Ha nincs, tba=true. */
  date?: string;
  time?: string;
  location?: string;
  /** A számonkérés anyaga. */
  topic?: string;
  note?: string;
  tba?: boolean;
  /** Ismétlődő (pl. heti röpzh), nem konkrét naptári esemény. */
  recurring?: boolean;
}

export type FileKind =
  | "pdf"
  | "code"
  | "sql"
  | "md"
  | "html"
  | "video"
  | "image"
  | "other";

export interface MaterialFile {
  name: string;
  /** /materials/... vagy külső URL. */
  path: string;
  kind: FileKind;
  desc?: string;
  /** Nincs a repóban (pl. Teams-felvétel). */
  external?: boolean;
}

export interface Exercise {
  prompt: string;
  hint?: string;
  /** Markdown, jellemzően kódblokkal. */
  solution?: string;
  /**
   * Ellenőrizhető helyes válasz(ok). Ha meg van adva, a diák beírhatja a
   * megoldását és a rendszer visszajelzi, hogy jó-e. Több elfogadott alak is
   * megadható tömbként.
   */
  answer?: string | string[];
  /**
   * Ellenőrzés módja:
   * - "text": whitespace-normalizált, kis/nagybetű-érzéketlen (alap)
   * - "code": minden whitespace eltávolítva, kis/nagybetű-érzékeny
   * - "numeric": számként hasonlít (kis tűréssel)
   */
  check?: "text" | "code" | "numeric";
  /** Több soros (kód) beviteli mező. */
  multiline?: boolean;
  /** Karakter-paletta a beviteli mezőhöz (pl. Agda unicode jelek). */
  palette?: "agda";
  placeholder?: string;
}

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  status: "complete" | "skeleton";
  /** Markdown tananyag. */
  body: string;
  exercises?: Exercise[];
}

export interface SubjectLink {
  label: string;
  url: string;
}

export interface Subject {
  slug: string;
  name: string;
  short: string;
  /** Tailwind-barát accent hex. */
  accent: string;
  tagline: string;
  instructors?: string;
  location?: string;
  courseCode?: string;
  requirementsMd: string;
  requirementsSource?: string;
  files: MaterialFile[];
  events: CourseEvent[];
  lessons: Lesson[];
  links?: SubjectLink[];
  /** Hiányzó, pótlandó információk. */
  missing?: string[];
}

export type ClassKind = "ea" | "gy" | "labor" | "ea+gy";

export interface ClassSlot {
  /** 1=hétfő … 5=péntek */
  day: number;
  start: string;
  end: string;
  subjectSlug: string;
  kind: ClassKind;
  label: string;
  location?: string;
}
