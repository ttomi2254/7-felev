# Adatb2 ZH1 leckék: md -> data/subjects/adatbazisok-2-zh1.ts
import glob, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "data", "subjects", "adatbazisok-2-zh1.ts")


def lit(s):
    s = s.strip("\n")
    s = s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return "`" + s + "`"


def parse(path):
    text = open(path, encoding="utf-8").read().replace("\r\n", "\n")
    meta = {}
    lines = text.split("\n")
    while lines and lines[0].startswith("@") and not lines[0].startswith("@@"):
        k, v = lines.pop(0)[1:].split(":", 1)
        meta[k.strip()] = v.strip()
    rest = "\n".join(lines)
    parts = re.split(r"^@@feladat\s*$", rest, flags=re.M)
    body, exs = parts[0], []
    for p in parts[1:]:
        fields = re.split(r"^@@(\w+)(?::[ \t]*(.*))?$", p, flags=re.M)
        ex = {"prompt": fields[0]}
        for i in range(1, len(fields), 3):
            key, inline, content = fields[i], fields[i + 1], fields[i + 2]
            ex[key] = inline if inline else content
        exs.append(ex)
    return meta, body, exs


def main():
    files = sorted(glob.glob(os.path.join(HERE, "[0-9][0-9]-*.md")))
    out = [
        "// GENERÁLT FÁJL — forrás: md leckék (Adatb2 ZH1-felkészítő), lásd a commit üzenetét.",
        "// Kézzel is szerkeszthető; a body/prompt/hint/solution template literal.",
        'import type { Lesson } from "@/lib/types";',
        "",
        "export const adatb2Zh1Lessons: Lesson[] = [",
    ]
    total = 0
    for f in files:
        meta, body, exs = parse(f)
        markers = [int(x) for m in re.findall(r"^\[\[feladat:([\d,\s]+)\]\]", body, flags=re.M) for x in m.split(",")]
        bad = [m for m in markers if m >= len(exs)]
        if bad:
            sys.exit(f"{f}: nem létező feladatra hivatkozik: {bad}")
        unplaced = sorted(set(range(len(exs))) - set(markers))
        out.append("  {")
        out.append(f'    slug: "{meta["slug"]}",')
        out.append(f"    title: {lit(meta['title'])},")
        out.append(f"    summary: {lit(meta['summary'])},")
        out.append('    status: "complete",')
        out.append(f"    body: {lit(body)},")
        if exs:
            out.append("    exercises: [")
            for ex in exs:
                out.append("      {")
                out.append(f"        prompt: {lit(ex['prompt'])},")
                if "hint" in ex:
                    out.append(f"        hint: {lit(ex['hint'])},")
                if "valasz" in ex:
                    answers = [a.strip() for a in ex["valasz"].split("|")]
                    out.append("        answer: [" + ", ".join(lit(a) for a in answers) + "],")
                    out.append(f'        check: "{ex.get("ellenorzes", "text").strip()}",')
                if "megoldas" in ex:
                    out.append(f"        solution: {lit(ex['megoldas'])},")
                out.append("      },")
            out.append("    ],")
        out.append("  },")
        total += len(exs)
        print(f"{os.path.basename(f)}: {len(exs)} feladat, elhelyezetlen: {unplaced}")
    out.append("];")
    open(OUT, "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")
    print("összesen", len(files), "lecke,", total, "feladat ->", OUT)


main()
