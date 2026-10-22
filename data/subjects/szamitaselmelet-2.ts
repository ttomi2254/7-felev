import type { Subject } from "@/lib/types";
import { szamelZh1Lessons } from "./szamitaselmelet-2-zh1";

export const szamitaselmelet2: Subject = {
  slug: "szamitaselmelet-2",
  name: "A számításelmélet alapjai II.",
  short: "Számelmélet",
  accent: "#d06a92",
  tagline: "Logika, Turing-gépek, eldönthetetlenség, NP-teljesség.",
  location: "Kedd 12:00–14:00 Gy · Csütörtök 12:00–14:00 Ea",
  requirementsSource: "Szamelmelet/kovetelmeny.txt",
  requirementsMd: `
Kreditérték: **2+1**. Előtárgyak: A számításelmélet alapjai I., Algoritmusok és adatszerkezetek II.

## Gyakorlati jegy feltételei
- **Aktív jelenlét** a gyakorlatok (BSc-n az előadások) **75%-án**, legfeljebb **3 hiányzás**.
- **Két zárthelyi**, mindkettőn **legalább 40%**. A jegy a két ZH összteljesítménye alapján.

## ZH-értékelés (mindkét ZH)
| Teljesítmény | Jegy |
|--------------|------|
| ≥ 85% | jeles (5) |
| ≥ 70% | jó (4) |
| ≥ 55% | közepes (3) |
| ≥ 40% | elégséges (2) |
| < 40% | elégtelen (1) |

- **Pótzárthelyi:** akinek egy ZH-ja elégtelen vagy egyet nem írt meg (de csak az egyiket).
- **Utóvizsga:** akinek nincs legalább egy elégséges ZH-ja, vagy a pótZH elégtelen. Az egész félév anyaga, mindkét témakörből külön 40%.
- **Javító ZH:** bárki, a rosszabb ZH-t; rontani nem lehet.

## Tematika és ütemezés (keddi / pénteki csoport)
| Hét | Téma |
|-----|------|
| szept. 8 / 11 | Nulladrendű logika |
| szept. 15 / 18 | Elsőrendű logika |
| szept. 22 / 25 | Függvények aszimptotikus viselkedése |
| szept. 29 / okt. 2 | Egyszalagos Turing-gépek |
| okt. 2 | Pótgyakorlat (mintazh), Déli tömb 0-805 |
| **okt. 6 / 9** | **1. zárthelyi dolgozat** |
| okt. 13 / 16 | Egy- és többszalagos Turing-gépek |
| okt. 20 / nov. 6 | Nemdeterminisztikus Turing-gépek |
| nov. 3 / 20 | Számoló Turing-gépek |
| nov. 17 / 27 | Eldönthetetlenség |
| nov. 24 / dec. 4 | NP-teljesség, NP-teljes problémák |
| nov. 27 | Konzultáció (mintazh), Déli tömb 0-805 |
| **dec. 1 / 4** | **2. zárthelyi dolgozat** |
| dec. 8 / 11 | Kitekintés, összefoglaló |
| **dec. 17** | **Pót- és javító ZH** (14:00–16:00, Déli 2-712) |
| **jan. 7** | **Gyakorlati utóvizsga** (14:00–16:00, Déli 2-712) |

Kurzuskezelés: **Moodle** + **MS Teams** (SZÁMEA2G kód: mw5obav). Fogadóóra: kedd 14:00–15:30.
`,
  files: [
    { name: "gy1 — feladatok (PDF)", path: "/materials/Szamelmelet/SZEA2-gy1-fel.pdf", kind: "pdf" },
    { name: "gy1 — megoldások (PDF)", path: "/materials/Szamelmelet/SZEA2-gy1-mo.pdf", kind: "pdf" },
    { name: "gy2 — feladatok (PDF)", path: "/materials/Szamelmelet/SZEA2-gy2-fel.pdf", kind: "pdf" },
    { name: "gy2 — megoldások (PDF)", path: "/materials/Szamelmelet/SZEA2-gy2-mo_260918.pdf", kind: "pdf" },
    { name: "gy3 — feladatok (PDF)", path: "/materials/Szamelmelet/SZEA2-gy3-fel.pdf", kind: "pdf" },
    { name: "gy3 — megoldások (PDF)", path: "/materials/Szamelmelet/SZEA2-gy3-mo.pdf", kind: "pdf" },
    { name: "gy4 — feladatok (PDF)", path: "/materials/Szamelmelet/SZEA2-gy4-fel.pdf", kind: "pdf" },
    { name: "gy4 — megoldások (PDF)", path: "/materials/Szamelmelet/SZEA2-gy4-mo.pdf", kind: "pdf" },
    { name: "1. mintazh (PDF)", path: "/materials/Szamelmelet/mintazh_1.pdf", kind: "pdf", desc: "A ZH1 szerkezete: 6 feladat." },
    { name: "1. mintazh — megoldás (PDF)", path: "/materials/Szamelmelet/mintazh_1_mo.pdf", kind: "pdf" },
    { name: "Követelmény (TXT)", path: "/materials/Szamelmelet/kovetelmeny.txt", kind: "other" },
  ],
  events: [
    { id: "sz-zh1", type: "zh", title: "1. zárthelyi dolgozat", date: "2026-10-06", topic: "Nulladrendű és elsőrendű logika, aszimptotika, egyszalagos Turing-gépek.", note: "Min. 40%. (Pénteki csoport: okt. 9.)" },
    { id: "sz-zh2", type: "zh", title: "2. zárthelyi dolgozat", date: "2026-12-01", topic: "Turing-gépek (nemdeterminisztikus, számoló), eldönthetetlenség, NP-teljesség.", note: "Min. 40%. (Pénteki csoport: dec. 4.)" },
    { id: "sz-potzh", type: "potzh", title: "Pót- és javító ZH", date: "2026-12-17", time: "14:00–16:00", location: "Déli tömb 2-712", topic: "A megfelelő ZH anyaga.", note: "Egy elégtelen/kimaradt ZH pótlására, vagy javításra." },
    { id: "sz-utovizsga", type: "vizsga", title: "Gyakorlati utóvizsga", date: "2027-01-07", time: "14:00–16:00", location: "Déli tömb 2-712", topic: "A teljes félév anyaga, mindkét témakörből külön 40%." },
  ],
  // ZH1-felkészítő: a mintazh 6 feladattípusa, leckénként (szamitaselmelet-2-zh1.ts)
  lessons: szamelZh1Lessons,
};
