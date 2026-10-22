// GENERÁLT FÁJL — forrás: md leckék (Adatb2 ZH1-felkészítő), lásd a commit üzenetét.
// Kézzel is szerkeszthető; a body/prompt/hint/solution template literal.
import type { Lesson } from "@/lib/types";

export const adatb2Zh1Lessons: Lesson[] = [
  {
    slug: "zh1-terkep",
    title: `0. ZH1-térkép és tanulási terv (okt. 19.)`,
    summary: `Hogyan épül fel a ZH (gépes + papíros rész, 135 pont, 60 a minimum), melyik lecke melyik feladatra készít fel, napokra bontott tanulási terv, és a „join-térkép”, ami minden gépes feladathoz kell.`,
    status: "complete",
    body: `## Mi lesz a ZH-n?

A félidei ZH **2026. október 19-én, hétfőn**, a 7. laboron lesz, **90 percig**. Két része van:

| Rész | Feladat | Pont | Téma | Lecke |
|------|---------|------|------|-------|
| gépes (Canvas munkalap) | 1. a+b | 15 | csoportosító lekérdezés a katalógusnézeteken: \`GROUP BY\`, \`HAVING\`, alkérdés | **1.**, **4.** |
| gépes | 2. | 15 | szegmensek mérete és extentjeinek száma | **2.** |
| gépes | 3. | 15 | top-N lekérdezés szegmensméret szerint | **2.**, **9.** |
| gépes | 4. | 20 | indexek tulajdonságai és kulcsoszlopai (\`DBA_INDEXES\` + \`DBA_IND_COLUMNS\`) | **4.** |
| gépes | 5. | 30 | többlépéses feladat: data file → tábla → használt blokkok ROWID-dal | **2.**, **3.** |
| papír | 1. | 20 | **B+ fa** építése beszúrásokkal, minden vágás előtt rajz | **5.** |
| papír | 2. | 20 | **statikus hash** tábla, legfelső bitek, túlcsordulási lánc | **8.** |
| | **összesen** | **135** | **min. 60 pont** a két részből együtt | |

A tárgy követelménye szerint ebből **legalább 2-es** kell. A pontos ponthatárok nem ismertek, csak a minimum (60/135 ≈ 44%).

### A ZH szabályai: ezek a tanulásodat is befolyásolják

* **Kézírásos jegyzet vihető** (tintával, papíron, a saját kézírásoddal). Nyomtatott vagy fénymásolt **nem**. Ezért a 10. lecke végén van egy lista arról, **mit írj fel a puskádra**. Ezt ténylegesen írd meg kézzel vasárnap!
* **Csak hibátlanul lefutó SQL-re** jár pont (részpont is). Ha egy lekérdezés hibára fut, nem ér semmit. Inkább adj be egy egyszerűbb, de futó változatot.
* **Hagyd benn a munkalapon a közbülső lekérdezéseket is**: ezekre is jár részpont.
* **Az oszlopneveket (aliasokat) pontosan úgy add meg, ahogy a szögletes zárójelben kérik**, például \`[user_name, index_count]\` → \`owner AS user_name, COUNT(*) AS index_count\`.
* A **„take note of …”** azt jelenti, hogy egy első lekérdezés eredményét (pl. egy file ID-t) **beírhatod konstansként** a következő lekérdezésbe. Ezt használd ki, ne erőltesd egyetlen lekérdezésbe!
* Szerver: \`ullman.inf.elte.hu\` vagy \`aramis.inf.elte.hu\`, port \`1521\`, service \`ullman\`/\`aramis\`, felhasználó a **Neptun-kódod**. A jelszavadat tudd fejből!

## A leckék sorrendje: így megy végig az összes órán

| Lecke | Óra (munkafüzet) | Amit megtanulsz |
|-------|------------------|-----------------|
| **1.** | 1. labor (\`01_hu.sql\`, \`01.pdf\`) | rendszerkatalógus, \`DBA_OBJECTS\`, \`DBA_TAB_COLUMNS\`, SQL-eszköztár, PL/SQL alapok |
| **2.** | 2. labor (\`02.sql\`, \`02_storage.pdf\`) | tablespace → data file → segment → extent → block, a tárolási nézetek |
| **3.** | 3. labor (\`03.sql\`) | ROWID, \`DBMS_ROWID\`, foglalt és használt blokkok, rekurzív \`WITH\` |
| **4.** | 4. labor (\`04.sql\`) | indexek a katalógusban: \`DBA_INDEXES\`, \`DBA_IND_COLUMNS\`, \`DBA_IND_EXPRESSIONS\` |
| **5.** | 4. labor (\`04.pdf\`, \`hw_04.pdf\`) | **B+ fa**: felépítés, beszúrás, vágás (papíros 1. feladat) |
| **6.** | 4. labor (\`hw_04.pdf\`) | **bitmap index** és **RLE**-tömörítés |
| **7.** | 5. labor (\`05.sql\`) | **indexszervezett tábla (IOT)** és az overflow segment |
| **8.** | 5. labor (\`hw_05.pdf\`) | **hash indexek**: statikus (papíros 2. feladat), kiterjeszthető, lineáris |
| **9.** | 6. labor (\`06.sql\`) | **particionálás**: range, list, hash, a partíciós nézetek |
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
| \`DBA_SEGMENTS s\` | \`DBA_EXTENTS e\` | \`s.owner = e.owner AND s.segment_name = e.segment_name\` (partíciónál \`AND s.partition_name = e.partition_name\`) |
| \`DBA_EXTENTS e\` | \`DBA_DATA_FILES f\` | \`e.file_id = f.file_id\` |
| \`DBA_FREE_SPACE fs\` | \`DBA_DATA_FILES f\` | \`fs.file_id = f.file_id\` |
| \`DBA_DATA_FILES f\` | \`DBA_TABLESPACES t\` | \`f.tablespace_name = t.tablespace_name\` |
| \`DBA_TABLES t\` | \`DBA_SEGMENTS s\` | \`t.owner = s.owner AND t.table_name = s.segment_name\` |
| \`DBA_INDEXES i\` | \`DBA_IND_COLUMNS c\` | \`i.owner = c.index_owner AND i.index_name = c.index_name\` |
| \`DBA_INDEXES i\` | \`DBA_SEGMENTS s\` | \`i.owner = s.owner AND i.index_name = s.segment_name\` |
| \`DBA_INDEXES i\` | \`DBA_TABLES t\` | \`i.table_owner = t.owner AND i.table_name = t.table_name\` |
| \`DBA_TABLES t\` | \`DBA_TAB_COLUMNS c\` | \`t.owner = c.owner AND t.table_name = c.table_name\` |
| \`DBA_OBJECTS o\` | egy sor ROWID-ja | \`o.data_object_id = DBMS_ROWID.ROWID_OBJECT(ROWID)\` |
| \`DBA_DATA_FILES f\` | egy sor ROWID-ja | \`f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID)\` |
| IOT (\`DBA_TABLES\`) | overflow (\`DBA_TABLES\`) | \`ov.owner = t.owner AND ov.iot_name = t.table_name\` |
| \`DBA_PART_TABLES p\` | \`DBA_TAB_PARTITIONS tp\` | \`p.owner = tp.table_owner AND p.table_name = tp.table_name\` |

> **Miért kell mindig az owner is?** Mert egy objektumot a **(tulajdonos, név)** pár azonosít, a név önmagában **nem egyedi**: \`LABOR.EMP\` és \`MINTA.EMP\` két különböző tábla. Ha csak névre joinolsz, idegen sorokat is összepárosítasz, és az eredmény hibás lesz.

> **Sémanevek a példákban:** a \`MINTA\` és a \`LABOR\` séma a gyakorlaton használt tanszéki minta-sémákat jelöli. Az órai szerveren a gyakorlatvezető által megadott sémaneveket használd.

## A leggyakoribb értékek, amikre szűrni fogsz

| Oszlop | Értékek |
|--------|---------|
| \`DBA_SEGMENTS.segment_type\` | \`TABLE\`, \`INDEX\`, \`TABLE PARTITION\`, \`TABLE SUBPARTITION\`, \`INDEX PARTITION\`, \`INDEX SUBPARTITION\`, \`LOBSEGMENT\`, \`LOBINDEX\`, \`CLUSTER\`, … |
| \`DBA_INDEXES.index_type\` | \`NORMAL\`, \`BITMAP\`, \`FUNCTION-BASED NORMAL\`, \`FUNCTION-BASED BITMAP\`, \`IOT - TOP\`, \`NORMAL/REV\`, \`LOB\`, \`CLUSTER\`, \`DOMAIN\` |
| \`DBA_INDEXES.uniqueness\` | \`UNIQUE\`, \`NONUNIQUE\` |
| \`DBA_IND_COLUMNS.descend\` | \`ASC\`, \`DESC\` |
| \`DBA_TABLES.iot_type\` | \`IOT\`, \`IOT_OVERFLOW\`, \`IOT_MAPPING\`, vagy \`NULL\` (sima heap tábla) |
| \`DBA_PART_TABLES.partitioning_type\` | \`RANGE\`, \`LIST\`, \`HASH\` (és az összetettnél a \`subpartitioning_type\` is) |
| \`DBA_TABLESPACES.contents\` | \`PERMANENT\`, \`TEMPORARY\`, \`UNDO\` |

**„Nem rendszer-felhasználó”** a kurzus konvenciója szerint: \`owner NOT LIKE '%SYS%'\`, azaz a nevében nincs \`SYS\` (kiesik a \`SYS\`, \`SYSTEM\`, \`MDSYS\`, \`CTXSYS\`, \`AUDSYS\`, …).
**„Nem rendszer-tablespace”**: \`tablespace_name NOT LIKE 'SYS%'\` (kiesik a \`SYSTEM\` és a \`SYSAUX\`).

## Mértékegységek

| | bájt |
|-|------|
| 1 KiB | 1024 |
| 1 MiB | 1024 · 1024 = 1 048 576 |
| 1 GiB | 1024³ = 1 073 741 824 |
| 1 blokk (alapértelmezés) | 8 KiB = 8192 |
| 1 extent (kezdetben, ASSM + autoallocate) | 8 blokk = 64 KiB = 65 536 |

MiB-ra kerekítve: \`ROUND(SUM(bytes) / 1024 / 1024, 2)\`. Az Oracle-ben az osztás **nem egész osztás** (a \`NUMBER\` típus tizedest ad), tehát nem kell \`1.0\`-val szorozni.

## Hogyan dolgozz a leckékkel?

1. Olvasd el a definíciókat, és **írd ki magadnak kézzel** a félkövér fogalmakat (ez lesz a puskád alapja).
2. A lekérdezéseket **gépeld be** az SQL Developerbe (ne másold be!), és futtasd. A ZH-n is gépelni fogsz.
3. A „✍️ Gyakorold” feladatoknál előbb írd meg a saját megoldásodat, és csak utána nyisd ki a megoldást.
4. A papíros témáknál (B+ fa, hash, bitmap, RLE) **ténylegesen rajzolj** papírra. A ZH-n is ezt kell.

> Megjegyzés: a papíros feladatok (B+ fa, statikus, kiterjeszthető és lineáris hash, bitmap, RLE) minden megoldását egy szimulátorral is lefuttattam. Ez pontosan visszaadja az óra B+ fás példájának végállapotát is (\`04.pdf\`, 14. dia), tehát ugyanazt a vágási szabályt használja, mint az óra. Az SQL-megoldások a munkafüzetek hivatalos megoldásaira (\`1_megoldas.txt\` … \`3_megoldas.txt\`) és az Oracle katalógusnézeteinek oszlopaira épülnek. Futtasd le őket a laborszerveren, mert ott derül ki, milyen adatok vannak éppen az adatbázisban.`,
  },
  {
    slug: "rendszerkatalogus",
    title: `1. Rendszerkatalógus, SQL-eszköztár és PL/SQL alapok (1. óra)`,
    summary: `DBA_/ALL_/USER_ nézetek, objektumazonosítás és nagybetűs nevek, DUAL és SYNONYM, DBA_OBJECTS és DBA_TAB_COLUMNS; GROUP BY/HAVING, halmazműveletek, alkérdések, WITH, FETCH FIRST; tárolt eljárás FOR-ciklussal, DBMS_OUTPUT, SYS_REFCURSOR. Az 1. munkafüzet mind a 19 feladata megoldva.`,
    status: "complete",
    body: `## 1. Definíciók

> **Rendszerkatalógus (data dictionary):** csak olvasható táblák és nézetek halmaza, amelyek az adatbázis **objektumairól** (táblák, nézetek, indexek, triggerek, szekvenciák, felhasználók stb.) tárolnak metaadatot. Ugyanúgy kérdezhető le \`SELECT\`-tel, mint bármely más tábla.

A katalógus nézetei a **láthatóság** szerint háromféle előtaggal léteznek:

| Előtag | Mit tartalmaz | Ki éri el |
|--------|---------------|-----------|
| \`DBA_\` | az adatbázis **összes** objektumát | elvileg csak admin, **a laborszervereken mindenki** |
| \`ALL_\` | amihez az aktuális felhasználónak **hozzáférése** van | mindenki |
| \`USER_\` | csak az aktuális felhasználó **saját** objektumait (nincs \`owner\` oszlopa!) | mindenki |

Minden objektumtípusnak van saját nézete: \`DBA_OBJECTS\` (minden objektum), \`DBA_TABLES\`, \`DBA_INDEXES\`, \`DBA_VIEWS\`, \`DBA_TRIGGERS\`, \`DBA_SYNONYMS\`, \`DBA_USERS\`, \`DBA_TAB_COLUMNS\` stb.

> **Objektumazonosítás:** egy adatbázis-objektumot a **tulajdonos (owner) és a név (name) együtt** azonosít. Például \`LABOR.LAB01\` egy tábla, aminek a neve \`LAB01\`, a tulajdonosa \`LABOR\`. **A név önmagában nem egyedi azonosító.**

> **Nevek kis- és nagybetűi:** az Oracle a nevekben megkülönbözteti a kis- és nagybetűt, de idézőjel nélkül létrehozva a nevet **nagybetűsre alakítja**. A katalógusban ezért nagybetűvel kell keresni.

\`\`\`sql
CREATE TABLE test(o INTEGER);    -- a katalógusban: 'TEST'
CREATE TABLE "test"(o INTEGER);  -- a katalógusban: 'test'

SELECT * FROM dba_tables WHERE owner = 'LABOR' AND table_name = 'LAB01';   -- helyes
SELECT * FROM dba_tables WHERE owner = 'labor';                            -- 0 sor!
\`\`\`

Ha nem tudod, hogyan tárolódik a név, használd az \`UPPER\`-t: \`WHERE UPPER(table_name) = 'LAB01'\`. Vigyázz, ez **több sort** is visszaadhat (a \`"lab01"\` és a \`LAB01\` két külön tábla).

> **DUAL:** speciális tábla, **egy oszloppal és egy sorral**. Arra való, hogy konstanst vagy függvényértéket „táblaként” kérdezzünk le, mert az Oracle-ben minden \`SELECT\`-nek kell \`FROM\`: \`SELECT 1 FROM dual\`, \`SELECT DBMS_ROWID.ROWID_OBJECT('AAAS98AACAAAAY/AAR') FROM dual\`.

> **SYNONYM (szinonima):** egy másik objektumra mutató **álnév**. A szinonimának saját tulajdonosa van (nem az, akié a hivatkozott tábla). A **nyilvános (public) szinonimák** tulajdonosa a \`PUBLIC\` felhasználó. Ezért írhatsz \`dba_tables\`-t és \`dual\`-t \`SYS.\` nélkül: ezek \`PUBLIC\` szinonimák a \`SYS\` objektumaira. **Szinonima létrehozása nem ad hozzáférési jogot!**

A \`DBA_SYNONYMS\` oszlopai: \`owner\` (a szinonima tulajdonosa), \`synonym_name\`, \`table_owner\` és \`table_name\` (a hivatkozott objektum), \`db_link\`.

## 2. A két legfontosabb nézet oszlopai

**\`DBA_OBJECTS\`**: minden objektum, egy sor objektumonként (partíciónként is!):

| Oszlop | Jelentés |
|--------|----------|
| \`owner\`, \`object_name\` | tulajdonos és név |
| \`subobject_name\` | partíció neve (ha az objektum egy partíció) |
| \`object_type\` | \`TABLE\`, \`INDEX\`, \`VIEW\`, \`SYNONYM\`, \`TRIGGER\`, \`SEQUENCE\`, \`PROCEDURE\`, \`PACKAGE\`, \`TABLE PARTITION\`, \`INDEX PARTITION\`, … |
| \`object_id\` | az objektum (logikai) azonosítója |
| \`data_object_id\` | a **tárolási szegmens** azonosítója. Ha **NULL**, az objektumnak **nincs saját tárterülete** (nézet, szinonima, eljárás, vagy egy **particionált** tábla/index, aminek csak a partícióinak van tárhelye) |
| \`created\`, \`last_ddl_time\` | létrehozás és utolsó DDL ideje (\`DATE\`) |
| \`status\` | \`VALID\` / \`INVALID\` |

**\`DBA_TAB_COLUMNS\`**: a táblák (és nézetek) oszlopai:

| Oszlop | Jelentés |
|--------|----------|
| \`owner\`, \`table_name\`, \`column_name\` | melyik tábla melyik oszlopa |
| \`column_id\` | az oszlop **sorszáma** a táblában (1, 2, 3, …) |
| \`data_type\` | \`VARCHAR2\`, \`NUMBER\`, \`DATE\`, \`CHAR\`, \`CLOB\`, \`FLOAT\`, … |
| \`data_length\`, \`data_precision\`, \`data_scale\` | méret, pontosság |
| \`nullable\` | \`Y\` / \`N\` |
| \`default_length\`, \`data_default\` | az alapértelmezett érték hossza és szövege (\`NULL\`, ha nincs default) |

## 3. SQL-eszköztár: ezt kell biztosan tudnod

### A SELECT kiértékelési sorrendje

\`\`\`text
FROM / JOIN  →  WHERE  →  GROUP BY  →  HAVING  →  SELECT  →  ORDER BY  →  FETCH FIRST
\`\`\`

Ebből következik két fontos szabály:

* **A \`WHERE\` a sorokat szűri (csoportosítás előtt), a \`HAVING\` a csoportokat (aggregálás után).** Aggregátumra (\`COUNT\`, \`SUM\`) feltétel **csak \`HAVING\`-ben** állhat.
* **A \`SELECT\`-ben adott alias a \`WHERE\`-ben és a \`HAVING\`-ben még NEM használható**, csak az \`ORDER BY\`-ban. Ezért \`HAVING COUNT(*) < 20\`-at írj, ne \`HAVING index_count < 20\`-at, mert az utóbbi hibára fut.

### Aggregálás

* \`COUNT(*)\`: a sorok száma; \`COUNT(oszlop)\`: a nem-NULL értékek száma; \`COUNT(DISTINCT oszlop)\`: a különböző értékek száma.
* \`SUM\`, \`MIN\`, \`MAX\`, \`AVG\`, \`ROUND(x, 2)\`.
* **GROUP BY-szabály:** a \`SELECT\`-ben minden nem aggregált oszlopnak szerepelnie kell a \`GROUP BY\`-ban.

### Feltételes aggregálás: egy csoporton belül több számlálás

\`\`\`sql
SELECT owner,
       SUM(CASE WHEN object_type = 'TABLE' THEN 1 ELSE 0 END) AS table_count,
       SUM(CASE WHEN object_type = 'INDEX' THEN 1 ELSE 0 END) AS index_count
FROM   dba_objects
GROUP  BY owner;
\`\`\`

### Halmazműveletek

| Művelet | Jelentés |
|---------|----------|
| \`UNION\` | unió, **duplikátumok nélkül** |
| \`UNION ALL\` | unió, duplikátumokkal (gyorsabb) |
| \`INTERSECT\` | metszet |
| \`MINUS\` | különbség (Oracle-ben így hívják; máshol \`EXCEPT\`) |

Szabály: a két oldalnak **ugyanannyi és kompatibilis típusú oszlopa** legyen. Az \`ORDER BY\` csak **a legvégén**, egyszer állhat.

### Alkérdések, WITH, top-N

\`\`\`sql
-- IN / NOT IN alkérdés (vigyázz: NOT IN-nél, ha az alkérdés NULL-t ad, 0 sor jön!)
SELECT tablespace_name FROM dba_tablespaces
WHERE  tablespace_name NOT IN (SELECT tablespace_name FROM dba_data_files);

-- korrelált alkérdés (a belső lekérdezés a külső sorra hivatkozik)
SELECT u.username FROM dba_users u
WHERE  (SELECT COUNT(*) FROM dba_tables t WHERE t.owner = u.username) > 30;

-- WITH (Common Table Expression): elnevezett részeredmény
WITH idx AS (SELECT owner, COUNT(*) AS db FROM dba_indexes GROUP BY owner)
SELECT * FROM idx WHERE db < 20;

-- top-N (Oracle 12c+): ORDER BY után!
SELECT owner, COUNT(*) AS db FROM dba_tables
GROUP BY owner ORDER BY db DESC
FETCH FIRST 5 ROWS ONLY;
\`\`\`

### LIKE

\`%\` = tetszőleges hosszú szöveg, \`_\` = pontosan egy karakter. \`'%SYS%'\` = bárhol tartalmazza, \`'SYS%'\` = azzal kezdődik. A \`_\`-t keresni így kell: \`LIKE 'A\\_%' ESCAPE '\\'\`.

## 4. Az 1. munkafüzet feladatai, megoldással

Mindegyik feladatnál szögletes zárójelben van, milyen oszlopokat vár az eredmény.

**1.** Kik a tulajdonosai a \`DBA_TABLES\` nézetnek és a \`DUAL\` táblának? \`[owner, object_name, object_type]\`

\`\`\`sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  (object_name = 'DBA_TABLES' AND object_type = 'VIEW')
   OR  (object_name = 'DUAL'       AND object_type = 'TABLE');
\`\`\`
Mindkettő a \`SYS\`-é. (Az \`AND\` erősebben köt, mint az \`OR\`, de a zárójel biztonságosabb.)

**2.** Kik a tulajdonosai a \`DBA_TABLES\` és \`DUAL\` nevű **szinonimáknak**?

\`\`\`sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  object_name IN ('DBA_TABLES', 'DUAL') AND object_type = 'SYNONYM';
\`\`\`
Az eredmény: \`PUBLIC\`. Ezért érhetők el \`SYS.\` előtag nélkül.

**3.** A különböző objektumtípusok: \`SELECT DISTINCT object_type FROM dba_objects;\`

**4.** Az \`ORAUSER\` objektumtípusai: \`SELECT DISTINCT object_type FROM dba_objects WHERE owner = 'ORAUSER';\`

**5.** Hány különböző típus van? \`SELECT COUNT(DISTINCT object_type) AS counts FROM dba_objects;\`

**6–7.** Kinek van 10-nél több különböző típusú objektuma (csökkenő sorrendben, a számmal)?

\`\`\`sql
SELECT   owner, COUNT(DISTINCT object_type) AS object_type_counts
FROM     dba_objects
GROUP BY owner
HAVING   COUNT(DISTINCT object_type) > 10
ORDER BY object_type_counts DESC;
\`\`\`

**8.** Kinek van triggere **és** nézete is? Háromféle megoldás:

\`\`\`sql
-- (a) INTERSECT
SELECT owner FROM dba_objects WHERE object_type = 'VIEW'
INTERSECT
SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER';

-- (b) GROUP BY + HAVING
SELECT   owner FROM dba_objects
WHERE    object_type IN ('VIEW', 'TRIGGER')
GROUP BY owner
HAVING   COUNT(DISTINCT object_type) = 2;

-- (c) self-join
SELECT DISTINCT o1.owner
FROM   dba_objects o1 JOIN dba_objects o2 ON o1.owner = o2.owner
WHERE  o1.object_type = 'VIEW' AND o2.object_type = 'TRIGGER';
\`\`\`

**9.** Kinek van nézete, de **nincs** triggere?

\`\`\`sql
SELECT owner FROM dba_objects WHERE object_type = 'VIEW'
MINUS
SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER';

-- vagy anti-join:
SELECT DISTINCT owner FROM dba_objects
WHERE  object_type = 'VIEW'
  AND  owner NOT IN (SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER');
\`\`\`

**10.** Kinek van **több mint n** táblája, de **legfeljebb m** indexe? (pl. n = 20, m = 15)

⚠️ Csapda: a „legfeljebb m” a **0 indexet is** megengedi! Ha az index-tulajdonosokkal \`INTERSECT\`-et vagy \`INNER JOIN\`-t csinálsz, azok kiesnek, akiknek egyáltalán nincs indexük. Két helyes megoldás:

\`\`\`sql
-- (a) MINUS: a sok táblásokból vond ki azokat, akiknek TÚL SOK indexük van
SELECT owner FROM dba_objects WHERE object_type = 'TABLE'
GROUP BY owner HAVING COUNT(*) > 20
MINUS
SELECT owner FROM dba_objects WHERE object_type = 'INDEX'
GROUP BY owner HAVING COUNT(*) > 15;

-- (b) feltételes aggregálás egy menetben
SELECT owner
FROM   dba_objects
GROUP  BY owner
HAVING SUM(CASE WHEN object_type = 'TABLE' THEN 1 ELSE 0 END) > 20
   AND SUM(CASE WHEN object_type = 'INDEX' THEN 1 ELSE 0 END) <= 15;
\`\`\`

**11.** Mely objektumtípusoknak van tényleges tárhelye (adatblokkja)?
\`SELECT DISTINCT object_type FROM dba_objects WHERE data_object_id IS NOT NULL;\`

**12.** Melyeknek nincs? \`SELECT DISTINCT object_type FROM dba_objects WHERE data_object_id IS NULL;\`

**13.** Melyik típus van **mindkettőben**?

\`\`\`sql
SELECT object_type FROM dba_objects WHERE data_object_id IS NOT NULL
INTERSECT
SELECT object_type FROM dba_objects WHERE data_object_id IS NULL;
\`\`\`
Jellemzően \`TABLE\` és \`INDEX\` jön ki. **Magyarázat:** a **particionált** tábla vagy index maga csak **logikai** objektum (\`data_object_id\` NULL), a tárhelye a **partícióké** (\`TABLE PARTITION\`, saját \`data_object_id\`-val). Hasonló az **IOT** is: a tábla-objektumnak nincs saját szegmense, az adat az indexszegmensben van (7. lecke). A 9. leckében visszatérünk erre.

**14.** Hány oszlopa van a \`MINTA.EMP\` táblának?
\`SELECT COUNT(*) AS counts FROM dba_tab_columns WHERE owner = 'MINTA' AND table_name = 'EMP';\`

**15.** Mi a típusa a 6. oszlopnak?
\`SELECT data_type FROM dba_tab_columns WHERE owner = 'MINTA' AND table_name = 'EMP' AND column_id = 6;\`

**16.** Melyik táblának van \`Z\` betűvel kezdődő nevű oszlopa?
\`SELECT DISTINCT owner, table_name FROM dba_tab_columns WHERE UPPER(column_name) LIKE 'Z%';\`

**17.** Melyik táblának van legalább 8 \`DATE\` típusú oszlopa?

\`\`\`sql
SELECT   owner, table_name
FROM     dba_tab_columns
WHERE    data_type = 'DATE'
GROUP BY owner, table_name
HAVING   COUNT(*) >= 8;
\`\`\`

**18.** Melyik táblának \`VARCHAR2\` az 1. **és** a 4. oszlopa, default érték nélkül?

\`\`\`sql
SELECT owner, table_name FROM dba_tab_columns
WHERE  column_id = 1 AND data_type = 'VARCHAR2' AND default_length IS NULL
INTERSECT
SELECT owner, table_name FROM dba_tab_columns
WHERE  column_id = 4 AND data_type = 'VARCHAR2' AND default_length IS NULL;
\`\`\`
Miért nem jó egyetlen \`WHERE column_id = 1 AND column_id = 4\`? Mert egy **sor** egyszerre nem lehet 1. és 4. oszlop. A két feltétel **két különböző sorra** vonatkozik, ezért kell a metszet (vagy egy self-join, vagy \`GROUP BY\` + \`HAVING COUNT(*) = 2\` a \`column_id IN (1, 4)\` sorokon).

[[feladat:0,1,2]]

## 5. PL/SQL: tárolt eljárások

> **PL/SQL:** az Oracle procedurális nyelve. A **tárolt eljárás** az adatbázis része lesz, **a szerveren** (az adatbázismotorban) fut, az adatbázis biztonsági környezetében, **tranzakcionálisan**. Nincs hálózati késleltetés és kliens–szerver forgalom, ha nagy táblák sorain iterál.

Mire jó: SQL-ben nehezen kifejezhető műveletekre, **dinamikus SQL** (szövegként összerakott lekérdezés) futtatására, és szerveroldali üzleti logikára (validálás, naplózás).

### A váz, amit kívülről kell tudnod

\`\`\`sql
CREATE OR REPLACE PROCEDURE eljaras_neve (
    p_owner VARCHAR2,               -- paraméter: méret NÉLKÜL!
    p_name  IN VARCHAR2             -- az IN az alapértelmezés
) IS
    v_count  NUMBER;                -- lokális változók az IS és a BEGIN között
    v_name   dba_objects.object_name%TYPE;   -- "olyan típusú, mint az oszlop"
BEGIN
    -- 1) egysoros lekérdezés változóba (pontosan 1 sort kell adnia!)
    SELECT COUNT(*) INTO v_count FROM dba_tables WHERE owner = UPPER(p_owner);

    -- 2) kurzoros FOR-ciklus: a lekérdezés minden során végigmegy
    FOR rec IN (
        SELECT table_name FROM dba_tables WHERE owner = UPPER(p_owner)
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.table_name);   -- rec.oszlopnév
    END LOOP;

    -- 3) számlálós ciklus és elágazás
    FOR i IN 1 .. 3 LOOP
        IF v_count > 10 THEN
            DBMS_OUTPUT.PUT_LINE('sok: ' || v_count);   -- || = szövegösszefűzés
        ELSE
            DBMS_OUTPUT.PUT_LINE('kevés');
        END IF;
    END LOOP;
END;
/
\`\`\`

Futtatás SQL Developerben:

\`\`\`sql
SET SERVEROUTPUT ON;           -- enélkül nem látszik a DBMS_OUTPUT!
EXEC eljaras_neve('minta', 'emp');
-- a házik ellenőrzése:
EXECUTE check_plsql('eljaras_neve(''minta'', ''emp'')');
\`\`\`

Fontos részletek:

* \`SELECT … INTO\` **pontosan egy** sort várhat. Ha 0 sor jön, \`NO_DATA_FOUND\`, ha több, \`TOO_MANY_ROWS\` hibát dob. Aggregátummal (\`COUNT\`, \`SUM\`) mindig pontosan 1 sor jön. A \`SUM\` 0 sorra \`NULL\`-t ad, ezért \`NVL(SUM(bytes), 0)\`.
* Értékadás: \`v := 5;\`. Összehasonlítás: \`=\`.
* Stringben az aposztróf duplázva: \`'It''s'\`, és ezért \`check_plsql('f(''minta'')')\`.
* Dátum formázása: \`TO_CHAR(created, 'yyyy.mm.dd.hh24:mi')\` (\`hh\` = 12 órás, \`hh24\` = 24 órás).
* **A paramétert a felhasználó kisbetűvel is megadhatja** (\`'minta'\`), ezért a katalógusban \`UPPER(p_owner)\`-rel keress.

> **A \`DBMS_OUTPUT.PUT_LINE\` csak hibakeresésre való**, nem adatküldésre. Az üzenet szövegként megy a kliensnek, nem típusos adatként. Valódi alkalmazásban az eljárás **skalár értéket** vagy **kurzort** ad vissza, ezt a kliens soronként be tudja olvasni.

### Kurzor visszaadása (\`OUT SYS_REFCURSOR\`)

\`\`\`sql
CREATE OR REPLACE PROCEDURE table_find(p_kar VARCHAR2, res OUT SYS_REFCURSOR) IS
BEGIN
    OPEN res FOR
        SELECT owner, table_name FROM dba_tables
        WHERE  UPPER(table_name) LIKE UPPER(p_kar) || '%';
END;
/

VAR x REFCURSOR;
EXEC table_find('Z', :x);
PRINT x;
\`\`\`

### A 19. feladat: \`table_print\`

Írj eljárást, ami kiírja azoknak a tábláknak a tulajdonosát és nevét, amelyek neve a paraméterrel **kezdődik**, kis- és nagybetűtől függetlenül.

\`\`\`sql
CREATE OR REPLACE PROCEDURE table_print(p_kar VARCHAR2) IS
BEGIN
    FOR rec IN (
        SELECT owner, table_name FROM dba_tables
        WHERE  UPPER(table_name) LIKE UPPER(p_kar) || '%'
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.owner || '-' || rec.table_name);
    END LOOP;
END;
/
SET SERVEROUTPUT ON;
EXEC table_print('Z');
\`\`\`
A \`LIKE UPPER(p_kar) || '%'\` kifejezésben a \`||\` erősebben köt, mint a \`LIKE\`, tehát a minta \`'Z%'\` lesz.

[[feladat:3,4,5]]`,
    exercises: [
      {
        prompt: `Írj lekérdezést: melyik felhasználónak van **pontosan 1** nézete (\`VIEW\`), csökkenő név szerint rendezve? \`[owner]\``,
        hint: `\`WHERE object_type = 'VIEW'\`, \`GROUP BY owner\`, \`HAVING COUNT(*) = 1\`, \`ORDER BY owner DESC\`.`,
        solution: `\`\`\`sql
SELECT   owner
FROM     dba_objects
WHERE    object_type = 'VIEW'
GROUP BY owner
HAVING   COUNT(*) = 1
ORDER BY owner DESC;
\`\`\`
A \`WHERE\` előbb kiszűri a nem-nézet sorokat, a \`HAVING\` utána a csoportokat.`,
      },
      {
        prompt: `Mi a hiba ebben a lekérdezésben, és hogyan javítod?
\`\`\`sql
SELECT owner, COUNT(*) AS cnt FROM dba_tables
WHERE cnt > 30
GROUP BY owner;
\`\`\``,
        hint: `Két dolog: hol lehet aggregátumra szűrni, és mikor létezik már az alias?`,
        solution: `(1) Aggregátumra (\`COUNT(*)\`) **nem lehet a \`WHERE\`-ben** szűrni, mert a \`WHERE\` a csoportosítás **előtt** fut. (2) A \`cnt\` alias a \`WHERE\`-ben (és a \`HAVING\`-ben) **még nem létezik**. Javítva:
\`\`\`sql
SELECT   owner, COUNT(*) AS cnt
FROM     dba_tables
GROUP BY owner
HAVING   COUNT(*) > 30;
\`\`\``,
      },
      {
        prompt: `Melyik halmazművelettel kapod meg Oracle-ben azokat, akiknek van indexük, de nincs triggerük? (Egy kulcsszó.)`,
        hint: `Nem \`EXCEPT\` (az a szabványos SQL / MSSQL neve).`,
        answer: [`MINUS`],
        check: "text",
        solution: `**MINUS**:
\`\`\`sql
SELECT owner FROM dba_objects WHERE object_type = 'INDEX'
MINUS
SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER';
\`\`\``,
      },
      {
        prompt: `Írj PL/SQL eljárást \`count_types(p_owner VARCHAR2)\` néven, amely kiírja a felhasználó objektumtípusait és darabszámukat \`TÍPUS: darab\` formában, darabszám szerint csökkenően. A paraméter kisbetűs is lehet!`,
        hint: `\`FOR rec IN (SELECT object_type, COUNT(*) AS db FROM dba_objects WHERE owner = UPPER(p_owner) GROUP BY object_type ORDER BY db DESC) LOOP … END LOOP;\`. Az aggregált oszlopnak adj aliast, különben nem tudsz rá hivatkozni a \`rec\`-en keresztül!`,
        solution: `\`\`\`sql
CREATE OR REPLACE PROCEDURE count_types(p_owner VARCHAR2) IS
BEGIN
    FOR rec IN (
        SELECT   object_type, COUNT(*) AS db
        FROM     dba_objects
        WHERE    owner = UPPER(p_owner)
        GROUP BY object_type
        ORDER BY db DESC
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.object_type || ': ' || rec.db);
    END LOOP;
END;
/
SET SERVEROUTPUT ON;
EXEC count_types('minta');
\`\`\`
Az alias (\`db\`) kötelező: egy \`COUNT(*)\` kifejezésre a \`rec\`-en keresztül nem lehetne hivatkozni.`,
      },
      {
        prompt: `Mi a különbség a két hívás eredménye között, és miért? \`EXEC table_print('z');\` illetve egy olyan változat, amiben \`WHERE table_name LIKE p_kar || '%'\` áll (\`UPPER\` nélkül).`,
        solution: `Az \`UPPER\` nélküli változat \`'z%'\` mintával keres, de a táblanevek a katalógusban **nagybetűsek** (idézőjel nélkül létrehozva), ezért szinte **semmit sem talál**. Az \`UPPER(table_name) LIKE UPPER(p_kar) || '%'\` mindkét oldalt nagybetűsíti, így a kis- és nagybetű nem számít.`,
      },
      {
        prompt: `Egy \`SELECT … INTO v_x FROM …\` utasítás a futáskor \`ORA-01403: no data found\` hibát ad. Mit jelent, és hogyan kerülöd el egy összeg lekérdezésénél?`,
        solution: `A lekérdezés **0 sort** adott, a \`SELECT INTO\` pedig pontosan egyet vár. Összegnél, számlálásnál használj **aggregátumot**: az mindig pontosan 1 sort ad, még üres halmazra is. Az üres halmaz \`SUM\`-ja \`NULL\`, ezt \`NVL\`-lel cseréld 0-ra:
\`\`\`sql
SELECT NVL(SUM(bytes), 0) INTO v_size
FROM   dba_segments
WHERE  owner = UPPER(p_owner) AND segment_name = UPPER(p_table);
\`\`\``,
      },
    ],
  },
  {
    slug: "tarolas-storage",
    title: `2. Tárolás: tablespace, data file, segment, extent, block (2. óra)`,
    summary: `A fizikai tárolás hierarchiája definíciókkal (02_storage.pdf), a DBA_TABLESPACES / DATA_FILES / TEMP_FILES / SEGMENTS / EXTENTS / FREE_SPACE nézetek oszlopai, a 2. munkafüzet mind a 15 feladata megoldva (a newest_table házival együtt). Ez kell a ZH 2., 3. és 5. feladatához.`,
    status: "complete",
    body: `## 1. Definíciók (02_storage.pdf + 02.sql)

> **Data file (adatfájl):** az operációs rendszer által kezelt fájl a lemezen (\`.dbf\`). Blokkeszköz → fájlrendszer → fájl. A DBMS **nem** szabja meg, hol van a fájl a lemezen. A fájlok általában **előre lefoglalt méretűek**, hogy a fájlrendszer ne fragmentálódjon. Automatikusan is nőhetnek (autoextend), de ez fragmentációhoz vezethet.

> **Tablespace (táblatér; MSSQL-ben file group):** **egy vagy több data file** logikai gyűjteménye. Új fájl hozzáadásával bővíthető. A DBMS az egy tablespace-hez tartozó fájlokat nagyjából **egyenletesen** tölti. **A táblákat és indexeket tablespace-hez rendeljük, nem egyes fájlokhoz.** Az ideiglenes (\`TEMPORARY\`) tablespace fájljai **temp file-ok**: ezek a \`DBA_TEMP_FILES\`-ban vannak, **nem** a \`DBA_DATA_FILES\`-ban.

> **Segment (szegmens):** egy tárhelyet igénylő adatobjektum (tábla, index, IOT, partíció, LOB, overflow) **tárterülete**. Logikai fogalom. Egy egyszerű tábla vagy index **egy** szegmens, a **particionált tábla partíciónként egy-egy** szegmensből áll. Minden szegmens **pontosan egy tablespace-hez** tartozik, így szabályozzuk a fizikai elhelyezést.

> **Extent:** **összefüggő** blokkok csoportja **egy data file-on belül**. Az extent egy szegmenshez tartozik (az összes blokkja ugyanahhoz). Tipikusan **8 blokk = 64 KiB**. Az I/O és a helyfoglalás egysége.

> **Block (blokk; MSSQL-ben page):** a tárolás legkisebb egysége, **fix méretű** (alapból **8 KiB**). Elég nagy néhány sornak, de kicsi a hatékony I/O-hoz, ezért foglal a DBMS extentenként.

A hierarchia és a kapcsolatok:

\`\`\`text
TABLESPACE  1 ── *  DATA FILE                      (egy tablespace több fájlból áll)
TABLESPACE  1 ── *  SEGMENT                        (a szegmens EGY tablespace-ben van)
SEGMENT     1 ── *  EXTENT                         (a szegmens extentekből áll)
EXTENT      * ── 1  DATA FILE                      (az extent EGY fájlon belül összefüggő)
EXTENT      1 ── *  BLOCK                          (az extent összefüggő blokkok sorozata)
\`\`\`

**Fontos következmények (tételek, amiket használni fogsz):**

1. **A segment a tablespace-hez kötődik, az extent közvetlenül a data file-hoz.** Ezért ha fájlszintű kérdés van (melyik fájlban mennyi hely van foglalva, melyik tábla melyik fájlban van), a \`DBA_EXTENTS\` + \`DBA_DATA_FILES\` párost kell használni, a kapcsolat a **\`file_id\`**.
2. **Egy fájlban sok szegmens extentjei lehetnek**, és **egy szegmens több fájlra is szétterülhet**, ha a tablespace több fájlból áll. (Ez **nem** particionálás! Particionáláskor a partíciók külön szegmensek, akár külön tablespace-ben.)
3. **Egy fájl foglalt (használt) mérete** = a benne lévő extentek méretének összege. A maradék a szabad hely (\`DBA_FREE_SPACE\`).
4. **Egy szegmens mérete** = az extentjei méretének összege (\`DBA_SEGMENTS.bytes = SUM(DBA_EXTENTS.bytes)\` szegmensenként).
5. A **foglalt** blokkok (extentekben) nem mind tartalmaznak sort. A **ténylegesen használt** blokkokat a ROWID-ból lehet megszámolni (3. lecke).

Miért kicsik a blokkok? Mert a relációs elérés jellemzően **indexen (B+-fán) keresztül**, véletlenszerűen olvas kis darabokat, nem szekvenciálisan az egész fájlt.

**Blokk- és extentfoglalás** (02_storage.pdf): új **blokk** kell, ha egy heap tábla végére új sor kerül, vagy egy B+-fában **lapvágás** (page split) történik. Ezt egy meglévő extent szabad blokkjából kapja. Új **extent** kell, ha a meglévő extentekben már nincs üres blokk. Az új blokk **mindig előbb a fájlban foglalódik le**, mert a DBMS mutatói (ROWID) **fizikai fájlbeli helyekre** mutatnak, nem memóriacímre. Egy objektum blokkjai alapból **tetszőleges sorrendben** vannak a fájlban.

## 2. A nézetek és oszlopaik

| Nézet | Fontos oszlopok |
|-------|-----------------|
| \`DBA_TABLESPACES\` | \`tablespace_name\`, \`block_size\`, \`contents\` (PERMANENT/TEMPORARY/UNDO), \`extent_management\`, \`allocation_type\`, \`segment_space_management\` (AUTO = ASSM) |
| \`DBA_DATA_FILES\` | \`file_name\` (teljes útvonal!), \`file_id\`, \`relative_fno\`, \`tablespace_name\`, \`bytes\`, \`blocks\`, \`autoextensible\`, \`maxbytes\` |
| \`DBA_TEMP_FILES\` | ugyanezek a temp fájlokra |
| \`DBA_SEGMENTS\` | \`owner\`, \`segment_name\`, \`partition_name\`, \`segment_type\`, \`tablespace_name\`, \`header_file\`, \`header_block\`, \`bytes\`, \`blocks\`, \`extents\` |
| \`DBA_EXTENTS\` | \`owner\`, \`segment_name\`, \`partition_name\`, \`segment_type\`, \`tablespace_name\`, \`extent_id\`, \`file_id\`, \`block_id\` (az **első** blokk száma), \`bytes\`, \`blocks\`, \`relative_fno\` |
| \`DBA_FREE_SPACE\` | \`tablespace_name\`, \`file_id\`, \`block_id\`, \`bytes\`, \`blocks\` (egy sor = egy összefüggő szabad darab) |

Az extent blokkjai: \`block_id\`, \`block_id + 1\`, …, \`block_id + blocks − 1\`.

> **Szegmens nélküli tábla:** \`CREATE TABLE … SEGMENT CREATION DEFERRED\` (és alapból is így van az újabb Oracle-ben) esetén a tábla az **első sor beszúrásáig nem kap szegmenst**. A \`DBA_TABLES\`-ban ott van, a \`DBA_SEGMENTS\`-ben még nincs. Ezért kell az \`NVL(SUM(bytes), 0)\`.

## 3. A 2. munkafüzet feladatai, megoldással

**1.** Tablespace-ek a blokkmérettel. \`[tablespace_name, block_size]\`
\`\`\`sql
SELECT tablespace_name, block_size FROM dba_tablespaces;
\`\`\`

**2.** A \`USERS\` tablespace fájljai. \`[file_name, bytes]\`
\`\`\`sql
SELECT file_name, bytes FROM dba_data_files WHERE tablespace_name = 'USERS';
\`\`\`

**3.** Van olyan tablespace, aminek nincs fájlja a \`DBA_DATA_FILES\`-ban? Hol vannak az adatai?
\`\`\`sql
SELECT tablespace_name FROM dba_tablespaces
WHERE  tablespace_name NOT IN (SELECT tablespace_name FROM dba_data_files);
\`\`\`
Ez a **\`TEMP\`** (ideiglenes) tablespace, a fájljai a **\`DBA_TEMP_FILES\`**-ban vannak.

**4.** Az összes fájl (temp is), méret szerint csökkenőn. \`[file_name, bytes]\`
\`\`\`sql
SELECT file_name, bytes FROM dba_data_files
UNION ALL
SELECT file_name, bytes FROM dba_temp_files
ORDER BY bytes DESC;
\`\`\`
\`UNION ALL\`, mert két különböző fájl nem duplikátum. Az \`ORDER BY\` a legvégén áll, egyszer.

**5.** Tablespace-enként a fájlok száma és az összméret, a temp fájlokkal együtt. \`[tablespace_name, file_count, total_bytes]\`
\`\`\`sql
SELECT   tablespace_name, COUNT(*) AS file_count, SUM(bytes) AS total_bytes
FROM     (SELECT tablespace_name, bytes FROM dba_data_files
          UNION ALL
          SELECT tablespace_name, bytes FROM dba_temp_files)
GROUP BY tablespace_name;
\`\`\`
Előbb összefűzzük a két fájllistát, utána csoportosítunk. (A hivatalos megoldás két \`GROUP BY\`-t \`UNION ALL\`-oz, az is helyes.)

**6.** Nem rendszer-tábla szegmensek az extentszámmal, méret szerint csökkenőn (sem \`SYS%\` tablespace, sem \`SYS\` tulajdonos). \`[owner, segment_name, tablespace_name, bytes, extents]\`
\`\`\`sql
SELECT   owner, segment_name, tablespace_name, bytes, extents
FROM     dba_segments
WHERE    segment_type = 'TABLE'
  AND    tablespace_name NOT LIKE 'SYS%'
  AND    owner <> 'SYS'
ORDER BY bytes DESC;
\`\`\`
A \`segment_type = 'TABLE'\` egyben **kizárja a partíciókat** (azok \`TABLE PARTITION\` típusúak).

**7.** A **legnagyobb indexszegmens** és a blokkjainak száma. \`[owner, segment_name, blocks]\`
\`\`\`sql
-- (a) FETCH FIRST
SELECT owner, segment_name, blocks FROM dba_segments
WHERE  segment_type = 'INDEX'
ORDER  BY bytes DESC
FETCH  FIRST 1 ROWS ONLY;

-- (b) MAX alkérdéssel (holtversenynél mindet adja)
SELECT owner, segment_name, blocks FROM dba_segments
WHERE  segment_type = 'INDEX'
  AND  bytes = (SELECT MAX(bytes) FROM dba_segments WHERE segment_type = 'INDEX');
\`\`\`

**8.** Fájlonként a méret, a foglalt hely és a foglaltság %-a. \`[file_name, bytes, used_bytes, used_percent]\`
\`\`\`sql
SELECT   f.file_name, f.bytes,
         SUM(e.bytes) AS used_bytes,
         ROUND(SUM(e.bytes) / f.bytes * 100, 2) AS used_percent
FROM     dba_extents e
JOIN     dba_data_files f ON e.file_id = f.file_id
GROUP BY f.file_name, f.bytes;
\`\`\`
Az \`f.bytes\` azért kell a \`GROUP BY\`-ba, mert nem aggregált oszlop a \`SELECT\`-ben. Ha az **üres** fájlokat is látni akarod: \`FROM dba_data_files f LEFT JOIN dba_extents e ON …\`, és \`NVL(SUM(e.bytes), 0)\`.

**9.** A két legtöbb helyet foglaló nem rendszer-felhasználó. \`[owner, total_bytes]\`
\`\`\`sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 2 ROWS ONLY;
\`\`\`
\`DBA_EXTENTS\`-ből ugyanez jön ki, mert a szegmens mérete az extentjei összege.

**10.** Hány **index**-extent van a \`users02.dbf\` fájlban, és mekkora az összméretük? \`[extent_count, total_bytes]\`
\`\`\`sql
SELECT COUNT(*) AS extent_count, SUM(e.bytes) AS total_bytes
FROM   dba_extents e
JOIN   dba_data_files f ON f.file_id = e.file_id
WHERE  f.file_name LIKE '%/users02.dbf'
  AND  e.segment_type = 'INDEX';
\`\`\`
A \`file_name\` **teljes útvonal**, ezért \`LIKE '%/users02.dbf'\`, nem \`=\`.

**11.** A \`users02.dbf\` szabad (fel nem foglalt) összefüggő darabjai. \`[free_chunk_count, total_free_bytes]\`
\`\`\`sql
SELECT COUNT(*) AS free_chunk_count, SUM(fs.bytes) AS total_free_bytes
FROM   dba_free_space fs
JOIN   dba_data_files f ON f.file_id = fs.file_id
WHERE  f.file_name LIKE '%users02.dbf';
\`\`\`

**12.** Van-e a \`MINTA\`-nak **több fájlra szétterülő** táblája? (aramis) \`[segment_name, file_count]\`
\`\`\`sql
SELECT   segment_name, COUNT(DISTINCT file_id) AS file_count
FROM     dba_extents
WHERE    owner = 'MINTA' AND segment_type = 'TABLE'
GROUP BY segment_name
HAVING   COUNT(DISTINCT file_id) > 1;
\`\`\`
A \`COUNT(DISTINCT file_id)\` a kulcs: egy fájlban sok extent is lehet, minket a **különböző fájlok** száma érdekel.

**13.** Egy ilyen tábla (pl. \`HALLGATOK\`) fájljai. \`[file_name]\`
\`\`\`sql
SELECT DISTINCT f.file_name
FROM   dba_extents e JOIN dba_data_files f ON e.file_id = f.file_id
WHERE  e.owner = 'MINTA' AND e.segment_name = 'HALLGATOK';
\`\`\`

**14.** Melyik tablespace-ben van az \`ORAUSER.DOLGOZO\`, és a \`MINTA.ELADASOK\`? (ullman)
\`\`\`sql
SELECT segment_name, partition_name, tablespace_name
FROM   dba_segments
WHERE  (owner = 'ORAUSER'  AND segment_name = 'DOLGOZO')
   OR  (owner = 'MINTA' AND segment_name = 'ELADASOK');
\`\`\`
A \`DBA_TABLES.tablespace_name\` a \`DOLGOZO\`-nál kitöltött, de az \`ELADASOK\`-nál **NULL**. Az \`ELADASOK\` ugyanis **particionált**: maga a tábla csak logikai objektum, a partíciói külön szegmensek, akár **különböző tablespace-ekben**. Ezért a \`DBA_SEGMENTS\`-ből (vagy a \`DBA_TAB_PARTITIONS\`-ből) kell kiolvasni.

**15. (házi)** \`newest_table(p_user)\`: a felhasználó legutóbb létrehozott táblájának neve, mérete és létrehozási ideje, ebben a formában: \`Table_name: NNNNNN   Size: SSSSSS bytes   Created: yyyy.mm.dd.hh:mi\`
\`\`\`sql
CREATE OR REPLACE PROCEDURE newest_table(p_user VARCHAR2) IS
    v_name    dba_objects.object_name%TYPE;
    v_created dba_objects.created%TYPE;
    v_size    NUMBER;
BEGIN
    SELECT object_name, created INTO v_name, v_created
    FROM  (SELECT object_name, created
           FROM   dba_objects
           WHERE  owner = UPPER(p_user)
             AND  object_type = 'TABLE'
             AND  object_name NOT LIKE 'BIN$%'      -- lomtár (recycle bin) kihagyása
           ORDER  BY created DESC)
    WHERE ROWNUM = 1;

    SELECT NVL(SUM(bytes), 0) INTO v_size            -- szegmens nélküli táblára 0
    FROM   dba_segments
    WHERE  owner = UPPER(p_user) AND segment_name = v_name
      AND  segment_type LIKE 'TABLE%';              -- partíciók is

    DBMS_OUTPUT.PUT_LINE('Table_name: ' || v_name ||
                         '   Size: ' || v_size || ' bytes' ||
                         '   Created: ' || TO_CHAR(v_created, 'yyyy.mm.dd.hh:mi'));
END;
/
\`\`\`
Tanulságok: a **\`ROWNUM = 1\` csak a belső, már rendezett alkérdésen** ad helyes eredményt (a \`ROWNUM\` a rendezés előtt számozódik). Szegmens nélküli táblánál \`NVL(…, 0)\` kell. Particionált táblánál \`segment_type LIKE 'TABLE%'\` adja össze a partíciókat. A teszt: \`CREATE TABLE t_without_segment(o INT) SEGMENT CREATION DEFERRED;\` után 0 bájtot kell kiírnia, egy \`INSERT\` után pedig már nem nullát.

[[feladat:0,1,2,3]]

## 4. Kapcsolat a ZH-val

* **ZH 2. feladat** (15 p): \`DBA_SEGMENTS\`, szűrés \`owner\`-re, \`GROUP BY segment_name\`, \`SUM(bytes)\` MiB-ra kerekítve, \`SUM(extents)\`, \`HAVING\` a minimum extentszámra. Teljes megoldás a 10. leckében.
* **ZH 3. feladat** (15 p): „regular table segments only” = \`segment_type = 'TABLE'\`, \`GROUP BY owner\`, top 10 \`FETCH FIRST\`.
* **ZH 5. feladat** (30 p): a legkisebb fájl \`DBA_DATA_FILES\`-ból (amiben **van** tábla-extent!), utána a legnagyobb tábla benne \`DBA_EXTENTS\`-ből \`file_id\`-re szűrve.

[[feladat:4,5]]`,
    exercises: [
      {
        prompt: `Írj lekérdezést, amely tablespace-enként megadja a **szabad** helyet MiB-ban, két tizedesre kerekítve, csökkenő sorrendben! \`[tablespace_name, free_mib]\``,
        hint: `\`DBA_FREE_SPACE\`, \`GROUP BY tablespace_name\`, \`ROUND(SUM(bytes)/1024/1024, 2)\`.`,
        solution: `\`\`\`sql
SELECT   tablespace_name, ROUND(SUM(bytes) / 1024 / 1024, 2) AS free_mib
FROM     dba_free_space
GROUP BY tablespace_name
ORDER BY free_mib DESC;
\`\`\``,
      },
      {
        prompt: `Melyik nézetből tudod meg, hogy egy **tábla extentjei melyik fájl(ok)ban** vannak, és melyik oszlop köti össze a fájlok nézetével?`,
        solution: `A **\`DBA_EXTENTS\`**-ből (az extent közvetlenül fájlhoz kötődik, a szegmens csak tablespace-hez). A kapcsoló oszlop a **\`file_id\`**: \`JOIN dba_data_files f ON e.file_id = f.file_id\`.`,
      },
      {
        prompt: `Írj lekérdezést: a \`MINTA\` felhasználó **index**szegmenseinek száma és összmérete tablespace-enként. \`[tablespace_name, index_count, total_bytes]\``,
        solution: `\`\`\`sql
SELECT   tablespace_name, COUNT(*) AS index_count, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    owner = 'MINTA' AND segment_type = 'INDEX'
GROUP BY tablespace_name;
\`\`\`
Ha a particionált indexeket is bele akarod venni: \`segment_type IN ('INDEX', 'INDEX PARTITION', 'INDEX SUBPARTITION')\` vagy \`segment_type LIKE 'INDEX%'\`.`,
      },
      {
        prompt: `Igaz vagy hamis? „Egy tábla összes extentje mindig ugyanabban a data file-ban van.” Indokold!`,
        solution: `**Hamis.** A szegmens egy **tablespace**-hez tartozik, és ha a tablespace több data file-ból áll, a DBMS a fájlokat nagyjából egyenletesen tölti, így egy tábla extentjei **több fájlban** is lehetnek (a 2. munkafüzet 12. feladata pont ezt keresi). Egy **extent** viszont mindig egy fájlon belül, összefüggően van.`,
      },
      {
        prompt: `Írj lekérdezést: melyik data file-ban van a **legtöbb különböző szegmens** extentje? \`[file_name, segment_count]\``,
        hint: `Szegmenst a \`(owner, segment_name, partition_name)\` hármas azonosít. \`COUNT(DISTINCT …)\` több oszlopra Oracle-ben nem megy közvetlenül, használj alkérdést \`DISTINCT\`-tel, vagy fűzd össze őket.`,
        solution: `\`\`\`sql
SELECT   f.file_name, COUNT(*) AS segment_count
FROM     (SELECT DISTINCT file_id, owner, segment_name, partition_name
          FROM dba_extents) e
JOIN     dba_data_files f ON f.file_id = e.file_id
GROUP BY f.file_name
ORDER BY segment_count DESC
FETCH FIRST 1 ROWS ONLY;
\`\`\``,
      },
      {
        prompt: `A \`LABOR\` felhasználó szegmenseinek összmérete MiB-ban, két tizedesre kerekítve, **szegmenstípusonként**, csak azok a típusok, ahol legalább 2 szegmens van. \`[segment_type, seg_count, total_mib]\``,
        solution: `\`\`\`sql
SELECT   segment_type, COUNT(*) AS seg_count,
         ROUND(SUM(bytes) / 1024 / 1024, 2) AS total_mib
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY segment_type
HAVING   COUNT(*) >= 2;
\`\`\``,
      },
    ],
  },
  {
    slug: "rowid-blokkok",
    title: `3. ROWID, DBMS_ROWID, foglalt és használt blokkok (3. óra)`,
    summary: `A ROWID definíciója és formátuma (base64 dekódolással), a DBMS_ROWID függvények, a foglalt (extent) és a ténylegesen használt (ROWID) blokkok különbsége, PCTFREE és ASSM, a num_of_rows eljárás és rekurzív WITH, EXCEPTIONS INTO. A 3. munkafüzet összes feladata megoldva. Ez kell a ZH 5. feladatához (30 pont).`,
    status: "complete",
    body: `## 1. Definíciók

> **Mutató (pointer) az RDBMS-ben:** mindig egy **fájlon belüli fizikai helyre** mutat, és **egyértelműen azonosít egy fizikai sort**. Nem memóriacím, mint a C nyelvben. Mivel a lefoglalt blokkok nem mozognak, a mutatókat nem kell frissíteni.

> **ROWID:** az Oracle **ál-oszlopa (pseudocolumn)**, ami a sor fizikai címe. Minden heap tábla minden sorának van ilyenje, \`SELECT ROWID, t.* FROM t\` adja vissza. Az indexek levelei ezt tárolják mutatóként.

A ROWID egy **18 karakteres** szöveg, **base64** kódolással, a formátuma:

\`\`\`text
OOOOOO  FFF  BBBBBB  RRR
  │      │     │      └─ row number:  a sor sorszáma a blokkon belül (0-tól)
  │      │     └──────── block number: a blokk sorszáma a fájlon belül
  │      └────────────── relative file number: a fájl RELATÍV száma a tablespace-en belül
  └───────────────────── data object id: a szegmens (adatobjektum) azonosítója
\`\`\`

**Base64 ábécé:** \`A–Z\` → 0–25, \`a–z\` → 26–51, \`0–9\` → 52–61, \`+\` → 62, \`/\` → 63. Minden csoport egy 64-es számrendszerbeli szám.

**Példa** (a 3. munkafüzetből): \`AAAS98AACAAAAY/AAR\`

| Rész | Karakterek | Érték |
|------|-----------|-------|
| objektum | \`AAAS98\` | S = 18, 9 = 61, 8 = 60 → 18·64² + 61·64 + 60 = **77692** |
| fájl | \`AAC\` | C = 2 → **2** |
| blokk | \`AAAAY/\` | Y = 24, / = 63 → 24·64 + 63 = **1599** |
| sor | \`AAR\` | R = 17 → **17** |

Nem kell kézzel dekódolni, erre van a **\`DBMS_ROWID\`** csomag:

| Függvény | Mit ad vissza | Mivel joinolod |
|----------|---------------|----------------|
| \`DBMS_ROWID.ROWID_OBJECT(ROWID)\` | data object id | \`DBA_OBJECTS.data_object_id\` |
| \`DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID)\` | relatív fájlszám | \`DBA_DATA_FILES.relative_fno\` |
| \`DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)\` | blokkszám a fájlban | \`DBA_EXTENTS.block_id … block_id + blocks − 1\` |
| \`DBMS_ROWID.ROWID_ROW_NUMBER(ROWID)\` | sorszám a blokkban | |

> **Relatív és abszolút fájlszám:** a ROWID-ban a **relatív** fájlszám van (a tablespace-en belüli sorszám). A \`DBA_DATA_FILES\`-ban két oszlop van: \`file_id\` (abszolút, az egész adatbázisban egyedi) és \`relative_fno\`. A ROWID-ot a \`relative_fno\`-val kell joinolni. A laborszervereken a kettő általában megegyezik, de a helyes join a \`relative_fno\`, és ha több tablespace is szóba jöhet, a \`tablespace_name\` is.

> **Foglalt és használt blokk:**
> * **foglalt (allocated)** = a szegmens extentjeiben lévő összes blokk (\`DBA_SEGMENTS.blocks\` = \`SUM(DBA_EXTENTS.blocks)\`). Ezeket más tábla **nem kaphatja meg**.
> * **használt (used)** = azok a blokkok, amelyekben **ténylegesen van sor**. Ezek a sorok ROWID-jából számolhatók: \`COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))\`, fájlonként!
> * **használt ≤ foglalt**, mindig. A különbség az **üres blokk**. Ez lehet törölt sorok miatti üres blokk, még fel nem töltött blokk az extent végén, vagy a szegmens fejléc- és bitmap-blokkjai (ASSM).

**Tétel, ami a ZH 5. feladatához kell:** egy tábla **egy adott fájlban** használt blokkjainak száma

\`\`\`sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS used_blocks
FROM   tulaj.tabla
WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) = <a fájl relative_fno-ja>;
\`\`\`
Ha a tábla több fájlban van, a blokkszám **csak fájlon belül egyedi**. Ezért fájlonként csoportosíts (vagy szűrj fájlra), különben két fájl azonos számú blokkja egynek számít.

## 2. Blokk-kitöltés: PCTFREE, STORAGE, ASSM

> **PCTFREE:** a blokkban szabadon hagyott hely százaléka. A beszúrás addig tölti a blokkot, amíg a szabad hely \`PCTFREE\`% fölött van, a maradékot a már bent lévő sorok későbbi **bővülésére** (UPDATE) tartja fenn. Indexeknél ugyanez a „**fill factor**”: a szabadon hagyott hely csökkenti a B+-fa **lapvágásainak** számát. Nagyobb \`PCTFREE\` → kevesebb sor fér egy blokkba.

\`\`\`sql
CREATE TABLE block_test (
  code   NUMBER       NOT NULL,
  name   VARCHAR2(20) NOT NULL,
  color  VARCHAR2(15) NOT NULL,
  weight FLOAT        NOT NULL
)
TABLESPACE example
PCTFREE 40
STORAGE (INITIAL 128K NEXT 128K MINEXTENTS 1 MAXEXTENTS UNLIMITED);

ALTER TABLE block_test ALLOCATE EXTENT (SIZE 128K);   -- kézi extentfoglalás
\`\`\`

> **ASSM (Automatic Segment Space Management):** ha a tablespace \`segment_space_management = 'AUTO'\`, az Oracle maga dönti el az extentek méretét (autoallocate). Ezért kérhetsz \`INITIAL 128K\`-t, mégis **két 64 KiB-os** extent jön létre egy 128 KiB-os helyett. Ellenőrzés:
> \`\`\`sql
> SELECT tablespace_name, segment_space_management, allocation_type
> FROM   dba_tablespaces WHERE tablespace_name = 'EXAMPLE';
> \`\`\`

## 3. A 3. munkafüzet feladatai, megoldással

**1.** A \`MINTA.CUSTOMERS\` foglalt blokkjai fájlonként, a fájl összes blokkjával. \`[file_name, total_blocks, used_blocks]\`
\`\`\`sql
SELECT   f.file_name, f.blocks AS total_blocks, SUM(e.blocks) AS used_blocks
FROM     dba_extents e
JOIN     dba_data_files f ON e.file_id = f.file_id
WHERE    e.owner = 'MINTA' AND e.segment_name = 'CUSTOMERS'
GROUP BY f.file_name, f.blocks;
\`\`\`
Itt a „used” a **foglalt** blokkokat jelenti (amit más tábla nem kaphat meg).

**2.** Hány blokkban van **ténylegesen** sor? \`[total_blocks]\`
\`\`\`sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) || '.' ||
                      DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS total_blocks
FROM   minta.customers;
\`\`\`
A hivatalos megoldás csak a blokkszámot számolja (\`COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))\`). Ez akkor helyes, ha a tábla egy fájlban van. A fenti változat a **(fájl, blokk) párt** számolja, így több fájlnál is jó.

**3.** Ugyanez fájlonként. \`[file_name, total_blocks]\`
\`\`\`sql
SELECT   f.file_name, COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)) AS total_blocks
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name;
\`\`\`
⚠️ Ha a táblának aliast adsz (\`c\`), a ROWID-ot is minősíteni kell (\`c.ROWID\`), különben a join után nem egyértelmű.

**4.** Blokkonként hány sor van, fájl és blokk szerint rendezve. \`[file_name, block_id, row_count]\`
\`\`\`sql
SELECT   f.file_name,
         DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
         COUNT(*) AS row_count
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name, DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)
ORDER BY f.file_name, block_id;
\`\`\`

**5. a)** A \`CUST_ID = 100\` sor fájlja, ROWID-ja, blokkja és sorszáma. \`[file_name, rowid, block_id, row_number]\`
\`\`\`sql
SELECT f.file_name,
       c.ROWID,
       DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
       DBMS_ROWID.ROWID_ROW_NUMBER(c.ROWID)   AS row_number
FROM   minta.customers c
JOIN   dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
WHERE  c.cust_id = 100;
\`\`\`

**5. b)** A kimásolt ROWID alapján melyik objektumban van a sor? \`[owner, object_name, object_type]\`
\`\`\`sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  data_object_id = DBMS_ROWID.ROWID_OBJECT('AAAS98AACAAAAY/AAR');
\`\`\`
A ROWID-ban a **data_object_id** van. Sima táblánál ez megegyezik az \`object_id\`-vel (a hivatalos megoldás azzal joinol), de például \`TRUNCATE\` vagy \`ALTER TABLE … MOVE\` után a \`data_object_id\` megváltozik. Particionált táblánál a sor **a partíció** data object id-ját hordozza.

**6.** \`block_test\`: 128 KiB foglalás (két 64 KiB-os extent ASSM miatt), \`ALLOCATE EXTENT\`, majd egy PL/SQL ciklus, ami addig szúr be, amíg a sorok **két** blokkba nem kerülnek:
\`\`\`sql
DECLARE
    code NUMBER;
    total_used_blocks NUMBER;
BEGIN
    SELECT COALESCE(MAX(code), 0) INTO code FROM block_test;
    WHILE TRUE LOOP
        SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))
        INTO   total_used_blocks FROM block_test;
        EXIT WHEN total_used_blocks >= 2;
        code := code + 1;
        INSERT INTO block_test VALUES (code, 'testname', 'testcolor', 12.34);
    END LOOP;
END;
/
-- ellenőrzés: blokkonként hány sor van
SELECT   DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID) AS block_number, COUNT(*) AS total_rows
FROM     block_test
GROUP BY DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID);
\`\`\`
\`PCTFREE 40\`-nel megismételve az első blokkba **kevesebb sor** fér, mert a blokk 40%-a szabadon marad.

**7.** \`num_of_rows\`: a \`MINTA.TABLA_123\` minden blokkjára (az **üres** blokkokra is!) írja ki: \`FILE_ID;BLOCK_ID->darab;\`. Fájl, majd blokk szerint rendezve.

Ötlet: a tábla blokkjait a \`DBA_EXTENTS\`-ből soroljuk fel (\`block_id\`-tól \`block_id + blocks − 1\`-ig), és mindegyikre megszámoljuk a sorokat.
\`\`\`sql
CREATE OR REPLACE PROCEDURE num_of_rows IS
    v_cnt NUMBER;
BEGIN
    FOR e IN (
        SELECT file_id, relative_fno, block_id, blocks
        FROM   dba_extents
        WHERE  owner = 'MINTA' AND segment_name = 'TABLA_123'
        ORDER  BY file_id, block_id
    ) LOOP
        FOR b IN e.block_id .. e.block_id + e.blocks - 1 LOOP
            SELECT COUNT(*) INTO v_cnt
            FROM   minta.tabla_123 t
            WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(t.ROWID) = e.relative_fno
              AND  DBMS_ROWID.ROWID_BLOCK_NUMBER(t.ROWID) = b;
            DBMS_OUTPUT.PUT_LINE(e.file_id || ';' || b || '->' || v_cnt || ';');
        END LOOP;
    END LOOP;
END;
/
SET SERVEROUTPUT ON;
EXEC num_of_rows;
EXECUTE check_plsql('num_of_rows()');
\`\`\`
A belső \`COUNT(*)\` miatt az üres blokk is megjelenik 0-val. Ez a feladat kulcsa: ha a ROWID-ból indulnál ki, az üres blokkok kimaradnának. A hivatalos megoldás csak a blokkszámra szűr. A fájlra szűrés akkor számít, ha a tábla több fájlban van. A kimeneti formátumot (\`;\` a végén) a \`check_plsql\` dönti el. A munkafüzet mintájában (\`2;563->306\`) nincs ott a záró \`;\`, a feladatszöveg formátumában viszont igen: ha a \`check_plsql\` hibát jelez, próbáld a záró \`;\` nélkül.

**8.** Ugyanez **egyetlen SQL lekérdezéssel**, rekurzív \`WITH\`-del:

> **Rekurzív WITH (rekurzív CTE):** egy **kezdő (anchor)** lekérdezés \`UNION ALL\` egy **rekurzív** taggal, ami önmagára hivatkozik. Addig ismétlődik, amíg a rekurzív tag ad új sort. Oracle-ben a CTE neve után **kötelező az oszloplista**.

\`\`\`sql
WITH blokk (file_id, rfno, block_id, end_block) AS (
    SELECT file_id, relative_fno, block_id, block_id + blocks - 1      -- anchor: extentek eleje
    FROM   dba_extents
    WHERE  owner = 'MINTA' AND segment_name = 'TABLA_123'
    UNION ALL
    SELECT file_id, rfno, block_id + 1, end_block                      -- rekurzió: következő blokk
    FROM   blokk
    WHERE  block_id < end_block
),
sorok AS (
    SELECT   DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) AS rfno,
             DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID) AS block_id,
             COUNT(*) AS row_count
    FROM     minta.tabla_123
    GROUP BY DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID), DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)
)
SELECT   b.file_id, b.block_id, NVL(s.row_count, 0) AS row_count
FROM     blokk b
LEFT JOIN sorok s ON s.rfno = b.rfno AND s.block_id = b.block_id
ORDER BY b.file_id, b.block_id;
\`\`\`
A \`LEFT JOIN\` + \`NVL(…, 0)\` adja a 0 soros blokkokat.

**9.** Utólagos megszorítás és a sértő sorok: \`EXCEPTIONS INTO\`
\`\`\`sql
CREATE TABLE const_t_except(row_id ROWID, owner VARCHAR2(30),
                            table_name VARCHAR2(30), constraint VARCHAR2(30));

ALTER TABLE const_t
ADD CONSTRAINT const_c CHECK (o3 > TO_DATE('2005-jan-01', 'YYYY-mon-dd'))
EXCEPTIONS INTO const_t_except;          -- hibát dob, de a sértő sorok ROWID-ja bekerül

SELECT c.* FROM const_t c
JOIN   const_t_except x ON c.ROWID = x.row_id;
\`\`\`
Ha egy megszorítást már feltöltött táblára adunk, az Oracle ellenőrzi a meglévő sorokat. Ha valamelyik sérti, a megszorítás **nem jön létre**, és a hibaüzenet nem mondja meg, melyik sorok a hibásak. Az \`EXCEPTIONS INTO\` a sértő sorok **ROWID**-ját egy külön táblába gyűjti.

[[feladat:0,1,2,3,4,5]]`,
    exercises: [
      {
        prompt: `Dekódold kézzel a \`AAASdAAAEAAAACXAAB\` ROWID-ot: mi az objektum-, fájl-, blokk- és sorszám?`,
        hint: `Csoportok: \`AAASdA\` | \`AAE\` | \`AAAACX\` | \`AAB\`. A = 0, S = 18, d = 29, E = 4, C = 2, X = 23, B = 1.`,
        solution: `* objektum \`AAASdA\`: 18·64² + 29·64 + 0 = 73728 + 1856 = **75584**
* fájl \`AAE\`: **4**
* blokk \`AAAACX\`: 2·64 + 23 = **151**
* sor \`AAB\`: **1** (a blokk 2. sora, mert 0-tól számozunk)

Ellenőrzés gépen: \`SELECT DBMS_ROWID.ROWID_OBJECT('AAASdAAAEAAAACXAAB') FROM dual;\``,
      },
      {
        prompt: `Írj lekérdezést, amely megadja a \`MINTA.CUSTOMERS\` tábla **üres** (foglalt, de sort nem tartalmazó) blokkjainak számát! \`[empty_blocks]\``,
        hint: `Foglalt: \`SUM(blocks)\` a \`DBA_SEGMENTS\`-ből (vagy \`DBA_EXTENTS\`-ből). Használt: a ROWID-ból számolt különböző (fájl, blokk) párok. A kettő különbsége.`,
        solution: `\`\`\`sql
SELECT (SELECT SUM(blocks) FROM dba_segments
        WHERE owner = 'MINTA' AND segment_name = 'CUSTOMERS')
     - (SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) || '.' ||
                              DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))
        FROM minta.customers) AS empty_blocks
FROM dual;
\`\`\`
Két skalár alkérdés különbsége, \`FROM dual\`-lal. Ugyanez lesz a 6. labor \`empty_blocks\` házija, csak dinamikus SQL-lel (9. lecke).`,
      },
      {
        prompt: `Melyik blokkban és melyik fájlban van a \`MINTA.CUSTOMERS\` tábla **legtöbb sort** tartalmazó blokkja, és hány sor van benne? \`[file_name, block_id, row_count]\``,
        solution: `\`\`\`sql
SELECT   f.file_name,
         DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
         COUNT(*) AS row_count
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name, DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)
ORDER BY row_count DESC
FETCH FIRST 1 ROWS ONLY;
\`\`\``,
      },
      {
        prompt: `Miért lehet egy tábla **használt** blokkjainak száma kisebb, mint a **foglalt** blokkjaié? Mondj legalább három okot!`,
        solution: `1. **Törölt sorok:** a \`DELETE\` után a blokk üres maradhat, de a szegmensnél marad (nem adódik vissza a fájlnak).
2. **Még fel nem töltött blokkok:** az extent egyszerre 8 blokkot foglal, a sorok csak az első néhányba kerültek.
3. **Kézi foglalás:** \`ALLOCATE EXTENT\`, vagy nagy \`INITIAL\` a \`STORAGE\`-ben.
4. A szegmens **fejléc- és ASSM bitmap-blokkjai** sosem tartalmaznak sort.

(A \`PCTFREE\` nem ok: az a blokkon **belüli** szabad helyet szabályozza, nem azt, hogy egy blokk teljesen üres-e.)`,
      },
      {
        prompt: `A \`DBA_OBJECTS\` melyik oszlopával kell összevetni a \`DBMS_ROWID.ROWID_OBJECT(ROWID)\` értékét, hogy biztosan jó objektumot kapj?`,
        answer: [`data_object_id`, `DATA_OBJECT_ID`],
        check: "text",
        solution: `A **\`data_object_id\`**-val. A ROWID a **szegmens** (adatobjektum) azonosítóját tartalmazza, ami \`TRUNCATE\` vagy \`MOVE\` után eltérhet az \`object_id\`-től, partíciónál pedig a partícióé.`,
      },
      {
        prompt: `Írj lekérdezést, amely a \`MINTA.CUSTOMERS\` minden **extentjére** megadja, hány olyan blokk van benne, amiben van sor! \`[file_id, block_id, blocks, used_blocks]\``,
        hint: `Joinold az extenteket a ROWID-ból kapott (fájl, blokk) párokhoz azzal a feltétellel, hogy a blokk az extent tartományába esik: \`blokk BETWEEN e.block_id AND e.block_id + e.blocks - 1\`.`,
        solution: `\`\`\`sql
SELECT   e.file_id, e.block_id, e.blocks, COUNT(u.blk) AS used_blocks
FROM     dba_extents e
LEFT JOIN (SELECT DISTINCT DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) AS rfno,
                           DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID) AS blk
           FROM minta.customers) u
       ON u.rfno = e.relative_fno
      AND u.blk BETWEEN e.block_id AND e.block_id + e.blocks - 1
WHERE    e.owner = 'MINTA' AND e.segment_name = 'CUSTOMERS'
GROUP BY e.file_id, e.block_id, e.blocks
ORDER BY e.file_id, e.block_id;
\`\`\`
\`COUNT(u.blk)\` csak a nem-NULL értékeket számolja, így a teljesen üres extent 0-t kap.`,
      },
    ],
  },
  {
    slug: "indexek-katalogus",
    title: `4. Indexek a katalógusban: DBA_INDEXES, DBA_IND_COLUMNS, DBA_IND_EXPRESSIONS (4. óra)`,
    summary: `Indextípusok definíciói (egyoszlopos, összetett, csökkenő, bitmap, függvényalapú, egyedi, PK), létrehozásuk, a három indexnézet oszlopai és értékei, a 4. munkafüzet 2–7. feladata megoldva (list_indexes házival). Ez kell a ZH 1. és 4. feladatához (35 pont).`,
    status: "complete",
    body: `## 1. Definíciók

> **Index:** egy táblához tartozó **külön tárolt** adatszerkezet (Oracle-ben alapból **B+-fa**, lásd 5. lecke), ami a **kulcs** értékei szerint rendezve tárolja a kulcsokat és a sorokra mutató **ROWID**-okat. Gyors keresést ad kulcsérték vagy tartomány szerint. Saját szegmense van (\`segment_type = 'INDEX'\`).

> **Kulcs:** egy oszlop vagy oszlopok kombinációja. **Rendező kulcs**: a tábla (az index) eszerint rendezett. **Egyedi kulcs (unique)**: minden kulcsérték legfeljebb egyszer fordul elő.

| Indexfajta | Létrehozás | Katalógusban |
|------------|-----------|--------------|
| **egyoszlopos** | \`CREATE INDEX i1 ON t(name);\` | \`index_type = 'NORMAL'\`, 1 sor a \`DBA_IND_COLUMNS\`-ban |
| **összetett (composite, többoszlopos)** | \`CREATE INDEX i2 ON t(city, country);\` | \`NORMAL\`, több sor, \`column_position\` 1, 2, … |
| **csökkenő (descending)** | \`CREATE INDEX i3 ON t(postal_code DESC);\` | \`FUNCTION-BASED NORMAL\`, \`descend = 'DESC'\`, az oszlop neve **\`SYS_NC…$\`**, a valódi kifejezés a \`DBA_IND_EXPRESSIONS\`-ben |
| **bitmap** | \`CREATE BITMAP INDEX b1 ON t(country);\` | \`index_type = 'BITMAP'\` (6. lecke) |
| **függvényalapú (function-based)** | \`CREATE INDEX f1 ON t(SUBSTR(email, INSTR(email,'@')+1));\` | \`FUNCTION-BASED NORMAL\`, oszlopnév \`SYS_NC…$\`, a kifejezés a \`DBA_IND_EXPRESSIONS\`-ben |
| **egyedi (unique)** | \`CREATE UNIQUE INDEX u1 ON t(phone);\` | \`uniqueness = 'UNIQUE'\` |
| **elsődleges kulcs indexe** | \`CONSTRAINT pk_t PRIMARY KEY (id)\` | automatikusan létrejövő **UNIQUE NORMAL** index, a **megszorítás nevével** (\`PK_T\`) |
| **IOT indexe** | \`ORGANIZATION INDEX\` | \`index_type = 'IOT - TOP'\` (7. lecke) |

> **Miért furcsa a csökkenő index oszlopának neve?** Mert az Oracle a csökkenő indexet **függvényalapú indexként** valósítja meg: létrehoz egy rejtett virtuális oszlopot (pl. \`SYS_NC00011$\`), és azt indexeli. A \`DBA_IND_COLUMNS.column_name\` ezt a rejtett nevet mutatja, a valódi oszlop (\`"POSTAL_CODE"\`) a \`DBA_IND_EXPRESSIONS.column_expression\`-ben látszik. Ezért ha függvényalapú indexeket keresel a \`DBA_IND_EXPRESSIONS\`-ben, **a csökkenő indexek is megjelennek**!

## 2. A három indexnézet oszlopai

**\`DBA_INDEXES\`**: egy sor indexenként.

| Oszlop | Jelentés / értékek |
|--------|--------------------|
| \`owner\`, \`index_name\` | az **index** tulajdonosa és neve |
| \`table_owner\`, \`table_name\` | a **tábla** tulajdonosa és neve (más is lehet, mint az index tulajdonosa!) |
| \`index_type\` | \`NORMAL\`, \`BITMAP\`, \`FUNCTION-BASED NORMAL\`, \`FUNCTION-BASED BITMAP\`, \`IOT - TOP\`, \`NORMAL/REV\`, \`LOB\`, \`CLUSTER\`, \`DOMAIN\` |
| \`uniqueness\` | \`UNIQUE\` / \`NONUNIQUE\` |
| \`table_type\` | \`TABLE\`, \`CLUSTER\`, … |
| \`tablespace_name\` | particionált indexnél NULL |
| \`partitioned\` | \`YES\` / \`NO\` |
| \`blevel\`, \`leaf_blocks\`, \`distinct_keys\`, \`num_rows\` | statisztikák (B+-fa mélysége − 1, levélblokkok száma, …) |

**\`DBA_IND_COLUMNS\`**: egy sor az index **minden oszlopára**.

| Oszlop | Jelentés |
|--------|----------|
| \`index_owner\`, \`index_name\` | ⚠️ itt **\`index_owner\`** a neve, nem \`owner\`! |
| \`table_owner\`, \`table_name\` | a tábla |
| \`column_name\` | az indexelt oszlop (függvényalapúnál és csökkenőnél \`SYS_NC…$\`) |
| \`column_position\` | hányadik oszlop az index kulcsában (1-től) |
| \`column_length\` | |
| \`descend\` | \`ASC\` / \`DESC\` |

**\`DBA_IND_EXPRESSIONS\`**: egy sor a függvényalapú (és csökkenő) index minden **kifejezésére**.

| Oszlop | Jelentés |
|--------|----------|
| \`index_owner\`, \`index_name\`, \`table_owner\`, \`table_name\` | |
| \`column_expression\` | a kifejezés szövege (\`LONG\` típus, **\`WHERE\`-ben nem szűrhető \`LIKE\`-kal!**) |
| \`column_position\` | |

> **Tétel: az index oszlopainak száma** = a \`DBA_IND_COLUMNS\` sorainak száma az adott \`(index_owner, index_name)\` párra. A függvényalapú kifejezések is itt szerepelnek (\`SYS_NC…$\` névvel), tehát a \`COUNT(*)\` az „oszlopok **vagy kifejezések**” számát adja.

## 3. A 4. munkafüzet feladatai, megoldással

**1.** Az \`index_test\` tábla és a hat index létrehozása (ezt futtasd le a saját sémádban, és nézd meg a katalógusban, mi lett belőlük):
\`\`\`sql
CREATE TABLE index_test (
  id NUMBER(10) NOT NULL, name VARCHAR2(50) NOT NULL, address VARCHAR2(100),
  city VARCHAR2(50), country VARCHAR2(50), postal_code VARCHAR2(20),
  phone VARCHAR2(20), email VARCHAR2(100),
  created_at DATE DEFAULT SYSDATE, updated_at DATE DEFAULT SYSDATE,
  CONSTRAINT pk_index_test PRIMARY KEY (id)
);
CREATE INDEX idx_index_test_name ON index_test(name);
CREATE INDEX idx_index_test_city_country ON index_test(city, country);
CREATE INDEX idx_index_test_postal_code_desc ON index_test(postal_code DESC);
CREATE BITMAP INDEX bidx_index_test_country ON index_test(country);
CREATE INDEX fidx_index_test_email_domain ON index_test(SUBSTR(email, INSTR(email, '@') + 1));
CREATE UNIQUE INDEX uidx_index_test_phone ON index_test(phone);

SELECT index_name, index_type, uniqueness FROM user_indexes WHERE table_name = 'INDEX_TEST';
\`\`\`
Az eredmény 7 index: a hat létrehozott és a \`PK_INDEX_TEST\` (UNIQUE, NORMAL).

**2. a)** Mely tábláknak van legalább egy **csökkenő** indexoszlopa? \`[table_owner, table_name]\`
\`\`\`sql
SELECT DISTINCT table_owner, table_name
FROM   dba_ind_columns
WHERE  descend = 'DESC';
\`\`\`

**2. b)** A saját indexelt oszlopaid. \`[index_name, table_owner, table_name, column_name]\`
\`\`\`sql
SELECT index_name, table_owner, table_name, column_name
FROM   dba_ind_columns
WHERE  index_owner = USER          -- vagy a Neptun-kódod nagybetűvel
ORDER  BY index_name, column_position;
\`\`\`

**2. c)** Miért furcsa a csökkenő oszlop neve? Lásd a definíciót fent:
\`\`\`sql
SELECT index_name, column_expression, column_position
FROM   dba_ind_expressions
WHERE  index_owner = USER;
\`\`\`
A \`SYS_NC00011$\` mögött \`"POSTAL_CODE"\` áll, az \`fidx_…\` mögött a \`SUBSTR(…)\` kifejezés.

**3.** Mely indexek indexelnek **legalább 9** oszlopot vagy kifejezést? \`[table_owner, table_name, index_name]\`
\`\`\`sql
SELECT   table_owner, table_name, index_name
FROM     dba_ind_columns
GROUP BY index_owner, index_name, table_owner, table_name
HAVING   COUNT(*) >= 9;
\`\`\`
⚠️ Az \`index_owner\`-t is tedd a \`GROUP BY\`-ba: két tulajdonosnak lehet azonos nevű indexe. Nem kell a \`DBA_IND_EXPRESSIONS\`-re szűrni, mert a kifejezések is ott vannak a \`DBA_IND_COLUMNS\`-ban.

**4.** A \`MINTA.CUSTOMERS\` bitmap indexei. \`[index_name]\`
\`\`\`sql
SELECT index_name
FROM   dba_indexes
WHERE  table_owner = 'MINTA' AND table_name = 'CUSTOMERS'
  AND  index_type LIKE '%BITMAP';       -- a FUNCTION-BASED BITMAP is
\`\`\`

**5.** Indexek, amelyek **pontosan két** oszlopot/kifejezést indexelnek, és **legalább az egyik függvényalapú**. \`[index_owner, index_name]\`
\`\`\`sql
SELECT   index_owner, index_name
FROM     dba_ind_columns
GROUP BY index_owner, index_name
HAVING   COUNT(*) = 2
INTERSECT
SELECT   index_owner, index_name
FROM     dba_ind_expressions;
\`\`\`
Ha a csökkenő indexeket ki akarod hagyni (mert „valódi” függvény nincs bennük), szűrj a \`DBA_IND_COLUMNS.descend = 'ASC'\` sorokra is a második ágban, vagy nézd meg a kifejezést a 6. feladat szerint.

**6.** Egy ilyen index kifejezései. \`[index_owner, index_name, column_expression]\`
\`\`\`sql
SELECT index_owner, index_name, column_expression
FROM   dba_ind_expressions
WHERE  index_owner = 'MINTA' AND index_name = 'EMP6';   -- az 5. feladat egyik találata
\`\`\`

**7. (házi)** \`list_indexes(p_owner, p_name)\`: a tábla indexei a méretükkel (\`DBA_SEGMENTS.bytes\`), \`INDEX1: 1234\` formában.
\`\`\`sql
CREATE OR REPLACE PROCEDURE list_indexes (
    p_owner IN VARCHAR2,
    p_name  IN VARCHAR2
) IS
BEGIN
    FOR r IN (
        SELECT   i.index_name, NVL(SUM(s.bytes), 0) AS bytes
        FROM     dba_indexes i
        LEFT JOIN dba_segments s
               ON s.owner = i.owner AND s.segment_name = i.index_name
        WHERE    i.table_owner = UPPER(p_owner)
          AND    i.table_name  = UPPER(p_name)
        GROUP BY i.index_name
        ORDER BY i.index_name
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(r.index_name || ': ' || r.bytes);
    END LOOP;
END;
/
SET SERVEROUTPUT ON
EXECUTE list_indexes('minta', 'customers');
EXECUTE check_plsql('list_indexes(''minta'', ''customers'')');
EXECUTE check_plsql('list_indexes(''minta'', ''cikk_iot'')');
\`\`\`
* A hívás **kisbetűs** paraméterekkel jön → \`UPPER\`.
* \`LEFT JOIN\` + \`NVL\`: a még szegmens nélküli index 0-val is megjelenik.
* \`SUM\` + \`GROUP BY\`: a **particionált** indexnek partíciónként van szegmense, ezeket össze kell adni.
* A \`cikk_iot\` egy IOT: az indexe \`IOT - TOP\` típusú, és **az tárolja a tábla adatait** (7. lecke).

[[feladat:0,1,2]]

## 4. A ZH 1. és 4. feladata (35 pont)

**ZH 1. a)** (15 p a két rész együtt) A felhasználók, akiknek **kevesebb mint 20, de legalább 1** indexük van, a darabszámmal, csökkenő sorrendben. \`[user_name, index_count]\`
\`\`\`sql
SELECT   owner AS user_name, COUNT(*) AS index_count
FROM     dba_indexes
GROUP BY owner
HAVING   COUNT(*) < 20
ORDER BY index_count DESC;
\`\`\`
A „legalább 1” **automatikusan teljesül**: a \`GROUP BY\` csak azokat a tulajdonosokat adja, akiknek van legalább egy sora a \`DBA_INDEXES\`-ben. (Ha mégis kiírod: \`HAVING COUNT(*) BETWEEN 1 AND 19\`.)

**ZH 1. b)** Hány ilyen felhasználó van? \`[user_count]\`
\`\`\`sql
SELECT COUNT(*) AS user_count
FROM  (SELECT   owner
       FROM     dba_indexes
       GROUP BY owner
       HAVING   COUNT(*) < 20);
\`\`\`
Az a) lekérdezés **alkérdésként** a \`FROM\`-ban (inline view), kívül megszámoljuk a sorait. Az \`ORDER BY\` itt felesleges.

**ZH 4.** (20 p) **Egyedi, normál**, nem rendszer-felhasználóhoz tartozó indexek, amelyek kulcsa **2-nél több** oszlopból áll. \`[index_owner, index_name, column_count]\`
\`\`\`sql
SELECT   i.owner AS index_owner, i.index_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c
       ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.uniqueness = 'UNIQUE'
  AND    i.index_type = 'NORMAL'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name
HAVING   COUNT(*) > 2;
\`\`\`
Pontozási csapdák:
* „unique” → \`uniqueness = 'UNIQUE'\` (nem \`index_type\`!);
* „normal” → \`index_type = 'NORMAL'\` (ez kizárja a bitmap, függvényalapú, \`IOT - TOP\`, \`NORMAL/REV\` indexeket);
* a join **mindkét** oszlopon (\`index_owner\` **és** \`index_name\`);
* a szűrés a \`WHERE\`-ben, a darabszám-feltétel a \`HAVING\`-ben;
* „more than two” → \`> 2\`, nem \`>= 2\`.

[[feladat:3,4,5,6]]`,
    exercises: [
      {
        prompt: `Melyik oszlop mondja meg a \`DBA_INDEXES\`-ben, hogy egy index egyedi-e, és milyen értékei lehetnek?`,
        solution: `A **\`uniqueness\`**, értékei \`UNIQUE\` és \`NONUNIQUE\`. (Az \`index_type\` az index **fajtáját** adja: NORMAL, BITMAP, …)`,
      },
      {
        prompt: `Írj lekérdezést: a \`MINTA\` tábláinak melyik oszlopai szerepelnek **összetett** (legalább 2 oszlopos) index **első** oszlopaként? \`[table_name, index_name, column_name]\``,
        hint: `Előbb keresd meg a ≥ 2 oszlopos indexeket (\`GROUP BY\` + \`HAVING\`), aztán ezek közül a \`column_position = 1\` sort.`,
        solution: `\`\`\`sql
SELECT c.table_name, c.index_name, c.column_name
FROM   dba_ind_columns c
WHERE  c.table_owner = 'MINTA'
  AND  c.column_position = 1
  AND  (c.index_owner, c.index_name) IN (
         SELECT   index_owner, index_name
         FROM     dba_ind_columns
         GROUP BY index_owner, index_name
         HAVING   COUNT(*) >= 2);
\`\`\`
Oracle-ben lehet **több oszlopos \`IN\`**: \`(a, b) IN (SELECT x, y …)\`.`,
      },
      {
        prompt: `Írj lekérdezést: melyik **tábláknak** van legalább 3 indexe? A tábla tulajdonosát és nevét és az indexek számát add vissza, csökkenően. \`[table_owner, table_name, index_count]\``,
        solution: `\`\`\`sql
SELECT   table_owner, table_name, COUNT(*) AS index_count
FROM     dba_indexes
GROUP BY table_owner, table_name
HAVING   COUNT(*) >= 3
ORDER BY index_count DESC;
\`\`\`
A **tábla** szerint csoportosítunk (\`table_owner, table_name\`), nem az index tulajdonosa szerint.`,
      },
      {
        prompt: `**(ZH 1. variáns)** Azok a felhasználók, akiknek **legalább 5, de legfeljebb 10** táblájuk van, a darabszámmal, név szerint növekvőben. \`[user_name, table_count]\`, majd egy második lekérdezés: hányan vannak? \`[user_count]\``,
        solution: `\`\`\`sql
SELECT   owner AS user_name, COUNT(*) AS table_count
FROM     dba_tables
GROUP BY owner
HAVING   COUNT(*) BETWEEN 5 AND 10
ORDER BY user_name;

SELECT COUNT(*) AS user_count
FROM  (SELECT owner FROM dba_tables GROUP BY owner HAVING COUNT(*) BETWEEN 5 AND 10);
\`\`\``,
      },
      {
        prompt: `**(ZH 4. variáns)** **Nem egyedi bitmap** indexek nem rendszer-felhasználóktól, amelyek **pontosan 1** oszlopot indexelnek, és a tábla neve \`S\`-sel kezdődik. \`[index_owner, index_name, table_name]\``,
        solution: `\`\`\`sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name
FROM     dba_indexes i
JOIN     dba_ind_columns c ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.index_type = 'BITMAP'
  AND    i.uniqueness = 'NONUNIQUE'
  AND    i.owner NOT LIKE '%SYS%'
  AND    i.table_name LIKE 'S%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) = 1;
\`\`\`
A \`table_name\` is a \`GROUP BY\`-ba kerül, mert a \`SELECT\`-ben szerepel.`,
      },
      {
        prompt: `**(ZH 4. variáns)** Melyik **függvényalapú** indexek tartalmaznak \`UPPER\` függvényt? A \`column_expression\` \`LONG\` típusú, ezért közvetlenül nem szűrhető \`LIKE\`-kal. Hogyan oldod meg?`,
        hint: `PL/SQL-ben a \`LONG\` érték \`VARCHAR2\` változóba olvasható (32 KB-ig), és ott már működik az \`INSTR\`/\`LIKE\`.`,
        solution: `\`\`\`sql
SET SERVEROUTPUT ON
BEGIN
    FOR r IN (SELECT index_owner, index_name, column_expression FROM dba_ind_expressions) LOOP
        IF UPPER(r.column_expression) LIKE '%UPPER(%' THEN
            DBMS_OUTPUT.PUT_LINE(r.index_owner || '.' || r.index_name || ': ' || r.column_expression);
        END IF;
    END LOOP;
END;
/
\`\`\`
A kurzoros ciklusban a \`r.column_expression\` már PL/SQL szöveg, arra működik a \`LIKE\`. (Hasonló a \`DBA_TAB_PARTITIONS.high_value\`, az is \`LONG\`.)`,
      },
      {
        prompt: `Egy tábla elsődleges kulcsára (\`CONSTRAINT pk_emp PRIMARY KEY (id)\`) milyen index jön létre automatikusan? Add meg a nevét, a \`uniqueness\`-t és az \`index_type\`-ot!`,
        solution: `Egy **\`PK_EMP\`** nevű (a megszorítás nevét kapja), **\`UNIQUE\`**, **\`NORMAL\`** index. (Ha a megszorítás névtelen, a neve \`SYS_C00…\` lesz.) Kivétel az IOT: ott a PK-index maga a tábla, \`IOT - TOP\` típussal.`,
      },
    ],
  },
  {
    slug: "bplusz-fa",
    title: `5. B+ fa: felépítés, beszúrás, vágás (4. óra; papíros 1. feladat, 20 p)`,
    summary: `A B+ fa definíciója (04.pdf, 02_storage.pdf), a ritka belső és sűrű levélcsúcsok, a heap tábla, a másodlagos index és az IOT, a beszúrási algoritmus pontos vágási szabályokkal, az óra példája, egy ZH-típusú kidolgozott feladat lépésenként, a hw_04 B+ fás feladata és további gyakorlófák.`,
    status: "complete",
    body: `## 1. Definíciók

> **B+ fa:** **kiegyensúlyozott** (minden levél ugyanolyan mélyen van) keresőfa, az adatbázisok elsődleges indexszerkezete.
> * a fa **csúcsai adatblokkok**;
> * a **levelek** a fa alsó szintje, a többi a **belső csúcs** (a gyökérrel együtt);
> * a kulcsok a leveleken **rendezve** vannak.

> **Belső csúcs (index blokk):** legfeljebb **N kulcsot és N + 1 mutatót** tárol a gyerekekre. A kulcsok **intervallumhatárok**. **Ritka (sparse)**: nem minden kulcs van benne, csak a gyerekek határai. A gyakorlatban N nagy (pl. 100), hogy a fa alacsony legyen.

> **Levél:** legfeljebb **M kulcsot** tárol (a feladatokban M lehet más, mint N!). **Sűrű (dense)**: **minden kulcs** szerepel a levélszinten, a táblázat minden sorára egy bejegyzés. Mellette a sorra mutató **mutató (ROWID)** van (másodlagos index), vagy **maga az adat** (elsődleges index / IOT). A levelek **láncolva** vannak (előző/következő), így a **tartománylekérdezés** hatékony.

A belső csúcs szerkezete (3 kulcs, 4 mutató):

\`\`\`text
            ┌──────┬──────┬──────┐
            │  k1  │  k2  │  k3  │
            ├────┬─┴──┬───┴┬─────┤
            │ p0 │ p1 │ p2 │ p3  │
            └─┬──┴─┬──┴─┬──┴──┬──┘
              │    │    │     │
         k < k1    │    │    k3 ≤ k
           k1 ≤ k < k2  k2 ≤ k < k3
\`\`\`

> **Keresési szabály:** a \`k\` kulcsot keresve a csúcsban az első olyan \`ki\`-t keressük, amire \`k < ki\`. Az előtte álló mutatón megyünk le. Ha \`k ≥\` minden kulcsnál, a legutolsó mutatón. **Egyenlőségnél jobbra megyünk** (\`k1 ≤ k\`).

> **A belső csúcs kulcsa = a jobb oldali részfában elérhető legkisebb kulcs.** Más szóval: egy szülőben a \`ki\` kulcs a \`pi\` gyerek (és az alatta lévő részfa) legkisebb kulcsa.

### Heap tábla, másodlagos index, IOT (02_storage.pdf, 04.pdf)

| Fogalom | Mit tárol a levél | Megjegyzés |
|---------|-------------------|-----------|
| **Heap tábla** | — (nem fa) | a sorok **beszúrási sorrendben**, rendezetlenül, blokkok láncolt listájaként. Könnyű a végére írni, de csak végigolvasni lehet. |
| **Másodlagos (secondary, non-clustered, regular) index** | **kulcs + mutató (ROWID)** a tábla sorára | heap tábla vagy IOT **fölé** épül. A tábla blokkjai **nem részei** az indexnek. |
| **Elsődleges index / IOT / clustered index** | **kulcs + a sor összes oszlopa** | **maga a tábla** a B+ fa. Egy keresés után minden oszlop megvan, nincs plusz olvasás. |

> Egy keresés költsége B+ fában: **a fa magassága** (gyökértől levélig minden szinten egy blokkolvasás), másodlagos indexnél **+1** a tábla blokkjáért.

## 2. A beszúrási algoritmus (az óra és a hw_04 szabályai)

1. **Keresd meg a levelet**, ahová a kulcs tartozik (a keresési szabállyal).
2. Ha van benne hely: **rendezve beszúrod**, kész.
3. **Levélvágás**, ha a levél túlcsordul (M + 1 kulcs lenne benne):
   * a régi levélben marad az első **⌈(M+1)/2⌉** kulcs, a többi az **új, jobb oldali** levélbe kerül;
   * **az új levél legkisebb kulcsa felmásolódik** a szülőbe (az új levélre mutató mutatóval együtt);
   * ⚠️ **levélvágásnál a felvitt kulcs a levélben IS megmarad** (hiszen a levél sűrű, minden kulcsot tartalmaz).
4. **Belső csúcs vágása**, ha a szülő is túlcsordul (N + 1 kulcs, N + 2 mutató):
   * az első **⌈(N+2)/2⌉ mutató** (és a köztük lévő kulcsok) a régi csúcsban (N) marad, a többi mutató az új csúcsba (M) kerül;
   * a kettő közötti **középső kulcs felköltözik** a szülőbe, és **nem marad meg egyik csúcsban sem**. Ez az a kulcs, ami az új csúcs (M) részfájában a legkisebb;
   * ha a felköltöző kulcs miatt a szülő is túlcsordul, ugyanígy tovább.
5. **Ha a gyökér vágódik:** új gyökér jön létre egyetlen kulccsal és két mutatóval, a **fa magassága eggyel nő**. (A B+ fa csak felfelé, a gyökérnél nő.)

A ZH-n előforduló méretekre kiszámolva:

| Mi csordul túl | Hány kulcs lenne | Bal marad | Fel | Jobbra |
|----------------|------------------|-----------|-----|--------|
| levél, **M = 2** | 3: a, b, c | a, b | **c** felmásolódik | c |
| levél, **M = 3** | 4: a, b, c, d | a, b | **c** felmásolódik | c, d |
| belső, **N = 3** | 4: a, b, c, d (5 mutató) | a, b (3 mutató) | **c felköltözik** | d (2 mutató) |

> **Megjegyzés a konvencióról:** páratlan számú kulcsnál (M = 2 → 3 kulcs) az a szabály, hogy **a bal oldalon marad több** (⌈(M+1)/2⌉ = 2). Ez a tankönyvi (Garcia-Molina–Ullman–Widom) konvenció, és ezzel jön ki az óra példája is. Ha a ZH-n más konvenciót használsz (1 marad balra, 2 megy jobbra), írd le, és **végig következetesen** használd. A szabályt a rajzod mellé is érdemes egy mondatban leírni.

## 3. Az óra példája (04.pdf): N = M = 3, beszúrás: {10, 20, 5, 6, 12, 30, 7, 17, 19, 8}

\`\`\`text
10, 20, 5         →  [5 10 20]                         (tele, még nincs vágás)

6:  levélvágás   [5 6 | 10 20], a 10 felmásolódik:
                         [10]
                        /    \\
                  [5 6]      [10 20]

12:                      [10]
                        /    \\
                  [5 6]      [10 12 20]

30: levélvágás  [10 12 | 20 30], a 20 felmásolódik:
                        [10 20]
                      /    |    \\
                 [5 6]  [10 12]  [20 30]

7, 17:                  [10 20]
                      /    |    \\
               [5 6 7]  [10 12 17]  [20 30]

19: levélvágás [10 12 | 17 19], a 17 felmásolódik, a gyökér épp betelik:
                       [10 17 20]
                    /    |     |    \\
            [5 6 7] [10 12] [17 19] [20 30]

8:  levélvágás [5 6 | 7 8], a 7 felmásolódik → a gyökérben 7 10 17 20 lenne (4 kulcs > 3)
    → gyökérvágás: [7 10] marad, a 17 FELKÖLTÖZIK az új gyökérbe, [20] az új csúcs
                              [17]
                          /          \\
                    [7 10]            [20]
                   /   |   \\          /   \\
             [5 6] [7 8] [10 12]  [17 19] [20 30]
\`\`\`

Figyeld meg az utolsó lépést: a **17 csak az új gyökérben** van meg, a belső szinten már nincs (belső vágás). A levélszinten viszont ott van (a \`[17 19]\` levélben), mert a levelek sűrűek.

## 4. Kidolgozott ZH-típusú feladat (20 pont)

> Rajzold le a B+ fa állapotát **minden lapvágás előtt**, miközben beszúrod: **{8, 14, 2, 20, 11, 5, 17}**. A belső csúcsok legfeljebb **3 kulcsot és 4 mutatót**, a levelek legfeljebb **2 kulcsot** tárolnak. A levelek minden kulcsot tartalmaznak.

Tehát **N = 3, M = 2**. Levél túlcsordul 3 kulcsnál: **2 marad balra, 1 megy jobbra**, és a jobb oldali kulcs felmásolódik.

**8, 14:** \`[8 14]\`, a levél tele.

**1. vágás, a 2 beszúrása. Állapot ELŐTTE:**
\`\`\`text
[8 14]
\`\`\`
A \`[2 8 14]\` túlcsordul → \`[2 8] | [14]\`, a **14** felmásolódik egy új gyökérbe:
\`\`\`text
       [14]
      /    \\
  [2 8]    [14]
\`\`\`

**20:** a 14 ≤ 20, tehát jobbra megy, \`[14 20]\`, befér.

**2. vágás, a 11 beszúrása. Állapot ELŐTTE:**
\`\`\`text
        [14]
       /    \\
  [2 8]    [14 20]
\`\`\`
A 11 < 14, tehát balra megy: \`[2 8 11]\` túlcsordul → \`[2 8] | [11]\`, a **11** felmásolódik a gyökérbe (ott van hely):
\`\`\`text
          [11 14]
        /    |    \\
   [2 8]   [11]   [14 20]
\`\`\`

**3. vágás, az 5 beszúrása. Állapot ELŐTTE:**
\`\`\`text
          [11 14]
        /    |    \\
   [2 8]   [11]   [14 20]
\`\`\`
Az 5 < 11, tehát a \`[2 8]\` levélbe megy: \`[2 5 8]\` túlcsordul → \`[2 5] | [8]\`, a **8** felmásolódik. A gyökér \`[8 11 14]\` lesz, épp betelik:
\`\`\`text
             [8 11 14]
          /    |    |    \\
     [2 5]   [8]  [11]  [14 20]
\`\`\`

**4. vágás, a 17 beszúrása. Állapot ELŐTTE:**
\`\`\`text
             [8 11 14]
          /    |    |    \\
     [2 5]   [8]  [11]  [14 20]
\`\`\`
A 14 ≤ 17, tehát a \`[14 20]\` levélbe megy: \`[14 17 20]\` túlcsordul → \`[14 17] | [20]\`, a **20** felmásolódik. A gyökérben \`8 11 14 20\` lenne (4 kulcs > 3) → **gyökérvágás**: az első 3 mutató (kulcsok: 8, 11) marad, a **14 felköltözik** egy új gyökérbe, a \`[20]\` az új belső csúcs.

**Végállapot:**
\`\`\`text
                      [14]
                  /          \\
           [8 11]              [20]
         /   |   \\            /    \\
    [2 5]   [8]   [11]   [14 17]   [20]
\`\`\`

Ellenőrzés: (1) minden kulcs megvan a levélszinten, rendezve: 2 5 8 11 14 17 20 ✓; (2) minden levél ugyanolyan mélyen van ✓; (3) a gyökér 14-e a jobb részfa legkisebb kulcsa ✓, a \`[8 11]\` 8-asa és 11-ese a 2. és 3. levél legkisebb kulcsa ✓, a \`[20]\` a \`[20]\` levélé ✓; (4) a 14 a belső szinten **nincs** meg, csak a gyökérben (belső vágás) ✓.

> **Hogyan írd le a ZH-n?** Minden vágásnál: „*x* beszúrása előtt:” + rajz, és utána egy mondat: „a(z) [..] levél túlcsordul, ketté vágjuk: [..] | [..], a(z) *k* felmegy a szülőbe”. A végén rajzold le a végállapotot is. A feladat a vágások **előtti** állapotokat kéri, de a végállapot sokat segít az ellenőrzésben, és a javító is látja, hogy jól gondolkodtál.

[[feladat:0]]

## 5. A hw_04 B+ fás feladata: N = M = 3 (blokkonként 3 kulcs, 4 mutató)

Beszúrás: **{39, 15, 50, 70, 79, 83, 72, 43, 75, 45, 60, 80}**. Ennek a megoldását a feladat végén nyithatod ki. Előbb oldd meg magad: négy vágás lesz, és az utolsó gyökérvágás.

[[feladat:1]]

## 6. Gyakorló fák

[[feladat:2,3,4,5]]`,
    exercises: [
      {
        prompt: `ZH-gyakorlás, **időre (10 perc)**: zárd be a fenti levezetést, és rajzold meg újra papíron a {8, 14, 2, 20, 11, 5, 17} beszúrását (N = 3, M = 2), az összes vágás előtti állapottal. Utána ellenőrizd a fenti levezetéssel. Hány vágás volt, és melyik volt gyökérvágás?`,
        solution: `**Négy** vágás volt: a 2, a 11, az 5 és a 17 beszúrásánál. Az **utolsó (17)** okozott belső- (gyökér-) vágást is, így a fa magassága 2-ről 3 szintre nőtt. Végállapot:
\`\`\`text
                      [14]
                  /          \\
           [8 11]              [20]
         /   |   \\            /    \\
    [2 5]   [8]   [11]   [14 17]   [20]
\`\`\``,
      },
      {
        prompt: `**hw_04:** szúrd be egy N = M = 3-as B+ fába (3 kulcs, 4 mutató csúcsonként): {39, 15, 50, 70, 79, 83, 72, 43, 75, 45, 60, 80}. Rajzold le az állapotot minden vágásnál!`,
        hint: `A 70 beszúrásakor jön az első vágás: \`[15 39 | 50 70]\`, az 50 felmegy (ez a feladat 1. ábrája). Az utolsó vágás a 45-nél van, és az a gyökeret is kettévágja.`,
        solution: `**39, 15, 50:** \`[15 39 50]\`.

**70 → 1. vágás.** Előtte: \`[15 39 50]\`. Utána:
\`\`\`text
        [50]
       /    \\
 [15 39]    [50 70]
\`\`\`
**79:** \`[50 70 79]\`. **83 → 2. vágás.** Előtte:
\`\`\`text
        [50]
       /    \\
 [15 39]    [50 70 79]
\`\`\`
\`[50 70 | 79 83]\`, a 79 felmegy:
\`\`\`text
          [50 79]
        /    |    \\
 [15 39]  [50 70]  [79 83]
\`\`\`
**72:** \`[50 70 72]\`. **43:** \`[15 39 43]\`. **75 → 3. vágás** (az 50 ≤ 75 < 79 levélbe). Előtte:
\`\`\`text
             [50 79]
          /     |     \\
 [15 39 43]  [50 70 72]  [79 83]
\`\`\`
\`[50 70 | 72 75]\`, a 72 felmegy, a gyökér betelik:
\`\`\`text
                 [50 72 79]
          /       |       |      \\
 [15 39 43]   [50 70]  [72 75]  [79 83]
\`\`\`
**45 → 4. vágás** (a \`[15 39 43]\` levélbe). Előtte: az előző ábra. \`[15 39 | 43 45]\`, a 43 felmegy, a gyökérben \`43 50 72 79\` lenne → **gyökérvágás**: \`[43 50]\` marad, a **72 felköltözik**, \`[79]\` az új csúcs:
\`\`\`text
                        [72]
                    /          \\
             [43 50]             [79]
           /    |    \\          /    \\
     [15 39] [43 45] [50 70] [72 75] [79 83]
\`\`\`
**60:** \`[50 60 70]\`, **80:** \`[79 80 83]\`. Ezek nem okoznak vágást. Végállapot:
\`\`\`text
                         [72]
                    /           \\
             [43 50]              [79]
           /    |     \\          /     \\
     [15 39] [43 45] [50 60 70] [72 75] [79 80 83]
\`\`\``,
      },
      {
        prompt: `Szúrd be egy N = M = 3-as B+ fába: {20, 10, 30, 40, 25, 5, 15, 35, 45, 50}. Rajzold le minden vágás előtti állapotot és a végállapotot!`,
        solution: `**40 → 1. vágás.** Előtte \`[10 20 30]\`. Utána \`[10 20 | 30 40]\`, gyökér \`[30]\`.

**25:** \`[10 20 25]\`. **5 → 2. vágás.** Előtte:
\`\`\`text
          [30]
         /    \\
 [10 20 25]   [30 40]
\`\`\`
\`[5 10 | 20 25]\`, a 20 felmegy: gyökér \`[20 30]\`, levelek \`[5 10] [20 25] [30 40]\`.

**15:** \`[5 10 15]\`. **35:** \`[30 35 40]\`. **45 → 3. vágás.** Előtte:
\`\`\`text
              [20 30]
           /     |     \\
   [5 10 15]  [20 25]  [30 35 40]
\`\`\`
\`[30 35 | 40 45]\`, a 40 felmegy: gyökér \`[20 30 40]\`.

**50:** \`[40 45 50]\`, nincs vágás. Végállapot:
\`\`\`text
                 [20 30 40]
          /       |      |       \\
   [5 10 15]  [20 25] [30 35] [40 45 50]
\`\`\``,
      },
      {
        prompt: `Szúrd be egy N = 3, M = 2 B+ fába (ugyanezek a méretek): {8, 2, 6, 4, 10, 12, 1}.`,
        hint: `4 vágás lesz. Az utolsó (az 1 beszúrása) gyökérvágás.`,
        solution: `* **6 →** előtte \`[2 8]\`; \`[2 6 8]\` → \`[2 6] | [8]\`, gyökér \`[8]\`.
* **4 →** előtte gyökér \`[8]\`, levelek \`[2 6] [8]\`; \`[2 4 6]\` → \`[2 4] | [6]\`, gyökér \`[6 8]\`.
* **10:** \`[8 10]\`.
* **12 →** előtte gyökér \`[6 8]\`, levelek \`[2 4] [6] [8 10]\`; \`[8 10 12]\` → \`[8 10] | [12]\`, gyökér \`[6 8 12]\`.
* **1 →** előtte gyökér \`[6 8 12]\`, levelek \`[2 4] [6] [8 10] [12]\`; \`[1 2 4]\` → \`[1 2] | [4]\`, a 4 felmegy, a gyökérben \`4 6 8 12\` lenne → vágás: \`[4 6]\`, a **8 felköltözik**, \`[12]\`.

Végállapot:
\`\`\`text
                    [8]
               /          \\
         [4 6]              [12]
       /   |   \\           /    \\
  [1 2]   [4]   [6]    [8 10]   [12]
\`\`\``,
      },
      {
        prompt: `Egy N = 3-as belső csúcsba (3 kulcs, 4 mutató) a \`20\` kulcs érkezik egy alatta lévő levélvágásból. A csúcs most \`[10 30 40]\`. Hogyan vágódik, és mi kerül a szülőbe?`,
        solution: `A kulcsok rendezve: \`10 20 30 40\` (5 mutató). Az első **3 mutató** (és a köztük lévő **10, 20**) marad a régi csúcsban, a **30 felköltözik** a szülőbe (egyik csúcsban sem marad), az új csúcsban a \`[40]\` van, 2 mutatóval:
\`\`\`text
        ... [30] ...
          /       \\
    [10 20]       [40]
\`\`\``,
      },
      {
        prompt: `Igaz vagy hamis? (a) „A B+ fa belső csúcsai minden kulcsot tartalmaznak.” (b) „Levélvágáskor a felvitt kulcs a levélből törlődik.” (c) „A B+ fa a gyökérnél nő.” (d) „A másodlagos index levelei a sorok összes oszlopát tárolják.”`,
        solution: `* (a) **Hamis**: a belső csúcsok **ritkák**, csak intervallumhatárokat tárolnak. A **levelek** sűrűek.
* (b) **Hamis**: levélvágásnál a kulcs **felmásolódik**, a levélben is megmarad. Csak **belső** csúcs vágásakor költözik fel úgy, hogy alul nem marad meg.
* (c) **Igaz**: új szint csak gyökérvágással jön létre, ezért minden levél ugyanolyan mélyen marad (kiegyensúlyozott).
* (d) **Hamis**: a másodlagos index levelei **kulcs + ROWID**-ot tárolnak. Az összes oszlopot az **IOT / elsődleges index** levelei tárolják.`,
      },
    ],
  },
  {
    slug: "bitmap-rle",
    title: `6. Bitmap index és RLE-tömörítés (4. óra, hw_04)`,
    summary: `A bitmap index definíciója és használata AND/OR/NOT lekérdezésekre, a hw_04 EMPLOYEES táblájának bitvektorai és a két lekérdezés kiértékelése, a futáshossz-kódolás (RLE) szabálya, tömörítés és kitömörítés lépésenként, gyakorlófeladatok.`,
    status: "complete",
    body: `## 1. Bitmap index

> **Bitmap index:** egy oszlop **minden különböző értékéhez** egy **bitvektor** tartozik, aminek a hossza a tábla sorainak száma (n). Az *i*-edik bit **1**, ha az *i*-edik sorban az oszlop értéke épp az adott érték, egyébként **0**.

Tulajdonságai:

* Egy soron belül **pontosan egy** vektorban van 1-es (ha az oszlop nem NULL), így az egy oszlophoz tartozó vektorok **VAGY**-a csupa 1.
* **Kis kardinalitású** (kevés különböző értékű) oszlopokra jó: nem, megye, státusz, év, osztály. A vektorok rövidek és jól tömöríthetők.
* A lekérdezés feltételei **bitműveletekké** válnak: \`AND\` → bitenkénti ÉS, \`OR\` → VAGY, \`NOT\` → negálás, \`IN (a, b)\` → a két vektor VAGY-a. A végeredmény vektor 1-esei adják a keresett sorokat.
* Oracle-ben: \`CREATE BITMAP INDEX b ON t(col);\`, a katalógusban \`index_type = 'BITMAP'\`.
* Hátránya: a gyakori \`INSERT\`/\`UPDATE\` drága (zárolás és újratömörítés), ezért inkább **adattárházakban** használják.

### A hw_04 EMPLOYEES táblája (14 sor)

| ID | NAME | POSITION | START | DEPTID |
|----|------|----------|-------|--------|
| 1 | SMITH | CLERK | 1980 | 20 |
| 2 | ALLEN | SALESMAN | 1981 | 30 |
| 3 | WARD | SALESMAN | 1981 | 30 |
| 4 | JONES | MANAGER | 1981 | 20 |
| 5 | MARTIN | SALESMAN | 1981 | 30 |
| 6 | BLAKE | MANAGER | 1981 | 30 |
| 7 | CLARK | MANAGER | 1981 | 10 |
| 8 | SCOTT | ANALYST | 1982 | 20 |
| 9 | KING | PRESIDENT | 1981 | 10 |
| 10 | TURNER | SALESMAN | 1981 | 30 |
| 11 | ADAMS | CLERK | 1983 | 20 |
| 12 | JAMES | CLERK | 1981 | 30 |
| 13 | FORD | ANALYST | 1981 | 20 |
| 14 | MILLER | CLERK | 1982 | 10 |

**A \`DEPTID\` bitmap indexe** (a feladat 1. része). A bitek sorrendje az ID sorrendje (1 → 14):

\`\`\`text
           sor:  1 2 3 4 5 6 7 8 9 10 11 12 13 14
deptid = 10 :    0 0 0 0 0 0 1 0 1  0  0  0  0  1   = 00000010100001
deptid = 20 :    1 0 0 1 0 0 0 1 0  0  1  0  1  0   = 10010001001010
deptid = 30 :    0 1 1 0 1 1 0 0 0  1  0  1  0  0   = 01101100010100
\`\`\`
Ellenőrzés: oszloponként pontosan egy 1-es van, és a három vektor VAGY-a csupa 1.

**A \`POSITION\` és a \`START\` vektorai** (a 2. részhez):

\`\`\`text
position = CLERK     : 10000000001101
position = SALESMAN  : 01101000010000
position = MANAGER   : 00010110000000
position = ANALYST   : 00000001000010
position = PRESIDENT : 00000000100000

start = 1980 : 10000000000000
start = 1981 : 01111110110110
start = 1982 : 00000001000001
start = 1983 : 00000000001000
\`\`\`

**1. lekérdezés:** azok a nevek, akik *(1981-ben kezdtek ÉS CLERK-ek) VAGY (a 20-as osztályon dolgoznak ÉS MANAGER-ek)*.

\`\`\`text
start=1981          01111110110110
position=CLERK      10000000001101
ÉS  ──────────────  00000000000100    (csak a 12. sor: JAMES)

deptid=20           10010001001010
position=MANAGER    00010110000000
ÉS  ──────────────  00010000000000    (csak a 4. sor: JONES)

VAGY ─────────────  00010000000100    → JONES, JAMES
\`\`\`

**2. lekérdezés:** azok a nevek, akik *NEM 1981-ben kezdtek ÉS (a 10-es VAGY a 30-as osztályon vannak)*.

\`\`\`text
start=1981          01111110110110
NEM ──────────────  10000001001001    (SMITH, SCOTT, ADAMS, MILLER)

deptid=10           00000010100001
deptid=30           01101100010100
VAGY ─────────────  01101110110101

ÉS  ──────────────  00000000000001    → MILLER
\`\`\`

Ellenőrzés a táblázatból: nem 1981-esek SMITH (20), SCOTT (20), ADAMS (20), MILLER (10). Közülük csak MILLER van a 10-es vagy a 30-as osztályon ✓.

[[feladat:0,1]]

## 2. Futáshossz-kódolás (Run-Length Encoding, RLE)

A bitmap vektorok **ritkák** (sok 0, kevés 1), ezért érdemes tömöríteni.

> **RLE szabálya (a kurzus és a tankönyv konvenciója):** a vektort **„i darab 0, utána egy 1”** futamokra bontjuk. Egy ilyen futamot így kódolunk:
> 1. írd fel **i**-t kettes számrendszerben; legyen **j** a bitjeinek száma;
> 2. írj le **j − 1 darab 1-est**, utána egy **0**-t (ez mondja meg j-t);
> 3. utána írd le **i**-t binárisan (j biten).
>
> A vektor **végén lévő 0-kat** (az utolsó 1-es után) nem kódoljuk, mert a sorok számából visszaállíthatók.

| futam (i) | i binárisan | j | előtag (j−1 db 1, aztán 0) | kód |
|-----------|-------------|---|----------------------------|-----|
| 0 (azaz \`1\`) | 0 | 1 | \`0\` | \`00\` |
| 1 (\`01\`) | 1 | 1 | \`0\` | \`01\` |
| 2 (\`001\`) | 10 | 2 | \`10\` | \`1010\` |
| 3 (\`0001\`) | 11 | 2 | \`10\` | \`1011\` |
| 7 | 111 | 3 | \`110\` | \`110111\` |
| 13 | 1101 | 4 | \`1110\` | \`11101101\` |
| 21 | 10101 | 5 | \`11110\` | \`1111010101\` |
| 23 | 10111 | 5 | \`11110\` | \`1111010111\` |

**Kitömörítés:** olvass 1-eseket, amíg 0-t nem találsz. Ha *k* darab 1-es volt, akkor **j = k + 1**. Olvasd be a következő **j** bitet, ez az **i** binárisan. Írj ki i darab 0-t és egy 1-est. Ismételd a kód végéig.

### hw_04 3. feladat a): tömörítsd: \`00000000 00000000 00000001 00000001 01\`

1. Futamokra bontás: **23** darab 0, aztán 1 | **7** darab 0, aztán 1 | **1** darab 0, aztán 1. (8 + 8 + 7 = 23 nulla az első 1-es előtt.)
2. 23 = \`10111\` (j = 5) → \`11110\` + \`10111\` = \`1111010111\`
3. 7 = \`111\` (j = 3) → \`110\` + \`111\` = \`110111\`
4. 1 = \`1\` (j = 1) → \`0\` + \`1\` = \`01\`

**Eredmény:** \`1111010111 110111 01\` = **\`111101011111011101\`** (18 bit a 34 helyett).

### hw_04 3. feladat b): kitömörítés: \`11110101 01001011\`

A bitek: \`1111010101001011\`.

1. \`1111\` + \`0\` → 4 darab 1-es, tehát **j = 5**. A következő 5 bit: \`10101\` = **21** → 21 darab 0 és egy 1.
2. \`0\` → 0 darab 1-es, tehát **j = 1**. A következő 1 bit: \`0\` = **0** → csak egy \`1\`.
3. \`10\` → 1 darab 1-es, tehát **j = 2**. A következő 2 bit: \`11\` = **3** → \`0001\`.
4. A kód elfogyott.

**Eredmény:** \`000000000000000000000\` \`1\` \`1\` \`0001\` = **\`000000000000000000000110001\`** (27 bit). A vektor végén ezután még lehetnek 0-k, ha a táblának több sora van.

Ellenőrzés: az eredményt visszatömörítve \`1111010101 00 1011\` jön ki, ez épp a kiinduló kód ✓.

[[feladat:2,3,4]]`,
    exercises: [
      {
        prompt: `Írd fel a \`POSITION\` oszlop vektoraiból: kik a **SALESMAN**-ek, akik **1981-ben** kezdtek, és a **30**-as osztályon vannak? Add meg a vektorműveleteket és az eredményt!`,
        solution: `\`\`\`text
position=SALESMAN  01101000010000
start=1981         01111110110110
deptid=30          01101100010100
ÉS ÉS ───────────  01101000010000   → ALLEN, WARD, MARTIN, TURNER
\`\`\`
Mind a 4 SALESMAN 1981-es és 30-as osztályú.`,
      },
      {
        prompt: `Add meg a bitvektort: **ANALYST VAGY PRESIDENT**, de **NEM a 20-as osztály**. Kik ezek?`,
        solution: `\`\`\`text
ANALYST            00000001000010
PRESIDENT          00000000100000
VAGY ────────────  00000001100010
deptid=20          10010001001010
NEM  ────────────  01101110110101
ÉS   ────────────  00000000100000   → KING
\`\`\`
SCOTT és FORD ANALYST, de mindketten a 20-as osztályon vannak, ezért csak KING marad.`,
      },
      {
        prompt: `Tömörítsd RLE-vel: \`0001 00000001 1\` (a szóközök csak az olvashatóságot segítik).`,
        hint: `Futamok: 3 db 0 + 1, 7 db 0 + 1, 0 db 0 + 1.`,
        solution: `* 3 = \`11\` (j = 2) → \`10\` + \`11\` = \`1011\`
* 7 = \`111\` (j = 3) → \`110\` + \`111\` = \`110111\`
* 0 = \`0\` (j = 1) → \`0\` + \`0\` = \`00\`

Eredmény: **\`101111011100\`**.`,
      },
      {
        prompt: `Tömörítsd RLE-vel: \`1 000001 0000000000001\`.`,
        solution: `Futamok: **0**, **5**, **12**.
* 0 → \`00\`
* 5 = \`101\` (j = 3) → \`110\` + \`101\` = \`110101\`
* 12 = \`1100\` (j = 4) → \`1110\` + \`1100\` = \`11101100\`

Eredmény: **\`0011010111101100\`**.`,
      },
      {
        prompt: `Tömörítsd ki: \`110101011011\`.`,
        solution: `* \`110\` → j = 3, a következő 3 bit \`101\` = 5 → \`000001\`
* \`0\` → j = 1, a következő bit \`1\` = 1 → \`01\`
* \`10\` → j = 2, a következő 2 bit \`11\` = 3 → \`0001\`

Eredmény: **\`000001010001\`**.`,
      },
    ],
  },
  {
    slug: "iot-index-szervezett-tabla",
    title: `7. Indexszervezett tábla (IOT) és overflow szegmens (5. óra)`,
    summary: `Az IOT definíciója és előnyei/hátrányai, az overflow terület (PCTTHRESHOLD, INCLUDING), hogyan látszik az IOT a DBA_TABLES / DBA_INDEXES / DBA_SEGMENTS / DBA_OBJECTS nézetekben, az 5. munkafüzet mind a 9 feladata megoldva (iot_size házival).`,
    status: "complete",
    body: `## 1. Definíciók

> **Indexszervezett tábla (Index-Organized Table, IOT):** olyan tábla, amelynek **sorai magában a B+ fában** tárolódnak, az **elsődleges kulcs** szerint rendezve. A fa levelei a kulcs mellett a sor **összes oszlopát** tartalmazzák. Ez ugyanaz, mint az MSSQL **clustered index**e. (Az Oracle „cluster table” egészen más fogalom, egy későbbi órán lesz.)

| | Heap tábla + PK index | IOT |
|-|-----------------------|-----|
| hol van a sor | a tábla blokkjaiban, rendezetlenül | a B+ fa **leveleiben**, PK szerint rendezve |
| keresés PK szerint | index (fa) + 1 olvasás a táblából | **csak a fa**, nincs plusz olvasás |
| szegmensek | 1 tábla + 1 index | **csak index** (+ esetleg overflow) |
| PK | opcionális | **kötelező** |
| ROWID | fizikai | **logikai** (a PK-ból képzett), mert a sorok vágáskor mozognak |

> **Előny:** a PK szerinti keresés és tartománylekérdezés gyors, és **a nem indexelt oszlopok is egy kereséssel** elérhetők. **Ár:** az indexszerkezet sokkal **nagyobb** (minden oszlop az indexlapokon van), és a lapvágás drágább.

> **Overflow szegmens:** az indexblokk kicsi (8 KiB), ezért a **nagyon széles** sorok egyes oszlopai nem férnek el. Ezek egy külön **overflow** (túlcsordulási) szegmensbe kerülnek, a levélben csak egy mutató marad rájuk. Szabályozása:
> * \`PCTTHRESHOLD p\`: ha egy sor a blokk p%-ánál nagyobb lenne, a „farka” az overflow-ba megy;
> * \`INCLUDING oszlop\`: az adott oszlopig (bezárólag) az indexben marad, a többi az overflow-ba megy.

\`\`\`sql
CREATE TABLE cikk_iot (
    ckod   NUMBER PRIMARY KEY,
    cnev   VARCHAR2(20),
    szin   VARCHAR2(15),
    leiras VARCHAR2(4000)
)
ORGANIZATION INDEX
PCTTHRESHOLD 20
INCLUDING szin
OVERFLOW TABLESPACE users;
\`\`\`

## 2. Hogyan látszik az IOT a katalógusban? (tétel, ezt kérdezik)

| Nézet | Mit látsz |
|-------|-----------|
| \`DBA_TABLES\` | az IOT sora: **\`iot_type = 'IOT'\`**, a **\`tablespace_name\` NULL** (mert a táblának **nincs saját táblaszegmense**, az adat az indexszegmensben van) |
| \`DBA_TABLES\` | az overflow **külön sorként**: \`table_name = 'SYS_IOT_OVER_<IOT object_id>'\`, **\`iot_type = 'IOT_OVERFLOW'\`**, **\`iot_name = <az IOT neve>\`** |
| \`DBA_INDEXES\` | az IOT indexe: **\`index_type = 'IOT - TOP'\`**, a neve a PK-megszorítás neve, vagy \`SYS_IOT_TOP_<object_id>\`. Ebben van a tablespace! |
| \`DBA_SEGMENTS\` | **nincs** szegmens az IOT nevével! Van egy \`INDEX\` típusú szegmens az index nevével, és (ha van overflow) egy \`TABLE\` típusú szegmens \`SYS_IOT_OVER_…\` névvel |
| \`DBA_OBJECTS\` | az IOT \`TABLE\` objektumként szerepel, saját szegmens nélkül. Az indexe külön \`INDEX\` objektum, saját \`data_object_id\`-val |

> **Az IOT mérete** = az \`IOT - TOP\` indexszegmens mérete **+** az overflow szegmens mérete (ha van) **+** az esetleges másodlagos indexeké (ha azokat is beleszámítod).

## 3. Az 5. munkafüzet feladatai, megoldással

**1.** A \`LABOR\` IOT-jai a tablespace-szel. Miért nem látszik a tablespace? \`[table_owner, table_name, tablespace_name]\`
\`\`\`sql
SELECT owner AS table_owner, table_name, tablespace_name
FROM   dba_tables
WHERE  owner = 'LABOR' AND iot_type = 'IOT';
\`\`\`
A \`tablespace_name\` **NULL**, mert az IOT-nak nincs táblaszegmense, a sorai az indexszegmensben vannak. ⚠️ Az \`iot_name IS NOT NULL\` szűrés **rossz**: az az **overflow** táblákat adja vissza, nem az IOT-kat.

**2.** Az IOT-k indexei és azok tablespace-e. Mi az \`index_type\`? \`[table_owner, table_name, index_owner, index_name, tablespace_name]\`
\`\`\`sql
SELECT table_owner, table_name, owner AS index_owner, index_name, tablespace_name, index_type
FROM   dba_indexes
WHERE  table_owner = 'LABOR' AND index_type = 'IOT - TOP';
\`\`\`
Az \`index_type\` értéke **\`IOT - TOP\`**.

**3.** A méretük a \`DBA_SEGMENTS\`-ből. \`[table_owner, table_name, index_name, tablespace_name, bytes]\`
\`\`\`sql
SELECT i.table_owner, i.table_name, i.index_name, s.tablespace_name, s.bytes
FROM   dba_indexes i
JOIN   dba_segments s ON s.owner = i.owner AND s.segment_name = i.index_name
WHERE  i.table_owner = 'LABOR' AND i.index_type = 'IOT - TOP';
\`\`\`
A szegmenst az **index nevével** kell keresni, a tábla nevével nem találod.

**4.** A tábla és az index \`data_object_id\`-ja (\`DBA_OBJECTS\`). \`[table_name, table_type, index_name, data_object_id]\`
\`\`\`sql
SELECT i.table_name,
       ot.object_type    AS table_type,
       ot.data_object_id AS table_data_object_id,
       i.index_name,
       oi.data_object_id AS index_data_object_id
FROM   dba_indexes i
JOIN   dba_objects ot ON ot.owner = i.table_owner AND ot.object_name = i.table_name
                     AND ot.object_type = 'TABLE'
JOIN   dba_objects oi ON oi.owner = i.owner AND oi.object_name = i.index_name
                     AND oi.object_type = 'INDEX'
WHERE  i.table_owner = 'LABOR' AND i.index_type = 'IOT - TOP';
\`\`\`
Figyeld meg az eredményben: **az indexnek van** \`data_object_id\`-ja (az tárolja az adatot), a tábla-objektumnak (az IOT-nak) jellemzően **nincs**. Ugyanazt a logikát látod, mint a particionált táblánál: a logikai objektum és a tárhely szétválik.

**5.** A \`LABOR\` IOT-jainak overflow szegmensei. \`[table_owner, table_name, tablespace_name, segment_type, bytes]\`
\`\`\`sql
SELECT t.owner AS table_owner, t.iot_name AS table_name,
       s.tablespace_name, s.segment_type, s.bytes
FROM   dba_tables t
JOIN   dba_segments s ON s.owner = t.owner AND s.segment_name = t.table_name
WHERE  t.owner = 'LABOR' AND t.iot_type = 'IOT_OVERFLOW';
\`\`\`
Az overflow szegmens típusa **\`TABLE\`**, a neve \`SYS_IOT_OVER_nnnnn\`.

**6.** Az IOT-k és az automatikusan generált overflow-táblájuk neve. \`[table_owner, table_name, overflow_table_name]\`
\`\`\`sql
SELECT t.owner AS table_owner, t.table_name, ov.table_name AS overflow_table_name
FROM   dba_tables t
LEFT JOIN dba_tables ov ON ov.owner = t.owner AND ov.iot_name = t.table_name
                        AND ov.iot_type = 'IOT_OVERFLOW'
WHERE  t.owner = 'LABOR' AND t.iot_type = 'IOT';
\`\`\`
\`LEFT JOIN\`, hogy az overflow nélküli IOT-k is megjelenjenek (NULL-lal).

**7.** A \`LABOR.ARTICLE_IOT\` összes szegmense (index, overflow, másodlagos indexek). \`[owner, table_name, segment_name, segment_type, bytes]\`
\`\`\`sql
SELECT s.owner, 'ARTICLE_IOT' AS table_name, s.segment_name, s.segment_type, s.bytes
FROM   dba_segments s
WHERE  s.owner = 'LABOR'
  AND  s.segment_name IN (
         SELECT index_name FROM dba_indexes                  -- IOT - TOP + másodlagos indexek
         WHERE  table_owner = 'LABOR' AND table_name = 'ARTICLE_IOT'
         UNION
         SELECT table_name FROM dba_tables                   -- overflow
         WHERE  owner = 'LABOR' AND iot_name = 'ARTICLE_IOT');
\`\`\`

**8.** Azok az IOT-k, amelyeknek **pontosan 1** \`DATE\` típusú oszlopuk van.
\`\`\`sql
SELECT   t.owner, t.table_name
FROM     dba_tables t
JOIN     dba_tab_columns c ON c.owner = t.owner AND c.table_name = t.table_name
WHERE    t.iot_type = 'IOT' AND c.data_type = 'DATE'
GROUP BY t.owner, t.table_name
HAVING   COUNT(*) = 1;
\`\`\`

**9. (házi)** \`iot_size(p_owner, p_table)\`: az IOT mérete (index + overflow). „Az owner és a táblanév a katalógusban kis- és nagybetű-érzékeny.”
\`\`\`sql
CREATE OR REPLACE PROCEDURE iot_size(p_owner VARCHAR2, p_table VARCHAR2) IS
    v_size NUMBER;
BEGIN
    SELECT NVL(SUM(s.bytes), 0) INTO v_size
    FROM   dba_segments s
    WHERE  s.owner = UPPER(p_owner)
      AND  s.segment_name IN (
             SELECT index_name FROM dba_indexes
             WHERE  table_owner = UPPER(p_owner) AND table_name = UPPER(p_table)
               AND  index_type = 'IOT - TOP'
             UNION
             SELECT table_name FROM dba_tables
             WHERE  owner = UPPER(p_owner) AND iot_name = UPPER(p_table)
               AND  iot_type = 'IOT_OVERFLOW');
    DBMS_OUTPUT.PUT_LINE(v_size);
END;
/
SET SERVEROUTPUT ON;
EXECUTE iot_size('LABOR', 'ARTICLE_IOT');
\`\`\`
Ha a feladat pontos kimeneti formátumot ír elő (pl. \`Size: nnn\`), azt kövesd. Ha a \`check_plsql\` szerint a másodlagos indexek is beleszámítanak, hagyd el az \`index_type = 'IOT - TOP'\` feltételt. A „kis- és nagybetű-érzékeny” megjegyzés azt jelenti, hogy a katalógusban nagybetűvel kell keresni (\`UPPER\`).

[[feladat:0,1,2,3,4]]`,
    exercises: [
      {
        prompt: `Miért \`NULL\` az IOT \`tablespace_name\`-je a \`DBA_TABLES\`-ban, és hol találod meg, melyik tablespace-ben vannak az adatai?`,
        solution: `Mert az IOT-nak **nincs táblaszegmense**: a sorai az **indexszegmensben** (\`IOT - TOP\`) vannak. A tablespace-t a \`DBA_INDEXES.tablespace_name\`-ből (az \`IOT - TOP\` indexnél) vagy a \`DBA_SEGMENTS\`-ből (az index nevével) olvasod ki. Az overflow-é a \`SYS_IOT_OVER_…\` szegmensnél van.`,
      },
      {
        prompt: `Írj lekérdezést, amely **minden** IOT-ra (az egész adatbázisban) megadja az IOT indexszegmensének méretét és az overflow szegmens méretét (0, ha nincs). \`[owner, table_name, index_bytes, overflow_bytes]\``,
        hint: `Két \`LEFT JOIN\` a \`DBA_SEGMENTS\`-re: egy az \`IOT - TOP\` index nevével, egy az overflow tábla nevével.`,
        solution: `\`\`\`sql
SELECT t.owner, t.table_name,
       NVL(si.bytes, 0) AS index_bytes,
       NVL(so.bytes, 0) AS overflow_bytes
FROM   dba_tables t
JOIN   dba_indexes i   ON i.table_owner = t.owner AND i.table_name = t.table_name
                      AND i.index_type = 'IOT - TOP'
LEFT JOIN dba_segments si ON si.owner = i.owner AND si.segment_name = i.index_name
LEFT JOIN dba_tables  ov  ON ov.owner = t.owner AND ov.iot_name = t.table_name
                         AND ov.iot_type = 'IOT_OVERFLOW'
LEFT JOIN dba_segments so ON so.owner = ov.owner AND so.segment_name = ov.table_name
WHERE  t.iot_type = 'IOT';
\`\`\``,
      },
      {
        prompt: `Melyik értéket veszi fel a \`DBA_INDEXES.index_type\` egy IOT indexénél?`,
        answer: [`IOT - TOP`],
        check: "text",
        solution: `**\`IOT - TOP\`** (szóközökkel a kötőjel körül!).`,
      },
      {
        prompt: `Hány IOT van felhasználónként (nem rendszer-felhasználók), csökkenő sorrendben? \`[owner, iot_count]\``,
        solution: `\`\`\`sql
SELECT   owner, COUNT(*) AS iot_count
FROM     dba_tables
WHERE    iot_type = 'IOT' AND owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY iot_count DESC;
\`\`\``,
      },
      {
        prompt: `Igaz vagy hamis? „Az IOT-ban a ROWID ugyanúgy a sor fizikai helye, mint a heap táblában.”`,
        solution: `**Hamis.** Az IOT sorai lapvágáskor **mozognak** a B+ fában, ezért nincs állandó fizikai címük. Az IOT sorainak **logikai ROWID**-ja van, ami az elsődleges kulcsra épül (és egy „becsült” blokkcímre). A \`DBMS_ROWID\` fizikai bontása (fájl, blokk, sor) ezért **heap táblákra** való.`,
      },
    ],
  },
  {
    slug: "hash-indexek",
    title: `8. Hash indexek: statikus, kiterjeszthető, lineáris (5. óra, hw_05; papíros 2. feladat, 20 p)`,
    summary: `A hash index definíciója, a statikus hash tábla legfelső/legalsó bitekkel és túlcsordulási láncokkal (egy ZH-típusú feladat lépésenként), a kiterjeszthető hash (könyvtár, i és j) és a lineáris hash szabályai, a hw_05 mindkét feladata végigszámolva, gyakorlófeladatok.`,
    status: "complete",
    body: `## 1. Közös definíciók

> **Hash index:** a **h(K)** hash függvény a K kulcsot egy **vödör (bucket)** sorszámára képezi. A vödör egy vagy több **blokk**, ezekben vannak a rekordok (vagy a rájuk mutató mutatók). Keresés: kiszámolod h(K)-t, és csak az adott vödröt olvasod. **Egyenlőségre** keresésnél nagyon gyors (ideális esetben 1 blokkolvasás), **tartománylekérdezésre nem jó**, mert a szomszédos kulcsok szétszóródnak.

A feladatokban a h(K) értékét **bitsorozatként** adják meg (pl. \`010110\`), és meg van mondva, hogy a **legfelső (most significant)** vagy a **legalsó (least significant)** biteket kell használni.

> **Túlcsordulás (overflow) és lánc:** ha a vödör tele van, egy új **túlcsordulási blokkot** fűzünk a végére (**láncolás, chaining**). Minél hosszabbak a láncok, annál lassabb a keresés.

## 2. Statikus hash tábla

> **Statikus hash:** a vödrök száma **rögzített** (B darab). A k bites címzésnél B = 2^k vödör van, \`000 … 0\`-tól \`111 … 1\`-ig. A rekord abba a vödörbe kerül, amelynek a sorszáma a hash érték kiválasztott k bitje. Ha a vödör tele van, **túlcsordulási blokkot láncolunk** hozzá. A tábla soha nem nő, csak a láncok hosszabbodnak.

**Recept:**
1. Írd fel **mind a 2^k vödröt** (az üreseket is!), mindegyikhez egy blokkot.
2. Minden kulcsnál vedd a kért **k bitet** (legfelső = balról, legalsó = jobbról).
3. Tedd a kulcsot a vödör blokkjába, **beszúrási sorrendben**. Ha a blokk tele, új blokk a lánc végére.

### Kidolgozott ZH-típusú feladat (20 pont)

> Rajzold le a **statikus** hash tábla állapotát a kulcsok beszúrása után. A tábla a 6 bites hash értékek **3 legfelső bitjét** használja. Egy vödör legfeljebb **2 kulcsot** tárol, a túlcsorduló kulcsok **láncolt vödrökbe** kerülnek.
> {110010, 001101, 110111, 011000, 110001, 001011, 100110, 110100, 110011}

**1. lépés: a 3 legfelső bit minden kulcsra:**

| Kulcs | Legfelső 3 bit | Vödör |
|-------|---------------|-------|
| 110010 | **110** | 6 |
| 001101 | **001** | 1 |
| 110111 | **110** | 6 |
| 011000 | **011** | 3 |
| 110001 | **110** | 6 |
| 001011 | **001** | 1 |
| 100110 | **100** | 4 |
| 110100 | **110** | 6 |
| 110011 | **110** | 6 |

**2. lépés: beszúrás sorrendben** (kapacitás 2):

* 110010 → 110;
* 001101 → 001;
* 110111 → 110 (az első blokk megtelik);
* 011000 → 011;
* 110001 → a 110 tele van → **túlcsordulási blokk**;
* 001011 → 001 (megtelik);
* 100110 → 100;
* 110100 → a 110 túlcsordulási blokkjába (most az is megtelik);
* 110011 → a 110 lánca tele → **második** túlcsordulási blokk.

**Végállapot:**

\`\`\`text
vödör   blokk               túlcsordulási lánc
 000 →  [      ,       ]
 001 →  [001101, 001011]
 010 →  [      ,       ]
 011 →  [011000,       ]
 100 →  [100110,       ]
 101 →  [      ,       ]
 110 →  [110010, 110111] → [110001, 110100] → [110011,       ]
 111 →  [      ,       ]
\`\`\`

Ellenőrzés: 2 + 1 + 1 + 5 = 9 kulcs ✓. Az üres vödröket is rajzold le, mert a statikus táblában **mind a 8 létezik**! A 110-s vödörben 5 kulcs van, ezért **3 blokkos lánc** kell (⌈5/2⌉ = 3).

> **Tanulság (ezt kérdezhetik szóban/írásban):** a statikus hash **rosszul skálázódik**, ha a kulcsok eloszlása egyenetlen (itt 8 vödörből 4 üres, a 110-s lánc 3 hosszú). Erre megoldás a **dinamikus** hash: kiterjeszthető vagy lineáris.

[[feladat:0,1]]

## 3. Kiterjeszthető (extendible) hash

> **Kiterjeszthető hash:**
> * van egy **könyvtár (directory)**: egy 2^i elemű mutatótömb, ahol **i** a **globális** bitmélység. A rekord helyét a h(K) **legfelső i bitje** adja: ez a könyvtár indexe, a mutató viszi a vödörhöz;
> * minden vödörnek van egy **lokális** mélysége, **j ≤ i**: ennyi (legfelső) bit kell ahhoz, hogy a vödröt egyértelműen azonosítsuk. Ha j < i, akkor **2^(i−j) könyvtárbejegyzés mutat ugyanarra a vödörre**;
> * **nincs túlcsordulási lánc**: tele vödörnél vágás jön.

**Beszúrási szabály (hw_05):** keresd meg a vödröt a legfelső i bit alapján. Ha van hely, tedd bele. Ha **tele van**:
* ha **j < i**: hozz létre egy új vödröt, és oszd szét a rekordokat (a régiekkel és az újjal együtt) a **(j + 1)-edik bit** szerint. Mindkét vödör mélysége **j + 1** lesz, és a könyvtár érintett mutatói közül azok, amelyeknek a (j+1)-edik bitje 1, az új vödörre mutatnak;
* ha **j = i**: előbb **i-t eggyel növeld**, és **duplázd a könyvtárat** (minden régi bejegyzésből kettő lesz, ugyanarra a vödörre mutatva). Ezután már j < i, tehát alkalmazd az előző pontot.

Ha a szétosztás után a kulcs még mindig nem fér be (mert minden rekord ugyanabba a félbe esett), ismételd meg a vágást.

### hw_05 1. feladat

Kezdőállapot (i = 1, kapacitás 2):
\`\`\`text
könyvtár   vödör            j
   0   →   [0001]           1
   1   →   [1001, 1101]     1
\`\`\`
Beszúrás: {0011, 0110, 1011, 0111, 1110, 1111, 0100}

**0011:** legfelső bit 0 → \`[0001, 0011]\`, befér.

**0110:** legfelső bit 0 → a vödör tele, **j = 1 = i** → **i = 2**, a könyvtár duplázódik (00, 01 → régi 0-s vödör; 10, 11 → régi 1-es). A 0-s vödröt a **2. bit** szerint vágjuk: 0001 és 0011 2. bitje 0, a 0110-é 1.
\`\`\`text
könyvtár   vödör            j
  00   →   [0001, 0011]     2
  01   →   [0110]           2
  10   →   [1001, 1101]     1
  11   →   ↑ ugyanaz (a 10-ssel közös)
\`\`\`
**1011:** legfelső 2 bit 10 → a \`[1001, 1101]\` tele, **j = 1 < i = 2** → vágás a **2. bit** szerint: 1001 → 10, 1101 → 11, 1011 → 10.
\`\`\`text
  00   →   [0001, 0011]     2
  01   →   [0110]           2
  10   →   [1001, 1011]     2
  11   →   [1101]           2
\`\`\`
**0111:** 01 → \`[0110, 0111]\`. **1110:** 11 → \`[1101, 1110]\`. Mindkettő befér.

**1111:** 11 → tele, **j = 2 = i** → **i = 3**, duplázás. A 11-es vödröt a **3. bit** szerint vágjuk: 1101 → 110; 1110 és 1111 → 111.
\`\`\`text
könyvtár   vödör            j
  000  →   [0001, 0011]     2     (a 001 is ide mutat)
  001  →   ↑
  010  →   [0110, 0111]     2     (a 011 is ide mutat)
  011  →   ↑
  100  →   [1001, 1011]     2     (a 101 is ide mutat)
  101  →   ↑
  110  →   [1101]           3
  111  →   [1110, 1111]     3
\`\`\`
**0100:** 010 → a \`[0110, 0111]\` tele, **j = 2 < i = 3** → vágás a **3. bit** szerint: 0110, 0111 → 011; 0100 → 010.

**Végállapot (i = 3):**
\`\`\`text
könyvtár   vödör            j
  000  →   [0001, 0011]     2
  001  →   ↑ (közös a 000-val)
  010  →   [0100]           3
  011  →   [0110, 0111]     3
  100  →   [1001, 1011]     2
  101  →   ↑ (közös a 100-zal)
  110  →   [1101]           3
  111  →   [1110, 1111]     3
\`\`\`
Ellenőrzés: 3 + 7 = 10 rekord ✓. Minden vödörben a rekordok legfelső j bitje azonos ✓.

[[feladat:2]]

## 4. Lineáris hash

> **Lineáris hash:**
> * **n** vödör van, sorszámuk 0 … n − 1 (binárisan). A címzéshez a h(K) **legalsó i bitjét** használjuk, ahol **i = ⌈log₂ n⌉**;
> * ha a legalsó i bit **m** értéke **≥ n** (azaz ilyen vödör még nincs), akkor a legfelső bitet (az i biten belül) 0-ra cseréljük: a rekord az **m − 2^(i−1)** sorszámú vödörbe kerül;
> * a tele vödörhöz **túlcsordulási blokkot láncolunk**;
> * egy **küszöb** átlépésekor **egyetlen új vödröt** veszünk fel (n → n + 1). Az új vödör sorszáma \`1a₂…aᵢ\`, és **csak a \`0a₂…aᵢ\` vödör** rekordjait osztjuk szét közte és az új között (a legalsó i bit szerint);
> * ha n > 2^i lesz, **i-t eggyel növeljük**.
>
> A tábla tehát **lineárisan, vödrönként** nő, nem duplázással. Ezért nincs könyvtár.

A **tankönyvi** küszöb: ha a rekordok száma **r** és **r / n > küszöb** (pl. 1,7 rekord/vödör), új vödör jön. A **hw_05** ezt a láncok hosszával fogalmazza meg: egy blokk **2** rekordot tárol, és egy vödör (lánc) legfeljebb **b_max = 4** rekordot tarthat. Ha egy beszúrással ezt **túllépnénk**, előbb új vödröt veszünk fel. Az alábbi megoldás ezt az értelmezést követi. Ha az órán másképp mondták, a lépések ugyanígy mennek, csak a küszöb más.

### hw_05 2. feladat

Kezdőállapot: n = 2, i = 1:
\`\`\`text
vödör 0: [0000, 1110]
vödör 1: [0101]
\`\`\`
Beszúrás: {0001, 0110, 1011, 0111, 1100, 1111, 0100} (legalsó i bit!)

* **0001** → legalsó bit 1 → \`1: [0101, 0001]\`.
* **0110** → 0 → a 0-s vödör tele → túlcsordulási blokk: \`0: [0000, 1110] → [0110]\`.
* **1011** → 1 → \`1: [0101, 0001] → [1011]\`.
* **0111** → 1 → \`1: [0101, 0001] → [1011, 0111]\`: 4 rekord, épp a határ, még befér.
* **1100** → 0 → \`0: [0000, 1110] → [0110, 1100]\`: szintén 4.
* **1111** → 1 → az 1-es vödörben 5 rekord lenne > 4 → **új vödör: 2 = \`10\`**. n = 3 > 2¹, tehát **i = 2**. A \`10\` párja a **\`00\`**: a 0-s vödör rekordjait a legalsó 2 bit szerint osztjuk szét: 0000 → 00, 1110 → 10, 0110 → 10, 1100 → 00.
  \`\`\`text
  00: [0000, 1100]
  01: [0101, 0001] → [1011, 0111]
  10: [1110, 0110]
  \`\`\`
  Az 1111 legalsó 2 bitje \`11\` = 3 ≥ n = 3, tehát a \`01\` vödörbe menne, de ott megint 5 lenne → **új vödör: 3 = \`11\`**, n = 4 (= 2², i marad 2). Az \`11\` párja a **\`01\`**: 0101 → 01, 0001 → 01, 1011 → 11, 0111 → 11, és most már az 1111 is → 11.
* **0100** → \`00\` → tele → túlcsordulási blokk.

**Végállapot (n = 4, i = 2):**
\`\`\`text
00: [0000, 1100] → [0100]
01: [0101, 0001]
10: [1110, 0110]
11: [1011, 0111] → [1111]
\`\`\`
Ellenőrzés: 3 + 7 = 10 rekord ✓, minden rekord legalsó 2 bitje egyezik a vödre sorszámával ✓.

[[feladat:3,4]]`,
    exercises: [
      {
        prompt: `Rajzold le a statikus hash táblát, ha a 6 bites hash értékek **3 legalsó bitjét** használjuk, a vödörkapacitás 2, túlcsordulás láncolással: {100110, 011011, 110110, 001001, 111110, 000011, 101011, 010001}.`,
        hint: `Most a **jobb oldali** 3 bit számít: 100**110** → 110.`,
        solution: `| Kulcs | Legalsó 3 bit |
|-------|---------------|
| 100110 | 110 |
| 011011 | 011 |
| 110110 | 110 |
| 001001 | 001 |
| 111110 | 110 |
| 000011 | 011 |
| 101011 | 011 |
| 010001 | 001 |

\`\`\`text
 000 → [      ,       ]
 001 → [001001, 010001]
 010 → [      ,       ]
 011 → [011011, 000011] → [101011,       ]
 100 → [      ,       ]
 101 → [      ,       ]
 110 → [100110, 110110] → [111110,       ]
 111 → [      ,       ]
\`\`\``,
      },
      {
        prompt: `A fenti kidolgozott statikus hash feladatban **hány blokkot** használ összesen a tábla (az üres vödrök blokkjait is beleszámítva), és mennyi a leghosszabb lánc?`,
        solution: `8 vödör, mindegyik 1 blokkal = 8 blokk, plusz a túlcsordulási blokkok: a 110-nál 2 → **8 + 2 = 10 blokk**. A leghosszabb lánc a **110**-s vödöré: **3 blokk**. Ott egy kereséshez a legrosszabb esetben 3 blokkot kell olvasni.`,
      },
      {
        prompt: `Kiterjeszthető hash, kapacitás 2, kezdőállapot i = 1: \`0 → [0101]\` (j = 1), \`1 → [1100]\` (j = 1). Szúrd be: {0010, 1010, 1110, 0111, 1000, 0000}. Rajzold le a könyvtárat minden új vödör létrejötte után!`,
        solution: `* **0010** → 0 → \`[0101, 0010]\`. **1010** → 1 → \`[1100, 1010]\`.
* **1110** → 1 → tele, j = 1 = i → **i = 2**, duplázás; az 1-es vödör vágása a 2. bit szerint: 1100 → 11, 1010 → 10, 1110 → 11.
  \`\`\`text
  00 → [0101, 0010]  j=1   (a 01 is ide mutat)
  01 → ↑
  10 → [1010]        j=2
  11 → [1100, 1110]  j=2
  \`\`\`
* **0111** → 01 → a \`[0101, 0010]\` tele, j = 1 < 2 → vágás a 2. bit szerint: 0010 → 00, 0101 → 01, 0111 → 01.
  \`\`\`text
  00 → [0010]        j=2
  01 → [0101, 0111]  j=2
  10 → [1010]        j=2
  11 → [1100, 1110]  j=2
  \`\`\`
* **1000** → 10 → \`[1010, 1000]\`. **0000** → 00 → \`[0010, 0000]\`. Nincs több vágás.

Végállapot (i = 2): \`00 → [0010, 0000]\`, \`01 → [0101, 0111]\`, \`10 → [1010, 1000]\`, \`11 → [1100, 1110]\`, mind j = 2.`,
      },
      {
        prompt: `Lineáris hashnél n = 5 vödör van (000 … 100), i = 3. Melyik vödörbe kerül a \`…110\` és a \`…011\` végű kulcs?`,
        solution: `* \`110\` = 6 ≥ n = 5, ilyen vödör még nincs → a legfelső bitet 0-ra cseréljük: \`010\` = **2-es vödör**.
* \`011\` = 3 < 5 → **3-as vödör** (\`011\`).`,
      },
      {
        prompt: `Statikus, kiterjeszthető vagy lineáris? Melyikre igaz: (a) van könyvtára, ami duplázódik; (b) a vödrök száma soha nem változik; (c) egyszerre egy vödörrel nő, és a túlcsordulást láncolással kezeli; (d) nincs túlcsordulási lánc?`,
        solution: `* (a) **kiterjeszthető**: a 2^i elemű könyvtár duplázódik, amikor j = i vödröt kell vágni;
* (b) **statikus**;
* (c) **lineáris**;
* (d) **kiterjeszthető**: tele vödörnél mindig vágás jön, lánc nincs. (Ha nagyon sok azonos hash-értékű kulcs van, ott is kellhet túlcsordulás, de a ZH-feladatokban nem.)`,
      },
    ],
  },
  {
    slug: "particionalas",
    title: `9. Particionálás: range, list, hash, összetett (6. óra)`,
    summary: `A particionálás célja és fajtái definíciókkal, a CREATE TABLE … PARTITION BY szintaxis, a logikai és fizikai objektumok (DBA_OBJECTS, DBA_SEGMENTS), a DBA_PART_TABLES / TAB_PARTITIONS / PART_KEY_COLUMNS / PART_INDEXES nézetek, a 6. munkafüzet mind a 8 feladata megoldva (empty_blocks dinamikus SQL-lel).`,
    status: "complete",
    body: `## 1. Definíciók

> **Particionálás:** egy nagy tábla (vagy index) felosztása kisebb, külön kezelhető darabokra, ezek a **partíciók**. A partíciókat egy **partíciókulcs** (egy vagy több oszlop) értéke határozza meg. Minden partíció **saját szegmens**, ezért **külön tablespace-be** tehető, és külön menthető, indexelhető vagy újraépíthető. A lekérdezések **párhuzamosan** dolgozhatnak a partíciókon, és egy jó \`WHERE\` feltétel mellett csak a szükséges partíciókat olvassák (**partition pruning**).

Mikor kell (06.sql)? Ha egy tábla nagyon nagy, és részeit más lemezre akarjuk tenni (gyakran használtat SSD-re, régit HDD-re), ha párhuzamos feldolgozás kell, vagy ha egy egész táblás indexépítés túl sokáig tartana.

| Fajta | Mi alapján | Szintaxis |
|-------|-----------|-----------|
| **range** | értéktartományok (tipikusan dátum, év) | \`PARTITION BY RANGE (year) (PARTITION p2022 VALUES LESS THAN (2023), …, PARTITION pmax VALUES LESS THAN (MAXVALUE))\` |
| **list** | felsorolt értékek (ország, hónap, …) | \`PARTITION BY LIST (month) (PARTITION q1 VALUES (1, 2, 3), …, PARTITION pd VALUES (DEFAULT))\` |
| **hash** | hash függvény egy vagy több oszlopra (egyenletes szétosztás) | \`PARTITION BY HASH (year, month) (PARTITION p1, PARTITION p2, …)\` vagy \`PARTITIONS 4\` |
| **összetett (composite)** | az előzők hierarchikus kombinációja: partíciók, azokon belül **alpartíciók** | \`PARTITION BY RANGE (year) SUBPARTITION BY HASH (id) SUBPARTITIONS 4 (…)\` |

> **Range-partíció határa:** a \`VALUES LESS THAN (x)\` **szigorúan kisebb**: a \`p2022 VALUES LESS THAN (2023)\` partícióba a \`year < 2023\` sorok kerülnek (az előző partíció határa fölött). Ha nincs \`MAXVALUE\` partíció, a túl nagy értékű sor beszúrása **hibát dob** (ORA-14400).

> **Logikai és fizikai objektum (tétel):** a **particionált tábla maga csak logikai objektum**, nincs saját szegmense: a \`DBA_OBJECTS\`-ben \`object_type = 'TABLE'\`, \`data_object_id\` **NULL**, a \`DBA_TABLES.tablespace_name\` **NULL**, a \`DBA_SEGMENTS\`-ben pedig **nincs** \`TABLE\` típusú sora. A **partíciók** a fizikai objektumok: \`DBA_OBJECTS\`-ben \`TABLE PARTITION\` a \`subobject_name\`-mel és saját \`data_object_id\`-val, a \`DBA_SEGMENTS\`-ben \`segment_type = 'TABLE PARTITION'\`, \`segment_name\` = a tábla neve, \`partition_name\` = a partíció neve. Összetettnél csak az **alpartícióknak** van szegmensük (\`TABLE SUBPARTITION\`).

Ezért a **tábla teljes mérete** = \`SUM(bytes)\` a \`DBA_SEGMENTS\`-ből, ahol \`segment_name\` = a tábla és \`segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION')\`. A ZH-n a „**regular** table” / „**non-partitioned**” kitétel pont ezt különíti el: \`segment_type = 'TABLE'\`.

> **Lokális és globális partícionált index:** a **lokális** index ugyanúgy van particionálva, mint a tábla (partíciónként egy indexpartíció), a **globális** saját particionálású (vagy nincs particionálva). A \`DBA_PART_INDEXES.locality\` mutatja: \`LOCAL\` / \`GLOBAL\`.

## 2. A partíciós nézetek

| Nézet | Fontos oszlopok |
|-------|-----------------|
| \`DBA_PART_TABLES\` | \`owner\`, \`table_name\`, \`partitioning_type\` (RANGE/LIST/HASH), \`subpartitioning_type\`, \`partition_count\`, \`def_tablespace_name\` |
| \`DBA_TAB_PARTITIONS\` | \`table_owner\`, \`table_name\`, \`partition_name\`, \`partition_position\`, \`high_value\` (**LONG**!), \`tablespace_name\`, \`num_rows\`, \`blocks\` (statisztikából!), \`subpartition_count\` |
| \`DBA_TAB_SUBPARTITIONS\` | \`table_owner\`, \`table_name\`, \`partition_name\`, \`subpartition_name\`, \`tablespace_name\`, … |
| \`DBA_PART_KEY_COLUMNS\` | \`owner\`, \`name\` (a tábla vagy index neve!), \`object_type\` (TABLE/INDEX), \`column_name\`, \`column_position\` |
| \`DBA_PART_INDEXES\` | \`owner\`, \`index_name\`, \`table_name\`, \`partitioning_type\`, \`locality\` |
| \`DBA_IND_PARTITIONS\` | \`index_owner\`, \`index_name\`, \`partition_name\`, \`tablespace_name\`, … |

> ⚠️ A \`DBA_TAB_PARTITIONS.num_rows\`/\`blocks\` **statisztika**, csak a \`DBMS_STATS.GATHER_TABLE_STATS(…)\` futtatása után van kitöltve (a 06_create_tables.sql ezt meg is teszi). Ha NULL, a \`DBA_SEGMENTS.blocks\`-ot használd (az a **foglalt** blokkok száma).
> ⚠️ A \`high_value\` **\`LONG\`** típusú: a \`SELECT\` listában kiírható, de **\`WHERE\`-ben nem szűrhető** (\`LIKE\`, \`=\`). Szűrj inkább \`partition_position\`-re vagy \`partition_name\`-re.

## 3. A 6. munkafüzet feladatai, megoldással

A táblák (06_create_tables.sql): \`SALES\` (RANGE \`year\` szerint, p2022–p2025 a USERS-ben, p2026 az EXAMPLE-ben), \`SALES_HASH\` (HASH \`(year, month)\`, p1–p5), \`SALES_BY_QUARTER\` (LIST \`month\` szerint, q1–q4).

**1.** A \`LABOR\` particionált táblái és a particionálás fajtája. \`[owner, table_name, partitioning_type]\`
\`\`\`sql
SELECT owner, table_name, partitioning_type
FROM   dba_part_tables
WHERE  owner = 'LABOR';
\`\`\`

**2.** A \`LABOR.SALES\` partíciói a blokkok számával. \`[partition_name, tablespace_name, blocks]\`
\`\`\`sql
SELECT partition_name, tablespace_name, blocks
FROM   dba_tab_partitions
WHERE  table_owner = 'LABOR' AND table_name = 'SALES'
ORDER  BY partition_position;
\`\`\`
Itt \`table_owner\` az oszlop neve, nem \`owner\`!

**3.** Melyik oszlop(ok) szerint particionált a \`LABOR.SALES\`, és hányadik helyen a kulcsban? \`[owner, name, column_name, column_position]\`
\`\`\`sql
SELECT owner, name, column_name, column_position
FROM   dba_part_key_columns
WHERE  owner = 'LABOR' AND name = 'SALES' AND object_type = 'TABLE';
\`\`\`
Eredmény: \`YEAR\`, 1. A \`SALES_HASH\`-re két sor jön: \`YEAR\` (1), \`MONTH\` (2).

**4.** A \`SALES_BY_QUARTER\` **második** partíciójának megengedett értékei. \`[table_owner, table_name, partition_name, high_value]\`
\`\`\`sql
SELECT table_owner, table_name, partition_name, high_value
FROM   dba_tab_partitions
WHERE  table_owner = 'LABOR' AND table_name = 'SALES_BY_QUARTER'
  AND  partition_position = 2;
\`\`\`
Eredmény: \`Q2\`, \`high_value = 4, 5, 6\`. List-partíciónál a \`high_value\` a **felsorolt értékek listája**, range-nél a \`LESS THAN\` **határ**.

**5.** A \`LABOR.SALES\` logikai és fizikai részei a \`DBA_OBJECTS\`-ben. \`[object_name, object_type, subobject_name, object_id, data_object_id]\`
\`\`\`sql
SELECT object_name, object_type, subobject_name, object_id, data_object_id
FROM   dba_objects
WHERE  owner = 'LABOR' AND object_name = 'SALES'
ORDER  BY object_type, subobject_name;
\`\`\`
1 sor \`TABLE\` (a \`data_object_id\` NULL) + 5 sor \`TABLE PARTITION\` (P2022 … P2026, saját \`data_object_id\`-val).

**6.** Ugyanez a \`DBA_SEGMENTS\`-ben. \`[segment_name, segment_type, bytes]\`
\`\`\`sql
SELECT segment_name, partition_name, segment_type, tablespace_name, bytes
FROM   dba_segments
WHERE  owner = 'LABOR' AND segment_name = 'SALES';
\`\`\`
Csak a **partícióknak** van szegmensük (\`TABLE PARTITION\`), a táblának nincs. (Ha egy partícióba még nem került sor, a halasztott szegmenslétrehozás miatt annak sem.)

**7.** A táblák (indexek nélkül) összmérete csökkenőn, a particionált és az alpartícionált táblákkal együtt. \`[owner, table_name, segment_count, total_bytes]\`
\`\`\`sql
SELECT   owner, segment_name AS table_name, COUNT(*) AS segment_count, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION')
GROUP BY owner, segment_name
ORDER BY total_bytes DESC;
\`\`\`
A partíciók szegmenseinek \`segment_name\`-je **a tábla neve**, ezért a \`GROUP BY owner, segment_name\` épp táblánként adja össze őket.

**8. (házi)** \`empty_blocks(p_owner, p_table)\`: a táblának foglalt, de üres blokkok száma, particionált táblára is. Kimenet: \`Empty Blocks: nnn\`.

> **Dinamikus SQL (\`EXECUTE IMMEDIATE\`):** ha a lekérdezett **tábla neve** paraméter, a lekérdezést **szövegként** kell összerakni, mert statikus SQL-ben a tábla neve nem lehet változó. \`EXECUTE IMMEDIATE v_sql INTO v_valtozo;\` lefuttatja, és az egysoros eredményt a változóba teszi.

\`\`\`sql
CREATE OR REPLACE PROCEDURE empty_blocks(p_owner VARCHAR2, p_table VARCHAR2) IS
    v_sql          VARCHAR2(1000);
    v_total_blocks NUMBER;
    v_used_blocks  NUMBER;
    v_empty_blocks NUMBER;
BEGIN
    -- foglalt blokkok: a tábla összes (partíció)szegmense
    SELECT NVL(SUM(blocks), 0) INTO v_total_blocks
    FROM   dba_segments
    WHERE  owner = UPPER(p_owner) AND segment_name = UPPER(p_table)
      AND  segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION');

    -- használt blokkok: a különböző (fájl, blokk) párok a ROWID-okból
    v_sql := 'SELECT COUNT(*) FROM (SELECT DISTINCT '
          || 'DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) f, '
          || 'DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID) b '
          || 'FROM ' || p_owner || '.' || p_table || ')';
    EXECUTE IMMEDIATE v_sql INTO v_used_blocks;

    v_empty_blocks := v_total_blocks - v_used_blocks;
    DBMS_OUTPUT.PUT_LINE('Empty Blocks: ' || v_empty_blocks);
END;
/
EXECUTE check_plsql('empty_blocks(''labor'', ''customers'')');
EXECUTE check_plsql('empty_blocks(''labor'', ''sales'')');
\`\`\`
Miért a **(fájl, blokk) pár**? Mert a blokkszám **csak fájlon belül** egyedi, és a partíciók különböző fájlokban (sőt különböző tablespace-ekben) lehetnek. Két partíció blokkja **soha nem közös**, mert minden blokk egy szegmenshez tartozik. Ezért a párok száma épp a használt blokkok száma.

[[feladat:0,1,2,3,4]]`,
    exercises: [
      {
        prompt: `Írd meg a \`CREATE TABLE\` utasítást: \`orders(id NUMBER PRIMARY KEY, odate DATE, amount NUMBER)\`, **range** particionálás az \`odate\` szerint: 2025 előtti, 2025-ös, 2026-os rendelések, és egy partíció minden későbbinek.`,
        solution: `\`\`\`sql
CREATE TABLE orders (
    id     NUMBER PRIMARY KEY,
    odate  DATE,
    amount NUMBER
)
PARTITION BY RANGE (odate) (
    PARTITION p_old  VALUES LESS THAN (DATE '2025-01-01'),
    PARTITION p2025  VALUES LESS THAN (DATE '2026-01-01'),
    PARTITION p2026  VALUES LESS THAN (DATE '2027-01-01'),
    PARTITION p_max  VALUES LESS THAN (MAXVALUE)
);
\`\`\`
A \`LESS THAN\` szigorú, ezért a 2025-ös partíció határa **2026. jan. 1.**`,
      },
      {
        prompt: `Írj lekérdezést: a particionált táblák (az egész adatbázisban) tulajdonosa, neve, fajtája és a partíciók száma, csak a legalább 4 partíciósak. \`[owner, table_name, partitioning_type, partition_count]\``,
        solution: `\`\`\`sql
SELECT owner, table_name, partitioning_type, partition_count
FROM   dba_part_tables
WHERE  partition_count >= 4;
\`\`\`
Vagy a \`DBA_TAB_PARTITIONS\`-ből számolva:
\`\`\`sql
SELECT   p.owner, p.table_name, p.partitioning_type, COUNT(*) AS partition_count
FROM     dba_part_tables p
JOIN     dba_tab_partitions tp ON tp.table_owner = p.owner AND tp.table_name = p.table_name
GROUP BY p.owner, p.table_name, p.partitioning_type
HAVING   COUNT(*) >= 4;
\`\`\``,
      },
      {
        prompt: `Melyik particionált táblák partíciói vannak **egynél több tablespace-ben**? \`[table_owner, table_name, ts_count]\``,
        solution: `\`\`\`sql
SELECT   table_owner, table_name, COUNT(DISTINCT tablespace_name) AS ts_count
FROM     dba_tab_partitions
GROUP BY table_owner, table_name
HAVING   COUNT(DISTINCT tablespace_name) > 1;
\`\`\`
A \`LABOR.SALES\` ilyen (USERS + EXAMPLE).`,
      },
      {
        prompt: `**(ZH 3. variáns)** A top 5 felhasználó a **particionált** táblák (partíció- és alpartíció-szegmensek) összmérete szerint. \`[owner, total_bytes]\``,
        solution: `\`\`\`sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type IN ('TABLE PARTITION', 'TABLE SUBPARTITION')
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 5 ROWS ONLY;
\`\`\`
Összetett particionálásnál csak az alpartícióknak van szegmensük, a sima particionáltnál csak a partícióknak, így nem számolunk semmit kétszer.`,
      },
      {
        prompt: `Egy partícionált táblánál a \`DBA_TABLES.tablespace_name\` NULL, és a \`DBA_SEGMENTS\`-ben nincs \`TABLE\` típusú sora. Miért, és hol vannak az adatai?`,
        solution: `Mert a particionált tábla csak **logikai** objektum, amelynek **nincs saját szegmense** (a \`DBA_OBJECTS\`-ben a \`data_object_id\` is NULL). Az adatai a **partíciók** szegmenseiben vannak: \`DBA_SEGMENTS\` \`segment_type = 'TABLE PARTITION'\` (összetettnél \`TABLE SUBPARTITION\`), a \`partition_name\` oszloppal. A tablespace-eket a \`DBA_TAB_PARTITIONS.tablespace_name\` adja, az alapértelmezettet a \`DBA_PART_TABLES.def_tablespace_name\`.`,
      },
    ],
  },
  {
    slug: "kidolgozott-probazh",
    title: `10. Kidolgozott ZH-feladatok, próba-ZH, stratégia és puska-lista`,
    summary: `Hét saját, ZH-szerkezetű feladat (5 gépes SQL + 2 papíros) elemzéssel, csapdákkal és pontos megoldással; egy további próba-ZH rejtett megoldással; időbeosztás, beadás előtti ellenőrzőlista, és mit írj fel a kézírásos jegyzetedre.`,
    status: "complete",
    body: `## 1. Kidolgozott feladatok: gépes rész (95 pont)

A feladatok saját írásúak, a ZH gépes részének szerkezetében és pontozásával. Előbb próbáld meg
magad (a lecke végi első feladat leírja, hogyan), utána nézd a megoldást.

### 1. feladat (15 p)

> **a)** Azok a felhasználók, akiknek **legalább 1, de kevesebb mint 15 táblájuk** van: a nevük és a tábláik száma, a tábláik száma szerint **csökkenő** sorrendben. \`[user_name, table_count]\`
> **b)** Módosítsd: **hány** ilyen felhasználó van? \`[user_count]\`

**Elemzés:** táblák → \`DBA_TABLES\`, „felhasználónként” → \`GROUP BY owner\`, darabszámra feltétel → \`HAVING\`, a „legalább 1” a \`GROUP BY\` miatt automatikus. A b) az a) **alkérdésként** (inline view).

\`\`\`sql
-- a)
SELECT   owner AS user_name, COUNT(*) AS table_count
FROM     dba_tables
GROUP BY owner
HAVING   COUNT(*) < 15
ORDER BY table_count DESC;

-- b)
SELECT COUNT(*) AS user_count
FROM  (SELECT   owner
       FROM     dba_tables
       GROUP BY owner
       HAVING   COUNT(*) < 15);
\`\`\`

Csapdák: \`HAVING table_count < 15\` → **hiba** (az alias ott még nem létezik); a \`WHERE COUNT(*) < 15\` → **hiba**. A \`DBA_OBJECTS\`-ből \`object_type = 'TABLE'\`-lel is jó (ott a partíciók \`TABLE PARTITION\` típusúak, nem számolódnak bele).

### 2. feladat (15 p)

> A **LABOR** felhasználó szegmensei **szegmenstípusonként**: a lefoglalt hely **KiB-ban, 1 tizedesre kerekítve** (1 KiB = 1024 bájt) és az extentek száma. Csak azok a típusok, ahol az extentek száma összesen **legalább 3**. \`[segment_type, total_space_kib, extent_count]\`

**Elemzés:** szegmensek mérete és extentszáma → \`DBA_SEGMENTS\` (\`bytes\`, \`extents\`). Típusonként → \`GROUP BY segment_type\`. A feltétel az **összesített** extentszámra vonatkozik → \`HAVING\`.

\`\`\`sql
SELECT   segment_type,
         ROUND(SUM(bytes) / 1024, 1) AS total_space_kib,
         SUM(extents) AS extent_count
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY segment_type
HAVING   SUM(extents) >= 3;
\`\`\`
Ugyanez \`DBA_EXTENTS\`-ből: \`COUNT(*) AS extent_count\`, \`ROUND(SUM(bytes)/1024, 1)\`, \`HAVING COUNT(*) >= 3\`. A kettő ugyanazt adja, mert a szegmens mérete az extentjei összege.

### 3. feladat (15 p)

> A **top 10** felhasználó, akik a legtöbb helyet foglalják **LOB-szegmensekkel** (\`LOBSEGMENT\`). \`[owner, total_bytes]\`

\`\`\`sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type = 'LOBSEGMENT'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 10 ROWS ONLY;
\`\`\`
A LOB adatai \`LOBSEGMENT\`, a hozzá tartozó index \`LOBINDEX\` típusú szegmens: ez utóbbi **nem** számít bele. A \`FETCH FIRST\` **az \`ORDER BY\` után** jön. Régebbi stílusban: \`SELECT * FROM (… ORDER BY total_bytes DESC) WHERE ROWNUM <= 10\`.

### 4. feladat (20 p)

> Az összes **bitmap** index (\`index_type = 'BITMAP'\`), amelyik **nem rendszer-felhasználóé**, és a kulcsa **legalább 2** oszlopból áll: az index tulajdonosa, neve, a **tábla neve** és a kulcsoszlopok száma. Használhatod a \`DBA_IND_COLUMNS\`-t. Tipp: a nem rendszer-felhasználó a nevében nem tartalmazza a \`SYS\` szöveget. \`[index_owner, index_name, table_name, column_count]\`

\`\`\`sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c
       ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.index_type = 'BITMAP'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) >= 2;
\`\`\`
Hol lehet pontot veszíteni: join csak \`index_name\`-re (más tulajdonos azonos nevű indexe is bejön, és duplán számolsz); \`> 2\` a \`>= 2\` helyett; \`'SYS%'\` a \`'%SYS%'\` helyett (a tipp szerint **tartalmazza**). A \`uniqueness\`-re itt nem kell szűrni: a bitmap index mindig \`NONUNIQUE\`.

### 5. feladat (30 p)

> Keresd meg a **legnagyobb** data file-t (\`bytes\` szerint), **amelyben van tábla-extent**. Ebben a fájlban keresd meg azt a **sima, nem particionált táblát**, amelynek itt a legtöbb lefoglalt bájtja van (holtversenynél bármelyik). Számold meg, hány adatblokkot **használ ténylegesen** ez a tábla ebben a fájlban. Tippek: több lekérdezést is használhatsz; a fájl ID-ját feljegyezheted; használd a \`DBA_DATA_FILES\` és a \`DBA_EXTENTS\` nézetet; a blokkokat a \`DBMS_ROWID\`-dal számold (a ROWID-ok **különböző blokkszámainak** száma).

**1. lépés: a legnagyobb data file, amiben van tábla-extent.**
\`\`\`sql
SELECT   f.file_id, f.relative_fno, f.tablespace_name, f.file_name, f.bytes
FROM     dba_data_files f
WHERE    f.file_id IN (SELECT file_id FROM dba_extents WHERE segment_type = 'TABLE')
ORDER BY f.bytes DESC
FETCH FIRST 1 ROWS ONLY;
-- JEGYEZD FEL: file_id = …, relative_fno = …   (pl. 4 és 4)
\`\`\`
Az \`IN (…)\` feltétel nélkül egy csak indexeket (vagy semmit) tartalmazó fájl is lehetne a legnagyobb.

**2. lépés: a legnagyobb sima tábla ebben a fájlban, az itteni extentjei összmérete szerint.**
\`\`\`sql
SELECT   owner, segment_name, SUM(bytes) AS total_bytes
FROM     dba_extents
WHERE    file_id = 4                   -- az 1. lépésből
  AND    segment_type = 'TABLE'        -- sima, nem particionált
GROUP BY owner, segment_name
ORDER BY total_bytes DESC
FETCH FIRST 1 ROWS ONLY;
-- JEGYEZD FEL: owner.segment_name   (pl. TULAJ.TABLA)
\`\`\`
Csak az **ebben a fájlban** lévő extentek számítanak (\`file_id = …\`), nem a tábla teljes mérete. Az IOT-k overflow szegmense is \`TABLE\` típusú (\`SYS_IOT_OVER_…\`). Ha ilyen jönne ki, zárd ki: \`AND segment_name NOT LIKE 'SYS_IOT_OVER%'\`.

**3. lépés: a tábla ténylegesen használt blokkjai ebben a fájlban.**
\`\`\`sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS used_blocks
FROM   tulaj.tabla                                          -- a 2. lépésből
WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) = 4;            -- az 1. lépés relative_fno-ja
\`\`\`
A ROWID **relatív** fájlszámot tartalmaz, ezért az 1. lépésben a \`relative_fno\`-t is jegyezd fel. A **fájlra szűrés** azért kell, mert a feladat „ebben a fájlban” használt blokkokat kéri, a tábla más fájlokban is lehet.

> Ha a 3. lépésben \`ORA-00942: table or view does not exist\` jön, akkor nincs olvasási jogod a táblára. Ilyenkor nézd meg, van-e azonos méretű másik tábla (holtverseny), vagy írd le a lekérdezést úgy, ahogy van: a lépések pontot érnek.

**Egy lekérdezésben** (az 1–2. lépés, nem kötelező, de jó gyakorlás):
\`\`\`sql
WITH largest AS (
    SELECT file_id, relative_fno FROM dba_data_files
    WHERE  file_id IN (SELECT file_id FROM dba_extents WHERE segment_type = 'TABLE')
    ORDER  BY bytes DESC FETCH FIRST 1 ROWS ONLY
)
SELECT   e.owner, e.segment_name, SUM(e.bytes) AS total_bytes
FROM     dba_extents e JOIN largest l ON e.file_id = l.file_id
WHERE    e.segment_type = 'TABLE'
GROUP BY e.owner, e.segment_name
ORDER BY total_bytes DESC FETCH FIRST 1 ROWS ONLY;
\`\`\`
A 3. lépés **nem** írható meg így statikusan, mert a tábla neve adat. Ahhoz dinamikus SQL kellene (9. lecke), ezért ott a „take note” a jó út.

## 2. Kidolgozott feladatok: papíros rész (40 pont)

* **1. B+ fa** (20 p): {8, 14, 2, 20, 11, 5, 17}, N = 3, M = 2. A teljes levezetés az **5. leckében** van. Végállapot:
\`\`\`text
                      [14]
                  /          \\
           [8 11]              [20]
         /   |   \\            /    \\
    [2 5]   [8]   [11]   [14 17]   [20]
\`\`\`
* **2. Statikus hash** (20 p): 3 legfelső bit, kapacitás 2, láncolás. A teljes levezetés a **8. leckében** van. Végállapot:
\`\`\`text
 000 → []
 001 → [001101, 001011]
 010 → []
 011 → [011000]
 100 → [100110]
 101 → []
 110 → [110010, 110111] → [110001, 110100] → [110011]
 111 → []
\`\`\`

[[feladat:0]]

## 3. Próba-ZH (ugyanaz a szerkezet, 135 pont, 90 perc)

Írd meg **időre**, a jegyzeteiden kívül segítség nélkül, a laborszerveren. Utána nyisd ki a megoldásokat.

[[feladat:1,2,3,4,5,6,7]]

## 4. Stratégia a ZH-n

**Időbeosztás (90 perc):**

| Idő | Mit |
|-----|-----|
| 0–5. perc | bejelentkezés mindkét szerverre, munkalap letöltése, minden feladat átolvasása |
| 5–25. perc | **papíros rész** (B+ fa ~12 perc, hash ~6 perc). Mechanikus, biztos 40 pont |
| 25–55. perc | gépes 1–4. (≈ 7–8 perc / feladat). Ezek egy-egy \`GROUP BY\`/\`HAVING\`-es lekérdezések |
| 55–80. perc | gépes 5. (30 p): lépésenként, minden közbülső lekérdezést benne hagyva |
| 80–87. perc | ellenőrzés: minden lekérdezés lefut? aliasok? |
| 87–90. perc | **feltöltés** a Canvasra (ne hagyd az utolsó percre!) |

**Beadás előtti ellenőrzőlista:**
- [ ] Minden lekérdezést **lefuttattam** a munkalapból, és **hiba nélkül** fut. Csak a futó lekérdezés ér pontot!
- [ ] Az **aliasok** pontosan a szögletes zárójelben kértek (\`AS user_name\`, \`AS table_count\`, …).
- [ ] A nevek a katalógusban **nagybetűsek** (\`'MINTA'\`, \`'TABLE'\`, \`'UNIQUE'\`).
- [ ] Join **owner + név** szerint; az indexnézetekben **\`index_owner\`**, a partíciós nézetekben **\`table_owner\`**.
- [ ] Aggregátumra szűrés a **\`HAVING\`**-ben, nem a \`WHERE\`-ben; az alias nem szerepel a \`HAVING\`-ben.
- [ ] \`FETCH FIRST n ROWS ONLY\` az \`ORDER BY\` **után**.
- [ ] A „take note” lépéseknél a feljegyzett értéket **megjegyzésben** is odaírtam (\`-- file_id = 5\`).
- [ ] A közbülső lekérdezéseket **nem töröltem** ki (részpont!). A félkészeket \`/* … */\` közé tettem, ha hibásak.
- [ ] A papíron minden **vágás előtti** állapot ott van, és a **végállapot** is.

## 5. Mit írj a kézírásos jegyzetedre (puska)?

Csak **saját kézírással, tintával, papíron** vihető. Ezt írd fel (1–2 oldal):

1. **A join-térkép** a 0. leckéből (melyik nézet melyik oszloppal kapcsolódik).
2. **A nézetek fontos oszlopai:** \`DBA_SEGMENTS\`, \`DBA_EXTENTS\`, \`DBA_DATA_FILES\` (\`file_id\`, \`relative_fno\`), \`DBA_FREE_SPACE\`, \`DBA_INDEXES\` (\`uniqueness\`, \`index_type\`, \`table_owner\`), \`DBA_IND_COLUMNS\` (\`index_owner\`, \`column_position\`, \`descend\`), \`DBA_IND_EXPRESSIONS\`, \`DBA_TABLES\` (\`iot_type\`, \`iot_name\`), \`DBA_TAB_COLUMNS\` (\`column_id\`, \`data_type\`), \`DBA_PART_TABLES\`, \`DBA_TAB_PARTITIONS\`, \`DBA_PART_KEY_COLUMNS\`, \`DBA_OBJECTS\` (\`data_object_id\`, \`subobject_name\`).
3. **Az értékek:** \`segment_type\` (TABLE, INDEX, TABLE PARTITION, …), \`index_type\` (NORMAL, BITMAP, FUNCTION-BASED NORMAL, IOT - TOP), \`uniqueness\` (UNIQUE/NONUNIQUE), \`iot_type\` (IOT/IOT_OVERFLOW).
4. **A \`DBMS_ROWID\` négy függvénye**, és hogy a fájlszám **relatív**.
5. **Sablonok:** \`GROUP BY\` + \`HAVING\` + \`ORDER BY\` + \`FETCH FIRST\`; alkérdés a \`FROM\`-ban a darabszámhoz; \`ROUND(SUM(bytes)/1024/1024, 2)\`; \`COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))\`.
6. **PL/SQL váz:** \`CREATE OR REPLACE PROCEDURE … IS … BEGIN FOR rec IN (…) LOOP DBMS_OUTPUT.PUT_LINE(…); END LOOP; END;\`, \`SELECT … INTO\`, \`EXECUTE IMMEDIATE v_sql INTO v;\`, \`SET SERVEROUTPUT ON\`.
7. **B+ fa szabályai:** levél: ⌈(M+1)/2⌉ balra, a jobb első kulcsa **felmásolódik** (alul is marad); belső: ⌈(N+2)/2⌉ mutató balra, a középső kulcs **felköltözik** (alul nem marad); gyökérvágás → nő a fa. Keresés: egyenlőségnél jobbra.
8. **Hash szabályai:** statikus (k bit, minden vödör kirajzolva, láncolás beszúrási sorrendben), kiterjeszthető (legfelső i bit; j < i → vágás a j+1. bit szerint; j = i → i++, duplázás), lineáris (legalsó i bit, m ≥ n → m − 2^(i−1), új vödör \`1a…\` ← a \`0a…\` vödörből).
9. **Bitmap:** érték → bitvektor, AND/OR/NOT; **RLE:** i nulla + 1 → (j−1) db 1, 0, i binárisan.`,
    exercises: [
      {
        prompt: `**Próbaírás:** a fenti megoldások **elolvasása előtt** (vagy egy nappal később, fejből) írd meg a fenti feladatok gépes részét **55 perc** alatt a laborszerveren, a papíros részt pedig **20 perc** alatt papíron. Hány pontot szereztél (a megoldások alapján pontozva)? Melyik feladat volt a leglassabb?`,
        solution: `Pontozd magad így: egy feladat **teljes pontot** ér, ha a lekérdezés lefut és a fenti megoldással megegyező eredményt ad (az oszlopnevekkel együtt). **Részpontot** ér, ha lefut, de egy feltétel hiányzik (pl. a \`NOT LIKE '%SYS%'\` vagy a \`HAVING\`). **0 pontot** ér, ha hibára fut. Ha 60 pont alatt vagy, a leglassabb feladathoz tartozó leckét (1. feladat → 1. és 4., 2–3. → 2., 4. → 4., 5. → 2. és 3., B+ → 5., hash → 8.) nézd át újra, és holnap ismételd meg.`,
      },
      {
        prompt: `**Próba-ZH 1. (15 p)** a) Azok a felhasználók, akiknek **legalább 3, de kevesebb mint 10 nézetük** (\`VIEW\`) van, a nézetek számával, a szám szerint **növekvő**, azon belül név szerint sorrendben. \`[user_name, view_count]\` b) Hány ilyen felhasználó van? \`[user_count]\``,
        solution: `\`\`\`sql
-- a)
SELECT   owner AS user_name, COUNT(*) AS view_count
FROM     dba_views
GROUP BY owner
HAVING   COUNT(*) >= 3 AND COUNT(*) < 10
ORDER BY view_count, user_name;

-- b)
SELECT COUNT(*) AS user_count
FROM  (SELECT owner FROM dba_views GROUP BY owner HAVING COUNT(*) >= 3 AND COUNT(*) < 10);
\`\`\`
\`DBA_OBJECTS\`-ből \`WHERE object_type = 'VIEW'\`-val ugyanez jön ki.`,
      },
      {
        prompt: `**Próba-ZH 2. (15 p)** A **LABOR** felhasználó szegmensei **tablespace-enként**: az összméret MiB-ban **3 tizedesre** kerekítve és a szegmensek száma. Csak azok a tablespace-ek, ahol LABOR-nak **legalább 2** szegmense van, méret szerint csökkenőn. \`[tablespace_name, total_mib, segment_count]\``,
        solution: `\`\`\`sql
SELECT   tablespace_name,
         ROUND(SUM(bytes) / 1024 / 1024, 3) AS total_mib,
         COUNT(*) AS segment_count
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY tablespace_name
HAVING   COUNT(*) >= 2
ORDER BY total_mib DESC;
\`\`\``,
      },
      {
        prompt: `**Próba-ZH 3. (15 p)** A **top 5** nem rendszer-felhasználó a **sima (nem particionált) index**szegmenseik összmérete szerint. \`[owner, total_bytes]\``,
        solution: `\`\`\`sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type = 'INDEX'
  AND    owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 5 ROWS ONLY;
\`\`\`
A nem particionált index \`INDEX\` típusú szegmens; a partíciók \`INDEX PARTITION\` típusúak.`,
      },
      {
        prompt: `**Próba-ZH 4. (20 p)** A **nem egyedi, függvényalapú normál** indexek (\`FUNCTION-BASED NORMAL\`) nem rendszer-felhasználóktól, amelyek kulcsa **pontosan 2** oszlopból/kifejezésből áll: tulajdonos, indexnév, **táblanév** és az oszlopszám, tulajdonos és név szerint rendezve. \`[index_owner, index_name, table_name, column_count]\``,
        solution: `\`\`\`sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.uniqueness = 'NONUNIQUE'
  AND    i.index_type = 'FUNCTION-BASED NORMAL'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) = 2
ORDER BY index_owner, i.index_name;
\`\`\`
A \`table_name\` azért van a \`GROUP BY\`-ban, mert a \`SELECT\`-ben is szerepel (egy indexhez úgyis egy tábla tartozik, így a csoportok nem változnak).`,
      },
      {
        prompt: `**Próba-ZH 5. (30 p)** Keresd meg azt a data file-t, amelyben a **legtöbb szabad hely** van (\`DBA_FREE_SPACE\`), de **van benne tábla-extent**. Jegyezd fel az azonosítóját. Ebben a fájlban keresd meg azt a sima táblát, amelynek a **legtöbb extentje** van ebben a fájlban (holtversenynél bármelyik). Végül számold meg, hány **sora** és hány **használt blokkja** van ennek a táblának ebben a fájlban. \`[row_count, used_blocks]\``,
        hint: `1) \`DBA_FREE_SPACE\` \`GROUP BY file_id\`, \`SUM(bytes)\`, a fájl legyen benne a tábla-extentes fájlok halmazában, a legnagyobb \`FETCH FIRST 1\`. 2) \`DBA_EXTENTS\` \`WHERE file_id = …\`, \`COUNT(*)\` táblánként. 3) \`COUNT(*)\` és \`COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))\` a táblán, a \`ROWID_RELATIVE_FNO\`-ra szűrve.`,
        solution: `\`\`\`sql
-- 1) a legtöbb szabad helyű fájl, amiben van tábla-extent
SELECT   fs.file_id, SUM(fs.bytes) AS free_bytes
FROM     dba_free_space fs
WHERE    fs.file_id IN (SELECT file_id FROM dba_extents WHERE segment_type = 'TABLE')
GROUP BY fs.file_id
ORDER BY free_bytes DESC
FETCH FIRST 1 ROWS ONLY;
-- feljegyezve: file_id = X; a relative_fno-ja:
SELECT relative_fno FROM dba_data_files WHERE file_id = X;     -- = R

-- 2) a legtöbb extenttel rendelkező sima tábla ebben a fájlban
SELECT   owner, segment_name, COUNT(*) AS extent_count
FROM     dba_extents
WHERE    file_id = X AND segment_type = 'TABLE'
GROUP BY owner, segment_name
ORDER BY extent_count DESC
FETCH FIRST 1 ROWS ONLY;
-- feljegyezve: TULAJ.TABLA

-- 3) sorok és használt blokkok ebben a fájlban
SELECT COUNT(*) AS row_count,
       COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS used_blocks
FROM   tulaj.tabla
WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) = R;
\`\`\`
A szabad hely a \`DBA_FREE_SPACE\`-ben **több darabban** (sorban) van fájlonként, ezért kell a \`SUM\` + \`GROUP BY\`. Ha egy fájlnak egyáltalán nincs szabad helye, a \`DBA_FREE_SPACE\`-ben nincs is sora. Itt ez nem baj, mert a legtöbb szabad helyűt keressük.`,
      },
      {
        prompt: `**Próba-ZH papír 1. (20 p)** Rajzold le a B+ fát minden lapvágás előtt a {12, 4, 9, 15, 6, 20, 1, 7} beszúrásakor. A belső csúcsok legfeljebb 3 kulcsot és 4 mutatót, a levelek legfeljebb 2 kulcsot tárolnak.`,
        hint: `N = 3, M = 2, mint az 5. leckében. Négy vágás lesz, az utolsó gyökérvágás. A 7 a végén vágás nélkül fér be.`,
        solution: `**9 beszúrása előtt:** \`[4 12]\` → \`[4 9 12]\` → \`[4 9] | [12]\`, a 12 felmegy:
\`\`\`text
      [12]
     /    \\
 [4 9]    [12]
\`\`\`
**15:** \`[12 15]\`. **6 beszúrása előtt:**
\`\`\`text
      [12]
     /    \\
 [4 9]    [12 15]
\`\`\`
\`[4 6 9]\` → \`[4 6] | [9]\`, a 9 felmegy → gyökér \`[9 12]\`, levelek \`[4 6] [9] [12 15]\`.

**20 beszúrása előtt:**
\`\`\`text
         [9 12]
       /   |    \\
  [4 6]   [9]   [12 15]
\`\`\`
\`[12 15 20]\` → \`[12 15] | [20]\`, a 20 felmegy → gyökér \`[9 12 20]\`, levelek \`[4 6] [9] [12 15] [20]\`.

**1 beszúrása előtt:**
\`\`\`text
            [9 12 20]
        /    |     |     \\
   [4 6]    [9]  [12 15]  [20]
\`\`\`
\`[1 4 6]\` → \`[1 4] | [6]\`, a 6 felmegy → a gyökérben \`6 9 12 20\` lenne → gyökérvágás: \`[6 9]\`, a **12 felköltözik**, \`[20]\`.

**7:** 7 < 12 → \`[6 9]\` → 6 ≤ 7 < 9 → a \`[6]\` levélbe: \`[6 7]\`, vágás nélkül. **Végállapot:**
\`\`\`text
                  [12]
              /          \\
        [6 9]              [20]
      /   |   \\           /    \\
  [1 4] [6 7]  [9]    [12 15]  [20]
\`\`\``,
      },
      {
        prompt: `**Próba-ZH papír 2. (20 p)** Rajzold le a **statikus** hash táblát az 5 bites hash értékek **2 legfelső** bitje alapján, vödörkapacitás 2, túlcsordulás láncolással: {10110, 01001, 11100, 10011, 00111, 10101, 01110, 10000}.`,
        solution: `Legfelső 2 bit: 10110 → 10, 01001 → 01, 11100 → 11, 10011 → 10, 00111 → 00, 10101 → 10, 01110 → 01, 10000 → 10.
\`\`\`text
 00 → [00111,      ]
 01 → [01001, 01110]
 10 → [10110, 10011] → [10101, 10000]
 11 → [11100,      ]
\`\`\`
A 10-s vödörbe 4 kulcs jut, ezért egy túlcsordulási blokk kell, a kulcsok **beszúrási sorrendben** vannak benne.`,
      },
    ],
  },
];
