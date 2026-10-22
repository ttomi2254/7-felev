@slug: hash-indexek
@title: 8. Hash indexek: statikus, kiterjeszthető, lineáris (5. óra, hw_05; papíros 2. feladat, 20 p)
@summary: A hash index definíciója, a statikus hash tábla legfelső/legalsó bitekkel és túlcsordulási láncokkal (egy ZH-típusú feladat lépésenként), a kiterjeszthető hash (könyvtár, i és j) és a lineáris hash szabályai, a hw_05 mindkét feladata végigszámolva, gyakorlófeladatok.

## 1. Közös definíciók

> **Hash index:** a **h(K)** hash függvény a K kulcsot egy **vödör (bucket)** sorszámára képezi. A vödör egy vagy több **blokk**, ezekben vannak a rekordok (vagy a rájuk mutató mutatók). Keresés: kiszámolod h(K)-t, és csak az adott vödröt olvasod. **Egyenlőségre** keresésnél nagyon gyors (ideális esetben 1 blokkolvasás), **tartománylekérdezésre nem jó**, mert a szomszédos kulcsok szétszóródnak.

A feladatokban a h(K) értékét **bitsorozatként** adják meg (pl. `010110`), és meg van mondva, hogy a **legfelső (most significant)** vagy a **legalsó (least significant)** biteket kell használni.

> **Túlcsordulás (overflow) és lánc:** ha a vödör tele van, egy új **túlcsordulási blokkot** fűzünk a végére (**láncolás, chaining**). Minél hosszabbak a láncok, annál lassabb a keresés.

## 2. Statikus hash tábla

> **Statikus hash:** a vödrök száma **rögzített** (B darab). A k bites címzésnél B = 2^k vödör van, `000 … 0`-tól `111 … 1`-ig. A rekord abba a vödörbe kerül, amelynek a sorszáma a hash érték kiválasztott k bitje. Ha a vödör tele van, **túlcsordulási blokkot láncolunk** hozzá. A tábla soha nem nő, csak a láncok hosszabbodnak.

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

```text
vödör   blokk               túlcsordulási lánc
 000 →  [      ,       ]
 001 →  [001101, 001011]
 010 →  [      ,       ]
 011 →  [011000,       ]
 100 →  [100110,       ]
 101 →  [      ,       ]
 110 →  [110010, 110111] → [110001, 110100] → [110011,       ]
 111 →  [      ,       ]
```

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
```text
könyvtár   vödör            j
   0   →   [0001]           1
   1   →   [1001, 1101]     1
```
Beszúrás: {0011, 0110, 1011, 0111, 1110, 1111, 0100}

**0011:** legfelső bit 0 → `[0001, 0011]`, befér.

**0110:** legfelső bit 0 → a vödör tele, **j = 1 = i** → **i = 2**, a könyvtár duplázódik (00, 01 → régi 0-s vödör; 10, 11 → régi 1-es). A 0-s vödröt a **2. bit** szerint vágjuk: 0001 és 0011 2. bitje 0, a 0110-é 1.
```text
könyvtár   vödör            j
  00   →   [0001, 0011]     2
  01   →   [0110]           2
  10   →   [1001, 1101]     1
  11   →   ↑ ugyanaz (a 10-ssel közös)
```
**1011:** legfelső 2 bit 10 → a `[1001, 1101]` tele, **j = 1 < i = 2** → vágás a **2. bit** szerint: 1001 → 10, 1101 → 11, 1011 → 10.
```text
  00   →   [0001, 0011]     2
  01   →   [0110]           2
  10   →   [1001, 1011]     2
  11   →   [1101]           2
```
**0111:** 01 → `[0110, 0111]`. **1110:** 11 → `[1101, 1110]`. Mindkettő befér.

**1111:** 11 → tele, **j = 2 = i** → **i = 3**, duplázás. A 11-es vödröt a **3. bit** szerint vágjuk: 1101 → 110; 1110 és 1111 → 111.
```text
könyvtár   vödör            j
  000  →   [0001, 0011]     2     (a 001 is ide mutat)
  001  →   ↑
  010  →   [0110, 0111]     2     (a 011 is ide mutat)
  011  →   ↑
  100  →   [1001, 1011]     2     (a 101 is ide mutat)
  101  →   ↑
  110  →   [1101]           3
  111  →   [1110, 1111]     3
```
**0100:** 010 → a `[0110, 0111]` tele, **j = 2 < i = 3** → vágás a **3. bit** szerint: 0110, 0111 → 011; 0100 → 010.

**Végállapot (i = 3):**
```text
könyvtár   vödör            j
  000  →   [0001, 0011]     2
  001  →   ↑ (közös a 000-val)
  010  →   [0100]           3
  011  →   [0110, 0111]     3
  100  →   [1001, 1011]     2
  101  →   ↑ (közös a 100-zal)
  110  →   [1101]           3
  111  →   [1110, 1111]     3
```
Ellenőrzés: 3 + 7 = 10 rekord ✓. Minden vödörben a rekordok legfelső j bitje azonos ✓.

[[feladat:2]]

## 4. Lineáris hash

> **Lineáris hash:**
> * **n** vödör van, sorszámuk 0 … n − 1 (binárisan). A címzéshez a h(K) **legalsó i bitjét** használjuk, ahol **i = ⌈log₂ n⌉**;
> * ha a legalsó i bit **m** értéke **≥ n** (azaz ilyen vödör még nincs), akkor a legfelső bitet (az i biten belül) 0-ra cseréljük: a rekord az **m − 2^(i−1)** sorszámú vödörbe kerül;
> * a tele vödörhöz **túlcsordulási blokkot láncolunk**;
> * egy **küszöb** átlépésekor **egyetlen új vödröt** veszünk fel (n → n + 1). Az új vödör sorszáma `1a₂…aᵢ`, és **csak a `0a₂…aᵢ` vödör** rekordjait osztjuk szét közte és az új között (a legalsó i bit szerint);
> * ha n > 2^i lesz, **i-t eggyel növeljük**.
>
> A tábla tehát **lineárisan, vödrönként** nő, nem duplázással. Ezért nincs könyvtár.

A **tankönyvi** küszöb: ha a rekordok száma **r** és **r / n > küszöb** (pl. 1,7 rekord/vödör), új vödör jön. A **hw_05** ezt a láncok hosszával fogalmazza meg: egy blokk **2** rekordot tárol, és egy vödör (lánc) legfeljebb **b_max = 4** rekordot tarthat. Ha egy beszúrással ezt **túllépnénk**, előbb új vödröt veszünk fel. Az alábbi megoldás ezt az értelmezést követi. Ha az órán másképp mondták, a lépések ugyanígy mennek, csak a küszöb más.

### hw_05 2. feladat

Kezdőállapot: n = 2, i = 1:
```text
vödör 0: [0000, 1110]
vödör 1: [0101]
```
Beszúrás: {0001, 0110, 1011, 0111, 1100, 1111, 0100} (legalsó i bit!)

* **0001** → legalsó bit 1 → `1: [0101, 0001]`.
* **0110** → 0 → a 0-s vödör tele → túlcsordulási blokk: `0: [0000, 1110] → [0110]`.
* **1011** → 1 → `1: [0101, 0001] → [1011]`.
* **0111** → 1 → `1: [0101, 0001] → [1011, 0111]`: 4 rekord, épp a határ, még befér.
* **1100** → 0 → `0: [0000, 1110] → [0110, 1100]`: szintén 4.
* **1111** → 1 → az 1-es vödörben 5 rekord lenne > 4 → **új vödör: 2 = `10`**. n = 3 > 2¹, tehát **i = 2**. A `10` párja a **`00`**: a 0-s vödör rekordjait a legalsó 2 bit szerint osztjuk szét: 0000 → 00, 1110 → 10, 0110 → 10, 1100 → 00.
  ```text
  00: [0000, 1100]
  01: [0101, 0001] → [1011, 0111]
  10: [1110, 0110]
  ```
  Az 1111 legalsó 2 bitje `11` = 3 ≥ n = 3, tehát a `01` vödörbe menne, de ott megint 5 lenne → **új vödör: 3 = `11`**, n = 4 (= 2², i marad 2). Az `11` párja a **`01`**: 0101 → 01, 0001 → 01, 1011 → 11, 0111 → 11, és most már az 1111 is → 11.
* **0100** → `00` → tele → túlcsordulási blokk.

**Végállapot (n = 4, i = 2):**
```text
00: [0000, 1100] → [0100]
01: [0101, 0001]
10: [1110, 0110]
11: [1011, 0111] → [1111]
```
Ellenőrzés: 3 + 7 = 10 rekord ✓, minden rekord legalsó 2 bitje egyezik a vödre sorszámával ✓.

[[feladat:3,4]]

@@feladat
Rajzold le a statikus hash táblát, ha a 6 bites hash értékek **3 legalsó bitjét** használjuk, a vödörkapacitás 2, túlcsordulás láncolással: {100110, 011011, 110110, 001001, 111110, 000011, 101011, 010001}.
@@hint
Most a **jobb oldali** 3 bit számít: 100**110** → 110.
@@megoldas
| Kulcs | Legalsó 3 bit |
|-------|---------------|
| 100110 | 110 |
| 011011 | 011 |
| 110110 | 110 |
| 001001 | 001 |
| 111110 | 110 |
| 000011 | 011 |
| 101011 | 011 |
| 010001 | 001 |

```text
 000 → [      ,       ]
 001 → [001001, 010001]
 010 → [      ,       ]
 011 → [011011, 000011] → [101011,       ]
 100 → [      ,       ]
 101 → [      ,       ]
 110 → [100110, 110110] → [111110,       ]
 111 → [      ,       ]
```

@@feladat
A fenti kidolgozott statikus hash feladatban **hány blokkot** használ összesen a tábla (az üres vödrök blokkjait is beleszámítva), és mennyi a leghosszabb lánc?
@@megoldas
8 vödör, mindegyik 1 blokkal = 8 blokk, plusz a túlcsordulási blokkok: a 110-nál 2 → **8 + 2 = 10 blokk**. A leghosszabb lánc a **110**-s vödöré: **3 blokk**. Ott egy kereséshez a legrosszabb esetben 3 blokkot kell olvasni.

@@feladat
Kiterjeszthető hash, kapacitás 2, kezdőállapot i = 1: `0 → [0101]` (j = 1), `1 → [1100]` (j = 1). Szúrd be: {0010, 1010, 1110, 0111, 1000, 0000}. Rajzold le a könyvtárat minden új vödör létrejötte után!
@@megoldas
* **0010** → 0 → `[0101, 0010]`. **1010** → 1 → `[1100, 1010]`.
* **1110** → 1 → tele, j = 1 = i → **i = 2**, duplázás; az 1-es vödör vágása a 2. bit szerint: 1100 → 11, 1010 → 10, 1110 → 11.
  ```text
  00 → [0101, 0010]  j=1   (a 01 is ide mutat)
  01 → ↑
  10 → [1010]        j=2
  11 → [1100, 1110]  j=2
  ```
* **0111** → 01 → a `[0101, 0010]` tele, j = 1 < 2 → vágás a 2. bit szerint: 0010 → 00, 0101 → 01, 0111 → 01.
  ```text
  00 → [0010]        j=2
  01 → [0101, 0111]  j=2
  10 → [1010]        j=2
  11 → [1100, 1110]  j=2
  ```
* **1000** → 10 → `[1010, 1000]`. **0000** → 00 → `[0010, 0000]`. Nincs több vágás.

Végállapot (i = 2): `00 → [0010, 0000]`, `01 → [0101, 0111]`, `10 → [1010, 1000]`, `11 → [1100, 1110]`, mind j = 2.

@@feladat
Lineáris hashnél n = 5 vödör van (000 … 100), i = 3. Melyik vödörbe kerül a `…110` és a `…011` végű kulcs?
@@megoldas
* `110` = 6 ≥ n = 5, ilyen vödör még nincs → a legfelső bitet 0-ra cseréljük: `010` = **2-es vödör**.
* `011` = 3 < 5 → **3-as vödör** (`011`).

@@feladat
Statikus, kiterjeszthető vagy lineáris? Melyikre igaz: (a) van könyvtára, ami duplázódik; (b) a vödrök száma soha nem változik; (c) egyszerre egy vödörrel nő, és a túlcsordulást láncolással kezeli; (d) nincs túlcsordulási lánc?
@@megoldas
* (a) **kiterjeszthető**: a 2^i elemű könyvtár duplázódik, amikor j = i vödröt kell vágni;
* (b) **statikus**;
* (c) **lineáris**;
* (d) **kiterjeszthető**: tele vödörnél mindig vágás jön, lánc nincs. (Ha nagyon sok azonos hash-értékű kulcs van, ott is kellhet túlcsordulás, de a ZH-feladatokban nem.)
