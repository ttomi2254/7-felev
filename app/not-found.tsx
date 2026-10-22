import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <div className="text-6xl font-black text-white/20">404</div>
        <p className="mt-2 text-white/60">Ez az oldal nem található.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          ← Vissza az áttekintésre
        </Link>
      </div>
    </div>
  );
}
