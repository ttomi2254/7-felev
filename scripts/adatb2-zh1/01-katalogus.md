@slug: rendszerkatalogus
@title: 1. Rendszerkatalógus, SQL-eszköztár és PL/SQL alapok (1. óra)
@summary: DBA_/ALL_/USER_ nézetek, objektumazonosítás és nagybetűs nevek, DUAL és SYNONYM, DBA_OBJECTS és DBA_TAB_COLUMNS; GROUP BY/HAVING, halmazműveletek, alkérdések, WITH, FETCH FIRST; tárolt eljárás FOR-ciklussal, DBMS_OUTPUT, SYS_REFCURSOR. Az 1. munkafüzet mind a 19 feladata megoldva.

## 1. Definíciók

> **Rendszerkatalógus (data dictionary):** csak olvasható táblák és nézetek halmaza, amelyek az adatbázis **objektumairól** (táblák, nézetek, indexek, triggerek, szekvenciák, felhasználók stb.) tárolnak metaadatot. Ugyanúgy kérdezhető le `SELECT`-tel, mint bármely más tábla.

A katalógus nézetei a **láthatóság** szerint háromféle előtaggal léteznek:

| Előtag | Mit tartalmaz | Ki éri el |
|--------|---------------|-----------|
| `DBA_` | az adatbázis **összes** objektumát | elvileg csak admin, **a laborszervereken mindenki** |
| `ALL_` | amihez az aktuális felhasználónak **hozzáférése** van | mindenki |
| `USER_` | csak az aktuális felhasználó **saját** objektumait (nincs `owner` oszlopa!) | mindenki |

Minden objektumtípusnak van saját nézete: `DBA_OBJECTS` (minden objektum), `DBA_TABLES`, `DBA_INDEXES`, `DBA_VIEWS`, `DBA_TRIGGERS`, `DBA_SYNONYMS`, `DBA_USERS`, `DBA_TAB_COLUMNS` stb.

> **Objektumazonosítás:** egy adatbázis-objektumot a **tulajdonos (owner) és a név (name) együtt** azonosít. Például `LABOR.LAB01` egy tábla, aminek a neve `LAB01`, a tulajdonosa `LABOR`. **A név önmagában nem egyedi azonosító.**

> **Nevek kis- és nagybetűi:** az Oracle a nevekben megkülönbözteti a kis- és nagybetűt, de idézőjel nélkül létrehozva a nevet **nagybetűsre alakítja**. A katalógusban ezért nagybetűvel kell keresni.

```sql
CREATE TABLE test(o INTEGER);    -- a katalógusban: 'TEST'
CREATE TABLE "test"(o INTEGER);  -- a katalógusban: 'test'

SELECT * FROM dba_tables WHERE owner = 'LABOR' AND table_name = 'LAB01';   -- helyes
SELECT * FROM dba_tables WHERE owner = 'labor';                            -- 0 sor!
```

Ha nem tudod, hogyan tárolódik a név, használd az `UPPER`-t: `WHERE UPPER(table_name) = 'LAB01'`. Vigyázz, ez **több sort** is visszaadhat (a `"lab01"` és a `LAB01` két külön tábla).

> **DUAL:** speciális tábla, **egy oszloppal és egy sorral**. Arra való, hogy konstanst vagy függvényértéket „táblaként” kérdezzünk le, mert az Oracle-ben minden `SELECT`-nek kell `FROM`: `SELECT 1 FROM dual`, `SELECT DBMS_ROWID.ROWID_OBJECT('AAAS98AACAAAAY/AAR') FROM dual`.

> **SYNONYM (szinonima):** egy másik objektumra mutató **álnév**. A szinonimának saját tulajdonosa van (nem az, akié a hivatkozott tábla). A **nyilvános (public) szinonimák** tulajdonosa a `PUBLIC` felhasználó. Ezért írhatsz `dba_tables`-t és `dual`-t `SYS.` nélkül: ezek `PUBLIC` szinonimák a `SYS` objektumaira. **Szinonima létrehozása nem ad hozzáférési jogot!**

A `DBA_SYNONYMS` oszlopai: `owner` (a szinonima tulajdonosa), `synonym_name`, `table_owner` és `table_name` (a hivatkozott objektum), `db_link`.

## 2. A két legfontosabb nézet oszlopai

**`DBA_OBJECTS`**: minden objektum, egy sor objektumonként (partíciónként is!):

| Oszlop | Jelentés |
|--------|----------|
| `owner`, `object_name` | tulajdonos és név |
| `subobject_name` | partíció neve (ha az objektum egy partíció) |
| `object_type` | `TABLE`, `INDEX`, `VIEW`, `SYNONYM`, `TRIGGER`, `SEQUENCE`, `PROCEDURE`, `PACKAGE`, `TABLE PARTITION`, `INDEX PARTITION`, … |
| `object_id` | az objektum (logikai) azonosítója |
| `data_object_id` | a **tárolási szegmens** azonosítója. Ha **NULL**, az objektumnak **nincs saját tárterülete** (nézet, szinonima, eljárás, vagy egy **particionált** tábla/index, aminek csak a partícióinak van tárhelye) |
| `created`, `last_ddl_time` | létrehozás és utolsó DDL ideje (`DATE`) |
| `status` | `VALID` / `INVALID` |

**`DBA_TAB_COLUMNS`**: a táblák (és nézetek) oszlopai:

| Oszlop | Jelentés |
|--------|----------|
| `owner`, `table_name`, `column_name` | melyik tábla melyik oszlopa |
| `column_id` | az oszlop **sorszáma** a táblában (1, 2, 3, …) |
| `data_type` | `VARCHAR2`, `NUMBER`, `DATE`, `CHAR`, `CLOB`, `FLOAT`, … |
| `data_length`, `data_precision`, `data_scale` | méret, pontosság |
| `nullable` | `Y` / `N` |
| `default_length`, `data_default` | az alapértelmezett érték hossza és szövege (`NULL`, ha nincs default) |

## 3. SQL-eszköztár: ezt kell biztosan tudnod

### A SELECT kiértékelési sorrendje

```text
FROM / JOIN  →  WHERE  →  GROUP BY  →  HAVING  →  SELECT  →  ORDER BY  →  FETCH FIRST
```

Ebből következik két fontos szabály:

* **A `WHERE` a sorokat szűri (csoportosítás előtt), a `HAVING` a csoportokat (aggregálás után).** Aggregátumra (`COUNT`, `SUM`) feltétel **csak `HAVING`-ben** állhat.
* **A `SELECT`-ben adott alias a `WHERE`-ben és a `HAVING`-ben még NEM használható**, csak az `ORDER BY`-ban. Ezért `HAVING COUNT(*) < 20`-at írj, ne `HAVING index_count < 20`-at, mert az utóbbi hibára fut.

### Aggregálás

* `COUNT(*)`: a sorok száma; `COUNT(oszlop)`: a nem-NULL értékek száma; `COUNT(DISTINCT oszlop)`: a különböző értékek száma.
* `SUM`, `MIN`, `MAX`, `AVG`, `ROUND(x, 2)`.
* **GROUP BY-szabály:** a `SELECT`-ben minden nem aggregált oszlopnak szerepelnie kell a `GROUP BY`-ban.

### Feltételes aggregálás: egy csoporton belül több számlálás

```sql
SELECT owner,
       SUM(CASE WHEN object_type = 'TABLE' THEN 1 ELSE 0 END) AS table_count,
       SUM(CASE WHEN object_type = 'INDEX' THEN 1 ELSE 0 END) AS index_count
FROM   dba_objects
GROUP  BY owner;
```

### Halmazműveletek

| Művelet | Jelentés |
|---------|----------|
| `UNION` | unió, **duplikátumok nélkül** |
| `UNION ALL` | unió, duplikátumokkal (gyorsabb) |
| `INTERSECT` | metszet |
| `MINUS` | különbség (Oracle-ben így hívják; máshol `EXCEPT`) |

Szabály: a két oldalnak **ugyanannyi és kompatibilis típusú oszlopa** legyen. Az `ORDER BY` csak **a legvégén**, egyszer állhat.

### Alkérdések, WITH, top-N

```sql
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
```

### LIKE

`%` = tetszőleges hosszú szöveg, `_` = pontosan egy karakter. `'%SYS%'` = bárhol tartalmazza, `'SYS%'` = azzal kezdődik. A `_`-t keresni így kell: `LIKE 'A\_%' ESCAPE '\'`.

## 4. Az 1. munkafüzet feladatai, megoldással

Mindegyik feladatnál szögletes zárójelben van, milyen oszlopokat vár az eredmény.

**1.** Kik a tulajdonosai a `DBA_TABLES` nézetnek és a `DUAL` táblának? `[owner, object_name, object_type]`

```sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  (object_name = 'DBA_TABLES' AND object_type = 'VIEW')
   OR  (object_name = 'DUAL'       AND object_type = 'TABLE');
```
Mindkettő a `SYS`-é. (Az `AND` erősebben köt, mint az `OR`, de a zárójel biztonságosabb.)

**2.** Kik a tulajdonosai a `DBA_TABLES` és `DUAL` nevű **szinonimáknak**?

```sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  object_name IN ('DBA_TABLES', 'DUAL') AND object_type = 'SYNONYM';
```
Az eredmény: `PUBLIC`. Ezért érhetők el `SYS.` előtag nélkül.

**3.** A különböző objektumtípusok: `SELECT DISTINCT object_type FROM dba_objects;`

**4.** Az `ORAUSER` objektumtípusai: `SELECT DISTINCT object_type FROM dba_objects WHERE owner = 'ORAUSER';`

**5.** Hány különböző típus van? `SELECT COUNT(DISTINCT object_type) AS counts FROM dba_objects;`

**6–7.** Kinek van 10-nél több különböző típusú objektuma (csökkenő sorrendben, a számmal)?

```sql
SELECT   owner, COUNT(DISTINCT object_type) AS object_type_counts
FROM     dba_objects
GROUP BY owner
HAVING   COUNT(DISTINCT object_type) > 10
ORDER BY object_type_counts DESC;
```

**8.** Kinek van triggere **és** nézete is? Háromféle megoldás:

```sql
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
```

**9.** Kinek van nézete, de **nincs** triggere?

```sql
SELECT owner FROM dba_objects WHERE object_type = 'VIEW'
MINUS
SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER';

-- vagy anti-join:
SELECT DISTINCT owner FROM dba_objects
WHERE  object_type = 'VIEW'
  AND  owner NOT IN (SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER');
```

**10.** Kinek van **több mint n** táblája, de **legfeljebb m** indexe? (pl. n = 20, m = 15)

⚠️ Csapda: a „legfeljebb m” a **0 indexet is** megengedi! Ha az index-tulajdonosokkal `INTERSECT`-et vagy `INNER JOIN`-t csinálsz, azok kiesnek, akiknek egyáltalán nincs indexük. Két helyes megoldás:

```sql
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
```

**11.** Mely objektumtípusoknak van tényleges tárhelye (adatblokkja)?
`SELECT DISTINCT object_type FROM dba_objects WHERE data_object_id IS NOT NULL;`

**12.** Melyeknek nincs? `SELECT DISTINCT object_type FROM dba_objects WHERE data_object_id IS NULL;`

**13.** Melyik típus van **mindkettőben**?

```sql
SELECT object_type FROM dba_objects WHERE data_object_id IS NOT NULL
INTERSECT
SELECT object_type FROM dba_objects WHERE data_object_id IS NULL;
```
Jellemzően `TABLE` és `INDEX` jön ki. **Magyarázat:** a **particionált** tábla vagy index maga csak **logikai** objektum (`data_object_id` NULL), a tárhelye a **partícióké** (`TABLE PARTITION`, saját `data_object_id`-val). Hasonló az **IOT** is: a tábla-objektumnak nincs saját szegmense, az adat az indexszegmensben van (7. lecke). A 9. leckében visszatérünk erre.

**14.** Hány oszlopa van a `MINTA.EMP` táblának?
`SELECT COUNT(*) AS counts FROM dba_tab_columns WHERE owner = 'MINTA' AND table_name = 'EMP';`

**15.** Mi a típusa a 6. oszlopnak?
`SELECT data_type FROM dba_tab_columns WHERE owner = 'MINTA' AND table_name = 'EMP' AND column_id = 6;`

**16.** Melyik táblának van `Z` betűvel kezdődő nevű oszlopa?
`SELECT DISTINCT owner, table_name FROM dba_tab_columns WHERE UPPER(column_name) LIKE 'Z%';`

**17.** Melyik táblának van legalább 8 `DATE` típusú oszlopa?

```sql
SELECT   owner, table_name
FROM     dba_tab_columns
WHERE    data_type = 'DATE'
GROUP BY owner, table_name
HAVING   COUNT(*) >= 8;
```

**18.** Melyik táblának `VARCHAR2` az 1. **és** a 4. oszlopa, default érték nélkül?

```sql
SELECT owner, table_name FROM dba_tab_columns
WHERE  column_id = 1 AND data_type = 'VARCHAR2' AND default_length IS NULL
INTERSECT
SELECT owner, table_name FROM dba_tab_columns
WHERE  column_id = 4 AND data_type = 'VARCHAR2' AND default_length IS NULL;
```
Miért nem jó egyetlen `WHERE column_id = 1 AND column_id = 4`? Mert egy **sor** egyszerre nem lehet 1. és 4. oszlop. A két feltétel **két különböző sorra** vonatkozik, ezért kell a metszet (vagy egy self-join, vagy `GROUP BY` + `HAVING COUNT(*) = 2` a `column_id IN (1, 4)` sorokon).

[[feladat:0,1,2]]

## 5. PL/SQL: tárolt eljárások

> **PL/SQL:** az Oracle procedurális nyelve. A **tárolt eljárás** az adatbázis része lesz, **a szerveren** (az adatbázismotorban) fut, az adatbázis biztonsági környezetében, **tranzakcionálisan**. Nincs hálózati késleltetés és kliens–szerver forgalom, ha nagy táblák sorain iterál.

Mire jó: SQL-ben nehezen kifejezhető műveletekre, **dinamikus SQL** (szövegként összerakott lekérdezés) futtatására, és szerveroldali üzleti logikára (validálás, naplózás).

### A váz, amit kívülről kell tudnod

```sql
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
```

Futtatás SQL Developerben:

```sql
SET SERVEROUTPUT ON;           -- enélkül nem látszik a DBMS_OUTPUT!
EXEC eljaras_neve('minta', 'emp');
-- a házik ellenőrzése:
EXECUTE check_plsql('eljaras_neve(''minta'', ''emp'')');
```

Fontos részletek:

* `SELECT … INTO` **pontosan egy** sort várhat. Ha 0 sor jön, `NO_DATA_FOUND`, ha több, `TOO_MANY_ROWS` hibát dob. Aggregátummal (`COUNT`, `SUM`) mindig pontosan 1 sor jön. A `SUM` 0 sorra `NULL`-t ad, ezért `NVL(SUM(bytes), 0)`.
* Értékadás: `v := 5;`. Összehasonlítás: `=`.
* Stringben az aposztróf duplázva: `'It''s'`, és ezért `check_plsql('f(''minta'')')`.
* Dátum formázása: `TO_CHAR(created, 'yyyy.mm.dd.hh24:mi')` (`hh` = 12 órás, `hh24` = 24 órás).
* **A paramétert a felhasználó kisbetűvel is megadhatja** (`'minta'`), ezért a katalógusban `UPPER(p_owner)`-rel keress.

> **A `DBMS_OUTPUT.PUT_LINE` csak hibakeresésre való**, nem adatküldésre. Az üzenet szövegként megy a kliensnek, nem típusos adatként. Valódi alkalmazásban az eljárás **skalár értéket** vagy **kurzort** ad vissza, ezt a kliens soronként be tudja olvasni.

### Kurzor visszaadása (`OUT SYS_REFCURSOR`)

```sql
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
```

### A 19. feladat: `table_print`

Írj eljárást, ami kiírja azoknak a tábláknak a tulajdonosát és nevét, amelyek neve a paraméterrel **kezdődik**, kis- és nagybetűtől függetlenül.

```sql
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
```
A `LIKE UPPER(p_kar) || '%'` kifejezésben a `||` erősebben köt, mint a `LIKE`, tehát a minta `'Z%'` lesz.

[[feladat:3,4,5]]

@@feladat
Írj lekérdezést: melyik felhasználónak van **pontosan 1** nézete (`VIEW`), csökkenő név szerint rendezve? `[owner]`
@@hint
`WHERE object_type = 'VIEW'`, `GROUP BY owner`, `HAVING COUNT(*) = 1`, `ORDER BY owner DESC`.
@@megoldas
```sql
SELECT   owner
FROM     dba_objects
WHERE    object_type = 'VIEW'
GROUP BY owner
HAVING   COUNT(*) = 1
ORDER BY owner DESC;
```
A `WHERE` előbb kiszűri a nem-nézet sorokat, a `HAVING` utána a csoportokat.

@@feladat
Mi a hiba ebben a lekérdezésben, és hogyan javítod?
```sql
SELECT owner, COUNT(*) AS cnt FROM dba_tables
WHERE cnt > 30
GROUP BY owner;
```
@@hint
Két dolog: hol lehet aggregátumra szűrni, és mikor létezik már az alias?
@@megoldas
(1) Aggregátumra (`COUNT(*)`) **nem lehet a `WHERE`-ben** szűrni, mert a `WHERE` a csoportosítás **előtt** fut. (2) A `cnt` alias a `WHERE`-ben (és a `HAVING`-ben) **még nem létezik**. Javítva:
```sql
SELECT   owner, COUNT(*) AS cnt
FROM     dba_tables
GROUP BY owner
HAVING   COUNT(*) > 30;
```

@@feladat
Melyik halmazművelettel kapod meg Oracle-ben azokat, akiknek van indexük, de nincs triggerük? (Egy kulcsszó.)
@@valasz: MINUS
@@hint
Nem `EXCEPT` (az a szabványos SQL / MSSQL neve).
@@megoldas
**MINUS**:
```sql
SELECT owner FROM dba_objects WHERE object_type = 'INDEX'
MINUS
SELECT owner FROM dba_objects WHERE object_type = 'TRIGGER';
```

@@feladat
Írj PL/SQL eljárást `count_types(p_owner VARCHAR2)` néven, amely kiírja a felhasználó objektumtípusait és darabszámukat `TÍPUS: darab` formában, darabszám szerint csökkenően. A paraméter kisbetűs is lehet!
@@hint
`FOR rec IN (SELECT object_type, COUNT(*) AS db FROM dba_objects WHERE owner = UPPER(p_owner) GROUP BY object_type ORDER BY db DESC) LOOP … END LOOP;`. Az aggregált oszlopnak adj aliast, különben nem tudsz rá hivatkozni a `rec`-en keresztül!
@@megoldas
```sql
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
```
Az alias (`db`) kötelező: egy `COUNT(*)` kifejezésre a `rec`-en keresztül nem lehetne hivatkozni.

@@feladat
Mi a különbség a két hívás eredménye között, és miért? `EXEC table_print('z');` illetve egy olyan változat, amiben `WHERE table_name LIKE p_kar || '%'` áll (`UPPER` nélkül).
@@megoldas
Az `UPPER` nélküli változat `'z%'` mintával keres, de a táblanevek a katalógusban **nagybetűsek** (idézőjel nélkül létrehozva), ezért szinte **semmit sem talál**. Az `UPPER(table_name) LIKE UPPER(p_kar) || '%'` mindkét oldalt nagybetűsíti, így a kis- és nagybetű nem számít.

@@feladat
Egy `SELECT … INTO v_x FROM …` utasítás a futáskor `ORA-01403: no data found` hibát ad. Mit jelent, és hogyan kerülöd el egy összeg lekérdezésénél?
@@megoldas
A lekérdezés **0 sort** adott, a `SELECT INTO` pedig pontosan egyet vár. Összegnél, számlálásnál használj **aggregátumot**: az mindig pontosan 1 sort ad, még üres halmazra is. Az üres halmaz `SUM`-ja `NULL`, ezt `NVL`-lel cseréld 0-ra:
```sql
SELECT NVL(SUM(bytes), 0) INTO v_size
FROM   dba_segments
WHERE  owner = UPPER(p_owner) AND segment_name = UPPER(p_table);
```
