@slug: rowid-blokkok
@title: 3. ROWID, DBMS_ROWID, foglalt és használt blokkok (3. óra)
@summary: A ROWID definíciója és formátuma (base64 dekódolással), a DBMS_ROWID függvények, a foglalt (extent) és a ténylegesen használt (ROWID) blokkok különbsége, PCTFREE és ASSM, a num_of_rows eljárás és rekurzív WITH, EXCEPTIONS INTO. A 3. munkafüzet összes feladata megoldva. Ez kell a ZH 5. feladatához (30 pont).

## 1. Definíciók

> **Mutató (pointer) az RDBMS-ben:** mindig egy **fájlon belüli fizikai helyre** mutat, és **egyértelműen azonosít egy fizikai sort**. Nem memóriacím, mint a C nyelvben. Mivel a lefoglalt blokkok nem mozognak, a mutatókat nem kell frissíteni.

> **ROWID:** az Oracle **ál-oszlopa (pseudocolumn)**, ami a sor fizikai címe. Minden heap tábla minden sorának van ilyenje, `SELECT ROWID, t.* FROM t` adja vissza. Az indexek levelei ezt tárolják mutatóként.

A ROWID egy **18 karakteres** szöveg, **base64** kódolással, a formátuma:

```text
OOOOOO  FFF  BBBBBB  RRR
  │      │     │      └─ row number:  a sor sorszáma a blokkon belül (0-tól)
  │      │     └──────── block number: a blokk sorszáma a fájlon belül
  │      └────────────── relative file number: a fájl RELATÍV száma a tablespace-en belül
  └───────────────────── data object id: a szegmens (adatobjektum) azonosítója
```

**Base64 ábécé:** `A–Z` → 0–25, `a–z` → 26–51, `0–9` → 52–61, `+` → 62, `/` → 63. Minden csoport egy 64-es számrendszerbeli szám.

**Példa** (a 3. munkafüzetből): `AAAS98AACAAAAY/AAR`

| Rész | Karakterek | Érték |
|------|-----------|-------|
| objektum | `AAAS98` | S = 18, 9 = 61, 8 = 60 → 18·64² + 61·64 + 60 = **77692** |
| fájl | `AAC` | C = 2 → **2** |
| blokk | `AAAAY/` | Y = 24, / = 63 → 24·64 + 63 = **1599** |
| sor | `AAR` | R = 17 → **17** |

Nem kell kézzel dekódolni, erre van a **`DBMS_ROWID`** csomag:

| Függvény | Mit ad vissza | Mivel joinolod |
|----------|---------------|----------------|
| `DBMS_ROWID.ROWID_OBJECT(ROWID)` | data object id | `DBA_OBJECTS.data_object_id` |
| `DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID)` | relatív fájlszám | `DBA_DATA_FILES.relative_fno` |
| `DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)` | blokkszám a fájlban | `DBA_EXTENTS.block_id … block_id + blocks − 1` |
| `DBMS_ROWID.ROWID_ROW_NUMBER(ROWID)` | sorszám a blokkban | |

> **Relatív és abszolút fájlszám:** a ROWID-ban a **relatív** fájlszám van (a tablespace-en belüli sorszám). A `DBA_DATA_FILES`-ban két oszlop van: `file_id` (abszolút, az egész adatbázisban egyedi) és `relative_fno`. A ROWID-ot a `relative_fno`-val kell joinolni. A laborszervereken a kettő általában megegyezik, de a helyes join a `relative_fno`, és ha több tablespace is szóba jöhet, a `tablespace_name` is.

> **Foglalt és használt blokk:**
> * **foglalt (allocated)** = a szegmens extentjeiben lévő összes blokk (`DBA_SEGMENTS.blocks` = `SUM(DBA_EXTENTS.blocks)`). Ezeket más tábla **nem kaphatja meg**.
> * **használt (used)** = azok a blokkok, amelyekben **ténylegesen van sor**. Ezek a sorok ROWID-jából számolhatók: `COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))`, fájlonként!
> * **használt ≤ foglalt**, mindig. A különbség az **üres blokk**. Ez lehet törölt sorok miatti üres blokk, még fel nem töltött blokk az extent végén, vagy a szegmens fejléc- és bitmap-blokkjai (ASSM).

**Tétel, ami a ZH 5. feladatához kell:** egy tábla **egy adott fájlban** használt blokkjainak száma

```sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS used_blocks
FROM   tulaj.tabla
WHERE  DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) = <a fájl relative_fno-ja>;
```
Ha a tábla több fájlban van, a blokkszám **csak fájlon belül egyedi**. Ezért fájlonként csoportosíts (vagy szűrj fájlra), különben két fájl azonos számú blokkja egynek számít.

## 2. Blokk-kitöltés: PCTFREE, STORAGE, ASSM

> **PCTFREE:** a blokkban szabadon hagyott hely százaléka. A beszúrás addig tölti a blokkot, amíg a szabad hely `PCTFREE`% fölött van, a maradékot a már bent lévő sorok későbbi **bővülésére** (UPDATE) tartja fenn. Indexeknél ugyanez a „**fill factor**”: a szabadon hagyott hely csökkenti a B+-fa **lapvágásainak** számát. Nagyobb `PCTFREE` → kevesebb sor fér egy blokkba.

```sql
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
```

> **ASSM (Automatic Segment Space Management):** ha a tablespace `segment_space_management = 'AUTO'`, az Oracle maga dönti el az extentek méretét (autoallocate). Ezért kérhetsz `INITIAL 128K`-t, mégis **két 64 KiB-os** extent jön létre egy 128 KiB-os helyett. Ellenőrzés:
> ```sql
> SELECT tablespace_name, segment_space_management, allocation_type
> FROM   dba_tablespaces WHERE tablespace_name = 'EXAMPLE';
> ```

## 3. A 3. munkafüzet feladatai, megoldással

**1.** A `MINTA.CUSTOMERS` foglalt blokkjai fájlonként, a fájl összes blokkjával. `[file_name, total_blocks, used_blocks]`
```sql
SELECT   f.file_name, f.blocks AS total_blocks, SUM(e.blocks) AS used_blocks
FROM     dba_extents e
JOIN     dba_data_files f ON e.file_id = f.file_id
WHERE    e.owner = 'MINTA' AND e.segment_name = 'CUSTOMERS'
GROUP BY f.file_name, f.blocks;
```
Itt a „used” a **foglalt** blokkokat jelenti (amit más tábla nem kaphat meg).

**2.** Hány blokkban van **ténylegesen** sor? `[total_blocks]`
```sql
SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) || '.' ||
                      DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID)) AS total_blocks
FROM   minta.customers;
```
A hivatalos megoldás csak a blokkszámot számolja (`COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))`). Ez akkor helyes, ha a tábla egy fájlban van. A fenti változat a **(fájl, blokk) párt** számolja, így több fájlnál is jó.

**3.** Ugyanez fájlonként. `[file_name, total_blocks]`
```sql
SELECT   f.file_name, COUNT(DISTINCT DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)) AS total_blocks
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name;
```
⚠️ Ha a táblának aliast adsz (`c`), a ROWID-ot is minősíteni kell (`c.ROWID`), különben a join után nem egyértelmű.

**4.** Blokkonként hány sor van, fájl és blokk szerint rendezve. `[file_name, block_id, row_count]`
```sql
SELECT   f.file_name,
         DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
         COUNT(*) AS row_count
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name, DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)
ORDER BY f.file_name, block_id;
```

**5. a)** A `CUST_ID = 100` sor fájlja, ROWID-ja, blokkja és sorszáma. `[file_name, rowid, block_id, row_number]`
```sql
SELECT f.file_name,
       c.ROWID,
       DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
       DBMS_ROWID.ROWID_ROW_NUMBER(c.ROWID)   AS row_number
FROM   minta.customers c
JOIN   dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
WHERE  c.cust_id = 100;
```

**5. b)** A kimásolt ROWID alapján melyik objektumban van a sor? `[owner, object_name, object_type]`
```sql
SELECT owner, object_name, object_type
FROM   dba_objects
WHERE  data_object_id = DBMS_ROWID.ROWID_OBJECT('AAAS98AACAAAAY/AAR');
```
A ROWID-ban a **data_object_id** van. Sima táblánál ez megegyezik az `object_id`-vel (a hivatalos megoldás azzal joinol), de például `TRUNCATE` vagy `ALTER TABLE … MOVE` után a `data_object_id` megváltozik. Particionált táblánál a sor **a partíció** data object id-ját hordozza.

**6.** `block_test`: 128 KiB foglalás (két 64 KiB-os extent ASSM miatt), `ALLOCATE EXTENT`, majd egy PL/SQL ciklus, ami addig szúr be, amíg a sorok **két** blokkba nem kerülnek:
```sql
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
```
`PCTFREE 40`-nel megismételve az első blokkba **kevesebb sor** fér, mert a blokk 40%-a szabadon marad.

**7.** `num_of_rows`: a `MINTA.TABLA_123` minden blokkjára (az **üres** blokkokra is!) írja ki: `FILE_ID;BLOCK_ID->darab;`. Fájl, majd blokk szerint rendezve.

Ötlet: a tábla blokkjait a `DBA_EXTENTS`-ből soroljuk fel (`block_id`-tól `block_id + blocks − 1`-ig), és mindegyikre megszámoljuk a sorokat.
```sql
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
```
A belső `COUNT(*)` miatt az üres blokk is megjelenik 0-val. Ez a feladat kulcsa: ha a ROWID-ból indulnál ki, az üres blokkok kimaradnának. A hivatalos megoldás csak a blokkszámra szűr. A fájlra szűrés akkor számít, ha a tábla több fájlban van. A kimeneti formátumot (`;` a végén) a `check_plsql` dönti el. A munkafüzet mintájában (`2;563->306`) nincs ott a záró `;`, a feladatszöveg formátumában viszont igen: ha a `check_plsql` hibát jelez, próbáld a záró `;` nélkül.

**8.** Ugyanez **egyetlen SQL lekérdezéssel**, rekurzív `WITH`-del:

> **Rekurzív WITH (rekurzív CTE):** egy **kezdő (anchor)** lekérdezés `UNION ALL` egy **rekurzív** taggal, ami önmagára hivatkozik. Addig ismétlődik, amíg a rekurzív tag ad új sort. Oracle-ben a CTE neve után **kötelező az oszloplista**.

```sql
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
```
A `LEFT JOIN` + `NVL(…, 0)` adja a 0 soros blokkokat.

**9.** Utólagos megszorítás és a sértő sorok: `EXCEPTIONS INTO`
```sql
CREATE TABLE const_t_except(row_id ROWID, owner VARCHAR2(30),
                            table_name VARCHAR2(30), constraint VARCHAR2(30));

ALTER TABLE const_t
ADD CONSTRAINT const_c CHECK (o3 > TO_DATE('2005-jan-01', 'YYYY-mon-dd'))
EXCEPTIONS INTO const_t_except;          -- hibát dob, de a sértő sorok ROWID-ja bekerül

SELECT c.* FROM const_t c
JOIN   const_t_except x ON c.ROWID = x.row_id;
```
Ha egy megszorítást már feltöltött táblára adunk, az Oracle ellenőrzi a meglévő sorokat. Ha valamelyik sérti, a megszorítás **nem jön létre**, és a hibaüzenet nem mondja meg, melyik sorok a hibásak. Az `EXCEPTIONS INTO` a sértő sorok **ROWID**-ját egy külön táblába gyűjti.

[[feladat:0,1,2,3,4,5]]

@@feladat
Dekódold kézzel a `AAASdAAAEAAAACXAAB` ROWID-ot: mi az objektum-, fájl-, blokk- és sorszám?
@@hint
Csoportok: `AAASdA` | `AAE` | `AAAACX` | `AAB`. A = 0, S = 18, d = 29, E = 4, C = 2, X = 23, B = 1.
@@megoldas
* objektum `AAASdA`: 18·64² + 29·64 + 0 = 73728 + 1856 = **75584**
* fájl `AAE`: **4**
* blokk `AAAACX`: 2·64 + 23 = **151**
* sor `AAB`: **1** (a blokk 2. sora, mert 0-tól számozunk)

Ellenőrzés gépen: `SELECT DBMS_ROWID.ROWID_OBJECT('AAASdAAAEAAAACXAAB') FROM dual;`

@@feladat
Írj lekérdezést, amely megadja a `MINTA.CUSTOMERS` tábla **üres** (foglalt, de sort nem tartalmazó) blokkjainak számát! `[empty_blocks]`
@@hint
Foglalt: `SUM(blocks)` a `DBA_SEGMENTS`-ből (vagy `DBA_EXTENTS`-ből). Használt: a ROWID-ból számolt különböző (fájl, blokk) párok. A kettő különbsége.
@@megoldas
```sql
SELECT (SELECT SUM(blocks) FROM dba_segments
        WHERE owner = 'MINTA' AND segment_name = 'CUSTOMERS')
     - (SELECT COUNT(DISTINCT DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) || '.' ||
                              DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID))
        FROM minta.customers) AS empty_blocks
FROM dual;
```
Két skalár alkérdés különbsége, `FROM dual`-lal. Ugyanez lesz a 6. labor `empty_blocks` házija, csak dinamikus SQL-lel (9. lecke).

@@feladat
Melyik blokkban és melyik fájlban van a `MINTA.CUSTOMERS` tábla **legtöbb sort** tartalmazó blokkja, és hány sor van benne? `[file_name, block_id, row_count]`
@@megoldas
```sql
SELECT   f.file_name,
         DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID) AS block_id,
         COUNT(*) AS row_count
FROM     minta.customers c
JOIN     dba_data_files f ON f.relative_fno = DBMS_ROWID.ROWID_RELATIVE_FNO(c.ROWID)
GROUP BY f.file_name, DBMS_ROWID.ROWID_BLOCK_NUMBER(c.ROWID)
ORDER BY row_count DESC
FETCH FIRST 1 ROWS ONLY;
```

@@feladat
Miért lehet egy tábla **használt** blokkjainak száma kisebb, mint a **foglalt** blokkjaié? Mondj legalább három okot!
@@megoldas
1. **Törölt sorok:** a `DELETE` után a blokk üres maradhat, de a szegmensnél marad (nem adódik vissza a fájlnak).
2. **Még fel nem töltött blokkok:** az extent egyszerre 8 blokkot foglal, a sorok csak az első néhányba kerültek.
3. **Kézi foglalás:** `ALLOCATE EXTENT`, vagy nagy `INITIAL` a `STORAGE`-ben.
4. A szegmens **fejléc- és ASSM bitmap-blokkjai** sosem tartalmaznak sort.

(A `PCTFREE` nem ok: az a blokkon **belüli** szabad helyet szabályozza, nem azt, hogy egy blokk teljesen üres-e.)

@@feladat
A `DBA_OBJECTS` melyik oszlopával kell összevetni a `DBMS_ROWID.ROWID_OBJECT(ROWID)` értékét, hogy biztosan jó objektumot kapj?
@@valasz: data_object_id | DATA_OBJECT_ID
@@megoldas
A **`data_object_id`**-val. A ROWID a **szegmens** (adatobjektum) azonosítóját tartalmazza, ami `TRUNCATE` vagy `MOVE` után eltérhet az `object_id`-től, partíciónál pedig a partícióé.

@@feladat
Írj lekérdezést, amely a `MINTA.CUSTOMERS` minden **extentjére** megadja, hány olyan blokk van benne, amiben van sor! `[file_id, block_id, blocks, used_blocks]`
@@hint
Joinold az extenteket a ROWID-ból kapott (fájl, blokk) párokhoz azzal a feltétellel, hogy a blokk az extent tartományába esik: `blokk BETWEEN e.block_id AND e.block_id + e.blocks - 1`.
@@megoldas
```sql
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
```
`COUNT(u.blk)` csak a nem-NULL értékeket számolja, így a teljesen üres extent 0-t kap.
