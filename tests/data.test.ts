import { describe, expect, it } from "vitest";
import { subjects } from "@/data/subjects";
import { timetable } from "@/data/timetable";
import { checkAnswer } from "@/lib/answer";
import { classKindMeta, eventMeta } from "@/lib/events";

/** A tartalom kézzel írt adat: ezek a tesztek a tipikus elírásokat fogják meg. */

const dupes = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i);
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const isRealDate = (iso: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(iso + "T12:00:00Z");
  return d.toISOString().slice(0, 10) === iso; // pl. 2026-02-30 elbukik
};

describe("tárgyak", () => {
  it("a slugok egyediek és URL-barátok", () => {
    const slugs = subjects.map((s) => s.slug);
    expect(dupes(slugs)).toEqual([]);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  it("a leckék slugjai tárgyon belül egyediek és URL-barátok", () => {
    for (const s of subjects) {
      const slugs = s.lessons.map((l) => l.slug);
      expect(dupes(slugs), s.slug).toEqual([]);
      for (const l of slugs) expect(l, s.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("minden leckének van címe, összefoglalója és tartalma", () => {
    for (const s of subjects) {
      for (const l of s.lessons) {
        const id = `${s.slug}/${l.slug}`;
        expect(l.title.trim(), id).not.toBe("");
        expect(l.summary.trim(), id).not.toBe("");
        expect(l.body.trim(), id).not.toBe("");
      }
    }
  });
});

describe("események", () => {
  const all = subjects.flatMap((s) => s.events.map((e) => ({ s, e })));

  it("az azonosítók tárgyon belül egyediek", () => {
    for (const s of subjects) expect(dupes(s.events.map((e) => e.id)), s.slug).toEqual([]);
  });

  it("ismert típusúak", () => {
    for (const { s, e } of all) expect(eventMeta[e.type], `${s.slug}/${e.id}`).toBeDefined();
  });

  it("a dátumok valódi naptári napok (YYYY-MM-DD)", () => {
    for (const { s, e } of all) {
      if (e.date) expect(isRealDate(e.date), `${s.slug}/${e.id}: ${e.date}`).toBe(true);
    }
  });

  it("aminek nincs dátuma, az TBA-ként vagy ismétlődőként van jelölve", () => {
    for (const { s, e } of all) {
      if (!e.date) expect(e.tba || e.recurring, `${s.slug}/${e.id}`).toBe(true);
    }
  });
});

describe("órarend", () => {
  const slugs = new Set(subjects.map((s) => s.slug));

  it("minden óra létező tárgyra mutat", () => {
    for (const c of timetable) expect(slugs.has(c.subjectSlug), c.label).toBe(true);
  });

  it("hétköznapra esik, érvényes időponttal, és a vége a kezdete után van", () => {
    for (const c of timetable) {
      expect(c.day, c.label).toBeGreaterThanOrEqual(1);
      expect(c.day, c.label).toBeLessThanOrEqual(5);
      expect(c.start, c.label).toMatch(HHMM);
      expect(c.end, c.label).toMatch(HHMM);
      expect(c.end > c.start, `${c.label}: ${c.start}–${c.end}`).toBe(true);
    }
  });

  it("ismert óratípusú", () => {
    for (const c of timetable) expect(classKindMeta[c.kind], c.label).toBeDefined();
  });
});

describe("ellenőrizhető feladatok", () => {
  const checkable = subjects.flatMap((s) =>
    s.lessons.flatMap((l) =>
      (l.exercises ?? [])
        .map((ex, i) => ({ id: `${s.slug}/${l.slug}#${i + 1}`, ex }))
        .filter(({ ex }) => ex.answer != null)
    )
  );

  it("van legalább egy ellenőrizhető feladat", () => {
    expect(checkable.length).toBeGreaterThan(0);
  });

  it("a megadott helyes válasz(ok)at a saját ellenőrzőjük elfogadja", () => {
    for (const { id, ex } of checkable) {
      const answers = Array.isArray(ex.answer) ? ex.answer : [ex.answer!];
      expect(answers.length, id).toBeGreaterThan(0);
      for (const a of answers) expect(checkAnswer(String(a), ex), `${id}: "${a}"`).toBe(true);
    }
  });

  it("a beviteli mező placeholdere nem árulja el a helyes választ", () => {
    const leaks = checkable
      .filter(({ ex }) => ex.placeholder && checkAnswer(ex.placeholder, ex))
      .map(({ id, ex }) => `${id}: "${ex.placeholder}"`);
    expect(leaks).toEqual([]);
  });
});
