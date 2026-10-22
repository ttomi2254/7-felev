import type { Exercise } from "@/lib/types";

/** A beírt válasz normalizálása az ellenőrzési mód szerint. */
export function normalize(s: string, mode: Exercise["check"]): string {
  if (mode === "code") return s.replace(/\s+/g, "");
  // "text" alap: trim + belső whitespace összevonás + kisbetűsítés
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

/** Elfogadott-e a beírt válasz (bármelyik megadott helyes alakkal egyezik). */
export function checkAnswer(input: string, exercise: Exercise): boolean {
  const answers = Array.isArray(exercise.answer)
    ? exercise.answer
    : exercise.answer
    ? [exercise.answer]
    : [];
  if (answers.length === 0) return false;
  if (exercise.check === "numeric") {
    const got = parseFloat(input.replace(",", ".").replace(/\s/g, ""));
    if (Number.isNaN(got)) return false;
    return answers.some((a) => {
      const want = parseFloat(String(a).replace(",", "."));
      return !Number.isNaN(want) && Math.abs(got - want) < 1e-6;
    });
  }
  const got = normalize(input, exercise.check);
  return answers.some((a) => normalize(String(a), exercise.check) === got);
}
