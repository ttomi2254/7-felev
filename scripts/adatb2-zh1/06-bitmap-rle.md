@slug: bitmap-rle
@title: 6. Bitmap index és RLE-tömörítés (4. óra, hw_04)
@summary: A bitmap index definíciója és használata AND/OR/NOT lekérdezésekre, a hw_04 EMPLOYEES táblájának bitvektorai és a két lekérdezés kiértékelése, a futáshossz-kódolás (RLE) szabálya, tömörítés és kitömörítés lépésenként, gyakorlófeladatok.

## 1. Bitmap index

> **Bitmap index:** egy oszlop **minden különböző értékéhez** egy **bitvektor** tartozik, aminek a hossza a tábla sorainak száma (n). Az *i*-edik bit **1**, ha az *i*-edik sorban az oszlop értéke épp az adott érték, egyébként **0**.

Tulajdonságai:

* Egy soron belül **pontosan egy** vektorban van 1-es (ha az oszlop nem NULL), így az egy oszlophoz tartozó vektorok **VAGY**-a csupa 1.
* **Kis kardinalitású** (kevés különböző értékű) oszlopokra jó: nem, megye, státusz, év, osztály. A vektorok rövidek és jól tömöríthetők.
* A lekérdezés feltételei **bitműveletekké** válnak: `AND` → bitenkénti ÉS, `OR` → VAGY, `NOT` → negálás, `IN (a, b)` → a két vektor VAGY-a. A végeredmény vektor 1-esei adják a keresett sorokat.
* Oracle-ben: `CREATE BITMAP INDEX b ON t(col);`, a katalógusban `index_type = 'BITMAP'`.
* Hátránya: a gyakori `INSERT`/`UPDATE` drága (zárolás és újratömörítés), ezért inkább **adattárházakban** használják.

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

**A `DEPTID` bitmap indexe** (a feladat 1. része). A bitek sorrendje az ID sorrendje (1 → 14):

```text
           sor:  1 2 3 4 5 6 7 8 9 10 11 12 13 14
deptid = 10 :    0 0 0 0 0 0 1 0 1  0  0  0  0  1   = 00000010100001
deptid = 20 :    1 0 0 1 0 0 0 1 0  0  1  0  1  0   = 10010001001010
deptid = 30 :    0 1 1 0 1 1 0 0 0  1  0  1  0  0   = 01101100010100
```
Ellenőrzés: oszloponként pontosan egy 1-es van, és a három vektor VAGY-a csupa 1.

**A `POSITION` és a `START` vektorai** (a 2. részhez):

```text
position = CLERK     : 10000000001101
position = SALESMAN  : 01101000010000
position = MANAGER   : 00010110000000
position = ANALYST   : 00000001000010
position = PRESIDENT : 00000000100000

start = 1980 : 10000000000000
start = 1981 : 01111110110110
start = 1982 : 00000001000001
start = 1983 : 00000000001000
```

**1. lekérdezés:** azok a nevek, akik *(1981-ben kezdtek ÉS CLERK-ek) VAGY (a 20-as osztályon dolgoznak ÉS MANAGER-ek)*.

```text
start=1981          01111110110110
position=CLERK      10000000001101
ÉS  ──────────────  00000000000100    (csak a 12. sor: JAMES)

deptid=20           10010001001010
position=MANAGER    00010110000000
ÉS  ──────────────  00010000000000    (csak a 4. sor: JONES)

VAGY ─────────────  00010000000100    → JONES, JAMES
```

**2. lekérdezés:** azok a nevek, akik *NEM 1981-ben kezdtek ÉS (a 10-es VAGY a 30-as osztályon vannak)*.

```text
start=1981          01111110110110
NEM ──────────────  10000001001001    (SMITH, SCOTT, ADAMS, MILLER)

deptid=10           00000010100001
deptid=30           01101100010100
VAGY ─────────────  01101110110101

ÉS  ──────────────  00000000000001    → MILLER
```

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
| 0 (azaz `1`) | 0 | 1 | `0` | `00` |
| 1 (`01`) | 1 | 1 | `0` | `01` |
| 2 (`001`) | 10 | 2 | `10` | `1010` |
| 3 (`0001`) | 11 | 2 | `10` | `1011` |
| 7 | 111 | 3 | `110` | `110111` |
| 13 | 1101 | 4 | `1110` | `11101101` |
| 21 | 10101 | 5 | `11110` | `1111010101` |
| 23 | 10111 | 5 | `11110` | `1111010111` |

**Kitömörítés:** olvass 1-eseket, amíg 0-t nem találsz. Ha *k* darab 1-es volt, akkor **j = k + 1**. Olvasd be a következő **j** bitet, ez az **i** binárisan. Írj ki i darab 0-t és egy 1-est. Ismételd a kód végéig.

### hw_04 3. feladat a): tömörítsd: `00000000 00000000 00000001 00000001 01`

1. Futamokra bontás: **23** darab 0, aztán 1 | **7** darab 0, aztán 1 | **1** darab 0, aztán 1. (8 + 8 + 7 = 23 nulla az első 1-es előtt.)
2. 23 = `10111` (j = 5) → `11110` + `10111` = `1111010111`
3. 7 = `111` (j = 3) → `110` + `111` = `110111`
4. 1 = `1` (j = 1) → `0` + `1` = `01`

**Eredmény:** `1111010111 110111 01` = **`111101011111011101`** (18 bit a 34 helyett).

### hw_04 3. feladat b): kitömörítés: `11110101 01001011`

A bitek: `1111010101001011`.

1. `1111` + `0` → 4 darab 1-es, tehát **j = 5**. A következő 5 bit: `10101` = **21** → 21 darab 0 és egy 1.
2. `0` → 0 darab 1-es, tehát **j = 1**. A következő 1 bit: `0` = **0** → csak egy `1`.
3. `10` → 1 darab 1-es, tehát **j = 2**. A következő 2 bit: `11` = **3** → `0001`.
4. A kód elfogyott.

**Eredmény:** `000000000000000000000` `1` `1` `0001` = **`000000000000000000000110001`** (27 bit). A vektor végén ezután még lehetnek 0-k, ha a táblának több sora van.

Ellenőrzés: az eredményt visszatömörítve `1111010101 00 1011` jön ki, ez épp a kiinduló kód ✓.

[[feladat:2,3,4]]

@@feladat
Írd fel a `POSITION` oszlop vektoraiból: kik a **SALESMAN**-ek, akik **1981-ben** kezdtek, és a **30**-as osztályon vannak? Add meg a vektorműveleteket és az eredményt!
@@megoldas
```text
position=SALESMAN  01101000010000
start=1981         01111110110110
deptid=30          01101100010100
ÉS ÉS ───────────  01101000010000   → ALLEN, WARD, MARTIN, TURNER
```
Mind a 4 SALESMAN 1981-es és 30-as osztályú.

@@feladat
Add meg a bitvektort: **ANALYST VAGY PRESIDENT**, de **NEM a 20-as osztály**. Kik ezek?
@@megoldas
```text
ANALYST            00000001000010
PRESIDENT          00000000100000
VAGY ────────────  00000001100010
deptid=20          10010001001010
NEM  ────────────  01101110110101
ÉS   ────────────  00000000100000   → KING
```
SCOTT és FORD ANALYST, de mindketten a 20-as osztályon vannak, ezért csak KING marad.

@@feladat
Tömörítsd RLE-vel: `0001 00000001 1` (a szóközök csak az olvashatóságot segítik).
@@hint
Futamok: 3 db 0 + 1, 7 db 0 + 1, 0 db 0 + 1.
@@megoldas
* 3 = `11` (j = 2) → `10` + `11` = `1011`
* 7 = `111` (j = 3) → `110` + `111` = `110111`
* 0 = `0` (j = 1) → `0` + `0` = `00`

Eredmény: **`101111011100`**.

@@feladat
Tömörítsd RLE-vel: `1 000001 0000000000001`.
@@megoldas
Futamok: **0**, **5**, **12**.
* 0 → `00`
* 5 = `101` (j = 3) → `110` + `101` = `110101`
* 12 = `1100` (j = 4) → `1110` + `1100` = `11101100`

Eredmény: **`0011010111101100`**.

@@feladat
Tömörítsd ki: `110101011011`.
@@megoldas
* `110` → j = 3, a következő 3 bit `101` = 5 → `000001`
* `0` → j = 1, a következő bit `1` = 1 → `01`
* `10` → j = 2, a következő 2 bit `11` = 3 → `0001`

Eredmény: **`000001010001`**.
