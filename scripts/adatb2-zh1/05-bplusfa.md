@slug: bplusz-fa
@title: 5. B+ fa: felépítés, beszúrás, vágás (4. óra; papíros 1. feladat, 20 p)
@summary: A B+ fa definíciója (04.pdf, 02_storage.pdf), a ritka belső és sűrű levélcsúcsok, a heap tábla, a másodlagos index és az IOT, a beszúrási algoritmus pontos vágási szabályokkal, az óra példája, egy ZH-típusú kidolgozott feladat lépésenként, a hw_04 B+ fás feladata és további gyakorlófák.

## 1. Definíciók

> **B+ fa:** **kiegyensúlyozott** (minden levél ugyanolyan mélyen van) keresőfa, az adatbázisok elsődleges indexszerkezete.
> * a fa **csúcsai adatblokkok**;
> * a **levelek** a fa alsó szintje, a többi a **belső csúcs** (a gyökérrel együtt);
> * a kulcsok a leveleken **rendezve** vannak.

> **Belső csúcs (index blokk):** legfeljebb **N kulcsot és N + 1 mutatót** tárol a gyerekekre. A kulcsok **intervallumhatárok**. **Ritka (sparse)**: nem minden kulcs van benne, csak a gyerekek határai. A gyakorlatban N nagy (pl. 100), hogy a fa alacsony legyen.

> **Levél:** legfeljebb **M kulcsot** tárol (a feladatokban M lehet más, mint N!). **Sűrű (dense)**: **minden kulcs** szerepel a levélszinten, a táblázat minden sorára egy bejegyzés. Mellette a sorra mutató **mutató (ROWID)** van (másodlagos index), vagy **maga az adat** (elsődleges index / IOT). A levelek **láncolva** vannak (előző/következő), így a **tartománylekérdezés** hatékony.

A belső csúcs szerkezete (3 kulcs, 4 mutató):

```text
            ┌──────┬──────┬──────┐
            │  k1  │  k2  │  k3  │
            ├────┬─┴──┬───┴┬─────┤
            │ p0 │ p1 │ p2 │ p3  │
            └─┬──┴─┬──┴─┬──┴──┬──┘
              │    │    │     │
         k < k1    │    │    k3 ≤ k
           k1 ≤ k < k2  k2 ≤ k < k3
```

> **Keresési szabály:** a `k` kulcsot keresve a csúcsban az első olyan `ki`-t keressük, amire `k < ki`. Az előtte álló mutatón megyünk le. Ha `k ≥` minden kulcsnál, a legutolsó mutatón. **Egyenlőségnél jobbra megyünk** (`k1 ≤ k`).

> **A belső csúcs kulcsa = a jobb oldali részfában elérhető legkisebb kulcs.** Más szóval: egy szülőben a `ki` kulcs a `pi` gyerek (és az alatta lévő részfa) legkisebb kulcsa.

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

```text
10, 20, 5         →  [5 10 20]                         (tele, még nincs vágás)

6:  levélvágás   [5 6 | 10 20], a 10 felmásolódik:
                         [10]
                        /    \
                  [5 6]      [10 20]

12:                      [10]
                        /    \
                  [5 6]      [10 12 20]

30: levélvágás  [10 12 | 20 30], a 20 felmásolódik:
                        [10 20]
                      /    |    \
                 [5 6]  [10 12]  [20 30]

7, 17:                  [10 20]
                      /    |    \
               [5 6 7]  [10 12 17]  [20 30]

19: levélvágás [10 12 | 17 19], a 17 felmásolódik, a gyökér épp betelik:
                       [10 17 20]
                    /    |     |    \
            [5 6 7] [10 12] [17 19] [20 30]

8:  levélvágás [5 6 | 7 8], a 7 felmásolódik → a gyökérben 7 10 17 20 lenne (4 kulcs > 3)
    → gyökérvágás: [7 10] marad, a 17 FELKÖLTÖZIK az új gyökérbe, [20] az új csúcs
                              [17]
                          /          \
                    [7 10]            [20]
                   /   |   \          /   \
             [5 6] [7 8] [10 12]  [17 19] [20 30]
```

Figyeld meg az utolsó lépést: a **17 csak az új gyökérben** van meg, a belső szinten már nincs (belső vágás). A levélszinten viszont ott van (a `[17 19]` levélben), mert a levelek sűrűek.

## 4. Kidolgozott ZH-típusú feladat (20 pont)

> Rajzold le a B+ fa állapotát **minden lapvágás előtt**, miközben beszúrod: **{8, 14, 2, 20, 11, 5, 17}**. A belső csúcsok legfeljebb **3 kulcsot és 4 mutatót**, a levelek legfeljebb **2 kulcsot** tárolnak. A levelek minden kulcsot tartalmaznak.

Tehát **N = 3, M = 2**. Levél túlcsordul 3 kulcsnál: **2 marad balra, 1 megy jobbra**, és a jobb oldali kulcs felmásolódik.

**8, 14:** `[8 14]`, a levél tele.

**1. vágás, a 2 beszúrása. Állapot ELŐTTE:**
```text
[8 14]
```
A `[2 8 14]` túlcsordul → `[2 8] | [14]`, a **14** felmásolódik egy új gyökérbe:
```text
       [14]
      /    \
  [2 8]    [14]
```

**20:** a 14 ≤ 20, tehát jobbra megy, `[14 20]`, befér.

**2. vágás, a 11 beszúrása. Állapot ELŐTTE:**
```text
        [14]
       /    \
  [2 8]    [14 20]
```
A 11 < 14, tehát balra megy: `[2 8 11]` túlcsordul → `[2 8] | [11]`, a **11** felmásolódik a gyökérbe (ott van hely):
```text
          [11 14]
        /    |    \
   [2 8]   [11]   [14 20]
```

**3. vágás, az 5 beszúrása. Állapot ELŐTTE:**
```text
          [11 14]
        /    |    \
   [2 8]   [11]   [14 20]
```
Az 5 < 11, tehát a `[2 8]` levélbe megy: `[2 5 8]` túlcsordul → `[2 5] | [8]`, a **8** felmásolódik. A gyökér `[8 11 14]` lesz, épp betelik:
```text
             [8 11 14]
          /    |    |    \
     [2 5]   [8]  [11]  [14 20]
```

**4. vágás, a 17 beszúrása. Állapot ELŐTTE:**
```text
             [8 11 14]
          /    |    |    \
     [2 5]   [8]  [11]  [14 20]
```
A 14 ≤ 17, tehát a `[14 20]` levélbe megy: `[14 17 20]` túlcsordul → `[14 17] | [20]`, a **20** felmásolódik. A gyökérben `8 11 14 20` lenne (4 kulcs > 3) → **gyökérvágás**: az első 3 mutató (kulcsok: 8, 11) marad, a **14 felköltözik** egy új gyökérbe, a `[20]` az új belső csúcs.

**Végállapot:**
```text
                      [14]
                  /          \
           [8 11]              [20]
         /   |   \            /    \
    [2 5]   [8]   [11]   [14 17]   [20]
```

Ellenőrzés: (1) minden kulcs megvan a levélszinten, rendezve: 2 5 8 11 14 17 20 ✓; (2) minden levél ugyanolyan mélyen van ✓; (3) a gyökér 14-e a jobb részfa legkisebb kulcsa ✓, a `[8 11]` 8-asa és 11-ese a 2. és 3. levél legkisebb kulcsa ✓, a `[20]` a `[20]` levélé ✓; (4) a 14 a belső szinten **nincs** meg, csak a gyökérben (belső vágás) ✓.

> **Hogyan írd le a ZH-n?** Minden vágásnál: „*x* beszúrása előtt:” + rajz, és utána egy mondat: „a(z) [..] levél túlcsordul, ketté vágjuk: [..] | [..], a(z) *k* felmegy a szülőbe”. A végén rajzold le a végállapotot is. A feladat a vágások **előtti** állapotokat kéri, de a végállapot sokat segít az ellenőrzésben, és a javító is látja, hogy jól gondolkodtál.

[[feladat:0]]

## 5. A hw_04 B+ fás feladata: N = M = 3 (blokkonként 3 kulcs, 4 mutató)

Beszúrás: **{39, 15, 50, 70, 79, 83, 72, 43, 75, 45, 60, 80}**. Ennek a megoldását a feladat végén nyithatod ki. Előbb oldd meg magad: négy vágás lesz, és az utolsó gyökérvágás.

[[feladat:1]]

## 6. Gyakorló fák

[[feladat:2,3,4,5]]

@@feladat
ZH-gyakorlás, **időre (10 perc)**: zárd be a fenti levezetést, és rajzold meg újra papíron a {8, 14, 2, 20, 11, 5, 17} beszúrását (N = 3, M = 2), az összes vágás előtti állapottal. Utána ellenőrizd a fenti levezetéssel. Hány vágás volt, és melyik volt gyökérvágás?
@@megoldas
**Négy** vágás volt: a 2, a 11, az 5 és a 17 beszúrásánál. Az **utolsó (17)** okozott belső- (gyökér-) vágást is, így a fa magassága 2-ről 3 szintre nőtt. Végállapot:
```text
                      [14]
                  /          \
           [8 11]              [20]
         /   |   \            /    \
    [2 5]   [8]   [11]   [14 17]   [20]
```

@@feladat
**hw_04:** szúrd be egy N = M = 3-as B+ fába (3 kulcs, 4 mutató csúcsonként): {39, 15, 50, 70, 79, 83, 72, 43, 75, 45, 60, 80}. Rajzold le az állapotot minden vágásnál!
@@hint
A 70 beszúrásakor jön az első vágás: `[15 39 | 50 70]`, az 50 felmegy (ez a feladat 1. ábrája). Az utolsó vágás a 45-nél van, és az a gyökeret is kettévágja.
@@megoldas
**39, 15, 50:** `[15 39 50]`.

**70 → 1. vágás.** Előtte: `[15 39 50]`. Utána:
```text
        [50]
       /    \
 [15 39]    [50 70]
```
**79:** `[50 70 79]`. **83 → 2. vágás.** Előtte:
```text
        [50]
       /    \
 [15 39]    [50 70 79]
```
`[50 70 | 79 83]`, a 79 felmegy:
```text
          [50 79]
        /    |    \
 [15 39]  [50 70]  [79 83]
```
**72:** `[50 70 72]`. **43:** `[15 39 43]`. **75 → 3. vágás** (az 50 ≤ 75 < 79 levélbe). Előtte:
```text
             [50 79]
          /     |     \
 [15 39 43]  [50 70 72]  [79 83]
```
`[50 70 | 72 75]`, a 72 felmegy, a gyökér betelik:
```text
                 [50 72 79]
          /       |       |      \
 [15 39 43]   [50 70]  [72 75]  [79 83]
```
**45 → 4. vágás** (a `[15 39 43]` levélbe). Előtte: az előző ábra. `[15 39 | 43 45]`, a 43 felmegy, a gyökérben `43 50 72 79` lenne → **gyökérvágás**: `[43 50]` marad, a **72 felköltözik**, `[79]` az új csúcs:
```text
                        [72]
                    /          \
             [43 50]             [79]
           /    |    \          /    \
     [15 39] [43 45] [50 70] [72 75] [79 83]
```
**60:** `[50 60 70]`, **80:** `[79 80 83]`. Ezek nem okoznak vágást. Végállapot:
```text
                         [72]
                    /           \
             [43 50]              [79]
           /    |     \          /     \
     [15 39] [43 45] [50 60 70] [72 75] [79 80 83]
```

@@feladat
Szúrd be egy N = M = 3-as B+ fába: {20, 10, 30, 40, 25, 5, 15, 35, 45, 50}. Rajzold le minden vágás előtti állapotot és a végállapotot!
@@megoldas
**40 → 1. vágás.** Előtte `[10 20 30]`. Utána `[10 20 | 30 40]`, gyökér `[30]`.

**25:** `[10 20 25]`. **5 → 2. vágás.** Előtte:
```text
          [30]
         /    \
 [10 20 25]   [30 40]
```
`[5 10 | 20 25]`, a 20 felmegy: gyökér `[20 30]`, levelek `[5 10] [20 25] [30 40]`.

**15:** `[5 10 15]`. **35:** `[30 35 40]`. **45 → 3. vágás.** Előtte:
```text
              [20 30]
           /     |     \
   [5 10 15]  [20 25]  [30 35 40]
```
`[30 35 | 40 45]`, a 40 felmegy: gyökér `[20 30 40]`.

**50:** `[40 45 50]`, nincs vágás. Végállapot:
```text
                 [20 30 40]
          /       |      |       \
   [5 10 15]  [20 25] [30 35] [40 45 50]
```

@@feladat
Szúrd be egy N = 3, M = 2 B+ fába (ugyanezek a méretek): {8, 2, 6, 4, 10, 12, 1}.
@@hint
4 vágás lesz. Az utolsó (az 1 beszúrása) gyökérvágás.
@@megoldas
* **6 →** előtte `[2 8]`; `[2 6 8]` → `[2 6] | [8]`, gyökér `[8]`.
* **4 →** előtte gyökér `[8]`, levelek `[2 6] [8]`; `[2 4 6]` → `[2 4] | [6]`, gyökér `[6 8]`.
* **10:** `[8 10]`.
* **12 →** előtte gyökér `[6 8]`, levelek `[2 4] [6] [8 10]`; `[8 10 12]` → `[8 10] | [12]`, gyökér `[6 8 12]`.
* **1 →** előtte gyökér `[6 8 12]`, levelek `[2 4] [6] [8 10] [12]`; `[1 2 4]` → `[1 2] | [4]`, a 4 felmegy, a gyökérben `4 6 8 12` lenne → vágás: `[4 6]`, a **8 felköltözik**, `[12]`.

Végállapot:
```text
                    [8]
               /          \
         [4 6]              [12]
       /   |   \           /    \
  [1 2]   [4]   [6]    [8 10]   [12]
```

@@feladat
Egy N = 3-as belső csúcsba (3 kulcs, 4 mutató) a `20` kulcs érkezik egy alatta lévő levélvágásból. A csúcs most `[10 30 40]`. Hogyan vágódik, és mi kerül a szülőbe?
@@megoldas
A kulcsok rendezve: `10 20 30 40` (5 mutató). Az első **3 mutató** (és a köztük lévő **10, 20**) marad a régi csúcsban, a **30 felköltözik** a szülőbe (egyik csúcsban sem marad), az új csúcsban a `[40]` van, 2 mutatóval:
```text
        ... [30] ...
          /       \
    [10 20]       [40]
```

@@feladat
Igaz vagy hamis? (a) „A B+ fa belső csúcsai minden kulcsot tartalmaznak.” (b) „Levélvágáskor a felvitt kulcs a levélből törlődik.” (c) „A B+ fa a gyökérnél nő.” (d) „A másodlagos index levelei a sorok összes oszlopát tárolják.”
@@megoldas
* (a) **Hamis**: a belső csúcsok **ritkák**, csak intervallumhatárokat tárolnak. A **levelek** sűrűek.
* (b) **Hamis**: levélvágásnál a kulcs **felmásolódik**, a levélben is megmarad. Csak **belső** csúcs vágásakor költözik fel úgy, hogy alul nem marad meg.
* (c) **Igaz**: új szint csak gyökérvágással jön létre, ezért minden levél ugyanolyan mélyen marad (kiegyensúlyozott).
* (d) **Hamis**: a másodlagos index levelei **kulcs + ROWID**-ot tárolnak. Az összes oszlopot az **IOT / elsődleges index** levelei tárolják.
