import type { MaterialFile, FileKind } from "@/lib/types";
import { isMaterialAvailable } from "@/lib/materials";

const kindMeta: Record<FileKind, { icon: string; label: string }> = {
  pdf: { icon: "📄", label: "PDF" },
  code: { icon: "💻", label: "Kód" },
  sql: { icon: "🗄️", label: "SQL" },
  md: { icon: "📝", label: "Jegyzet" },
  html: { icon: "🌐", label: "HTML" },
  video: { icon: "🎬", label: "Videó" },
  image: { icon: "🖼️", label: "Kép" },
  other: { icon: "📎", label: "Fájl" },
};

export function FileList({ files }: { files: MaterialFile[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {files.map((f) => {
        const m = kindMeta[f.kind];
        const available = isMaterialAvailable(f.path);
        const body = (
          <>
            <span className="text-lg leading-none">{m.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white/90">{f.name}</span>
              {f.desc && <span className="mt-0.5 block text-xs text-white/45">{f.desc}</span>}
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-white/40">
                {m.label}
                {f.external && <span className="text-amber-400/80">· külső (nincs a repóban)</span>}
                {!available && <span className="text-white/35">· csak helyben (nincs publikálva)</span>}
              </span>
            </span>
          </>
        );
        const cls = "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3";
        return (
          <li key={f.path + f.name}>
            {available ? (
              <a
                href={f.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} transition hover:border-white/25 hover:bg-white/[0.06]`}
              >
                {body}
              </a>
            ) : (
              <div className={`${cls} opacity-60`} title="Az eredeti tananyag nincs publikálva">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
