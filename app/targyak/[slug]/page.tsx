import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, getSubject } from "@/data/subjects";
import { Markdown } from "@/components/Markdown";
import { FileList } from "@/components/FileList";
import { EventList } from "@/components/EventList";

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const s = getSubject(slug);
  return { title: s ? `${s.name} — 7. félév` : "Tárgy" };
}

export default async function SubjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-white/50 hover:text-white">
          ← Áttekintés
        </Link>
        <div className="mt-2 flex items-start gap-3">
          <span className="mt-1 h-8 w-1.5 rounded-full" style={{ background: subject.accent }} />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">{subject.name}</h1>
            <p className="text-white/55">{subject.tagline}</p>
            <div className="mt-2 space-y-0.5 text-sm text-white/45">
              {subject.instructors && <p>{subject.instructors}</p>}
              {subject.location && <p>🕑 {subject.location}</p>}
              {subject.courseCode && <p>Kurzuskód: {subject.courseCode}</p>}
            </div>
          </div>
        </div>
      </div>

      {subject.missing && subject.missing.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <h3 className="flex items-center gap-2 font-bold text-amber-200">⚠️ Hiányzó / pótlandó adatok</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-100/80">
            {subject.missing.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-amber-100/50">
            A pótlás után ezek is bekerülnek az emlékeztetőkbe és a naptárba.
          </p>
        </div>
      )}

      {/* Követelmények */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">📋 Követelmények</h2>
          {subject.requirementsSource && (
            <span className="text-[11px] text-white/35">forrás: {subject.requirementsSource}</span>
          )}
        </div>
        <Markdown>{subject.requirementsMd}</Markdown>
      </section>

      {/* Leckék — tanítás és feladatsorok */}
      <section>
        <h2 className="mb-3 text-xl font-bold text-white">🎓 Tanítás és feladatsorok</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {subject.lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/targyak/${subject.slug}/tanulas/${l.slug}`}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-white group-hover:underline">{l.title}</h3>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    l.status === "complete"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {l.status === "complete" ? "kész" : "vázlat"}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">{l.summary}</p>
              {l.exercises && l.exercises.length > 0 && (
                <p className="mt-2 text-[11px] text-white/35">
                  {l.exercises.length} feladat megoldással
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Számonkérések */}
      {subject.events.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold text-white">🗓️ Számonkérések és események</h2>
          <EventList events={subject.events} />
        </section>
      )}

      {/* Feltöltött anyag */}
      <section>
        <h2 className="mb-3 text-xl font-bold text-white">📁 Feltöltött anyagok</h2>
        <FileList files={subject.files} />
      </section>

      {subject.links && subject.links.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold text-white">🔗 Hasznos linkek</h2>
          <ul className="flex flex-wrap gap-2">
            {subject.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
