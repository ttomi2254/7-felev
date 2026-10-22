import type { CourseEvent } from "@/lib/types";
import { eventMeta, formatHuDate } from "@/lib/events";

export function EventBadge({ type }: { type: CourseEvent["type"] }) {
  const m = eventMeta[type];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: `${m.color}22`, color: m.color }}
    >
      {m.icon} {m.label}
    </span>
  );
}

export function EventList({ events }: { events: CourseEvent[] }) {
  if (!events.length) return null;
  return (
    <ul className="space-y-2">
      {events.map((e) => (
        <li key={e.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex flex-wrap items-center gap-2">
            <EventBadge type={e.type} />
            <span className="font-medium text-white/90">{e.title}</span>
            <span className="ml-auto text-sm text-white/60">
              {e.date ? formatHuDate(e.date) : e.recurring ? "ismétlődő" : "időpont: TBA"}
              {e.time && ` · ${e.time}`}
            </span>
          </div>
          {e.topic && <p className="mt-1.5 text-sm text-white/60">Anyag: {e.topic}</p>}
          {e.location && <p className="mt-0.5 text-xs text-white/40">Helyszín: {e.location}</p>}
          {e.note && <p className="mt-0.5 text-xs text-white/40">{e.note}</p>}
        </li>
      ))}
    </ul>
  );
}
