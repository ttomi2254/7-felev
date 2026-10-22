import Link from "next/link";
import { TimetableGrid } from "@/components/TimetableGrid";
import { allDatedEvents } from "@/data/subjects";
import { EventBadge } from "@/components/EventList";
import { formatHuDate } from "@/lib/events";

export const metadata = { title: "Órarend — 7. félév" };

export default function OrarendPage() {
  const events = allDatedEvents();
  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-white/50 hover:text-white">
          ← Vissza
        </Link>
        <h1 className="mt-2 text-2xl font-black text-white">Heti órarend</h1>
        <p className="text-sm text-white/50">2026. szeptember · a kártyákra kattintva a tárgy oldalára jutsz.</p>
      </div>

      <div className="rounded-2xl border border-indigo-400/25 bg-indigo-500/[0.07] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-bold text-indigo-100">📆 Naptár telefonra</h2>
            <p className="mt-1 text-sm text-white/60">
              Az órák és a ZH-k / beadandók / vizsgák letölthetők <code>.ics</code> fájlként —
              importáld a Google/Apple naptárba, és a telefonod is szól időben.
            </p>
          </div>
          <a
            href="/naptar.ics"
            className="shrink-0 rounded-lg border border-indigo-400/40 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-100 hover:bg-indigo-500/30"
          >
            ⬇️ Naptár letöltése (.ics)
          </a>
        </div>
        <p className="mt-2 text-[11px] text-white/40">
          Előfizetés (auto-frissülő) URL-lel is: Google Naptár → „Egyéb naptárak” → „Feliratkozás
          URL-ről” → a telepített oldal <code>/naptar.ics</code> címe.
        </p>
      </div>

      <TimetableGrid />

      <section>
        <h2 className="mb-3 text-xl font-bold text-white">A félév dátumos eseményei</h2>
        <ol className="relative space-y-3 border-l border-white/10 pl-5">
          {events.map((e) => (
            <li key={e.subjectSlug + e.id} className="relative">
              <span
                className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full ring-2 ring-[#0b0e1a]"
                style={{ background: e.accent }}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-mono text-white/50">{formatHuDate(e.date!)}</span>
                <EventBadge type={e.type} />
                <Link href={`/targyak/${e.subjectSlug}`} className="font-medium text-white/90 hover:underline">
                  {e.subjectName} — {e.title}
                </Link>
              </div>
              {e.topic && <p className="mt-0.5 text-sm text-white/50">{e.topic}</p>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
