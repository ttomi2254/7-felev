import Link from "next/link";
import type { Subject } from "@/lib/types";

export function SubjectCard({ subject }: { subject: Subject }) {
  const complete = subject.lessons.filter((l) => l.status === "complete").length;
  const hasMissing = (subject.missing?.length ?? 0) > 0;
  return (
    <Link
      href={`/targyak/${subject.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: subject.accent }}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold leading-tight text-white">{subject.name}</h3>
        <span
          className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ background: `${subject.accent}22`, color: subject.accent }}
        >
          {subject.short}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/55">{subject.tagline}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
        <span className="rounded-full bg-white/5 px-2 py-0.5">{subject.files.length} fájl</span>
        <span className="rounded-full bg-white/5 px-2 py-0.5">{subject.lessons.length} lecke</span>
        {complete > 0 && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
            {complete} kész
          </span>
        )}
        {hasMissing && (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300">
            pótlandó
          </span>
        )}
      </div>
    </Link>
  );
}
