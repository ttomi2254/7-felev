"use client";

import { useRef, useState } from "react";
import type { Exercise } from "@/lib/types";
import { Markdown } from "./Markdown";
import { checkAnswer } from "@/lib/answer";

// Agda / típuselmélet gyakran használt unicode jelek.
const AGDA_CHARS = [
  "→", "λ", "∀", "∃", "≡", "≢", "×", "⊎", "∘", "∷", "[]",
  "ℕ", "ℤ", "⊥", "⊤", "∧", "∨", "¬", "≤", "≥", "⟨", "⟩",
  "Σ", "Π", "∈", "∉", "⊆", "′", "₀", "₁", "₂", "ⁿ",
];

const PALETTES: Record<string, string[]> = { agda: AGDA_CHARS };

type Verdict = "idle" | "correct" | "wrong";

export function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [showHint, setShowHint] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [value, setValue] = useState("");
  const [verdict, setVerdict] = useState<Verdict>("idle");
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  const checkable = exercise.answer != null;
  // Alapból többsoros (kód/levezetés); egysoros csak numerikusnál vagy ha kérik.
  const multiline = exercise.multiline ?? exercise.check !== "numeric";
  const paletteChars = exercise.palette ? PALETTES[exercise.palette] : undefined;

  function insertChar(ch: string) {
    const el = inputRef.current;
    if (!el) {
      setValue((v) => v + ch);
      return;
    }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + ch + value.slice(end);
    setValue(next);
    setVerdict("idle");
    // Kurzor a beszúrt jel után.
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + ch.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function onCheck() {
    setVerdict(checkAnswer(value, exercise) ? "correct" : "wrong");
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-200">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="exercise-prompt font-medium text-white/90">
            <Markdown>{exercise.prompt}</Markdown>
          </div>

          {/* Megoldó mező */}
          <div className="mt-3">
            {paletteChars && (
              <div className="mb-2 flex flex-wrap gap-1">
                {paletteChars.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => insertChar(ch)}
                    className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-sm text-white/80 hover:bg-white/15"
                    title={`${ch} beszúrása`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            )}

            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setVerdict("idle");
                }}
                rows={4}
                spellCheck={false}
                placeholder={exercise.placeholder ?? "Írd ide a megoldásod…"}
                className="w-full resize-y rounded-lg border border-white/15 bg-[#0a0d18] px-3 py-2 font-mono text-sm text-white/90 outline-none focus:border-indigo-400/60"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setVerdict("idle");
                }}
                spellCheck={false}
                placeholder={exercise.placeholder ?? "Írd ide a válaszod…"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && checkable) onCheck();
                }}
                className="w-full rounded-lg border border-white/15 bg-[#0a0d18] px-3 py-2 font-mono text-sm text-white/90 outline-none focus:border-indigo-400/60"
              />
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {checkable && (
                <button
                  type="button"
                  onClick={onCheck}
                  className="rounded-lg border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-100 hover:bg-indigo-500/25"
                >
                  Ellenőrzés
                </button>
              )}
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    setValue("");
                    setVerdict("idle");
                  }}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10"
                >
                  Törlés
                </button>
              )}
              {verdict === "correct" && (
                <span className="text-xs font-semibold text-emerald-300">✓ Helyes!</span>
              )}
              {verdict === "wrong" && (
                <span className="text-xs font-semibold text-rose-300">
                  ✗ Nem stimmel — nézd meg a tippet vagy próbáld újra.
                </span>
              )}
              {!checkable && (
                <span className="text-[11px] text-white/35">
                  (önellenőrzés: hasonlítsd a megoldáshoz)
                </span>
              )}
            </div>
          </div>

          {/* Tipp / megoldás */}
          <div className="mt-3 flex flex-wrap gap-2">
            {exercise.hint && (
              <button
                onClick={() => setShowHint((v) => !v)}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
              >
                {showHint ? "Tipp elrejtése" : "💡 Tipp"}
              </button>
            )}
            {exercise.solution && (
              <button
                onClick={() => setShowSol((v) => !v)}
                className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20"
              >
                {showSol ? "Megoldás elrejtése" : "✅ Megoldás"}
              </button>
            )}
          </div>
          {showHint && exercise.hint && (
            <div className="mt-3 rounded-lg border-l-2 border-amber-400/50 bg-amber-500/5 px-3 py-2 text-sm text-amber-100/80">
              {exercise.hint}
            </div>
          )}
          {showSol && exercise.solution && (
            <div className="mt-3 border-t border-white/10 pt-2">
              <Markdown>{exercise.solution}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
