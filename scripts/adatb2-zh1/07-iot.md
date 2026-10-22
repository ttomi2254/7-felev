@slug: iot-index-szervezett-tabla
@title: 7. Indexszervezett tábla (IOT) és overflow szegmens (5. óra)
@summary: Az IOT definíciója és előnyei/hátrányai, az overflow terület (PCTTHRESHOLD, INCLUDING), hogyan látszik az IOT a DBA_TABLES / DBA_INDEXES / DBA_SEGMENTS / DBA_OBJECTS nézetekben, az 5. munkafüzet mind a 9 feladata megoldva (iot_size házival).

## 1. Definíciók

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
> * `PCTTHRESHOLD p`: ha egy sor a blokk p%-ánál nagyobb lenne, a „farka” az overflow-ba megy;
> * `INCLUDING oszlop`: az adott oszlopig (bezárólag) az indexben marad, a többi az overflow-ba megy.

```sql
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
```

## 2. Hogyan látszik az IOT a katalógusban? (tétel, ezt kérdezik)

| Nézet | Mit látsz |
|-------|-----------|
| `DBA_TABLES` | az IOT sora: **`iot_type = 'IOT'`**, a **`tablespace_name` NULL** (mert a táblának **nincs saját táblaszegmense**, az adat az indexszegmensben van) |
| `DBA_TABLES` | az overflow **külön sorként**: `table_name = 'SYS_IOT_OVER_<IOT object_id>'`, **`iot_type = 'IOT_OVERFLOW'`**, **`iot_name = <az IOT neve>`** |
| `DBA_INDEXES` | az IOT indexe: **`index_type = 'IOT - TOP'`**, a neve a PK-megszorítás neve, vagy `SYS_IOT_TOP_<object_id>`. Ebben van a tablespace! |
| `DBA_SEGMENTS` | **nincs** szegmens az IOT nevével! Van egy `INDEX` típusú szegmens az index nevével, és (ha van overflow) egy `TABLE` típusú szegmens `SYS_IOT_OVER_…` névvel |
| `DBA_OBJECTS` | az IOT `TABLE` objektumként szerepel, saját szegmens nélkül. Az indexe külön `INDEX` objektum, saját `data_object_id`-val |

> **Az IOT mérete** = az `IOT - TOP` indexszegmens mérete **+** az overflow szegmens mérete (ha van) **+** az esetleges másodlagos indexeké (ha azokat is beleszámítod).

## 3. Az 5. munkafüzet feladatai, megoldással

**1.** A `LABOR` IOT-jai a tablespace-szel. Miért nem látszik a tablespace? `[table_owner, table_name, tablespace_name]`
```sql
SELECT owner AS table_owner, table_name, tablespace_name
FROM   dba_tables
WHERE  owner = 'LABOR' AND iot_type = 'IOT';
```
A `tablespace_name` **NULL**, mert az IOT-nak nincs táblaszegmense, a sorai az indexszegmensben vannak. ⚠️ Az `iot_name IS NOT NULL` szűrés **rossz**: az az **overflow** táblákat adja vissza, nem az IOT-kat.

**2.** Az IOT-k indexei és azok tablespace-e. Mi az `index_type`? `[table_owner, table_name, index_owner, index_name, tablespace_name]`
```sql
SELECT table_owner, table_name, owner AS index_owner, index_name, tablespace_name, index_type
FROM   dba_indexes
WHERE  table_owner = 'LABOR' AND index_type = 'IOT - TOP';
```
Az `index_type` értéke **`IOT - TOP`**.

**3.** A méretük a `DBA_SEGMENTS`-ből. `[table_owner, table_name, index_name, tablespace_name, bytes]`
```sql
SELECT i.table_owner, i.table_name, i.index_name, s.tablespace_name, s.bytes
FROM   dba_indexes i
JOIN   dba_segments s ON s.owner = i.owner AND s.segment_name = i.index_name
WHERE  i.table_owner = 'LABOR' AND i.index_type = 'IOT - TOP';
```
A szegmenst az **index nevével** kell keresni, a tábla nevével nem találod.

**4.** A tábla és az index `data_object_id`-ja (`DBA_OBJECTS`). `[table_name, table_type, index_name, data_object_id]`
```sql
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
```
Figyeld meg az eredményben: **az indexnek van** `data_object_id`-ja (az tárolja az adatot), a tábla-objektumnak (az IOT-nak) jellemzően **nincs**. Ugyanazt a logikát látod, mint a particionált táblánál: a logikai objektum és a tárhely szétválik.

**5.** A `LABOR` IOT-jainak overflow szegmensei. `[table_owner, table_name, tablespace_name, segment_type, bytes]`
```sql
SELECT t.owner AS table_owner, t.iot_name AS table_name,
       s.tablespace_name, s.segment_type, s.bytes
FROM   dba_tables t
JOIN   dba_segments s ON s.owner = t.owner AND s.segment_name = t.table_name
WHERE  t.owner = 'LABOR' AND t.iot_type = 'IOT_OVERFLOW';
```
Az overflow szegmens típusa **`TABLE`**, a neve `SYS_IOT_OVER_nnnnn`.

**6.** Az IOT-k és az automatikusan generált overflow-táblájuk neve. `[table_owner, table_name, overflow_table_name]`
```sql
SELECT t.owner AS table_owner, t.table_name, ov.table_name AS overflow_table_name
FROM   dba_tables t
LEFT JOIN dba_tables ov ON ov.owner = t.owner AND ov.iot_name = t.table_name
                        AND ov.iot_type = 'IOT_OVERFLOW'
WHERE  t.owner = 'LABOR' AND t.iot_type = 'IOT';
```
`LEFT JOIN`, hogy az overflow nélküli IOT-k is megjelenjenek (NULL-lal).

**7.** A `LABOR.ARTICLE_IOT` összes szegmense (index, overflow, másodlagos indexek). `[owner, table_name, segment_name, segment_type, bytes]`
```sql
SELECT s.owner, 'ARTICLE_IOT' AS table_name, s.segment_name, s.segment_type, s.bytes
FROM   dba_segments s
WHERE  s.owner = 'LABOR'
  AND  s.segment_name IN (
         SELECT index_name FROM dba_indexes                  -- IOT - TOP + másodlagos indexek
         WHERE  table_owner = 'LABOR' AND table_name = 'ARTICLE_IOT'
         UNION
         SELECT table_name FROM dba_tables                   -- overflow
         WHERE  owner = 'LABOR' AND iot_name = 'ARTICLE_IOT');
```

**8.** Azok az IOT-k, amelyeknek **pontosan 1** `DATE` típusú oszlopuk van.
```sql
SELECT   t.owner, t.table_name
FROM     dba_tables t
JOIN     dba_tab_columns c ON c.owner = t.owner AND c.table_name = t.table_name
WHERE    t.iot_type = 'IOT' AND c.data_type = 'DATE'
GROUP BY t.owner, t.table_name
HAVING   COUNT(*) = 1;
```

**9. (házi)** `iot_size(p_owner, p_table)`: az IOT mérete (index + overflow). „Az owner és a táblanév a katalógusban kis- és nagybetű-érzékeny.”
```sql
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
```
Ha a feladat pontos kimeneti formátumot ír elő (pl. `Size: nnn`), azt kövesd. Ha a `check_plsql` szerint a másodlagos indexek is beleszámítanak, hagyd el az `index_type = 'IOT - TOP'` feltételt. A „kis- és nagybetű-érzékeny” megjegyzés azt jelenti, hogy a katalógusban nagybetűvel kell keresni (`UPPER`).

[[feladat:0,1,2,3,4]]

@@feladat
Miért `NULL` az IOT `tablespace_name`-je a `DBA_TABLES`-ban, és hol találod meg, melyik tablespace-ben vannak az adatai?
@@megoldas
Mert az IOT-nak **nincs táblaszegmense**: a sorai az **indexszegmensben** (`IOT - TOP`) vannak. A tablespace-t a `DBA_INDEXES.tablespace_name`-ből (az `IOT - TOP` indexnél) vagy a `DBA_SEGMENTS`-ből (az index nevével) olvasod ki. Az overflow-é a `SYS_IOT_OVER_…` szegmensnél van.

@@feladat
Írj lekérdezést, amely **minden** IOT-ra (az egész adatbázisban) megadja az IOT indexszegmensének méretét és az overflow szegmens méretét (0, ha nincs). `[owner, table_name, index_bytes, overflow_bytes]`
@@hint
Két `LEFT JOIN` a `DBA_SEGMENTS`-re: egy az `IOT - TOP` index nevével, egy az overflow tábla nevével.
@@megoldas
```sql
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
```

@@feladat
Melyik értéket veszi fel a `DBA_INDEXES.index_type` egy IOT indexénél?
@@valasz: IOT - TOP
@@megoldas
**`IOT - TOP`** (szóközökkel a kötőjel körül!).

@@feladat
Hány IOT van felhasználónként (nem rendszer-felhasználók), csökkenő sorrendben? `[owner, iot_count]`
@@megoldas
```sql
SELECT   owner, COUNT(*) AS iot_count
FROM     dba_tables
WHERE    iot_type = 'IOT' AND owner NOT LIKE '%SYS%'
GROUP BY owner
ORDER BY iot_count DESC;
```

@@feladat
Igaz vagy hamis? „Az IOT-ban a ROWID ugyanúgy a sor fizikai helye, mint a heap táblában.”
@@megoldas
**Hamis.** Az IOT sorai lapvágáskor **mozognak** a B+ fában, ezért nincs állandó fizikai címük. Az IOT sorainak **logikai ROWID**-ja van, ami az elsődleges kulcsra épül (és egy „becsült” blokkcímre). A `DBMS_ROWID` fizikai bontása (fájl, blokk, sor) ezért **heap táblákra** való.
