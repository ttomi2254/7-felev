import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, getSubject } from "@/data/subjects";
import { Markdown } from "@/components/Markdown";
import { ExerciseCard } from "@/components/ExerciseCard";

export function generateStaticParams() {
  const params: { slug: string; lesson: string }[] = [];
  for (const s of subjects) {
    for (const l of s.lessons) {
      params.push({ slug: s.slug, lesson: l.slug });
    }
  }
  return params;
}

type Params = Promise<{ slug: string; lesson: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, lesson: lessonSlug } = await params;
  const s = getSubject(slug);
  const l = s?.lessons.find((x) => x.slug === lessonSlug);
  return { title: l ? `${l.title} — ${s?.short}` : "Lecke" };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { slug, lesson: lessonSlug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();
  const idx = subject.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx < 0) notFound();
  const lesson = subject.lessons[idx];
  const prev = subject.lessons[idx - 1];
  const next = subject.lessons[idx + 1];

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href={`/targyak/${subject.slug}`}
          className="text-sm text-white/50 hover:text-white"
        >
          ← {subject.name}
        </Link>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{lesson.title}</h1>
        <p className="text-white/55">{lesson.summary}</p>
        {lesson.status === "skeleton" && (
          <p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
            Ez a lecke még vázlat — fokozatosan bővül.
          </p>
        )}
      </div>

      <Markdown>{lesson.body}</Markdown>

      {lesson.exercises && lesson.exercises.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">✍️ Feladatsor</h2>
          {lesson.exercises.map((ex, i) => (
            <ExerciseCard key={i} exercise={ex} index={i} />
          ))}
        </section>
      )}

      <nav className="flex items-center justify-between gap-3 border-t border-white/10 pt-5">
        {prev ? (
          <Link
            href={`/targyak/${subject.slug}/tanulas/${prev.slug}`}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            ← {prev.title.split(" — ")[0]}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/targyak/${subject.slug}/tanulas/${next.slug}`}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-right text-sm text-white/80 hover:bg-white/10"
          >
            {next.title.split(" — ")[0]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
