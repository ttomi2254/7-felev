import type { Subject } from "@/lib/types";
import { adatb2Zh1Lessons } from "./adatbazisok-2-zh1";

export const adatbazisok2: Subject = {
  slug: "adatbazisok-2",
  name: "Adatbázisok II.",
  short: "Adatb2",
  accent: "#3fa7a0",
  tagline: "Oracle SQL, tárolás, szerveroldali programozás.",
  courseCode: "IP-18bAB2G",
  location: "Hétfő 12:15–13:45 Kis lovarda (6. cs.) / 14:15–15:45 D 2-219 (9. cs.)",
  requirementsSource: "Adatb2/kovetelmenyek.pdf",
  requirementsMd: `
## Teljesítés feltételei

- **A gyakorlatok (laborok) látogatása kötelező**, a jelenlétet a jelenléti ív aláírása igazolja.
- Legfeljebb **három (3) hiányzás** megengedett — ebbe a ZH-król való távolmaradás is beleszámít. Orvosi igazolással a hiányzás nem számít bele.
- **4 vagy több hiányzás** esetén a félév végi jegy automatikusan megtagadásra kerül (ELTE HKR 66. §).
- **A kötelező házi feladatot minden labor előtt, határidőre be kell küldeni.** Ha egy kötelező házi nem érkezik be, az egy hiányzási alkalomnak számít.

## Zárthelyik

| ZH | Időpont | Megjegyzés |
|----|---------|-----------|
| Félidei ZH (7. labor) | **2026. október 19.** | 90 perc, papír + gép |
| Félév végi ZH (utolsó hét) | **2026. december 7.** | 90 perc, papír + gép |
| Javítás/pótlás | vizsgaidőszak 1. hete | csak az **egyik** ZH ismételhető |

- A ZH 90 perces, feladatok **papíron (tollal)** és **laborgépen** is.
- Mobiltelefon a tanári asztalra; internet **nincs**. Saját **kézírásos** jegyzet használható, nyomtatott/fénymásolt **nem**.
- **Mindkét ZH-ból legalább 2-est** kell szerezni. Egy ZH-ról hiányzás (igazolás nélkül) = 1-es.
- A megismételt ZH végső jegye az eredeti és a javító **nem kerekített átlaga**.
- A félév végi **gyakorlati jegy** a két ZH jegyének **kerekített átlaga**. Az elméleti tárgy vizsgájára jelentkezéshez 1-esnél jobb kell.

## MI / segédeszközök
- MI használata a **laborok és ZH-k során tilos** (webes eszközök, Copilot stb.).
- MI a **házi megoldására tilos**; a kiadott anyagok MI-oldalra feltöltése **tilos**.
- Otthon, az SQL tanulásához általános kérdésekre használható — de ne a konkrét feladatra.

## Tananyag
- **Moodle** (https://moodle.elte.hu): diasorok, házi-kiírások, beküldés. Munkafüzetek (SQL) + PDF-ek.
- Adatbázis-hozzáférés: Oracle SQL Developer, szerverek **Ullman** / **Aramis** (port 1521, Neptun ID). Otthonról VPN vagy SSH-tunnel (Caesar).
`,
  files: [
    { name: "01 — Bevezető diasor", path: "/materials/Adatb2/01.pdf", kind: "pdf" },
    { name: "02 — Storage (tárolás)", path: "/materials/Adatb2/02_storage.pdf", kind: "pdf" },
    { name: "Követelmények (kurzusinfó)", path: "/materials/Adatb2/kovetelmenyek.pdf", kind: "pdf" },
    { name: "01_hu.sql — munkafüzet", path: "/materials/Adatb2/sql/01_hu.sql", kind: "sql" },
    { name: "02.sql — munkafüzet", path: "/materials/Adatb2/sql/02.sql", kind: "sql" },
    { name: "03.sql — munkafüzet", path: "/materials/Adatb2/sql/03.sql", kind: "sql" },
    { name: "04 — B+ fa diasor", path: "/materials/Adatb2/04.pdf", kind: "pdf" },
    { name: "04.sql — munkafüzet (indexek)", path: "/materials/Adatb2/sql/04.sql", kind: "sql" },
    { name: "hw_04 — B+ fa, bitmap, RLE (házi)", path: "/materials/Adatb2/hw_04.pdf", kind: "pdf" },
    { name: "05.sql — munkafüzet (IOT)", path: "/materials/Adatb2/sql/05.sql", kind: "sql" },
    { name: "hw_05 — kiterjeszthető és lineáris hash (házi)", path: "/materials/Adatb2/hw_05.pdf", kind: "pdf" },
    { name: "06.sql — munkafüzet (particionálás)", path: "/materials/Adatb2/sql/06.sql", kind: "sql" },
    { name: "06_create_tables.sql — a particionált táblák", path: "/materials/Adatb2/sql/06_create_tables.sql", kind: "sql" },
    { name: "1. labor — megoldás", path: "/materials/Adatb2/sql/1_megoldas.txt", kind: "other" },
    { name: "2. labor — megoldás", path: "/materials/Adatb2/sql/2_megoldas.txt", kind: "other" },
    { name: "3. labor — megoldás", path: "/materials/Adatb2/sql/3_megoldas.txt", kind: "other" },
    { name: "Mintazh — papíros rész (PDF)", path: "/materials/Adatb2/mintazh/midterm.pdf", kind: "pdf", desc: "B+ fa (20 p) + statikus hash (20 p)." },
    { name: "Mintazh — gépes munkalap (SQL)", path: "/materials/Adatb2/mintazh/midterm1.sql", kind: "sql", desc: "5 feladat, 95 p; összesen 135 p, min. 60." },
    { name: "Mintazh — előkészítő szkript", path: "/materials/Adatb2/mintazh/midterm1_create_tables.sql", kind: "sql" },
  ],
  events: [
    { id: "ab2-zh1", type: "zh", title: "1. (félidei) ZH", date: "2026-10-19", location: "labor (7. alkalom)", topic: "Az 1–6. labor anyaga. Gépes rész (5 SQL-feladat, 95 p): katalógus, tárolás, indexek, ROWID. Papíros rész (40 p): B+ fa, statikus hash. Összesen 135 p, min. 60.", note: "Legalább 2-es szükséges. Kézírásos jegyzet vihető, internet nincs. Csak hibátlanul futó SQL ér pontot." },
    { id: "ab2-zh2", type: "zh", title: "2. (félév végi) ZH", date: "2026-12-07", location: "labor (utolsó hét)", topic: "A teljes féléves labor-anyag.", note: "Legalább 2-es szükséges." },
    { id: "ab2-hazi", type: "beadando", title: "Heti kötelező házi", topic: "Minden labor témájához kapcsolódó munkafüzet.", note: "Minden labor ELŐTT, határidőre. Elmaradás = hiányzás.", recurring: true },
  ],
  // ZH1-felkészítő: az 1–6. labor + a mintazh, leckénként (adatbazisok-2-zh1.ts)
  lessons: adatb2Zh1Lessons,
  missing: [
    "A ZH javító/pótló pontos időpontja (vizsgaidőszak 1. hete) — pontosításra vár.",
  ],
};
