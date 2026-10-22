@slug: particionalas
@title: 9. Particionálás: range, list, hash, összetett (6. óra)
@summary: A particionálás célja és fajtái definíciókkal, a CREATE TABLE … PARTITION BY szintaxis, a logikai és fizikai objektumok (DBA_OBJECTS, DBA_SEGMENTS), a DBA_PART_TABLES / TAB_PARTITIONS / PART_KEY_COLUMNS / PART_INDEXES nézetek, a 6. munkafüzet mind a 8 feladata megoldva (empty_blocks dinamikus SQL-lel).

## 1. Definíciók

> **Particionálás:** egy nagy tábla (vagy index) felosztása kisebb, külön kezelhető darabokra, ezek a **partíciók**. A partíciókat egy **partíciókulcs** (egy vagy több oszlop) értéke határozza meg. Minden partíció **saját szegmens**, ezért **külön tablespace-be** tehető, és külön menthető, indexelhető vagy újraépíthető. A lekérdezések **párhuzamosan** dolgozhatnak a partíciókon, és egy jó `WHERE` feltétel mellett csak a szükséges partíciókat olvassák (**partition pruning**).

Mikor kell (06.sql)? Ha egy tábla nagyon nagy, és részeit más lemezre akarjuk tenni (gyakran használtat SSD-re, régit HDD-re), ha párhuzamos feldolgozás kell, vagy ha egy egész táblás indexépítés túl sokáig tartana.

| Fajta | Mi alapján | Szintaxis |
|-------|-----------|-----------|
| **range** | értéktartományok (tipikusan dátum, év) | `PARTITION BY RANGE (year) (PARTITION p2022 VALUES LESS THAN (2023), …, PARTITION pmax VALUES LESS THAN (MAXVALUE))` |
| **list** | felsorolt értékek (ország, hónap, …) | `PARTITION BY LIST (month) (PARTITION q1 VALUES (1, 2, 3), …, PARTITION pd VALUES (DEFAULT))` |
| **hash** | hash függvény egy vagy több oszlopra (egyenletes szétosztás) | `PARTITION BY HASH (year, month) (PARTITION p1, PARTITION p2, …)` vagy `PARTITIONS 4` |
| **összetett (composite)** | az előzők hierarchikus kombinációja: partíciók, azokon belül **alpartíciók** | `PARTITION BY RANGE (year) SUBPARTITION BY HASH (id) SUBPARTITIONS 4 (…)` |

> **Range-partíció határa:** a `VALUES LESS THAN (x)` **szigorúan kisebb**: a `p2022 VALUES LESS THAN (2023)` partícióba a `year < 2023` sorok kerülnek (az előző partíció határa fölött). Ha nincs `MAXVALUE` partíció, a túl nagy értékű sor beszúrása **hibát dob** (ORA-14400).

> **Logikai és fizikai objektum (tétel):** a **particionált tábla maga csak logikai objektum**, nincs saját szegmense: a `DBA_OBJECTS`-ben `object_type = 'TABLE'`, `data_object_id` **NULL**, a `DBA_TABLES.tablespace_name` **NULL**, a `DBA_SEGMENTS`-ben pedig **nincs** `TABLE` típusú sora. A **partíciók** a fizikai objektumok: `DBA_OBJECTS`-ben `TABLE PARTITION` a `subobject_name`-mel és saját `data_object_id`-val, a `DBA_SEGMENTS`-ben `segment_type = 'TABLE PARTITION'`, `segment_name` = a tábla neve, `partition_name` = a partíció neve. Összetettnél csak az **alpartícióknak** van szegmensük (`TABLE SUBPARTITION`).

Ezért a **tábla teljes mérete** = `SUM(bytes)` a `DBA_SEGMENTS`-ből, ahol `segment_name` = a tábla és `segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION')`. A ZH-n a „**regular** table” / „**non-partitioned**” kitétel pont ezt különíti el: `segment_type = 'TABLE'`.

> **Lokális és globális partícionált index:** a **lokális** index ugyanúgy van particionálva, mint a tábla (partíciónként egy indexpartíció), a **globális** saját particionálású (vagy nincs particionálva). A `DBA_PART_INDEXES.locality` mutatja: `LOCAL` / `GLOBAL`.

## 2. A partíciós nézetek

| Nézet | Fontos oszlopok |
|-------|-----------------|
| `DBA_PART_TABLES` | `owner`, `table_name`, `partitioning_type` (RANGE/LIST/HASH), `subpartitioning_type`, `partition_count`, `def_tablespace_name` |
| `DBA_TAB_PARTITIONS` | `table_owner`, `table_name`, `partition_name`, `partition_position`, `high_value` (**LONG**!), `tablespace_name`, `num_rows`, `blocks` (statisztikából!), `subpartition_count` |
| `DBA_TAB_SUBPARTITIONS` | `table_owner`, `table_name`, `partition_name`, `subpartition_name`, `tablespace_name`, … |
| `DBA_PART_KEY_COLUMNS` | `owner`, `name` (a tábla vagy index neve!), `object_type` (TABLE/INDEX), `column_name`, `column_position` |
| `DBA_PART_INDEXES` | `owner`, `index_name`, `table_name`, `partitioning_type`, `locality` |
| `DBA_IND_PARTITIONS` | `index_owner`, `index_name`, `partition_name`, `tablespace_name`, … |

> ⚠️ A `DBA_TAB_PARTITIONS.num_rows`/`blocks` **statisztika**, csak a `DBMS_STATS.GATHER_TABLE_STATS(…)` futtatása után van kitöltve (a 06_create_tables.sql ezt meg is teszi). Ha NULL, a `DBA_SEGMENTS.blocks`-ot használd (az a **foglalt** blokkok száma).
> ⚠️ A `high_value` **`LONG`** típusú: a `SELECT` listában kiírható, de **`WHERE`-ben nem szűrhető** (`LIKE`, `=`). Szűrj inkább `partition_position`-re vagy `partition_name`-re.

## 3. A 6. munkafüzet feladatai, megoldással

A táblák (06_create_tables.sql): `SALES` (RANGE `year` szerint, p2022–p2025 a USERS-ben, p2026 az EXAMPLE-ben), `SALES_HASH` (HASH `(year, month)`, p1–p5), `SALES_BY_QUARTER` (LIST `month` szerint, q1–q4).

**1.** A `LABOR` particionált táblái és a particionálás fajtája. `[owner, table_name, partitioning_type]`
```sql
SELECT owner, table_name, partitioning_type
FROM   dba_part_tables
WHERE  owner = 'LABOR';
```

**2.** A `LABOR.SALES` partíciói a blokkok számával. `[partition_name, tablespace_name, blocks]`
```sql
SELECT partition_name, tablespace_name, blocks
FROM   dba_tab_partitions
WHERE  table_owner = 'LABOR' AND table_name = 'SALES'
ORDER  BY partition_position;
```
Itt `table_owner` az oszlop neve, nem `owner`!

**3.** Melyik oszlop(ok) szerint particionált a `LABOR.SALES`, és hányadik helyen a kulcsban? `[owner, name, column_name, column_position]`
```sql
SELECT owner, name, column_name, column_position
FROM   dba_part_key_columns
WHERE  owner = 'LABOR' AND name = 'SALES' AND object_type = 'TABLE';
```
Eredmény: `YEAR`, 1. A `SALES_HASH`-re két sor jön: `YEAR` (1), `MONTH` (2).

**4.** A `SALES_BY_QUARTER` **második** partíciójának megengedett értékei. `[table_owner, table_name, partition_name, high_value]`
```sql
SELECT table_owner, table_name, partition_name, high_value
FROM   dba_tab_partitions
WHERE  table_owner = 'LABOR' AND table_name = 'SALES_BY_QUARTER'
  AND  partition_position = 2;
```
Eredmény: `Q2`, `high_value = 4, 5, 6`. List-partíciónál a `high_value` a **felsorolt értékek listája**, range-nél a `LESS THAN` **határ**.

**5.** A `LABOR.SALES` logikai és fizikai részei a `DBA_OBJECTS`-ben. `[object_name, object_type, subobject_name, object_id, data_object_id]`
```sql
SELECT object_name, object_type, subobject_name, object_id, data_object_id
FROM   dba_objects
WHERE  owner = 'LABOR' AND object_name = 'SALES'
ORDER  BY object_type, subobject_name;
```
1 sor `TABLE` (a `data_object_id` NULL) + 5 sor `TABLE PARTITION` (P2022 … P2026, saját `data_object_id`-val).

**6.** Ugyanez a `DBA_SEGMENTS`-ben. `[segment_name, segment_type, bytes]`
```sql
SELECT segment_name, partition_name, segment_type, tablespace_name, bytes
FROM   dba_segments
WHERE  owner = 'LABOR' AND segment_name = 'SALES';
```
Csak a **partícióknak** van szegmensük (`TABLE PARTITION`), a táblának nincs. (Ha egy partícióba még nem került sor, a halasztott szegmenslétrehozás miatt annak sem.)

**7.** A táblák (indexek nélkül) összmérete csökkenőn, a particionált és az alpartícionált táblákkal együtt. `[owner, table_name, segment_count, total_bytes]`
```sql
SELECT   owner, segment_name AS table_name, COUNT(*) AS segment_count, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION')
GROUP BY owner, segment_name
ORDER BY total_bytes DESC;
```
A partíciók szegmenseinek `segment_name`-je **a tábla neve**, ezért a `GROUP BY owner, segment_name` épp táblánként adja össze őket.

**8. (házi)** `empty_blocks(p_owner, p_table)`: a táblának foglalt, de üres blokkok száma, particionált táblára is. Kimenet: `Empty Blocks: nnn`.

> **Dinamikus SQL (`EXECUTE IMMEDIATE`):** ha a lekérdezett **tábla neve** paraméter, a lekérdezést **szövegként** kell összerakni, mert statikus SQL-ben a tábla neve nem lehet változó. `EXECUTE IMMEDIATE v_sql INTO v_valtozo;` lefuttatja, és az egysoros eredményt a változóba teszi.

```sql
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
```
Miért a **(fájl, blokk) pár**? Mert a blokkszám **csak fájlon belül** egyedi, és a partíciók különböző fájlokban (sőt különböző tablespace-ekben) lehetnek. Két partíció blokkja **soha nem közös**, mert minden blokk egy szegmenshez tartozik. Ezért a párok száma épp a használt blokkok száma.

[[feladat:0,1,2,3,4]]

@@feladat
Írd meg a `CREATE TABLE` utasítást: `orders(id NUMBER PRIMARY KEY, odate DATE, amount NUMBER)`, **range** particionálás az `odate` szerint: 2025 előtti, 2025-ös, 2026-os rendelések, és egy partíció minden későbbinek.
@@megoldas
```sql
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
```
A `LESS THAN` szigorú, ezért a 2025-ös partíció határa **2026. jan. 1.**

@@feladat
Írj lekérdezést: a particionált táblák (az egész adatbázisban) tulajdonosa, neve, fajtája és a partíciók száma, csak a legalább 4 partíciósak. `[owner, table_name, partitioning_type, partition_count]`
@@megoldas
```sql
SELECT owner, table_name, partitioning_type, partition_count
FROM   dba_part_tables
WHERE  partition_count >= 4;
```
Vagy a `DBA_TAB_PARTITIONS`-ből számolva:
```sql
SELECT   p.owner, p.table_name, p.partitioning_type, COUNT(*) AS partition_count
FROM     dba_part_tables p
JOIN     dba_tab_partitions tp ON tp.table_owner = p.owner AND tp.table_name = p.table_name
GROUP BY p.owner, p.table_name, p.partitioning_type
HAVING   COUNT(*) >= 4;
```

@@feladat
Melyik particionált táblák partíciói vannak **egynél több tablespace-ben**? `[table_owner, table_name, ts_count]`
@@megoldas
```sql
SELECT   table_owner, table_name, COUNT(DISTINCT tablespace_name) AS ts_count
FROM     dba_tab_partitions
GROUP BY table_owner, table_name
HAVING   COUNT(DISTINCT tablespace_name) > 1;
```
A `LABOR.SALES` ilyen (USERS + EXAMPLE).

@@feladat
**(ZH 3. variáns)** A top 5 felhasználó a **particionált** táblák (partíció- és alpartíció-szegmensek) összmérete szerint. `[owner, total_bytes]`
@@megoldas
```sql
SELECT   owner, SUM(bytes) AS total_bytes
FROM     dba_segments
WHERE    segment_type IN ('TABLE PARTITION', 'TABLE SUBPARTITION')
GROUP BY owner
ORDER BY total_bytes DESC
FETCH FIRST 5 ROWS ONLY;
```
Összetett particionálásnál csak az alpartícióknak van szegmensük, a sima particionáltnál csak a partícióknak, így nem számolunk semmit kétszer.

@@feladat
Egy partícionált táblánál a `DBA_TABLES.tablespace_name` NULL, és a `DBA_SEGMENTS`-ben nincs `TABLE` típusú sora. Miért, és hol vannak az adatai?
@@megoldas
Mert a particionált tábla csak **logikai** objektum, amelynek **nincs saját szegmense** (a `DBA_OBJECTS`-ben a `data_object_id` is NULL). Az adatai a **partíciók** szegmenseiben vannak: `DBA_SEGMENTS` `segment_type = 'TABLE PARTITION'` (összetettnél `TABLE SUBPARTITION`), a `partition_name` oszloppal. A tablespace-eket a `DBA_TAB_PARTITIONS.tablespace_name` adja, az alapértelmezettet a `DBA_PART_TABLES.def_tablespace_name`.
