"""Hang- és videófájlok helyi leirata OpenAI Whisperrel (saját jegyzeteléshez).

Használat:
    pip install openai-whisper
    python scripts/transcribe.py <mappa> [--model small] [--language hu]

A mappában lévő .mp4 / .m4a / .mp3 / .wav fájlokból ugyanoda, azonos néven .txt leiratot ír.
A már meglévő leiratokat nem írja felül. Minden a saját gépen fut, semmit nem tölt fel.
"""
import argparse
import glob
import os

EXTENSIONS = ("*.mp4", "*.m4a", "*.mp3", "*.wav")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("folder", help="a hang-/videófájlokat tartalmazó mappa")
    parser.add_argument("--model", default="small", help="Whisper-modell (tiny, base, small, medium, large)")
    parser.add_argument("--language", default="hu", help="a felvétel nyelve")
    args = parser.parse_args()

    files = sorted(f for ext in EXTENSIONS for f in glob.glob(os.path.join(args.folder, ext)))
    if not files:
        raise SystemExit(f"Nincs feldolgozható fájl: {args.folder}")

    import whisper  # csak itt kell, hogy a --help függőség nélkül is működjön

    print(f"Whisper '{args.model}' betöltése…", flush=True)
    model = whisper.load_model(args.model)
    for path in files:
        out = os.path.splitext(path)[0] + ".txt"
        if os.path.exists(out):
            print(f"kihagyva (már van leirat): {out}", flush=True)
            continue
        print(f"leirat → {out}", flush=True)
        result = model.transcribe(path, language=args.language, verbose=False)
        with open(out, "w", encoding="utf-8") as fh:
            fh.write(result["text"].strip() + "\n")
        print(f"  kész: {len(result['text'])} karakter", flush=True)


if __name__ == "__main__":
    main()
