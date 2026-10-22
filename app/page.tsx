import { subjects, allDatedEvents } from "@/data/subjects";
import { SubjectCard } from "@/components/SubjectCard";
import { TimetableGrid } from "@/components/TimetableGrid";
import { ReminderPanel } from "@/components/ReminderPanel";

export default function Home() {
  const events = allDatedEvents().map((e) => ({
    id: e.id,
    type: e.type,
    title: e.title,
    date: e.date!,
    topic: e.topic,
    subjectSlug: e.subjectSlug,
    subjectName: e.subjectName,
    accent: e.accent,
  }));

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          7. félév — <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">tanulóportál</span>
        </h1>
        <p className="mt-2 max-w-2xl text-white/55">
          Minden tárgy egy helyen: követelmények, feltöltött anyagok, végigvezető
          tanítás és feladatsorok, az órarended, és emlékeztetők a közelgő ZH-król,
          beadandókról és vizsgákról.
        </p>
      </section>

      <ReminderPanel events={events} />

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-white">Tárgyak</h2>
          <span className="text-sm text-white/40">{subjects.length} tárgy</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <SubjectCard key={s.slug} subject={s} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-white">Heti órarend</h2>
          <a href="/orarend" className="text-sm text-indigo-300 hover:underline">
            Teljes nézet →
          </a>
        </div>
        <TimetableGrid />
      </section>
    </div>
  );
}
