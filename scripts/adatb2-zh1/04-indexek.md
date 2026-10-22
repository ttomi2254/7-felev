@slug: indexek-katalogus
@title: 4. Indexek a katalógusban: DBA_INDEXES, DBA_IND_COLUMNS, DBA_IND_EXPRESSIONS (4. óra)
@summary: Indextípusok definíciói (egyoszlopos, összetett, csökkenő, bitmap, függvényalapú, egyedi, PK), létrehozásuk, a három indexnézet oszlopai és értékei, a 4. munkafüzet 2–7. feladata megoldva (list_indexes házival). Ez kell a ZH 1. és 4. feladatához (35 pont).

## 1. Definíciók

> **Index:** egy táblához tartozó **külön tárolt** adatszerkezet (Oracle-ben alapból **B+-fa**, lásd 5. lecke), ami a **kulcs** értékei szerint rendezve tárolja a kulcsokat és a sorokra mutató **ROWID**-okat. Gyors keresést ad kulcsérték vagy tartomány szerint. Saját szegmense van (`segment_type = 'INDEX'`).

> **Kulcs:** egy oszlop vagy oszlopok kombinációja. **Rendező kulcs**: a tábla (az index) eszerint rendezett. **Egyedi kulcs (unique)**: minden kulcsérték legfeljebb egyszer fordul elő.

| Indexfajta | Létrehozás | Katalógusban |
|------------|-----------|--------------|
| **egyoszlopos** | `CREATE INDEX i1 ON t(name);` | `index_type = 'NORMAL'`, 1 sor a `DBA_IND_COLUMNS`-ban |
| **összetett (composite, többoszlopos)** | `CREATE INDEX i2 ON t(city, country);` | `NORMAL`, több sor, `column_position` 1, 2, … |
| **csökkenő (descending)** | `CREATE INDEX i3 ON t(postal_code DESC);` | `FUNCTION-BASED NORMAL`, `descend = 'DESC'`, az oszlop neve **`SYS_NC…$`**, a valódi kifejezés a `DBA_IND_EXPRESSIONS`-ben |
| **bitmap** | `CREATE BITMAP INDEX b1 ON t(country);` | `index_type = 'BITMAP'` (6. lecke) |
| **függvényalapú (function-based)** | `CREATE INDEX f1 ON t(SUBSTR(email, INSTR(email,'@')+1));` | `FUNCTION-BASED NORMAL`, oszlopnév `SYS_NC…$`, a kifejezés a `DBA_IND_EXPRESSIONS`-ben |
| **egyedi (unique)** | `CREATE UNIQUE INDEX u1 ON t(phone);` | `uniqueness = 'UNIQUE'` |
| **elsődleges kulcs indexe** | `CONSTRAINT pk_t PRIMARY KEY (id)` | automatikusan létrejövő **UNIQUE NORMAL** index, a **megszorítás nevével** (`PK_T`) |
| **IOT indexe** | `ORGANIZATION INDEX` | `index_type = 'IOT - TOP'` (7. lecke) |

> **Miért furcsa a csökkenő index oszlopának neve?** Mert az Oracle a csökkenő indexet **függvényalapú indexként** valósítja meg: létrehoz egy rejtett virtuális oszlopot (pl. `SYS_NC00011$`), és azt indexeli. A `DBA_IND_COLUMNS.column_name` ezt a rejtett nevet mutatja, a valódi oszlop (`"POSTAL_CODE"`) a `DBA_IND_EXPRESSIONS.column_expression`-ben látszik. Ezért ha függvényalapú indexeket keresel a `DBA_IND_EXPRESSIONS`-ben, **a csökkenő indexek is megjelennek**!

## 2. A három indexnézet oszlopai

**`DBA_INDEXES`**: egy sor indexenként.

| Oszlop | Jelentés / értékek |
|--------|--------------------|
| `owner`, `index_name` | az **index** tulajdonosa és neve |
| `table_owner`, `table_name` | a **tábla** tulajdonosa és neve (más is lehet, mint az index tulajdonosa!) |
| `index_type` | `NORMAL`, `BITMAP`, `FUNCTION-BASED NORMAL`, `FUNCTION-BASED BITMAP`, `IOT - TOP`, `NORMAL/REV`, `LOB`, `CLUSTER`, `DOMAIN` |
| `uniqueness` | `UNIQUE` / `NONUNIQUE` |
| `table_type` | `TABLE`, `CLUSTER`, … |
| `tablespace_name` | particionált indexnél NULL |
| `partitioned` | `YES` / `NO` |
| `blevel`, `leaf_blocks`, `distinct_keys`, `num_rows` | statisztikák (B+-fa mélysége − 1, levélblokkok száma, …) |

**`DBA_IND_COLUMNS`**: egy sor az index **minden oszlopára**.

| Oszlop | Jelentés |
|--------|----------|
| `index_owner`, `index_name` | ⚠️ itt **`index_owner`** a neve, nem `owner`! |
| `table_owner`, `table_name` | a tábla |
| `column_name` | az indexelt oszlop (függvényalapúnál és csökkenőnél `SYS_NC…$`) |
| `column_position` | hányadik oszlop az index kulcsában (1-től) |
| `column_length` | |
| `descend` | `ASC` / `DESC` |

**`DBA_IND_EXPRESSIONS`**: egy sor a függvényalapú (és csökkenő) index minden **kifejezésére**.

| Oszlop | Jelentés |
|--------|----------|
| `index_owner`, `index_name`, `table_owner`, `table_name` | |
| `column_expression` | a kifejezés szövege (`LONG` típus, **`WHERE`-ben nem szűrhető `LIKE`-kal!**) |
| `column_position` | |

> **Tétel: az index oszlopainak száma** = a `DBA_IND_COLUMNS` sorainak száma az adott `(index_owner, index_name)` párra. A függvényalapú kifejezések is itt szerepelnek (`SYS_NC…$` névvel), tehát a `COUNT(*)` az „oszlopok **vagy kifejezések**” számát adja.

## 3. A 4. munkafüzet feladatai, megoldással

**1.** Az `index_test` tábla és a hat index létrehozása (ezt futtasd le a saját sémádban, és nézd meg a katalógusban, mi lett belőlük):
```sql
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
```
Az eredmény 7 index: a hat létrehozott és a `PK_INDEX_TEST` (UNIQUE, NORMAL).

**2. a)** Mely tábláknak van legalább egy **csökkenő** indexoszlopa? `[table_owner, table_name]`
```sql
SELECT DISTINCT table_owner, table_name
FROM   dba_ind_columns
WHERE  descend = 'DESC';
```

**2. b)** A saját indexelt oszlopaid. `[index_name, table_owner, table_name, column_name]`
```sql
SELECT index_name, table_owner, table_name, column_name
FROM   dba_ind_columns
WHERE  index_owner = USER          -- vagy a Neptun-kódod nagybetűvel
ORDER  BY index_name, column_position;
```

**2. c)** Miért furcsa a csökkenő oszlop neve? Lásd a definíciót fent:
```sql
SELECT index_name, column_expression, column_position
FROM   dba_ind_expressions
WHERE  index_owner = USER;
```
A `SYS_NC00011$` mögött `"POSTAL_CODE"` áll, az `fidx_…` mögött a `SUBSTR(…)` kifejezés.

**3.** Mely indexek indexelnek **legalább 9** oszlopot vagy kifejezést? `[table_owner, table_name, index_name]`
```sql
SELECT   table_owner, table_name, index_name
FROM     dba_ind_columns
GROUP BY index_owner, index_name, table_owner, table_name
HAVING   COUNT(*) >= 9;
```
⚠️ Az `index_owner`-t is tedd a `GROUP BY`-ba: két tulajdonosnak lehet azonos nevű indexe. Nem kell a `DBA_IND_EXPRESSIONS`-re szűrni, mert a kifejezések is ott vannak a `DBA_IND_COLUMNS`-ban.

**4.** A `MINTA.CUSTOMERS` bitmap indexei. `[index_name]`
```sql
SELECT index_name
FROM   dba_indexes
WHERE  table_owner = 'MINTA' AND table_name = 'CUSTOMERS'
  AND  index_type LIKE '%BITMAP';       -- a FUNCTION-BASED BITMAP is
```

**5.** Indexek, amelyek **pontosan két** oszlopot/kifejezést indexelnek, és **legalább az egyik függvényalapú**. `[index_owner, index_name]`
```sql
SELECT   index_owner, index_name
FROM     dba_ind_columns
GROUP BY index_owner, index_name
HAVING   COUNT(*) = 2
INTERSECT
SELECT   index_owner, index_name
FROM     dba_ind_expressions;
```
Ha a csökkenő indexeket ki akarod hagyni (mert „valódi” függvény nincs bennük), szűrj a `DBA_IND_COLUMNS.descend = 'ASC'` sorokra is a második ágban, vagy nézd meg a kifejezést a 6. feladat szerint.

**6.** Egy ilyen index kifejezései. `[index_owner, index_name, column_expression]`
```sql
SELECT index_owner, index_name, column_expression
FROM   dba_ind_expressions
WHERE  index_owner = 'MINTA' AND index_name = 'EMP6';   -- az 5. feladat egyik találata
```

**7. (házi)** `list_indexes(p_owner, p_name)`: a tábla indexei a méretükkel (`DBA_SEGMENTS.bytes`), `INDEX1: 1234` formában.
```sql
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
```
* A hívás **kisbetűs** paraméterekkel jön → `UPPER`.
* `LEFT JOIN` + `NVL`: a még szegmens nélküli index 0-val is megjelenik.
* `SUM` + `GROUP BY`: a **particionált** indexnek partíciónként van szegmense, ezeket össze kell adni.
* A `cikk_iot` egy IOT: az indexe `IOT - TOP` típusú, és **az tárolja a tábla adatait** (7. lecke).

[[feladat:0,1,2]]

## 4. A ZH 1. és 4. feladata (35 pont)

**ZH 1. a)** (15 p a két rész együtt) A felhasználók, akiknek **kevesebb mint 20, de legalább 1** indexük van, a darabszámmal, csökkenő sorrendben. `[user_name, index_count]`
```sql
SELECT   owner AS user_name, COUNT(*) AS index_count
FROM     dba_indexes
GROUP BY owner
HAVING   COUNT(*) < 20
ORDER BY index_count DESC;
```
A „legalább 1” **automatikusan teljesül**: a `GROUP BY` csak azokat a tulajdonosokat adja, akiknek van legalább egy sora a `DBA_INDEXES`-ben. (Ha mégis kiírod: `HAVING COUNT(*) BETWEEN 1 AND 19`.)

**ZH 1. b)** Hány ilyen felhasználó van? `[user_count]`
```sql
SELECT COUNT(*) AS user_count
FROM  (SELECT   owner
       FROM     dba_indexes
       GROUP BY owner
       HAVING   COUNT(*) < 20);
```
Az a) lekérdezés **alkérdésként** a `FROM`-ban (inline view), kívül megszámoljuk a sorait. Az `ORDER BY` itt felesleges.

**ZH 4.** (20 p) **Egyedi, normál**, nem rendszer-felhasználóhoz tartozó indexek, amelyek kulcsa **2-nél több** oszlopból áll. `[index_owner, index_name, column_count]`
```sql
SELECT   i.owner AS index_owner, i.index_name, COUNT(*) AS column_count
FROM     dba_indexes i
JOIN     dba_ind_columns c
       ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.uniqueness = 'UNIQUE'
  AND    i.index_type = 'NORMAL'
  AND    i.owner NOT LIKE '%SYS%'
GROUP BY i.owner, i.index_name
HAVING   COUNT(*) > 2;
```
Pontozási csapdák:
* „unique” → `uniqueness = 'UNIQUE'` (nem `index_type`!);
* „normal” → `index_type = 'NORMAL'` (ez kizárja a bitmap, függvényalapú, `IOT - TOP`, `NORMAL/REV` indexeket);
* a join **mindkét** oszlopon (`index_owner` **és** `index_name`);
* a szűrés a `WHERE`-ben, a darabszám-feltétel a `HAVING`-ben;
* „more than two” → `> 2`, nem `>= 2`.

[[feladat:3,4,5,6]]

@@feladat
Melyik oszlop mondja meg a `DBA_INDEXES`-ben, hogy egy index egyedi-e, és milyen értékei lehetnek?
@@megoldas
A **`uniqueness`**, értékei `UNIQUE` és `NONUNIQUE`. (Az `index_type` az index **fajtáját** adja: NORMAL, BITMAP, …)

@@feladat
Írj lekérdezést: a `MINTA` tábláinak melyik oszlopai szerepelnek **összetett** (legalább 2 oszlopos) index **első** oszlopaként? `[table_name, index_name, column_name]`
@@hint
Előbb keresd meg a ≥ 2 oszlopos indexeket (`GROUP BY` + `HAVING`), aztán ezek közül a `column_position = 1` sort.
@@megoldas
```sql
SELECT c.table_name, c.index_name, c.column_name
FROM   dba_ind_columns c
WHERE  c.table_owner = 'MINTA'
  AND  c.column_position = 1
  AND  (c.index_owner, c.index_name) IN (
         SELECT   index_owner, index_name
         FROM     dba_ind_columns
         GROUP BY index_owner, index_name
         HAVING   COUNT(*) >= 2);
```
Oracle-ben lehet **több oszlopos `IN`**: `(a, b) IN (SELECT x, y …)`.

@@feladat
Írj lekérdezést: melyik **tábláknak** van legalább 3 indexe? A tábla tulajdonosát és nevét és az indexek számát add vissza, csökkenően. `[table_owner, table_name, index_count]`
@@megoldas
```sql
SELECT   table_owner, table_name, COUNT(*) AS index_count
FROM     dba_indexes
GROUP BY table_owner, table_name
HAVING   COUNT(*) >= 3
ORDER BY index_count DESC;
```
A **tábla** szerint csoportosítunk (`table_owner, table_name`), nem az index tulajdonosa szerint.

@@feladat
**(ZH 1. variáns)** Azok a felhasználók, akiknek **legalább 5, de legfeljebb 10** táblájuk van, a darabszámmal, név szerint növekvőben. `[user_name, table_count]`, majd egy második lekérdezés: hányan vannak? `[user_count]`
@@megoldas
```sql
SELECT   owner AS user_name, COUNT(*) AS table_count
FROM     dba_tables
GROUP BY owner
HAVING   COUNT(*) BETWEEN 5 AND 10
ORDER BY user_name;

SELECT COUNT(*) AS user_count
FROM  (SELECT owner FROM dba_tables GROUP BY owner HAVING COUNT(*) BETWEEN 5 AND 10);
```

@@feladat
**(ZH 4. variáns)** **Nem egyedi bitmap** indexek nem rendszer-felhasználóktól, amelyek **pontosan 1** oszlopot indexelnek, és a tábla neve `S`-sel kezdődik. `[index_owner, index_name, table_name]`
@@megoldas
```sql
SELECT   i.owner AS index_owner, i.index_name, i.table_name
FROM     dba_indexes i
JOIN     dba_ind_columns c ON c.index_owner = i.owner AND c.index_name = i.index_name
WHERE    i.index_type = 'BITMAP'
  AND    i.uniqueness = 'NONUNIQUE'
  AND    i.owner NOT LIKE '%SYS%'
  AND    i.table_name LIKE 'S%'
GROUP BY i.owner, i.index_name, i.table_name
HAVING   COUNT(*) = 1;
```
A `table_name` is a `GROUP BY`-ba kerül, mert a `SELECT`-ben szerepel.

@@feladat
**(ZH 4. variáns)** Melyik **függvényalapú** indexek tartalmaznak `UPPER` függvényt? A `column_expression` `LONG` típusú, ezért közvetlenül nem szűrhető `LIKE`-kal. Hogyan oldod meg?
@@hint
PL/SQL-ben a `LONG` érték `VARCHAR2` változóba olvasható (32 KB-ig), és ott már működik az `INSTR`/`LIKE`.
@@megoldas
```sql
SET SERVEROUTPUT ON
BEGIN
    FOR r IN (SELECT index_owner, index_name, column_expression FROM dba_ind_expressions) LOOP
        IF UPPER(r.column_expression) LIKE '%UPPER(%' THEN
            DBMS_OUTPUT.PUT_LINE(r.index_owner || '.' || r.index_name || ': ' || r.column_expression);
        END IF;
    END LOOP;
END;
/
```
A kurzoros ciklusban a `r.column_expression` már PL/SQL szöveg, arra működik a `LIKE`. (Hasonló a `DBA_TAB_PARTITIONS.high_value`, az is `LONG`.)

@@feladat
Egy tábla elsődleges kulcsára (`CONSTRAINT pk_emp PRIMARY KEY (id)`) milyen index jön létre automatikusan? Add meg a nevét, a `uniqueness`-t és az `index_type`-ot!
@@megoldas
Egy **`PK_EMP`** nevű (a megszorítás nevét kapja), **`UNIQUE`**, **`NORMAL`** index. (Ha a megszorítás névtelen, a neve `SYS_C00…` lesz.) Kivétel az IOT: ott a PK-index maga a tábla, `IOT - TOP` típussal.
