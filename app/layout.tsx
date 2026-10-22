import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "7. félév — Tanulóportál",
  description:
    "Az összes tárgy egy helyen: követelmények, anyagok, tanítás, feladatsorok, órarend és emlékeztetők.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0e1a]/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="group flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-orange-500 text-sm font-black text-white">
                7
              </span>
              <span className="font-bold tracking-tight text-white">
                félév<span className="text-white/40">.portal</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link href="/" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                Áttekintés
              </Link>
              <Link href="/orarend" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                Órarend
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-white/30">
          Saját tanulóportál · 2026/27 I. félév · a tárgyak hivatalos követelményei alapján
        </footer>
      </body>
    </html>
  );
}
