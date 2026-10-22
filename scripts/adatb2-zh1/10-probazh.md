@slug: kidolgozott-probazh
@title: 10. Kidolgozott ZH-feladatok, próba-ZH, stratégia és puska-lista
@summary: Hét saját, ZH-szerkezetű feladat (5 gépes SQL + 2 papíros) elemzéssel, csapdákkal és pontos megoldással; egy további próba-ZH rejtett megoldással; időbeosztás, beadás előtti ellenőrzőlista, és mit írj fel a kézírásos jegyzetedre.

## 1. Kidolgozott feladatok: gépes rész (95 pont)

A feladatok saját írásúak, a ZH gépes részének szerkezetében és pontozásával. Előbb próbáld meg
magad (a lecke végi első feladat leírja, hogyan), utána nézd a megoldást.

### 1. feladat (15 p)

> **a)** Azok a felhasználók, akiknek **legalább 1, de kevesebb mint 15 táblájuk** van: a nevük és a tábláik száma, a tábláik száma szerint **csökkenő** sorrendben. `[user_name, table_count]`
> **b)** Módosítsd: **hány** ilyen felhasználó van? `[user_count]`

**Elemzés:** táblák → `DBA_TABLES`, „felhasználónként” → `GROUP BY owner`, darabszámra feltétel → `HAVING`, a „legalább 1” a `GROUP BY` miatt automatikus. A b) az a) **alkérdésként** (inline view).

```sql
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
```

Csapdák: `HAVING table_count < 15` → **hiba** (az alias ott még nem létezik); a `WHERE COUNT(*) < 15` → **hiba**. A `DBA_OBJECTS`-ből `object_type = 'TABLE'`-lel is jó (ott a partíciók `TABLE PARTITION` típusúak, nem számolódnak bele).

### 2. feladat (15 p)

> A **LABOR** felhasználó szegmensei **szegmenstípusonként**: a lefoglalt hely **KiB-ban, 1 tizedesre kerekítve** (1 KiB = 1024 bájt) és az extentek száma. Csak azok a típusok, ahol az extentek száma összesen **legalább 3**. `[segment_type, total_space_kib, extent_count]`

**Elemzés:** szegmensek mérete és extentszáma → `DBA_SEGMENTS` (`bytes`, `extents`). Típusonként → `GROUP BY segment_type`. A feltétel az **összesített** extentszámra vonatkozik → `HAVING`.

```sql
SELECT   segment_type,
         ROUND(SUM(bytes) / 1024, 1) AS total_space_kib,
         SUM(extents) AS extent_count
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY segment_type
HAVING   SUM(extents) >= 3;
```
Ugyanez `DBA_EXTENTS`-ből: `COUNT(*) AS extent_count`, `ROUND(SUM(bytes)/1024, 1)`, `HAVING COUNT(*) >= 3`. A kettő ugyanazt adja, mert a szegmens mérete az extentjei összege.

### 3. feladat (15 p)

> A **top 10** felhasználó, akik a legtöbb helyet foglalják **LOB-szegmensekkel** (`LOBSEGMENT`). `[owner, total_bytes]`

```sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type = 'LOBSEGMENT'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 10 ROWS ONLY;
```
A LOB adatai `LOBSEGMENT`, a hozzá tartozó index `LOBINDEX` típusú szegmens: ez utóbbi **nem** számít bele. A `FETCH FIRST` **az `ORDER BY` után** jön. Régebbi stílusban: `SELECT * FROM (… ORDER BY total_bytes DESC) WHERE ROWNUM <= 10`.

### 4. feladat (20 p)

> Az összes **bitmap** index (`index_type = 'BITMAP'`), amelyik **nem rendszer-felhasználóé**, és a kulcsa **legalább 2** oszlopból áll: az index tulajdonosa, neve, a **tábla neve** és a kulcsoszlopok száma. Használhatod a `DBA_IND_COLUMNS`-t. Tipp: a nem rendszer-felhasználó a nevében nem tartalmazza a `SYS` szöveget. `[index_owner, index_name, table_name, column_count]`

```sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c
       ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.index_type = 'BITMAP'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) >= 2;
```
Hol lehet pontot veszíteni: join csak `index_name`-re (más tulajdonos azonos nevű indexe is bejön, és duplán számolsz); `> 2` a `>= 2` helyett; `'SYS%'` a `'%SYS%'` helyett (a tipp szerint **tartalmazza**). A `uniqueness`-re itt nem kell szűrni: a bitmap index mindig `NONUNIQUE`.

### 5. feladat (30 p)

> Keresd meg a **legnagyobb** data file-t (`bytes` szerint), **amelyben van tábla-extent**. Ebben a fájlban keresd meg azt a **sima, nem particionált táblát**, amelynek itt a legtöbb lefoglalt bájtja van (holtversenynél bármelyik). Számold meg, hány adatblokkot **használ ténylegesen** ez a tábla ebben a fájlban. Tippek: több lekérdezést is használhatsz; a fájl ID-ját feljegyezheted; használd a `DBA_DATA_FILES` és a `DBA_EXTENTS` nézetet; a blokkokat a `DBMS_ROWID`-dal számold (a ROWID-ok **különböző blokkszámainak** száma).

**1. lépés: a legnagyobb data file, amiben van tábla-extent.**
```sql
SELECT   f.file_id, f.relative_fno, f.tablespace_name, f.file_name, f.bytes
FROM     dba_data_files f
WHERE    f.file_id IN (SELECT file_id FROM dba_extents WHERE segment_type = 'TABLE')
ORDER BY f.bytes DESC
FETCH FIRST 1 ROWS ONLY;
-- JEGYEZD FEL: file_id = …, relative_fno = …   (pl. 4 és 4)
```
Az `IN (…)` feltétel nélkül egy csak indexeket (vagy semmit) tartalmazó fájl is lehetne a legnagyobb.

**2. lépés: a legnagyobb sima tábla ebben a fájlban, az itteni extentjei összmérete szerint.**
```sql
SELECT   owner, segment_name, SUM(bytes) AS total_bytes
FROM     dba_extents
WHERE    file_id = 4                   -- az 1. lépésből
  AND    segment_type = 'TABLE'        -- sima, nem particionált
GROUP BY owner, segment_name
ORDER BY total_bytes DESC
FETCH FIRST 1 ROWS ONLY;
-- JEGYEZD FEL: owner.segment_name   (pl. TULAJ.TABLA)
```
Csak az **ebben a fájlban** lévő extentek számítanak (`file_id = …`), nem a tábla teljes mérete. Az IOT-k overflow szegmense is `TABLE` típusú (`SYS_IOT_OVER_…`). Ha ilyen jönne ki, zárd ki: `AND segment_name NOT LIKE 'SYS_IOT_OVER%'`.

**3. lépés: a tábla ténylegesen használt blokkjai ebben a fájlban.**
```sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS used_blocks
FROM   tulaj.tabla                                          -- a 2. lépésből
WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) = 4;            -- az 1. lépés relative_fno-ja
```
A ROWID **relatív** fájlszámot tartalmaz, ezért az 1. lépésben a `relative_fno`-t is jegyezd fel. A **fájlra szűrés** azért kell, mert a feladat „ebben a fájlban” használt blokkokat kéri, a tábla más fájlokban is lehet.

> Ha a 3. lépésben `ORA-00942: table or view does not exist` jön, akkor nincs olvasási jogod a táblára. Ilyenkor nézd meg, van-e azonos méretű másik tábla (holtverseny), vagy írd le a lekérdezést úgy, ahogy van: a lépések pontot érnek.

**Egy lekérdezésben** (az 1–2. lépés, nem kötelező, de jó gyakorlás):
```sql
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
```
A 3. lépés **nem** írható meg így statikusan, mert a tábla neve adat. Ahhoz dinamikus SQL kellene (9. lecke), ezért ott a „take note” a jó út.

## 2. Kidolgozott feladatok: papíros rész (40 pont)

* **1. B+ fa** (20 p): {8, 14, 2, 20, 11, 5, 17}, N = 3, M = 2. A teljes levezetés az **5. leckében** van. Végállapot:
```text
                      [14]
                  /          \
           [8 11]              [20]
         /   |   \            /    \
    [2 5]   [8]   [11]   [14 17]   [20]
```
* **2. Statikus hash** (20 p): 3 legfelső bit, kapacitás 2, láncolás. A teljes levezetés a **8. leckében** van. Végállapot:
```text
 000 → []
 001 → [001101, 001011]
 010 → []
 011 → [011000]
 100 → [100110]
 101 → []
 110 → [110010, 110111] → [110001, 110100] → [110011]
 111 → []
```

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
| 25–55. perc | gépes 1–4. (≈ 7–8 perc / feladat). Ezek egy-egy `GROUP BY`/`HAVING`-es lekérdezések |
| 55–80. perc | gépes 5. (30 p): lépésenként, minden közbülső lekérdezést benne hagyva |
| 80–87. perc | ellenőrzés: minden lekérdezés lefut? aliasok? |
| 87–90. perc | **feltöltés** a Canvasra (ne hagyd az utolsó percre!) |

**Beadás előtti ellenőrzőlista:**
- [ ] Minden lekérdezést **lefuttattam** a munkalapból, és **hiba nélkül** fut. Csak a futó lekérdezés ér pontot!
- [ ] Az **aliasok** pontosan a szögletes zárójelben kértek (`AS user_name`, `AS table_count`, …).
- [ ] A nevek a katalógusban **nagybetűsek** (`'MINTA'`, `'TABLE'`, `'UNIQUE'`).
- [ ] Join **owner + név** szerint; az indexnézetekben **`index_owner`**, a partíciós nézetekben **`table_owner`**.
- [ ] Aggregátumra szűrés a **`HAVING`**-ben, nem a `WHERE`-ben; az alias nem szerepel a `HAVING`-ben.
- [ ] `FETCH FIRST n ROWS ONLY` az `ORDER BY` **után**.
- [ ] A „take note” lépéseknél a feljegyzett értéket **megjegyzésben** is odaírtam (`-- file_id = 5`).
- [ ] A közbülső lekérdezéseket **nem töröltem** ki (részpont!). A félkészeket `/* … */` közé tettem, ha hibásak.
- [ ] A papíron minden **vágás előtti** állapot ott van, és a **végállapot** is.

## 5. Mit írj a kézírásos jegyzetedre (puska)?

Csak **saját kézírással, tintával, papíron** vihető. Ezt írd fel (1–2 oldal):

1. **A join-térkép** a 0. leckéből (melyik nézet melyik oszloppal kapcsolódik).
2. **A nézetek fontos oszlopai:** `DBA_SEGMENTS`, `DBA_EXTENTS`, `DBA_DATA_FILES` (`file_id`, `relative_fno`), `DBA_FREE_SPACE`, `DBA_INDEXES` (`uniqueness`, `index_type`, `table_owner`), `DBA_IND_COLUMNS` (`index_owner`, `column_position`, `descend`), `DBA_IND_EXPRESSIONS`, `DBA_TABLES` (`iot_type`, `iot_name`), `DBA_TAB_COLUMNS` (`column_id`, `data_type`), `DBA_PART_TABLES`, `DBA_TAB_PARTITIONS`, `DBA_PART_KEY_COLUMNS`, `DBA_OBJECTS` (`data_object_id`, `subobject_name`).
3. **Az értékek:** `segment_type` (TABLE, INDEX, TABLE PARTITION, …), `index_type` (NORMAL, BITMAP, FUNCTION-BASED NORMAL, IOT - TOP), `uniqueness` (UNIQUE/NONUNIQUE), `iot_type` (IOT/IOT_OVERFLOW).
4. **A `DBMS_ROWID` négy függvénye**, és hogy a fájlszám **relatív**.
5. **Sablonok:** `GROUP BY` + `HAVING` + `ORDER BY` + `FETCH FIRST`; alkérdés a `FROM`-ban a darabszámhoz; `ROUND(SUM(bytes)/1024/1024, 2)`; `COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))`.
6. **PL/SQL váz:** `CREATE OR REPLACE PROCEDURE … IS … BEGIN FOR rec IN (…) LOOP DBMS_OUTPUT.PUT_LINE(…); END LOOP; END;`, `SELECT … INTO`, `EXECUTE IMMEDIATE v_sql INTO v;`, `SET SERVEROUTPUT ON`.
7. **B+ fa szabályai:** levél: ⌈(M+1)/2⌉ balra, a jobb első kulcsa **felmásolódik** (alul is marad); belső: ⌈(N+2)/2⌉ mutató balra, a középső kulcs **felköltözik** (alul nem marad); gyökérvágás → nő a fa. Keresés: egyenlőségnél jobbra.
8. **Hash szabályai:** statikus (k bit, minden vödör kirajzolva, láncolás beszúrási sorrendben), kiterjeszthető (legfelső i bit; j < i → vágás a j+1. bit szerint; j = i → i++, duplázás), lineáris (legalsó i bit, m ≥ n → m − 2^(i−1), új vödör `1a…` ← a `0a…` vödörből).
9. **Bitmap:** érték → bitvektor, AND/OR/NOT; **RLE:** i nulla + 1 → (j−1) db 1, 0, i binárisan.

@@feladat
**Próbaírás:** a fenti megoldások **elolvasása előtt** (vagy egy nappal később, fejből) írd meg a fenti feladatok gépes részét **55 perc** alatt a laborszerveren, a papíros részt pedig **20 perc** alatt papíron. Hány pontot szereztél (a megoldások alapján pontozva)? Melyik feladat volt a leglassabb?
@@megoldas
Pontozd magad így: egy feladat **teljes pontot** ér, ha a lekérdezés lefut és a fenti megoldással megegyező eredményt ad (az oszlopnevekkel együtt). **Részpontot** ér, ha lefut, de egy feltétel hiányzik (pl. a `NOT LIKE '%SYS%'` vagy a `HAVING`). **0 pontot** ér, ha hibára fut. Ha 60 pont alatt vagy, a leglassabb feladathoz tartozó leckét (1. feladat → 1. és 4., 2–3. → 2., 4. → 4., 5. → 2. és 3., B+ → 5., hash → 8.) nézd át újra, és holnap ismételd meg.

@@feladat
**Próba-ZH 1. (15 p)** a) Azok a felhasználók, akiknek **legalább 3, de kevesebb mint 10 nézetük** (`VIEW`) van, a nézetek számával, a szám szerint **növekvő**, azon belül név szerint sorrendben. `[user_name, view_count]` b) Hány ilyen felhasználó van? `[user_count]`
@@megoldas
```sql
-- a)
SELECT   owner AS user_name, COUNT(*) AS view_count
FROM     dba_views
GROUP BY owner
HAVING   COUNT(*) >= 3 AND COUNT(*) < 10
ORDER BY view_count, user_name;

-- b)
SELECT COUNT(*) AS user_count
FROM  (SELECT owner FROM dba_views GROUP BY owner HAVING COUNT(*) >= 3 AND COUNT(*) < 10);
```
`DBA_OBJECTS`-ből `WHERE object_type = 'VIEW'`-val ugyanez jön ki.

@@feladat
**Próba-ZH 2. (15 p)** A **LABOR** felhasználó szegmensei **tablespace-enként**: az összméret MiB-ban **3 tizedesre** kerekítve és a szegmensek száma. Csak azok a tablespace-ek, ahol LABOR-nak **legalább 2** szegmense van, méret szerint csökkenőn. `[tablespace_name, total_mib, segment_count]`
@@megoldas
```sql
SELECT   tablespace_name,
         ROUND(SUM(bytes) / 1024 / 1024, 3) AS total_mib,
         COUNT(*) AS segment_count
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY tablespace_name
HAVING   COUNT(*) >= 2
ORDER BY total_mib DESC;
```

@@feladat
**Próba-ZH 3. (15 p)** A **top 5** nem rendszer-felhasználó a **sima (nem particionált) index**szegmenseik összmérete szerint. `[owner, total_bytes]`
@@megoldas
```sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type = 'INDEX'
  AND    owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 5 ROWS ONLY;
```
A nem particionált index `INDEX` típusú szegmens; a partíciók `INDEX PARTITION` típusúak.

@@feladat
**Próba-ZH 4. (20 p)** A **nem egyedi, függvényalapú normál** indexek (`FUNCTION-BASED NORMAL`) nem rendszer-felhasználóktól, amelyek kulcsa **pontosan 2** oszlopból/kifejezésből áll: tulajdonos, indexnév, **táblanév** és az oszlopszám, tulajdonos és név szerint rendezve. `[index_owner, index_name, table_name, column_count]`
@@megoldas
```sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.uniqueness = 'NONUNIQUE'
  AND    i.index_type = 'FUNCTION-BASED NORMAL'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) = 2
ORDER BY index_owner, i.index_name;
```
A `table_name` azért van a `GROUP BY`-ban, mert a `SELECT`-ben is szerepel (egy indexhez úgyis egy tábla tartozik, így a csoportok nem változnak).

@@feladat
**Próba-ZH 5. (30 p)** Keresd meg azt a data file-t, amelyben a **legtöbb szabad hely** van (`DBA_FREE_SPACE`), de **van benne tábla-extent**. Jegyezd fel az azonosítóját. Ebben a fájlban keresd meg azt a sima táblát, amelynek a **legtöbb extentje** van ebben a fájlban (holtversenynél bármelyik). Végül számold meg, hány **sora** és hány **használt blokkja** van ennek a táblának ebben a fájlban. `[row_count, used_blocks]`
@@hint
1) `DBA_FREE_SPACE` `GROUP BY file_id`, `SUM(bytes)`, a fájl legyen benne a tábla-extentes fájlok halmazában, a legnagyobb `FETCH FIRST 1`. 2) `DBA_EXTENTS` `WHERE file_id = …`, `COUNT(*)` táblánként. 3) `COUNT(*)` és `COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))` a táblán, a `ROWID_RELATIVE_FNO`-ra szűrve.
@@megoldas
```sql
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
```
A szabad hely a `DBA_FREE_SPACE`-ben **több darabban** (sorban) van fájlonként, ezért kell a `SUM` + `GROUP BY`. Ha egy fájlnak egyáltalán nincs szabad helye, a `DBA_FREE_SPACE`-ben nincs is sora. Itt ez nem baj, mert a legtöbb szabad helyűt keressük.

@@feladat
**Próba-ZH papír 1. (20 p)** Rajzold le a B+ fát minden lapvágás előtt a {12, 4, 9, 15, 6, 20, 1, 7} beszúrásakor. A belső csúcsok legfeljebb 3 kulcsot és 4 mutatót, a levelek legfeljebb 2 kulcsot tárolnak.
@@hint
N = 3, M = 2, mint az 5. leckében. Négy vágás lesz, az utolsó gyökérvágás. A 7 a végén vágás nélkül fér be.
@@megoldas
**9 beszúrása előtt:** `[4 12]` → `[4 9 12]` → `[4 9] | [12]`, a 12 felmegy:
```text
      [12]
     /    \
 [4 9]    [12]
```
**15:** `[12 15]`. **6 beszúrása előtt:**
```text
      [12]
     /    \
 [4 9]    [12 15]
```
`[4 6 9]` → `[4 6] | [9]`, a 9 felmegy → gyökér `[9 12]`, levelek `[4 6] [9] [12 15]`.

**20 beszúrása előtt:**
```text
         [9 12]
       /   |    \
  [4 6]   [9]   [12 15]
```
`[12 15 20]` → `[12 15] | [20]`, a 20 felmegy → gyökér `[9 12 20]`, levelek `[4 6] [9] [12 15] [20]`.

**1 beszúrása előtt:**
```text
            [9 12 20]
        /    |     |     \
   [4 6]    [9]  [12 15]  [20]
```
`[1 4 6]` → `[1 4] | [6]`, a 6 felmegy → a gyökérben `6 9 12 20` lenne → gyökérvágás: `[6 9]`, a **12 felköltözik**, `[20]`.

**7:** 7 < 12 → `[6 9]` → 6 ≤ 7 < 9 → a `[6]` levélbe: `[6 7]`, vágás nélkül. **Végállapot:**
```text
                  [12]
              /          \
        [6 9]              [20]
      /   |   \           /    \
  [1 4] [6 7]  [9]    [12 15]  [20]
```

@@feladat
**Próba-ZH papír 2. (20 p)** Rajzold le a **statikus** hash táblát az 5 bites hash értékek **2 legfelső** bitje alapján, vödörkapacitás 2, túlcsordulás láncolással: {10110, 01001, 11100, 10011, 00111, 10101, 01110, 10000}.
@@megoldas
Legfelső 2 bit: 10110 → 10, 01001 → 01, 11100 → 11, 10011 → 10, 00111 → 00, 10101 → 10, 01110 → 01, 10000 → 10.
```text
 00 → [00111,      ]
 01 → [01001, 01110]
 10 → [10110, 10011] → [10101, 10000]
 11 → [11100,      ]
```
A 10-s vödörbe 4 kulcs jut, ezért egy túlcsordulási blokk kell, a kulcsok **beszúrási sorrendben** vannak benne.
