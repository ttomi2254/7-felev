@slug: tarolas-storage
@title: 2. Tárolás: tablespace, data file, segment, extent, block (2. óra)
@summary: A fizikai tárolás hierarchiája definíciókkal (02_storage.pdf), a DBA_TABLESPACES / DATA_FILES / TEMP_FILES / SEGMENTS / EXTENTS / FREE_SPACE nézetek oszlopai, a 2. munkafüzet mind a 15 feladata megoldva (a newest_table házival együtt). Ez kell a ZH 2., 3. és 5. feladatához.

## 1. Definíciók (02_storage.pdf + 02.sql)

> **Data file (adatfájl):** az operációs rendszer által kezelt fájl a lemezen (`.dbf`). Blokkeszköz → fájlrendszer → fájl. A DBMS **nem** szabja meg, hol van a fájl a lemezen. A fájlok általában **előre lefoglalt méretűek**, hogy a fájlrendszer ne fragmentálódjon. Automatikusan is nőhetnek (autoextend), de ez fragmentációhoz vezethet.

> **Tablespace (táblatér; MSSQL-ben file group):** **egy vagy több data file** logikai gyűjteménye. Új fájl hozzáadásával bővíthető. A DBMS az egy tablespace-hez tartozó fájlokat nagyjából **egyenletesen** tölti. **A táblákat és indexeket tablespace-hez rendeljük, nem egyes fájlokhoz.** Az ideiglenes (`TEMPORARY`) tablespace fájljai **temp file-ok**: ezek a `DBA_TEMP_FILES`-ban vannak, **nem** a `DBA_DATA_FILES`-ban.

> **Segment (szegmens):** egy tárhelyet igénylő adatobjektum (tábla, index, IOT, partíció, LOB, overflow) **tárterülete**. Logikai fogalom. Egy egyszerű tábla vagy index **egy** szegmens, a **particionált tábla partíciónként egy-egy** szegmensből áll. Minden szegmens **pontosan egy tablespace-hez** tartozik, így szabályozzuk a fizikai elhelyezést.

> **Extent:** **összefüggő** blokkok csoportja **egy data file-on belül**. Az extent egy szegmenshez tartozik (az összes blokkja ugyanahhoz). Tipikusan **8 blokk = 64 KiB**. Az I/O és a helyfoglalás egysége.

> **Block (blokk; MSSQL-ben page):** a tárolás legkisebb egysége, **fix méretű** (alapból **8 KiB**). Elég nagy néhány sornak, de kicsi a hatékony I/O-hoz, ezért foglal a DBMS extentenként.

A hierarchia és a kapcsolatok:

```text
TABLESPACE  1 ── *  DATA FILE                      (egy tablespace több fájlból áll)
TABLESPACE  1 ── *  SEGMENT                        (a szegmens EGY tablespace-ben van)
SEGMENT     1 ── *  EXTENT                         (a szegmens extentekből áll)
EXTENT      * ── 1  DATA FILE                      (az extent EGY fájlon belül összefüggő)
EXTENT      1 ── *  BLOCK                          (az extent összefüggő blokkok sorozata)
```

**Fontos következmények (tételek, amiket használni fogsz):**

1. **A segment a tablespace-hez kötődik, az extent közvetlenül a data file-hoz.** Ezért ha fájlszintű kérdés van (melyik fájlban mennyi hely van foglalva, melyik tábla melyik fájlban van), a `DBA_EXTENTS` + `DBA_DATA_FILES` párost kell használni, a kapcsolat a **`file_id`**.
2. **Egy fájlban sok szegmens extentjei lehetnek**, és **egy szegmens több fájlra is szétterülhet**, ha a tablespace több fájlból áll. (Ez **nem** particionálás! Particionáláskor a partíciók külön szegmensek, akár külön tablespace-ben.)
3. **Egy fájl foglalt (használt) mérete** = a benne lévő extentek méretének összege. A maradék a szabad hely (`DBA_FREE_SPACE`).
4. **Egy szegmens mérete** = az extentjei méretének összege (`DBA_SEGMENTS.bytes = SUM(DBA_EXTENTS.bytes)` szegmensenként).
5. A **foglalt** blokkok (extentekben) nem mind tartalmaznak sort. A **ténylegesen használt** blokkokat a ROWID-ból lehet megszámolni (3. lecke).

Miért kicsik a blokkok? Mert a relációs elérés jellemzően **indexen (B+-fán) keresztül**, véletlenszerűen olvas kis darabokat, nem szekvenciálisan az egész fájlt.

**Blokk- és extentfoglalás** (02_storage.pdf): új **blokk** kell, ha egy heap tábla végére új sor kerül, vagy egy B+-fában **lapvágás** (page split) történik. Ezt egy meglévő extent szabad blokkjából kapja. Új **extent** kell, ha a meglévő extentekben már nincs üres blokk. Az új blokk **mindig előbb a fájlban foglalódik le**, mert a DBMS mutatói (ROWID) **fizikai fájlbeli helyekre** mutatnak, nem memóriacímre. Egy objektum blokkjai alapból **tetszőleges sorrendben** vannak a fájlban.

## 2. A nézetek és oszlopaik

| Nézet | Fontos oszlopok |
|-------|-----------------|
| `DBA_TABLESPACES` | `tablespace_name`, `block_size`, `contents` (PERMANENT/TEMPORARY/UNDO), `extent_management`, `allocation_type`, `segment_space_management` (AUTO = ASSM) |
| `DBA_DATA_FILES` | `file_name` (teljes útvonal!), `file_id`, `relative_fno`, `tablespace_name`, `bytes`, `blocks`, `autoextensible`, `maxbytes` |
| `DBA_TEMP_FILES` | ugyanezek a temp fájlokra |
| `DBA_SEGMENTS` | `owner`, `segment_name`, `partition_name`, `segment_type`, `tablespace_name`, `header_file`, `header_block`, `bytes`, `blocks`, `extents` |
| `DBA_EXTENTS` | `owner`, `segment_name`, `partition_name`, `segment_type`, `tablespace_name`, `extent_id`, `file_id`, `block_id` (az **első** blokk száma), `bytes`, `blocks`, `relative_fno` |
| `DBA_FREE_SPACE` | `tablespace_name`, `file_id`, `block_id`, `bytes`, `blocks` (egy sor = egy összefüggő szabad darab) |

Az extent blokkjai: `block_id`, `block_id + 1`, …, `block_id + blocks − 1`.

> **Szegmens nélküli tábla:** `CREATE TABLE … SEGMENT CREATION DEFERRED` (és alapból is így van az újabb Oracle-ben) esetén a tábla az **első sor beszúrásáig nem kap szegmenst**. A `DBA_TABLES`-ban ott van, a `DBA_SEGMENTS`-ben még nincs. Ezért kell az `NVL(SUM(bytes), 0)`.

## 3. A 2. munkafüzet feladatai, megoldással

**1.** Tablespace-ek a blokkmérettel. `[tablespace_name, block_size]`
```sql
SELECT tablespace_name, block_size FROM dba_tablespaces;
```

**2.** A `USERS` tablespace fájljai. `[file_name, bytes]`
```sql
SELECT file_name, bytes FROM dba_data_files WHERE tablespace_name = 'USERS';
```

**3.** Van olyan tablespace, aminek nincs fájlja a `DBA_DATA_FILES`-ban? Hol vannak az adatai?
```sql
SELECT tablespace_name FROM dba_tablespaces
WHERE  tablespace_name NOT IN (SELECT tablespace_name FROM dba_data_files);
```
Ez a **`TEMP`** (ideiglenes) tablespace, a fájljai a **`DBA_TEMP_FILES`**-ban vannak.

**4.** Az összes fájl (temp is), méret szerint csökkenőn. `[file_name, bytes]`
```sql
SELECT file_name, bytes FROM dba_data_files
UNION ALL
SELECT file_name, bytes FROM dba_temp_files
ORDER BY bytes DESC;
```
`UNION ALL`, mert két különböző fájl nem duplikátum. Az `ORDER BY` a legvégén áll, egyszer.

**5.** Tablespace-enként a fájlok száma és az összméret, a temp fájlokkal együtt. `[tablespace_name, file_count, total_bytes]`
```sql
SELECT   tablespace_name, COUNT(*) AS file_count, SUM(bytes) AS total_bytes
FROM     (SELECT tablespace_name, bytes FROM dba_data_files
          UNION ALL
          SELECT tablespace_name, bytes FROM dba_temp_files)
GROUP BY tablespace_name;
```
Előbb összefűzzük a két fájllistát, utána csoportosítunk. (A hivatalos megoldás két `GROUP BY`-t `UNION ALL`-oz, az is helyes.)

**6.** Nem rendszer-tábla szegmensek az extentszámmal, méret szerint csökkenőn (sem `SYS%` tablespace, sem `SYS` tulajdonos). `[owner, segment_name, tablespace_name, bytes, extents]`
```sql
SELECT   owner, segment_name, tablespace_name, bytes, extents
FROM     dba_segments
WHERE    segment_type = 'TABLE'
  AND    tablespace_name NOT LIKE 'SYS%'
  AND    owner <> 'SYS'
ORDER BY bytes DESC;
```
A `segment_type = 'TABLE'` egyben **kizárja a partíciókat** (azok `TABLE PARTITION` típusúak).

**7.** A **legnagyobb indexszegmens** és a blokkjainak száma. `[owner, segment_name, blocks]`
```sql
-- (a) FETCH FIRST
SELECT owner, segment_name, blocks FROM dba_segments
WHERE  segment_type = 'INDEX'
ORDER  BY bytes DESC
FETCH  FIRST 1 ROWS ONLY;

-- (b) MAX alkérdéssel (holtversenynél mindet adja)
SELECT owner, segment_name, blocks FROM dba_segments
WHERE  segment_type = 'INDEX'
  AND  bytes = (SELECT MAX(bytes) FROM dba_segments WHERE segment_type = 'INDEX');
```

**8.** Fájlonként a méret, a foglalt hely és a foglaltság %-a. `[file_name, bytes, used_bytes, used_percent]`
```sql
SELECT   f.file_name, f.bytes,
         SUM(e.bytes) AS used_bytes,
         ROUND(SUM(e.bytes) / f.bytes * 100, 2) AS used_percent
FROM     dba_extents e
JOIN     dba_data_files f ON e.file_id = f.file_id
GROUP BY f.file_name, f.bytes;
```
Az `f.bytes` azért kell a `GROUP BY`-ba, mert nem aggregált oszlop a `SELECT`-ben. Ha az **üres** fájlokat is látni akarod: `FROM dba_data_files f LEFT JOIN dba_extents e ON …`, és `NVL(SUM(e.bytes), 0)`.

**9.** A két legtöbb helyet foglaló nem rendszer-felhasználó. `[owner, total_bytes]`
```sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 2 ROWS ONLY;
```
`DBA_EXTENTS`-ből ugyanez jön ki, mert a szegmens mérete az extentjei összege.

**10.** Hány **index**-extent van a `users02.dbf` fájlban, és mekkora az összméretük? `[extent_count, total_bytes]`
```sql
SELECT COUNT(*) AS extent_count, SUM(e.bytes) AS total_bytes
FROM   dba_extents e
JOIN   dba_data_files f ON f.file_id = e.file_id
WHERE  f.file_name LIKE '%/users02.dbf'
  AND  e.segment_type = 'INDEX';
```
A `file_name` **teljes útvonal**, ezért `LIKE '%/users02.dbf'`, nem `=`.

**11.** A `users02.dbf` szabad (fel nem foglalt) összefüggő darabjai. `[free_chunk_count, total_free_bytes]`
```sql
SELECT COUNT(*) AS free_chunk_count, SUM(fs.bytes) AS total_free_bytes
FROM   dba_free_space fs
JOIN   dba_data_files f ON f.file_id = fs.file_id
WHERE  f.file_name LIKE '%users02.dbf';
```

**12.** Van-e a `MINTA`-nak **több fájlra szétterülő** táblája? (aramis) `[segment_name, file_count]`
```sql
SELECT   segment_name, COUNT(DISTINCT file_id) AS file_count
FROM     dba_extents
WHERE    owner = 'MINTA' AND segment_type = 'TABLE'
GROUP BY segment_name
HAVING   COUNT(DISTINCT file_id) > 1;
```
A `COUNT(DISTINCT file_id)` a kulcs: egy fájlban sok extent is lehet, minket a **különböző fájlok** száma érdekel.

**13.** Egy ilyen tábla (pl. `HALLGATOK`) fájljai. `[file_name]`
```sql
SELECT DISTINCT f.file_name
FROM   dba_extents e JOIN dba_data_files f ON e.file_id = f.file_id
WHERE  e.owner = 'MINTA' AND e.segment_name = 'HALLGATOK';
```

**14.** Melyik tablespace-ben van az `ORAUSER.DOLGOZO`, és a `MINTA.ELADASOK`? (ullman)
```sql
SELECT segment_name, partition_name, tablespace_name
FROM   dba_segments
WHERE  (owner = 'ORAUSER'  AND segment_name = 'DOLGOZO')
   OR  (owner = 'MINTA' AND segment_name = 'ELADASOK');
```
A `DBA_TABLES.tablespace_name` a `DOLGOZO`-nál kitöltött, de az `ELADASOK`-nál **NULL**. Az `ELADASOK` ugyanis **particionált**: maga a tábla csak logikai objektum, a partíciói külön szegmensek, akár **különböző tablespace-ekben**. Ezért a `DBA_SEGMENTS`-ből (vagy a `DBA_TAB_PARTITIONS`-ből) kell kiolvasni.

**15. (házi)** `newest_table(p_user)`: a felhasználó legutóbb létrehozott táblájának neve, mérete és létrehozási ideje, ebben a formában: `Table_name: NNNNNN   Size: SSSSSS bytes   Created: yyyy.mm.dd.hh:mi`
```sql
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
```
Tanulságok: a **`ROWNUM = 1` csak a belső, már rendezett alkérdésen** ad helyes eredményt (a `ROWNUM` a rendezés előtt számozódik). Szegmens nélküli táblánál `NVL(…, 0)` kell. Particionált táblánál `segment_type LIKE 'TABLE%'` adja össze a partíciókat. A teszt: `CREATE TABLE t_without_segment(o INT) SEGMENT CREATION DEFERRED;` után 0 bájtot kell kiírnia, egy `INSERT` után pedig már nem nullát.

[[feladat:0,1,2,3]]

## 4. Kapcsolat a ZH-val

* **ZH 2. feladat** (15 p): `DBA_SEGMENTS`, szűrés `owner`-re, `GROUP BY segment_name`, `SUM(bytes)` MiB-ra kerekítve, `SUM(extents)`, `HAVING` a minimum extentszámra. Teljes megoldás a 10. leckében.
* **ZH 3. feladat** (15 p): „regular table segments only” = `segment_type = 'TABLE'`, `GROUP BY owner`, top 10 `FETCH FIRST`.
* **ZH 5. feladat** (30 p): a legkisebb fájl `DBA_DATA_FILES`-ból (amiben **van** tábla-extent!), utána a legnagyobb tábla benne `DBA_EXTENTS`-ből `file_id`-re szűrve.

[[feladat:4,5]]

@@feladat
Írj lekérdezést, amely tablespace-enként megadja a **szabad** helyet MiB-ban, két tizedesre kerekítve, csökkenő sorrendben! `[tablespace_name, free_mib]`
@@hint
`DBA_FREE_SPACE`, `GROUP BY tablespace_name`, `ROUND(SUM(bytes)/1024/1024, 2)`.
@@megoldas
```sql
SELECT   tablespace_name, ROUND(SUM(bytes) / 1024 / 1024, 2) AS free_mib
FROM     dba_free_space
GROUP BY tablespace_name
ORDER BY free_mib DESC;
```

@@feladat
Melyik nézetből tudod meg, hogy egy **tábla extentjei melyik fájl(ok)ban** vannak, és melyik oszlop köti össze a fájlok nézetével?
@@megoldas
A **`DBA_EXTENTS`**-ből (az extent közvetlenül fájlhoz kötődik, a szegmens csak tablespace-hez). A kapcsoló oszlop a **`file_id`**: `JOIN dba_data_files f ON e.file_id = f.file_id`.

@@feladat
Írj lekérdezést: a `MINTA` felhasználó **index**szegmenseinek száma és összmérete tablespace-enként. `[tablespace_name, index_count, total_bytes]`
@@megoldas
```sql
SELECT   tablespace_name, COUNT(*) AS index_count, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    owner = 'MINTA' AND segment_type = 'INDEX'
GROUP BY tablespace_name;
```
Ha a particionált indexeket is bele akarod venni: `segment_type IN ('INDEX', 'INDEX PARTITION', 'INDEX SUBPARTITION')` vagy `segment_type LIKE 'INDEX%'`.

@@feladat
Igaz vagy hamis? „Egy tábla összes extentje mindig ugyanabban a data file-ban van.” Indokold!
@@megoldas
**Hamis.** A szegmens egy **tablespace**-hez tartozik, és ha a tablespace több data file-ból áll, a DBMS a fájlokat nagyjából egyenletesen tölti, így egy tábla extentjei **több fájlban** is lehetnek (a 2. munkafüzet 12. feladata pont ezt keresi). Egy **extent** viszont mindig egy fájlon belül, összefüggően van.

@@feladat
Írj lekérdezést: melyik data file-ban van a **legtöbb különböző szegmens** extentje? `[file_name, segment_count]`
@@hint
Szegmenst a `(owner, segment_name, partition_name)` hármas azonosít. `COUNT(DISTINCT …)` több oszlopra Oracle-ben nem megy közvetlenül, használj alkérdést `DISTINCT`-tel, vagy fűzd össze őket.
@@megoldas
```sql
SELECT   f.file_name, COUNT(*) AS segment_count
FROM     (SELECT DISTINCT file_id, owner, segment_name, partition_name
          FROM dba_extents) e
JOIN     dba_data_files f ON f.file_id = e.file_id
GROUP BY f.file_name
ORDER BY segment_count DESC
FETCH FIRST 1 ROWS ONLY;
```

@@feladat
A `LABOR` felhasználó szegmenseinek összmérete MiB-ban, két tizedesre kerekítve, **szegmenstípusonként**, csak azok a típusok, ahol legalább 2 szegmens van. `[segment_type, seg_count, total_mib]`
@@megoldas
```sql
SELECT   segment_type, COUNT(*) AS seg_count,
         ROUND(SUM(bytes) / 1024 / 1024, 2) AS total_mib
FROM     dba_segments
WHERE    owner = 'LABOR'
GROUP BY segment_type
HAVING   COUNT(*) >= 2;
```
