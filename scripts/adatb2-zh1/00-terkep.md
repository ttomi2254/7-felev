@slug: zh1-terkep
@title: 0. ZH1-térkép és tanulási terv (okt. 19.)
@summary: Hogyan épül fel a ZH (gépes + papíros rész, 135 pont, 60 a minimum), melyik lecke melyik feladatra készít fel, napokra bontott tanulási terv, és a „join-térkép”, ami minden gépes feladathoz kell.

## Mi lesz a ZH-n?

A félidei ZH **2026. október 19-én, hétfőn**, a 7. laboron lesz, **90 percig**. Két része van:

| Rész | Feladat | Pont | Téma | Lecke |
|------|---------|------|------|-------|
| gépes (Canvas munkalap) | 1. a+b | 15 | csoportosító lekérdezés a katalógusnézeteken: `GROUP BY`, `HAVING`, alkérdés | **1.**, **4.** |
| gépes | 2. | 15 | szegmensek mérete és extentjeinek száma | **2.** |
| gépes | 3. | 15 | top-N lekérdezés szegmensméret szerint | **2.**, **9.** |
| gépes | 4. | 20 | indexek tulajdonságai és kulcsoszlopai (`DBA_INDEXES` + `DBA_IND_COLUMNS`) | **4.** |
| gépes | 5. | 30 | többlépéses feladat: data file → tábla → használt blokkok ROWID-dal | **2.**, **3.** |
| papír | 1. | 20 | **B+ fa** építése beszúrásokkal, minden vágás előtt rajz | **5.** |
| papír | 2. | 20 | **statikus hash** tábla, legfelső bitek, túlcsordulási lánc | **8.** |
| | **összesen** | **135** | **min. 60 pont** a két részből együtt | |

A tárgy követelménye szerint ebből **legalább 2-es** kell. A pontos ponthatárok nem ismertek, csak a minimum (60/135 ≈ 44%).

### A ZH szabályai: ezek a tanulásodat is befolyásolják

* **Kézírásos jegyzet vihető** (tintával, papíron, a saját kézírásoddal). Nyomtatott vagy fénymásolt **nem**. Ezért a 10. lecke végén van egy lista arról, **mit írj fel a puskádra**. Ezt ténylegesen írd meg kézzel vasárnap!
* **Csak hibátlanul lefutó SQL-re** jár pont (részpont is). Ha egy lekérdezés hibára fut, nem ér semmit. Inkább adj be egy egyszerűbb, de futó változatot.
* **Hagyd benn a munkalapon a közbülső lekérdezéseket is**: ezekre is jár részpont.
* **Az oszlopneveket (aliasokat) pontosan úgy add meg, ahogy a szögletes zárójelben kérik**, például `[user_name, index_count]` → `owner AS user_name, COUNT(*) AS index_count`.
* A **„take note of …”** azt jelenti, hogy egy első lekérdezés eredményét (pl. egy file ID-t) **beírhatod konstansként** a következő lekérdezésbe. Ezt használd ki, ne erőltesd egyetlen lekérdezésbe!
* Szerver: `ullman.inf.elte.hu` vagy `aramis.inf.elte.hu`, port `1521`, service `ullman`/`aramis`, felhasználó a **Neptun-kódod**. A jelszavadat tudd fejből!

## A leckék sorrendje: így megy végig az összes órán

| Lecke | Óra (munkafüzet) | Amit megtanulsz |
|-------|------------------|-----------------|
| **1.** | 1. labor (`01_hu.sql`, `01.pdf`) | rendszerkatalógus, `DBA_OBJECTS`, `DBA_TAB_COLUMNS`, SQL-eszköztár, PL/SQL alapok |
| **2.** | 2. labor (`02.sql`, `02_storage.pdf`) | tablespace → data file → segment → extent → block, a tárolási nézetek |
| **3.** | 3. labor (`03.sql`) | ROWID, `DBMS_ROWID`, foglalt és használt blokkok, rekurzív `WITH` |
| **4.** | 4. labor (`04.sql`) | indexek a katalógusban: `DBA_INDEXES`, `DBA_IND_COLUMNS`, `DBA_IND_EXPRESSIONS` |
| **5.** | 4. labor (`04.pdf`, `hw_04.pdf`) | **B+ fa**: felépítés, beszúrás, vágás (papíros 1. feladat) |
| **6.** | 4. labor (`hw_04.pdf`) | **bitmap index** és **RLE**-tömörítés |
| **7.** | 5. labor (`05.sql`) | **indexszervezett tábla (IOT)** és az overflow segment |
| **8.** | 5. labor (`hw_05.pdf`) | **hash indexek**: statikus (papíros 2. feladat), kiterjeszthető, lineáris |
| **9.** | 6. labor (`06.sql`) | **particionálás**: range, list, hash, a partíciós nézetek |
| **10.** | ZH-szerkezet | **kidolgozott feladatok** a ZH szerkezetében, **próba-ZH** megoldással, stratégia, puska-lista |

Minden lecke így épül fel: **definíciók és tételek** (pontosan azok, amiket a feladatokban használnod kell) → **a nézetek és oszlopaik** → **az óra összes feladata megoldással és magyarázattal** → **„✍️ Gyakorold”** feladatok. A megoldás alapból rejtve van, a gombbal nyitod ki. Előbb próbáld meg magad!

## Napokra bontott terv (csütörtök → hétfő)

| Nap | Mit csinálj | Idő |
|-----|-------------|-----|
| **okt. 15., csüt.** | 0–2. lecke. Az 1. és 2. lecke összes lekérdezését **futtasd le** az ullman/aramis szerveren is (VPN vagy Caesar SSH-tunnel)! | ~2,5 óra |
| **okt. 16., pén.** | 3–4. lecke (ROWID, indexek), utána az 5. lecke (B+ fa): **3 fát rajzolj le kézzel** | ~3 óra |
| **okt. 17., szo.** | 6–9. lecke: bitmap, RLE, IOT, hash, particionálás. A hash-feladatokat papíron oldd meg! | ~3,5 óra |
| **okt. 18., vas.** | 10. lecke: **a kidolgozott feladatok 90 perc alatt, időre, segítség nélkül**, utána a próba-ZH. Este a **kézírásos puska** megírása. | ~3,5 óra |
| **okt. 19., hétfő délelőtt** | A puska átolvasása, egy B+ fa és egy hash tábla gyors újrarajzolása, a 10. lecke 5. feladatának begépelése fejből | ~1 óra |

> Ha kevés az időd, ez a **prioritás**: 10. lecke (kidolgozott feladatok) → 5. (B+ fa, 20 pont) → 8. (statikus hash, 20 pont) → 2. és 4. (a gépes feladatok nézetei) → 3. (ROWID, az 5. gépes feladat 30 pontjához) → a többi.

## A join-térkép: melyik nézetet mivel kapcsolod össze

A gépes feladatok 90%-a azon múlik, hogy két nézetet **a megfelelő oszlopokkal** kapcsolsz-e össze. Ezt a táblázatot **írd fel a puskádra**!

| Nézet A | Nézet B | Kapcsoló feltétel |
|---------|---------|-------------------|
| `DBA_SEGMENTS s` | `DBA_EXTENTS e` | `s.owner = e.owner AND s.segment_name = e.segment_name` (partíciónál `AND s.partition_name = e.partition_name`) |
| `DBA_EXTENTS e` | `DBA_DATA_FILES f` | `e.file_id = f.file_id` |
| `DBA_FREE_SPACE fs` | `DBA_DATA_FILES f` | `fs.file_id = f.file_id` |
| `DBA_DATA_FILES f` | `DBA_TABLESPACES t` | `f.tablespace_name = t.tablespace_name` |
| `DBA_TABLES t` | `DBA_SEGMENTS s` | `t.owner = s.owner AND t.table_name = s.segment_name` |
| `DBA_INDEXES i` | `DBA_IND_COLUMNS c` | `i.owner = c.index_owner AND i.index_name = c.index_name` |
| `DBA_INDEXES i` | `DBA_SEGMENTS s` | `i.owner = s.owner AND i.index_name = s.segment_name` |
| `DBA_INDEXES i` | `DBA_TABLES t` | `i.table_owner = t.owner AND i.table_name = t.table_name` |
| `DBA_TABLES t` | `DBA_TAB_COLUMNS c` | `t.owner = c.owner AND t.table_name = c.table_name` |
| `DBA_OBJECTS o` | egy sor ROWID-ja | `o.data_object_id = DBMS_ROWID.ROWID_OBJECT(ROWID)` |
| `DBA_DATA_FILES f` | egy sor ROWID-ja | `f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID)` |
| IOT (`DBA_TABLES`) | overflow (`DBA_TABLES`) | `ov.owner = t.owner AND ov.iot_name = t.table_name` |
| `DBA_PART_TABLES p` | `DBA_TAB_PARTITIONS tp` | `p.owner = tp.table_owner AND p.table_name = tp.table_name` |

> **Miért kell mindig az owner is?** Mert egy objektumot a **(tulajdonos, név)** pár azonosít, a név önmagában **nem egyedi**: `LABOR.EMP` és `MINTA.EMP` két különböző tábla. Ha csak névre joinolsz, idegen sorokat is összepárosítasz, és az eredmény hibás lesz.

> **Sémanevek a példákban:** a `MINTA` és a `LABOR` séma a gyakorlaton használt tanszéki minta-sémákat jelöli. Az órai szerveren a gyakorlatvezető által megadott sémaneveket használd.

## A leggyakoribb értékek, amikre szűrni fogsz

| Oszlop | Értékek |
|--------|---------|
| `DBA_SEGMENTS.segment_type` | `TABLE`, `INDEX`, `TABLE PARTITION`, `TABLE SUBPARTITION`, `INDEX PARTITION`, `INDEX SUBPARTITION`, `LOBSEGMENT`, `LOBINDEX`, `CLUSTER`, … |
| `DBA_INDEXES.index_type` | `NORMAL`, `BITMAP`, `FUNCTION-BASED NORMAL`, `FUNCTION-BASED BITMAP`, `IOT - TOP`, `NORMAL/REV`, `LOB`, `CLUSTER`, `DOMAIN` |
| `DBA_INDEXES.uniqueness` | `UNIQUE`, `NONUNIQUE` |
| `DBA_IND_COLUMNS.descend` | `ASC`, `DESC` |
| `DBA_TABLES.iot_type` | `IOT`, `IOT_OVERFLOW`, `IOT_MAPPING`, vagy `NULL` (sima heap tábla) |
| `DBA_PART_TABLES.partitioning_type` | `RANGE`, `LIST`, `HASH` (és az összetettnél a `subpartitioning_type` is) |
| `DBA_TABLESPACES.contents` | `PERMANENT`, `TEMPORARY`, `UNDO` |

**„Nem rendszer-felhasználó”** a kurzus konvenciója szerint: `owner NOT LIKE '%SYS%'`, azaz a nevében nincs `SYS` (kiesik a `SYS`, `SYSTEM`, `MDSYS`, `CTXSYS`, `AUDSYS`, …).
**„Nem rendszer-tablespace”**: `tablespace_name NOT LIKE 'SYS%'` (kiesik a `SYSTEM` és a `SYSAUX`).

## Mértékegységek

| | bájt |
|-|------|
| 1 KiB | 1024 |
| 1 MiB | 1024 · 1024 = 1 048 576 |
| 1 GiB | 1024³ = 1 073 741 824 |
| 1 blokk (alapértelmezés) | 8 KiB = 8192 |
| 1 extent (kezdetben, ASSM + autoallocate) | 8 blokk = 64 KiB = 65 536 |

MiB-ra kerekítve: `ROUND(SUM(bytes) / 1024 / 1024, 2)`. Az Oracle-ben az osztás **nem egész osztás** (a `NUMBER` típus tizedest ad), tehát nem kell `1.0`-val szorozni.

## Hogyan dolgozz a leckékkel?

1. Olvasd el a definíciókat, és **írd ki magadnak kézzel** a félkövér fogalmakat (ez lesz a puskád alapja).
2. A lekérdezéseket **gépeld be** az SQL Developerbe (ne másold be!), és futtasd. A ZH-n is gépelni fogsz.
3. A „✍️ Gyakorold” feladatoknál előbb írd meg a saját megoldásodat, és csak utána nyisd ki a megoldást.
4. A papíros témáknál (B+ fa, hash, bitmap, RLE) **ténylegesen rajzolj** papírra. A ZH-n is ezt kell.

> Megjegyzés: a papíros feladatok (B+ fa, statikus, kiterjeszthető és lineáris hash, bitmap, RLE) minden megoldását egy szimulátorral is lefuttattam. Ez pontosan visszaadja az óra B+ fás példájának végállapotát is (`04.pdf`, 14. dia), tehát ugyanazt a vágási szabályt használja, mint az óra. Az SQL-megoldások a munkafüzetek hivatalos megoldásaira (`1_megoldas.txt` … `3_megoldas.txt`) és az Oracle katalógusnézeteinek oszlopaira épülnek. Futtasd le őket a laborszerveren, mert ott derül ki, milyen adatok vannak éppen az adatbázisban.
