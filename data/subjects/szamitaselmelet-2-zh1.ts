// GENERÁLT FÁJL — forrás: md leckék (ZH1-felkészítő), lásd a commit üzenetét.
// Kézzel is szerkeszthető; a body/prompt/hint/solution template literal.
import type { Lesson } from "@/lib/types";

export const szamelZh1Lessons: Lesson[] = [
  {
    slug: "zh1-terkep",
    title: `0. ZH1-térkép — a 6 feladattípus és a közös jelölések`,
    summary: `Mit kérnek az 1. ZH-n, melyik lecke melyik feladatra készít fel, és milyen jelöléseket kell biztosan tudnod.`,
    status: "complete",
    body: `## Hogyan használd ezt a sorozatot?

Az 1. ZH (**okt. 6.**, pénteki csoportnak okt. 9.) **6 feladatból** áll, és mindegyik
egy jól begyakorolható **feladattípus**. Mindegyik típushoz tartozik egy lecke ebben a sorrendben:

1. **elmélet**, csak annyi, amennyi a feladathoz kell, de az teljesen;
2. **recept**: lépésről lépésre, mit csinálj a ZH-n;
3. **egy saját, kidolgozott példa** részletes levezetése;
4. **gyakorlófeladatok**. A megoldás alapból rejtve van, a **✅ Megoldás** gombbal nyitod ki (a **💡 Tipp**
   is rejtett). A szövegdobozba nyugodtan dolgozz, piszkozatnak is jó.

| # | Feladattípus | Témakör | Lecke |
|---|--------------|---------|-------|
| 1 | igazságtábla készítése | ítéletlogika, szemantika | **1. Igazságtábla** |
| 2 | ekvivalens KNF megadása, indoklással | normálformák | **2. KNF / DNF** |
| 3 | klózhalmaz a következményhez + rezolúciós cáfolat | következmény + rezolúció | **3. Rezolúció** |
| 4 | formulák értéke egy interpretációban | elsőrendű logika | **4. Interpretáció** |
| 5 | O / Ω / Θ állítások eldöntése | aszimptotika | **5. Aszimptotika** |
| 6 | Turing-gép, amely eldönt egy nyelvet | egyszalagos TM | **6. Turing-gép** |

> **Stratégia:** az 1–3. és az 5. feladat **mechanikus**: ha megvan a recept, garantált pont. A 4. és a 6.
> több gondolkodást kér, ezekhez is van recept. A 40% (elégséges) már 2–3 jól megoldott feladattal megvan.

## A közös jelölések (a gyakorlat jelölései!)

| Jelölés | Jelentés |
|---------|----------|
| \`i\`, \`h\` | igaz, hamis (a táblázatokban mindig így írjuk) |
| \`¬ ∧ ∨ →\` | nem, és, vagy, ha…akkor |
| \`A ∼0 B\` | A és B **tautologikusan ekvivalens** (minden sorban ugyanaz az értékük) |
| \`⊨0 A\` | A **tautológia** (minden sorban igaz) |
| \`{A1, …, An} ⊨0 B\` | B **tautologikus következménye** a premisszáknak |
| \`⊤\`, \`⊥\` | egy tautológia, illetve egy kielégíthetetlen formula |
| \`□\` | az **üres klóz** (a rezolúció célja) |
| \`res(i, j)\` | az i. és j. klóz rezolvense |
| \`\\|A\\|^(I,κ)\` | az A formula értéke az I interpretációban, κ változókiértékelés mellett |
| \`x ↦ u\` | „x értéke legyen u” (variáns kiértékelés) |
| \`O, Ω, Θ\` | aszimptotikus felső / alsó / éles korlát |
| \`⊔\` | üres szalagcella (blank) a Turing-gépnél |

### Precedencia: ezt **mindenhol** használni fogod!

A műveletek kötési erőssége (erősebbtől a gyengébb felé):

\`\`\`text
¬   >   ∧   >   ∨   >   →
\`\`\`

* A \`→\` **jobbra köt**: \`x → y → z\` jelentése \`x → (y → z)\`.
* A \`∧\` és a \`∨\` asszociatív, ott a zárójelezés mindegy.

Például az 1. lecke kidolgozott példájának formulája, \`z → ¬x ∨ y ∧ ¬z\`, teljesen zárójelezve
\`(z → (¬x ∨ (y ∧ ¬z)))\`. Ha ezt elrontod, az egész igazságtábla rossz lesz, ezért kezdünk ezzel.

## Ellenőrzőlista a ZH előtti estére

- [ ] Egy formulát **hibátlanul zárójelezek** a precedencia alapján (1. lecke).
- [ ] Igazságtáblát a **gyakorlaton használt sorrendben** töltök ki: \`iii, iih, ihi, …, hhh\` (1. lecke).
- [ ] KNF-et tudok **ekvivalens átalakítással** és **igazságtáblából** is gyártani (2. lecke).
- [ ] Következményből klózhalmazt csinálok: premisszák KNF-je **+ a konklúzió tagadása** (3. lecke).
- [ ] Rezolúciós levezetést írok számozott sorokkal, \`res(i, j)\` hivatkozással, \`□\`-ig (3. lecke).
- [ ] Egy relációt **táblázatba** rendezek, és abból olvasom le a \`∀/∃\` formulák értékét (4. lecke).
- [ ] \`f/g\` határértékéből megmondom mind a 4 aszimptotikus állítást (5. lecke).
- [ ] Megadok egy Turing-gépet hetessel és állapotdiagrammal / δ-táblával, és nem felejtem
  el az \`n = 0\` esetet (6. lecke).

A leckék végén lévő feladatok a gyakorlati diák (gy1–gy4) példáiból és hasonló, új feladatokból állnak.
Az összes megoldást géppel is ellenőriztem (igazságtábla, kielégíthetőség, Turing-gép szimuláció).`,
  },
  {
    slug: "igazsagtabla",
    title: `1. Igazságtábla — precedencia, részformulák, kiértékelés (1. feladattípus)`,
    summary: `A ZH 1. feladattípusa: igazságtábla készítése. Zárójelezés a precedencia alapján, részformulák oszlopai, a sorok sorrendje, gyors kiértékelési trükkök, tautológia és kielégíthetőség.`,
    status: "complete",
    body: `## 1. A logikai műveletek igazságtáblái

Ezt a táblát kívülről kell tudni, minden más erre épül:

| A | B | ¬A | A ∧ B | A ∨ B | A → B |
|---|---|----|-------|-------|-------|
| i | i | h | i | i | **i** |
| i | h | h | h | i | **h** |
| h | i | i | h | i | **i** |
| h | h | i | h | h | **i** |

Amit érdemes megjegyezni:

* \`A ∧ B\` **csak akkor igaz**, ha mindkettő igaz.
* \`A ∨ B\` **csak akkor hamis**, ha mindkettő hamis.
* \`A → B\` **csak akkor hamis**, ha \`A = i\` és \`B = h\`. Hamis előtagból minden következik
  (\`h → bármi = i\`), igaz utótag mellett az implikáció mindig igaz (\`bármi → i = i\`).

## 2. Zárójelezés: a precedencia

\`\`\`text
¬   >   ∧   >   ∨   >   →        (→ jobbra köt)
\`\`\`

> **Mit jelent, hogy „a \`¬\` a legerősebb”?** Azt, hogy a \`¬\` a **legszorosabban ragad**, és ezért a
> **legkisebb** darabot fogja meg: csak a közvetlenül mögötte álló változót (vagy zárójelet). **Nem** azt,
> hogy a legnagyobb hatókörű, és mindent lenyel maga mögött! A **leggyengébb** művelet (\`→\`) fogja össze a
> legnagyobb részeket, ezért lesz általában ő a fő összekötő.
>
> Ugyanez a matekból: \`−2 + 3 · 4\` jelentése \`(−2) + (3 · 4)\`. Az előjel csak a 2-re vonatkozik, a szorzás
> erősebb az összeadásnál, és az összeadás köti össze a nagy részeket.
>
> ✅ \`¬y → z\` = \`(¬y) → z\`  ❌ **nem** \`¬(y → z)\`. Ha a tagadást az egészre akarjuk, zárójel kell:
> \`¬(y → z)\`.

> **Teljes zárójelezés = a definíció szerinti alak:** minden kétváltozós művelet (\`∧, ∨, →\`) kap egy
> zárójelpárt, a \`¬\` **nem**. Ezért a \`¬y\` és a \`¬(x ∧ y)\` helyes, de a \`(¬y)\` nem kell. A lenti
> lépésenkénti példában a \`(¬y)\` zárójel csak szemléltet, a végeredményből elhagyjuk.

**A zárójelezés receptje:** először minden \`¬\` megkapja a közvetlenül mögötte álló változót vagy
zárójelet, és tegyél köré zárójelet. Utána az \`∧\`-ek a két szomszédjukat, aztán az \`∨\`-ok, és legvégül
a \`→\`-ok, jobbról balra. Minden lépésben a már bezárójelezett részek egy „blokknak” számítanak.

Példa lépésenként: \`x ∨ ¬y → z ∧ x\`

\`\`\`text
1. ¬ :   x ∨ (¬y) → z ∧ x               a ¬ csak az y-t fogja meg
2. ∧ :   x ∨ (¬y) → (z ∧ x)             az ∧ a két szomszédját: z és x
3. ∨ :   (x ∨ (¬y)) → (z ∧ x)           az ∨ a két szomszédját: x és (¬y)
4. → :   ((x ∨ ¬y) → (z ∧ x))           a → köti össze a két nagy blokkot  ⇒ fő összekötő: →
\`\`\`

Példák a gyakorlatról (gy1, 7. példa). A bal oldal a zárójeles alak, a jobb oldal a takarékos alak:

| Teljesen zárójelezve | Felesleges zárójelek nélkül | Log. összetettség |
|---|---|---|
| \`(((x → ¬y) ∧ (y → z)) → (y ∨ ¬z))\` | \`(x → ¬y) ∧ (y → z) → y ∨ ¬z\` | 7 |
| \`((x → y) → (y → z))\` | \`(x → y) → y → z\` | 3 |
| \`(((x → (y ∧ ¬z)) ∨ (x ∧ ¬y)) ∨ z)\` | \`(x → y ∧ ¬z) ∨ x ∧ ¬y ∨ z\` | 7 |
| \`((¬y → (x ∧ ¬z)) ∧ ¬((x ∨ ¬z) → y))\` | \`(¬y → x ∧ ¬z) ∧ ¬(x ∨ ¬z → y)\` | 9 |

> **Logikai összetettség** = a formulában lévő logikai összekötők száma (a \`¬\` is számít!).
> A **fő logikai összekötő** az, amelyik utoljára hajtódik végre, vagyis a szerkezeti fa gyökere.

A második sorban figyeld meg: \`(x → y) → y → z\` = \`(x → y) → (y → z)\`, mert a \`→\` jobbra köt.
A bal oldali zárójel **nem** hagyható el, mert \`x → y → y → z\` már \`x → (y → (y → z))\` lenne.

## 3. Az igazságtábla felépítése: a recept

1. **Zárójelezd** a formulát (a fenti szabályokkal), és keresd meg a fő összekötőt.
2. **Oszlopok:** először a változók, utána a **részformulák belülről kifelé**, végül maga a formula.
   (Pont úgy, ahogy a szerkezeti fát alulról felfelé kiértékelnéd.)
3. **Sorok:** n változónál \`2ⁿ\` sor. A gyakorlaton a sorrend
   \`iii, iih, ihi, ihh, hii, hih, hhi, hhh\`: az első változó 4-4, a második 2-2, a harmadik
   1-1 soronként vált.
4. **Változósorrend:** a változókat **a formulában való első előfordulás sorrendjében** írjuk
   veszi fel (\`y, x, z\`, mert a formula \`y\`-nal kezdődik). Bármelyik sorrend helyes, ha
   következetes, de ha a feladat megad egyet, azt kövesd.
5. Töltsd ki **oszloponként** (nem soronként!): egy oszlopnál csak egy műveletre kell figyelni,
   így kevesebb a hiba.
6. Ha kérdezik: **tautológia** (az utolsó oszlop csupa \`i\`), **kielégíthetetlen** (csupa \`h\`),
   különben **kielégíthető, de nem tautológia**.

### Gyorsítási trükkök oszloponként

* \`¬\` oszlop: az előző oszlop megfordítva.
* \`A ∧ B\`: keresd a sorokat, ahol **mindkettő** \`i\`. Csak ott \`i\`, máshol \`h\`.
* \`A ∨ B\`: keresd a sorokat, ahol **mindkettő** \`h\`. Csak ott \`h\`, máshol \`i\`.
* \`A → B\`: keresd az \`A = i, B = h\` sorokat. Csak ott \`h\`, máshol \`i\`.

---

## 4. Kidolgozott példa

> **Feladat.** Legyen \`φ = z → ¬x ∨ y ∧ ¬z\`. Készítsd el a φ formula igazságtábláját!

**1. lépés: zárójelezés.** A \`¬\` köt a legerősebben: \`¬x\`, \`¬z\`. Utána az \`∧\`: \`y ∧ ¬z\`.
Utána az \`∨\`: \`¬x ∨ (y ∧ ¬z)\`. Legvégül a \`→\`:

\`\`\`text
φ = z → (¬x ∨ (y ∧ ¬z))        fő összekötő: →
\`\`\`

**2. lépés: oszlopok** (a változók az első előfordulásuk sorrendjében, utána belülről kifelé):
\`z, x, y | ¬x | ¬z | y ∧ ¬z | ¬x ∨ (y ∧ ¬z) | φ\`.

**3. lépés: kitöltés oszloponként.**

| z | x | y | ¬x | ¬z | y ∧ ¬z | ¬x ∨ (y ∧ ¬z) | z → (¬x ∨ (y ∧ ¬z)) |
|---|---|---|----|----|--------|---------------|---------------------|
| i | i | i | h | h | h | h | **h** |
| i | i | h | h | h | h | h | **h** |
| i | h | i | i | h | h | i | **i** |
| i | h | h | i | h | h | i | **i** |
| h | i | i | h | i | i | i | **i** |
| h | i | h | h | i | h | h | **i** |
| h | h | i | i | i | i | i | **i** |
| h | h | h | i | i | h | i | **i** |

Hogyan jött ki az egyes oszlop?

* \`¬x\`, \`¬z\`: az \`x\`, illetve a \`z\` oszlop megfordítva.
* \`y ∧ ¬z\`: csak ott \`i\`, ahol \`y = i\` **és** \`¬z = i\`, ez az 5. és a 7. sor.
* \`¬x ∨ (y ∧ ¬z)\`: csak ott \`h\`, ahol mindkét tag \`h\`: az 1., a 2. és a 6. sor.
* \`z → (…)\`: csak ott \`h\`, ahol \`z = i\` és a jobb oldal \`h\`, ez az 1. és a 2. sor. Az alsó négy
  sorban \`z = h\`, ezért ott automatikusan \`i\`.

**Eredmény:** φ **kielégíthető, de nem tautológia** (van \`i\` és \`h\` is az utolsó oszlopban).
Ha ezt is kérdeznék, ezt kell válaszolni.

> **Tipikus hibák:** (1) \`z → ¬x ∨ …\` zárójelezése \`(z → ¬x) ∨ …\`-ként; (2) a \`¬z\` tagadásának
> kiterjesztése az egész \`y ∧ ¬z\`-re; (3) az implikáció \`h → h\` sorát \`h\`-nak írni (pedig \`i\`).`,
    exercises: [
      {
        prompt: `Zárójelezd teljesen, és add meg a fő összekötőt: \`x ∨ ¬y → z ∧ x\`.`,
        hint: `Előbb a \`¬\`, utána az \`∧\`, aztán az \`∨\`, végül a \`→\`. A \`¬\` a **legkisebb** részt fogja meg (csak az
\`y\`-t), mert az köt a legszorosabban.`,
        solution: `Lépésenként (minden lépés zárójelbe tesz egy darabot):

1. A \`¬\` csak a mögötte álló \`y\`-t fogja meg: \`(¬y)\`.
2. Az \`∧\` a két szomszédját fogja meg: \`(z ∧ x)\`.
3. Az \`∨\` a két szomszédját fogja meg: \`(x ∨ ¬y)\`.
4. Végül a \`→\` köti össze a két nagy blokkot.

\`\`\`text
((x ∨ ¬y) → (z ∧ x))       fő összekötő: →
\`\`\`
Logikai összetettség: \`¬, ∨, ∧, →\` = **4**.

⚠️ Gyakori hiba: \`x ∨ ¬(y → (z ∧ x))\`. Ez úgy olvassa, mintha a \`¬\` „mindent elnyelne” maga mögött, de
ez fordítva van: a \`¬\` köt a **legerősebben**, ezért a **legkisebb** részre vonatkozik. Ha a tagadás
tényleg az egész \`y → z ∧ x\`-re vonatkozna, az eredeti formulában ott lenne a zárójel: \`x ∨ ¬(y → z ∧ x)\`.`,
      },
      {
        prompt: `Készítsd el az \`x ∨ ¬y → z ∧ x\` formula igazságtábláját (változók sorrendje: \`x, y, z\`)!
Tautológia, kielégíthető vagy kielégíthetetlen?`,
        hint: `A zárójelezés \`(x ∨ ¬y) → (z ∧ x)\`. Az implikáció ott hamis, ahol a bal oldal \`i\`, a jobb oldal \`h\`.`,
        solution: `| x | y | z | ¬y | x ∨ ¬y | z ∧ x | (x ∨ ¬y) → (z ∧ x) |
|---|---|---|----|--------|-------|-----|
| i | i | i | h | i | i | **i** |
| i | i | h | h | i | h | **h** |
| i | h | i | i | i | i | **i** |
| i | h | h | i | i | h | **h** |
| h | i | i | h | h | h | **i** |
| h | i | h | h | h | h | **i** |
| h | h | i | i | i | h | **h** |
| h | h | h | i | i | h | **h** |

* \`x ∨ ¬y\` csak ott \`h\`, ahol \`x = h\` és \`¬y = h\` (5–6. sor).
* \`z ∧ x\` csak ott \`i\`, ahol \`z = x = i\` (1. és 3. sor).
* \`→\` ott \`h\`, ahol bal \`i\`, jobb \`h\`: 2., 4., 7., 8. sor.

**Kielégíthető, de nem tautológia.**`,
      },
      {
        prompt: `Készítsd el a \`¬x → y → x ∧ z\` formula igazságtábláját (sorrend: \`x, y, z\`)!`,
        hint: `A \`→\` jobbra köt: \`¬x → (y → (x ∧ z))\`. Ahol \`¬x = h\` (vagyis \`x = i\`), ott az egész formula \`i\`.`,
        solution: `Teljesen zárójelezve \`(¬x → (y → (x ∧ z)))\`, a külső zárójel nélkül \`¬x → (y → (x ∧ z))\`.
A fő összekötő a **bal oldali** \`→\`.

A \`¬x\` köré nem kell zárójel: a \`¬\` amúgy is csak az \`x\`-et fogja meg, és a definíció szerint a \`¬A\`
nem kap saját zárójelet. Zárójel csak a kétváltozós műveletek (\`∧, ∨, →\`) köré jár.

| x | y | z | ¬x | x ∧ z | y → x ∧ z | ¬x → (y → x ∧ z) |
|---|---|---|----|-------|-----------|-----|
| i | i | i | h | i | i | **i** |
| i | i | h | h | h | h | **i** |
| i | h | i | h | i | i | **i** |
| i | h | h | h | h | i | **i** |
| h | i | i | i | h | h | **h** |
| h | i | h | i | h | h | **h** |
| h | h | i | i | h | i | **i** |
| h | h | h | i | h | i | **i** |

A felső négy sorban \`¬x = h\`, ezért ott az implikáció automatikusan \`i\`. Lent csak ott \`h\`, ahol
\`y → x ∧ z\` is \`h\`, vagyis ahol \`y = i\` és \`x ∧ z = h\`. **Kielégíthető, nem tautológia.**`,
      },
      {
        prompt: `Mutasd meg igazságtáblával, hogy \`(x → y) ∧ (y → z) → (x → z)\` **tautológia**!`,
        hint: `Zárójelezve: \`((x → y) ∧ (y → z)) → (x → z)\`. Elég megnézni azokat a sorokat, ahol \`x → z\` hamis
(\`x = i, z = h\`): ott a bal oldalnak is hamisnak kell lennie.`,
        solution: `| x | y | z | x → y | y → z | (x→y) ∧ (y→z) | x → z | egész |
|---|---|---|-------|-------|------|-------|-------|
| i | i | i | i | i | i | i | **i** |
| i | i | h | i | h | h | h | **i** |
| i | h | i | h | i | h | i | **i** |
| i | h | h | h | i | h | h | **i** |
| h | i | i | i | i | i | i | **i** |
| h | i | h | i | h | h | i | **i** |
| h | h | i | i | i | i | i | **i** |
| h | h | h | i | i | i | i | **i** |

Minden sor \`i\`, tehát \`⊨0 (x → y) ∧ (y → z) → (x → z)\`, ez a **láncszabály** (tranzitivitás).`,
      },
      {
        prompt: `Döntsd el mindegyikről: tautológia, kielégíthető (de nem tautológia), vagy kielégíthetetlen?

1. \`x → (y → x)\`
2. \`(x ∨ ¬y) ∧ (x → y)\`
3. \`¬(x → y) ∧ (¬x ∧ y)\`
4. \`((x → y) → x) → x\`
5. \`x ∧ ¬(y → x)\``,
        hint: `Tautológiánál keress olyan sort, ahol hamis lehetne, és mutasd meg, hogy nincs ilyen. Kielégíthetetlennél
keress olyat, ahol igaz lehetne.`,
        solution: `1. **Tautológia.** Hamis csak úgy lehetne, ha \`x = i\` és \`y → x = h\`, de \`x = i\` mellett \`y → x = i\`.
   Átalakítással: \`¬x ∨ ¬y ∨ x ∼0 ⊤\`. (gy1, 9. példa)
2. **Kielégíthető, nem tautológia.** \`x = y = i\`: \`(i ∨ h) ∧ (i → i) = i\`. \`x = i, y = h\`: \`i → h = h\`.
3. **Kielégíthetetlen.** \`¬(x → y)\` miatt \`x = i\` kell, \`¬x ∧ y\` miatt \`x = h\` kell: ellentmondás.
4. **Tautológia** (Peirce-törvény). Hamis csak \`x = h\` mellett lehet, de akkor \`(x → y) = i\` és
   \`i → h = h\`, így az előtag \`h\`, az egész pedig \`i\`.
5. **Kielégíthetetlen.** \`¬(y → x)\` miatt \`y = i, x = h\`, de az \`∧\` bal oldala \`x = i\`-t kér.`,
      },
      {
        prompt: `Hagyd el a felesleges zárójeleket, és add meg a logikai összetettséget:
\`((¬y → (x ∧ ¬z)) ∧ ¬((x ∨ ¬z) → y))\``,
        hint: `Amelyik zárójel a precedencia miatt amúgy is „ott van”, az elhagyható. A \`¬( … → …)\` zárójelét nem
hagyhatod el.`,
        solution: `\`(¬y → x ∧ ¬z) ∧ ¬(x ∨ ¬z → y)\`

* A \`(x ∧ ¬z)\` elhagyható, mert az \`∧\` erősebb, mint a \`→\`.
* A \`(x ∨ ¬z)\` elhagyható, mert az \`∨\` erősebb, mint a \`→\`.
* A \`(¬y → …)\` **nem** hagyható el, mert különben az \`∧\` erősebben kötne.

Összekötők: \`¬, →, ∧, ¬, ∧, ¬, ∨, ¬, →\` → **9**.`,
      },
      {
        prompt: `Mennyi a \`(x → ¬y) ∧ (y → z) → y ∨ ¬z\` formula logikai összetettsége?`,
        solution: `Összekötők: \`→, ¬, ∧, →, →, ∨, ¬\`, összesen **7**. A fő összekötő a középső \`→\`, mert ez köt a
leggyengébben: \`((x → ¬y) ∧ (y → z)) → (y ∨ ¬z)\`.`,
        check: "numeric",
        answer: `7`,
      },
    ],
  },
  {
    slug: "knf-dnf",
    title: `2. KNF és DNF — ekvivalens átalakítás és igazságtábla (2. feladattípus)`,
    summary: `A ZH 2. feladattípusa: egy formulával ekvivalens konjunktív normálforma, indoklással. Kétféle biztos módszer: logikai törvényekkel és igazságtáblából.`,
    status: "complete",
    body: `## 1. Fogalmak

| Fogalom | Mit jelent | Példa |
|---|---|---|
| **literál** | változó vagy annak tagadása | \`x\`, \`¬y\` |
| **elemi diszjunkció** (= **klóz**) | literálok \`∨\`-a | \`¬x ∨ y ∨ ¬z\` |
| **elemi konjunkció** | literálok \`∧\`-e | \`x ∧ ¬y\` |
| **KNF** (konjunktív normálforma) | elemi diszjunkciók \`∧\`-e | \`(x ∨ ¬y) ∧ (¬x ∨ z)\` |
| **DNF** (diszjunktív normálforma) | elemi konjunkciók \`∨\`-a | \`(x ∧ ¬y) ∨ z\` |
| **teljes** elemi konj./diszj. | minden változó pontosan egyszer szerepel benne | \`x ∧ ¬y ∧ z\` az x, y, z bázisban |
| **kitüntetett** KNF/DNF | csupa teljes tagból áll | (az igazságtáblás módszer ilyet ad) |

**Memo:** **K**NF = „**K**ívül ∧”, kívül **és**, belül vagy. DNF = kívül **vagy**, belül és.

Egyetlen literál (\`¬y\`) egyszerre literál, elemi diszjunkció, elemi konjunkció, KNF és DNF is.
Az \`x ∧ y ∧ ¬z\` egy KNF is (három egyliterálos klóz \`∧\`-e) és egy DNF is (egyetlen elemi konjunkció).
(gy1, 12. példa)

## 2. A logikai törvények, amikkel átalakítunk

| # | Törvény |
|---|---|
| 1 | \`¬¬A ∼0 A\` (kettős tagadás) |
| 2 | \`A ∨ A ∼0 A\`, \`A ∧ A ∼0 A\` (idempotencia) |
| 3 | \`A ∨ B ∼0 B ∨ A\`, \`A ∧ B ∼0 B ∧ A\` (kommutativitás) |
| 4 | \`(A ∨ B) ∨ C ∼0 A ∨ (B ∨ C)\` és ugyanez \`∧\`-re (asszociativitás) |
| 5 | \`(A ∨ B) ∧ C ∼0 (A ∧ C) ∨ (B ∧ C)\`, \`(A ∧ B) ∨ C ∼0 (A ∨ C) ∧ (B ∨ C)\` (**disztributivitás**) |
| 6 | \`(A ∨ B) ∧ B ∼0 B\`, \`(A ∧ B) ∨ B ∼0 B\` (elnyelés) |
| 7 | \`A → B ∼0 ¬A ∨ B\` (**implikáció kiküszöbölése**) |
| 8 | \`¬(A ∧ B) ∼0 ¬A ∨ ¬B\`, \`¬(A ∨ B) ∼0 ¬A ∧ ¬B\` (**De Morgan**) |
| 9 | \`A ∨ ¬A ∼0 ⊤\`, \`A ∧ ¬A ∼0 ⊥\` |
| 10 | \`A ∨ ⊤ ∼0 ⊤\`, \`A ∧ ⊥ ∼0 ⊥\` |
| 11 | \`A ∨ ⊥ ∼0 A\`, \`A ∧ ⊤ ∼0 A\` |

## 3. A. módszer: ekvivalens átalakítás (4 lépéses recept)

1. **\`→\` kiküszöbölése:** \`A → B ⇝ ¬A ∨ B\` (7). Mindig a **fő összekötőnél** kezdd!
2. **A tagadás bevitele** a változókig: De Morgan (8) és kettős tagadás (1).
   Hasznos: \`¬(A → B) ∼0 A ∧ ¬B\`.
3. **Disztributivitás** (5): KNF-hez az \`∨\`-t visszük be az \`∧\` alá:
   \`(A ∧ B) ∨ C ⇝ (A ∨ C) ∧ (B ∨ C)\`.
4. **Egyszerűsítés:** \`A ∨ ¬A ⇝ ⊤\` és \`⊤ ∧ X ⇝ X\` (9–11), ismétlődő literál törlése (2).

**Indoklás a ZH-n:** minden \`∼0\` lépésnél legyen világos, melyik törvényt használtad. Ha írsz mellé
egy szót („De Morgan”, „disztr.”), az biztosan elég.

## 4. B. módszer: igazságtáblából (mindig működik, „gépies”)

1. Készítsd el a formula igazságtábláját.
2. **KNF:** minden sorhoz, ahol a formula **\`h\`**, írj egy klózt, amely pontosan ebben a sorban hamis:
   ha a változó értéke a sorban \`i\`, akkor **negálva**, ha \`h\`, akkor **ponáltan** kerül be.
   Például az \`x = i, y = i, z = h\` sor klóza \`¬x ∨ ¬y ∨ z\`.
3. **DNF:** minden sorhoz, ahol a formula **\`i\`**, írj egy elemi konjunkciót: \`i\` értékű változó
   ponáltan, \`h\` értékű negálva kerül be. Például az \`x = i, y = h, z = i\` sorból \`x ∧ ¬y ∧ z\` lesz.
4. A klózokat \`∧\`-sel (KNF), a konjunkciókat \`∨\`-nal (DNF) kötöd össze. Ez a **kitüntetett** KNF/DNF.

> **Mikor melyik?** Ha a formula **kevés helyen hamis**, a táblás KNF rövid (1–2 klóz). Ha sok helyen
> hamis, mint a lenti kidolgozott példában, az átalakítás jóval rövidebb eredményt ad. Ellenőrzésnek a
> ZH-n is jó a másik módszer.

---

## 5. Kidolgozott példa

> **Feladat.** Adj meg egy, a \`(x ∨ ¬y) → ¬(z → x)\` formulával tautologikusan ekvivalens,
> konjunktív normálformájú formulát! Állításodat indokold!

### 1. megoldás: ekvivalens átalakításokkal

\`\`\`text
(x ∨ ¬y) → ¬(z → x)
∼0  ¬(x ∨ ¬y) ∨ ¬(z → x)                     [7: A → B ∼0 ¬A ∨ B, a fő →-ra]
∼0  ¬(x ∨ ¬y) ∨ ¬(¬z ∨ x)                    [7: a belső →-ra]
∼0  (¬x ∧ ¬¬y) ∨ (¬¬z ∧ ¬x)                  [8: De Morgan mindkét tagra]
∼0  (¬x ∧ y) ∨ (z ∧ ¬x)                      [1: kettős tagadás]
∼0  (y ∧ ¬x) ∨ (z ∧ ¬x)                      [3: kommutativitás]
∼0  (y ∨ z) ∧ ¬x                             [5: disztributivitás, visszafelé]
∼0  ¬x ∧ (y ∨ z)                             [3: kommutativitás]
\`\`\`

**Eredmény:** \`¬x ∧ (y ∨ z)\`. Két klóz (\`¬x\` és \`y ∨ z\`) konjunkciója, tehát KNF.

### 2. megoldás: igazságtáblával

| x | y | z | (x ∨ ¬y) → ¬(z → x) | klóz a \`h\` sorhoz |
|---|---|---|---|---|
| i | i | i | **h** | \`¬x ∨ ¬y ∨ ¬z\` |
| i | i | h | **h** | \`¬x ∨ ¬y ∨ z\` |
| i | h | i | **h** | \`¬x ∨ y ∨ ¬z\` |
| i | h | h | **h** | \`¬x ∨ y ∨ z\` |
| h | i | i | i | |
| h | i | h | i | |
| h | h | i | i | |
| h | h | h | **h** | \`x ∨ y ∨ z\` |

Miért ennyi a \`h\` sor? Ha \`x = i\`, akkor \`z → x = i\`, így az utótag \`¬(z → x) = h\`, az előtag
\`x ∨ ¬y = i\`, tehát az implikáció hamis: ez a felső négy sor. Ha \`x = h\`, akkor \`z → x\` pontosan
\`z = h\`-nál igaz; a \`hhh\` sorban az előtag is igaz (\`¬y = i\`), ezért ott is \`h\`.

**Eredmény (kitüntetett KNF):**
\`(¬x ∨ ¬y ∨ ¬z) ∧ (¬x ∨ ¬y ∨ z) ∧ (¬x ∨ y ∨ ¬z) ∧ (¬x ∨ y ∨ z) ∧ (x ∨ y ∨ z)\`.

Ez is helyes válasz, csak hosszabb. A két eredmény ekvivalens: az első négy klóz együtt pontosan
\`¬x\`-et mondja ki, az utolsóval együtt pedig \`¬x ∧ (y ∨ z)\` jön ki. ✔`,
    exercises: [
      {
        prompt: `Add meg a \`(x → y) → z\` formula **kitüntetett DNF**-jét és **kitüntetett KNF**-jét igazságtáblával! (gy1, 13. példa)`,
        hint: `A formula csak ott hamis, ahol \`x → y = i\` és \`z = h\`.`,
        solution: `| x | y | z | (x → y) → z | |
|---|---|---|---|---|
| i | i | i | i | \`x ∧ y ∧ z\` |
| i | i | h | h | \`¬x ∨ ¬y ∨ z\` |
| i | h | i | i | \`x ∧ ¬y ∧ z\` |
| i | h | h | i | \`x ∧ ¬y ∧ ¬z\` |
| h | i | i | i | \`¬x ∧ y ∧ z\` |
| h | i | h | h | \`x ∨ ¬y ∨ z\` |
| h | h | i | i | \`¬x ∧ ¬y ∧ z\` |
| h | h | h | h | \`x ∨ y ∨ z\` |

**Kitüntetett DNF** (az \`i\` sorokból):
\`(x ∧ y ∧ z) ∨ (x ∧ ¬y ∧ z) ∨ (x ∧ ¬y ∧ ¬z) ∨ (¬x ∧ y ∧ z) ∨ (¬x ∧ ¬y ∧ z)\`

**Kitüntetett KNF** (a \`h\` sorokból):
\`(¬x ∨ ¬y ∨ z) ∧ (x ∨ ¬y ∨ z) ∧ (x ∨ y ∨ z)\``,
      },
      {
        prompt: `Hozd **ekvivalens átalakításokkal** KNF-re **és** DNF-re a \`(x → y) → z\` formulát!`,
        hint: `Kétszer kell alkalmaznod \`A → B ∼0 ¬A ∨ B\`-t, utána De Morgant, végül a disztributivitást.`,
        solution: `\`\`\`text
(x → y) → z
∼0  ¬(x → y) ∨ z            [7]
∼0  ¬(¬x ∨ y) ∨ z           [7]
∼0  (¬¬x ∧ ¬y) ∨ z          [8: De Morgan]
∼0  (x ∧ ¬y) ∨ z            [1]        ← DNF
∼0  (x ∨ z) ∧ (¬y ∨ z)      [5: disztr.] ← KNF
\`\`\`
Figyeld meg, hogy ez sokkal rövidebb, mint a kitüntetett alak az előző feladatban. Mindkettő helyes.`,
      },
      {
        prompt: `Hozd KNF-re és DNF-re: \`¬(x → z) ∨ ¬(¬x ∨ z → y)\` (gy1, 14. példa)`,
        hint: `Vedd észre, hogy \`¬x ∨ z\` kétszer is előjön (\`x → z ∼0 ¬x ∨ z\`). Jelöld \`C\`-vel, így látszik a
\`¬C ∨ (C ∧ ¬y)\` szerkezet.`,
        solution: `Legyen \`C = ¬x ∨ z\` (ez éppen \`x → z\`).
\`\`\`text
¬(x → z) ∨ ¬(¬x ∨ z → y)
∼0  ¬C ∨ ¬(C → y)                        [x → z ∼0 C]
∼0  ¬C ∨ ¬(¬C ∨ y)                       [7]
∼0  ¬C ∨ (C ∧ ¬y)                        [8 + 1]
∼0  (¬C ∨ C) ∧ (¬C ∨ ¬y)                 [5: disztr.]
∼0  ⊤ ∧ (¬C ∨ ¬y)  ∼0  ¬C ∨ ¬y           [9, 11]
∼0  ¬(¬x ∨ z) ∨ ¬y  ∼0  (x ∧ ¬z) ∨ ¬y    [8 + 1]   ← DNF
∼0  (x ∨ ¬y) ∧ (¬z ∨ ¬y)                 [5]       ← KNF
\`\`\``,
      },
      {
        prompt: `Adj meg KNF-et a \`¬(x ∨ y) → x ∧ z\` formulához!`,
        hint: `Zárójelezve \`¬(x ∨ y) → (x ∧ z)\`. Az első lépés után \`(x ∨ y) ∨ (x ∧ z)\` jön ki, erre alkalmazd a
disztributivitást, majd az elnyelést / idempotenciát.`,
        solution: `\`\`\`text
¬(x ∨ y) → (x ∧ z)
∼0  ¬¬(x ∨ y) ∨ (x ∧ z)                [7]
∼0  (x ∨ y) ∨ (x ∧ z)                  [1]
∼0  (x ∨ y ∨ x) ∧ (x ∨ y ∨ z)          [5]
∼0  (x ∨ y) ∧ (x ∨ y ∨ z)              [2: x ∨ x ∼0 x]
∼0  x ∨ y                              [6: elnyelés, (A) ∧ (A ∨ z) ∼0 A]
\`\`\`
KNF: **\`x ∨ y\`**. Táblával ellenőrizve: a formula pontosan ott hamis, ahol \`x = y = h\` (z-től
függetlenül), és a kitüntetett KNF \`(x ∨ y ∨ ¬z) ∧ (x ∨ y ∨ z)\`, ami ugyanezt fejezi ki.`,
      },
      {
        prompt: `Add meg csak \`¬, ∧, ∨\` használatával: (a) \`x → y\`, (b) \`x ⊕ y\` (kizáró vagy), (c) \`x ↔ y\`
(ekvivalencia, „akkor és csak akkor”). (gy1, 8. példa)`,
        hint: `\`x ⊕ y\` akkor igaz, ha pontosan az egyik igaz. Az igazságtábla két \`i\` sorából olvasd ki a DNF-et.`,
        solution: `(a) \`x → y ∼0 ¬x ∨ y\` (vagy \`¬(x ∧ ¬y)\`).

(b) \`x ⊕ y ∼0 (x ∧ ¬y) ∨ (¬x ∧ y)\` (DNF), KNF alakban \`(x ∨ y) ∧ (¬x ∨ ¬y)\`.

(c) \`x ↔ y ∼0 (x → y) ∧ (y → x) ∼0 (¬x ∨ y) ∧ (¬y ∨ x)\` (KNF), DNF alakban \`(x ∧ y) ∨ (¬x ∧ ¬y)\`.`,
      },
      {
        prompt: `Hozd KNF-re: \`¬(x ∧ ¬y → z) ∨ y\``,
        hint: `\`¬(A → B) ∼0 A ∧ ¬B\`.`,
        solution: `\`\`\`text
¬(x ∧ ¬y → z) ∨ y
∼0  (x ∧ ¬y ∧ ¬z) ∨ y                  [¬(A → B) ∼0 A ∧ ¬B]
∼0  (x ∨ y) ∧ (¬y ∨ y) ∧ (¬z ∨ y)      [5: disztr.]
∼0  (x ∨ y) ∧ ⊤ ∧ (¬z ∨ y)             [9]
∼0  (x ∨ y) ∧ (¬z ∨ y)                 [11]
\`\`\`
DNF: \`(x ∧ ¬z) ∨ y\`.`,
      },
      {
        prompt: `Melyik literál, elemi diszjunkció/konjunkció, KNF/DNF, kitüntetett KNF/DNF az \`x, y, z\` bázisban?
(gy1, 12. példa)

1. \`x → ¬z\`  2. \`¬y\`  3. \`x ∧ y ∧ ¬z\`  4. \`(x ∨ ¬z) ∧ z\`  5. \`(x ∧ ¬y ∧ z) ∨ (¬x ∧ y ∧ z)\``,
        solution: `1. **egyik sem** (van benne \`→\`).
2. literál, elemi diszjunkció, elemi konjunkció, KNF, DNF, de **nem teljes**, így nem kitüntetett.
3. **teljes elemi konjunkció**, így **kitüntetett DNF**. KNF is, de nem kitüntetett (három egyliterálos klóz).
4. **KNF**, nem kitüntetett.
5. **kitüntetett DNF** (két teljes elemi konjunkció).`,
      },
    ],
  },
  {
    slug: "kovetkezmeny-rezolucio",
    title: `3. Következmény és rezolúció — klózhalmaz és □ (3. feladattípus)`,
    summary: `A ZH 3. feladattípusa: egy logikai következményből kielégíthetetlenségi feladatot csinálunk (klózhalmaz), és rezolúcióval levezetjük az üres klózt.`,
    status: "complete",
    body: `## 1. Tautologikus következmény

\`{A1, …, An} ⊨0 B\` azt jelenti: **minden** olyan sorban (interpretációban), ahol **minden premissza
igaz**, ott **B is igaz**.

Igazságtáblával így ellenőrzöd: nézd csak azokat a sorokat, ahol \`A1, …, An\` mind \`i\`. Ha ezek
mindegyikében \`B = i\`, akkor a következmény fennáll. (gy1, 16. példa)

## 2. A kulcstétel: a következmény átírása kielégíthetetlenségre

\`\`\`text
{A1, …, An} ⊨0 B    ⟺    {A1, …, An, ¬B}  kielégíthetetlen
\`\`\`

Szemléletesen: „B következik” ugyanazt jelenti, mint hogy „nem lehet egyszerre minden premissza igaz,
B pedig hamis”.

### Klózhalmaz készítése: a recept

1. Írd fel a premisszákat és a **konklúzió tagadását**, \`¬B\`-t. (Ezt nagyon könnyű elfelejteni!)
2. Mindegyiket hozd **KNF-re** (2. lecke).
3. A KNF-ek **klózait** (az \`∧\`-sel összekötött tagokat) **külön-külön** tedd be az \`S\` halmazba.
4. Ekkor: \`S\` kielégíthetetlen ⟺ \`{A1, …, An} ⊨0 B\`.

Hasznos átírások:

| Formula | Klóz(ok) |
|---|---|
| \`¬A → B\` | \`A ∨ B\` |
| \`A → B ∨ C\` | \`¬A ∨ B ∨ C\` |
| \`A ∧ B → C\` | \`¬A ∨ ¬B ∨ C\` |
| \`A → B ∧ C\` | két klóz: \`¬A ∨ B\` és \`¬A ∨ C\` |
| \`¬(A ∧ ¬B)\` | \`¬A ∨ B\` |
| \`¬(A ∧ B)\` (tagadott konklúzió \`A ∧ B\`-ből) | \`¬A ∨ ¬B\` |

## 3. A rezolúció szabálya

Ha két klóz közül az egyikben szerepel egy \`L\` literál, a másikban a komplemense \`¬L\`, akkor a
**rezolvensük** a két klóz összes többi literáljának \`∨\`-a:

\`\`\`text
   C1 = L ∨ A          C2 = ¬L ∨ B
   ─────────────────────────────────
         res(C1, C2) = A ∨ B
\`\`\`

Példák: \`res(x ∨ ¬y, ¬x) = ¬y\`, \`res(¬y, z ∨ x ∨ y) = z ∨ x\`, \`res(x, ¬x) = □\`.

**\`□\` (üres klóz):** két **egyliterálos**, egymás komplemensei klózból (\`x\` és \`¬x\`) keletkezik.
Ha \`□\` levezethető, akkor **S kielégíthetetlen** (a rezolúció helyes és teljes).

### Szabályok és trükkök

* Egyszerre **csak egy** komplemens párt rezolválhatsz! Az \`x ∨ y\` és \`¬x ∨ ¬y\` rezolvense
  \`y ∨ ¬y\` (vagy \`x ∨ ¬x\`), és **nem** \`□\`. Ez egy haszontalan tautológia.
* **Egységklózokkal kezdj** (egyetlen literálból álló klózokkal, pl. \`¬x\`): ezek minden lépésben
  rövidítenek. Ez szinte mindig gyorsan \`□\`-hez vezet.
* Ha egy literál (pl. \`¬y\`) kijött, keresd azt a klózt, amelyben \`y\` szerepel, és így tovább: „húzd
  végig” a láncot.

### A levezetés formája (így írd a ZH-n)

Számozott sorok, minden sor mellett, hogy honnan jön (\`∈ S\` vagy \`res(i, j)\`):

\`\`\`text
1. ¬x ∨ y        (∈ S)
2. x             (∈ S)
3. y             res(1, 2)
...
k. □             res(i, j)
\`\`\`

---

## 4. Kidolgozott példa

> **Feladat.** Adj meg egy olyan S klózhalmazt, amelyre igaz, hogy kielégíthetetlensége ekvivalens
> az alábbi logikai következménnyel:
> \`{x → y ∨ z, ¬y, z → ¬x} ⊨0 ¬x ∧ ¬y\`
> Igazold, hogy az S klózhalmaz kielégíthetetlen!

**1. lépés: a premisszák és a tagadott konklúzió KNF-je.**

\`\`\`text
1. x → y ∨ z     ∼0  ¬x ∨ y ∨ z
2. ¬y            (már klóz)
3. z → ¬x        ∼0  ¬z ∨ ¬x
4. ¬(¬x ∧ ¬y)    ∼0  ¬¬x ∨ ¬¬y   ∼0  x ∨ y        ← a konklúzió TAGADÁSA (De Morgan)
\`\`\`

**2. lépés: a klózhalmaz.**

\`\`\`text
S = { ¬x ∨ y ∨ z,  ¬y,  ¬z ∨ ¬x,  x ∨ y }
\`\`\`

Ezzel: \`S\` kielégíthetetlen ⟺ \`{x → y ∨ z, ¬y, z → ¬x} ⊨0 ¬x ∧ ¬y\`.

**3. lépés: rezolúció.** Az egyetlen egységklóz a \`¬y\`, ezzel kezdünk.

\`\`\`text
1. ¬x ∨ y ∨ z    (∈ S)
2. ¬y            (∈ S)
3. ¬z ∨ ¬x       (∈ S)
4. x ∨ y         (∈ S)
5. x             res(4, 2)     y és ¬y kiesik
6. y ∨ z         res(1, 5)     ¬x és x kiesik
7. z             res(6, 2)     y és ¬y kiesik
8. ¬x            res(3, 7)     ¬z és z kiesik
9. □             res(5, 8)     x és ¬x
\`\`\`

Levezettük az üres klózt, tehát **S kielégíthetetlen**, így a következmény fennáll. ∎

Gondolatmenet: \`¬y\` miatt a tagadott konklúzióból (\`x ∨ y\`) \`x\` igaz kell legyen (5). Akkor az első
premisszából \`y ∨ z\` marad (6), és mivel \`y\` hamis, \`z\` igaz (7). A harmadik premissza szerint ekkor
\`¬x\` (8), ami ellentmond az (5)-nek.## 5. Még egy kidolgozott példa: a Tihany-feladat (gy1, 16. példa)

> A1: Ha elmegyünk Tihanyba, akkor Fonyódra és Keszthelyre is. A2: Ha nem megyünk Keszthelyre,
> akkor elmegyünk Fonyódra. A3: Ha elmegyünk Keszthelyre, akkor Tihanyba is. B: Tehát elmegyünk
> Fonyódra.

Formalizálás (\`t, f, k\`): \`A1: t → f ∧ k\`, \`A2: ¬k → f\`, \`A3: k → t\`, \`B: f\`.

KNF-ek: \`t → f ∧ k ∼0 (¬t ∨ f) ∧ (¬t ∨ k)\` (ez **két** klóz!), \`¬k → f ∼0 k ∨ f\`, \`k → t ∼0 ¬k ∨ t\`,
a tagadott konklúzió pedig \`¬f\`.

\`S = {¬t ∨ f, ¬t ∨ k, k ∨ f, ¬k ∨ t, ¬f}\`

\`\`\`text
1. ¬t ∨ f     (∈ S)
2. ¬k ∨ t     (∈ S)
3. ¬k ∨ f     res(1, 2)
4. k ∨ f      (∈ S)
5. f          res(3, 4)     f ∨ f = f
6. ¬f         (∈ S)
7. □          res(5, 6)
\`\`\``,
    exercises: [
      {
        prompt: `Rezolúcióval igazold, hogy \`S = {x, ¬y, ¬x ∨ y}\` kielégíthetetlen! (gy1, 15/1)`,
        solution: `\`\`\`text
1. ¬y         (∈ S)
2. ¬x ∨ y     (∈ S)
3. ¬x         res(1, 2)
4. x          (∈ S)
5. □          res(3, 4)
\`\`\``,
      },
      {
        prompt: `Rezolúcióval igazold, hogy \`S = {y ∨ z, ¬x ∨ w ∨ ¬z, ¬y, y ∨ ¬z ∨ ¬w, x ∨ y}\` kielégíthetetlen! (gy1, 15/2)`,
        hint: `Kezdd a \`¬y\` egységklózzal. Az egyetlen trükkös lépés: a \`w\`-t a 2. és a 4. klóz rezolválásával
lehet eltüntetni.`,
        solution: `\`\`\`text
1. ¬y              (∈ S)
2. y ∨ z           (∈ S)
3. z               res(1, 2)
4. ¬x ∨ w ∨ ¬z     (∈ S)
5. y ∨ ¬z ∨ ¬w     (∈ S)
6. ¬x ∨ y ∨ ¬z     res(4, 5)     w kiesik
7. ¬x ∨ y          res(3, 6)     z kiesik
8. x ∨ y           (∈ S)
9. y               res(7, 8)     x kiesik
10. □              res(1, 9)
\`\`\``,
      },
      {
        prompt: `Adj meg klózhalmazt, és rezolúcióval igazold: \`{p → q, q → r, p} ⊨0 r\``,
        solution: `\`S = {¬p ∨ q, ¬q ∨ r, p, ¬r}\` (az utolsó a konklúzió tagadása).
\`\`\`text
1. p          (∈ S)
2. ¬p ∨ q     (∈ S)
3. q          res(1, 2)
4. ¬q ∨ r     (∈ S)
5. r          res(3, 4)
6. ¬r         (∈ S)
7. □          res(5, 6)
\`\`\``,
      },
      {
        prompt: `Adj meg klózhalmazt, és rezolúcióval igazold: \`{x ∨ y, x → z, y → z} ⊨0 z\` (esetszétválasztás).`,
        solution: `\`S = {x ∨ y, ¬x ∨ z, ¬y ∨ z, ¬z}\`
\`\`\`text
1. ¬z         (∈ S)
2. ¬x ∨ z     (∈ S)
3. ¬x         res(1, 2)
4. ¬y ∨ z     (∈ S)
5. ¬y         res(1, 4)
6. x ∨ y      (∈ S)
7. y          res(3, 6)
8. □          res(5, 7)
\`\`\``,
      },
      {
        prompt: `**ZH-szintű.** Adj meg egy olyan S klózhalmazt, amelynek kielégíthetetlensége ekvivalens a
\`{¬y → x, ¬(x ∧ z), z} ⊨0 y ∧ ¬x\` következménnyel, és igazold, hogy S kielégíthetetlen!`,
        hint: `A tagadott konklúzió: \`¬(y ∧ ¬x) ∼0 ¬y ∨ x\`. A \`z\` egységklózzal kezdj.`,
        solution: `KNF-ek: \`¬y → x ∼0 y ∨ x\`; \`¬(x ∧ z) ∼0 ¬x ∨ ¬z\`; \`z\`; tagadott konklúzió: \`¬(y ∧ ¬x) ∼0 ¬y ∨ x\`.

\`S = {y ∨ x, ¬x ∨ ¬z, z, ¬y ∨ x}\`
\`\`\`text
1. z           (∈ S)
2. ¬x ∨ ¬z     (∈ S)
3. ¬x          res(1, 2)
4. y ∨ x       (∈ S)
5. y           res(3, 4)
6. ¬y ∨ x      (∈ S)
7. x           res(5, 6)
8. □           res(3, 7)
\`\`\`
Tehát S kielégíthetetlen, és a következmény fennáll.`,
      },
      {
        prompt: `**ZH-szintű.** Klózhalmaz + rezolúció: \`{x → y ∨ z, ¬z, x ∨ z} ⊨0 y\``,
        solution: `\`S = {¬x ∨ y ∨ z, ¬z, x ∨ z, ¬y}\`
\`\`\`text
1. ¬z            (∈ S)
2. x ∨ z         (∈ S)
3. x             res(1, 2)
4. ¬x ∨ y ∨ z    (∈ S)
5. y ∨ z         res(3, 4)
6. y             res(1, 5)
7. ¬y            (∈ S)
8. □             res(6, 7)
\`\`\``,
      },
      {
        prompt: `**ZH-szintű.** Klózhalmaz + rezolúció: \`{x ∧ y → z, ¬z ∨ w, x, ¬w} ⊨0 ¬y\``,
        hint: `A tagadott konklúzió \`¬¬y ∼0 y\`. \`x ∧ y → z ∼0 ¬x ∨ ¬y ∨ z\`.`,
        solution: `\`S = {¬x ∨ ¬y ∨ z, ¬z ∨ w, x, ¬w, y}\`
\`\`\`text
1. ¬w              (∈ S)
2. ¬z ∨ w          (∈ S)
3. ¬z              res(1, 2)
4. ¬x ∨ ¬y ∨ z     (∈ S)
5. ¬x ∨ ¬y         res(3, 4)
6. x               (∈ S)
7. ¬y              res(5, 6)
8. y               (∈ S)
9. □               res(7, 8)
\`\`\``,
      },
      {
        prompt: `**Nehezebb.** Klózhalmaz + rezolúció: \`{¬(x → y) ∨ z, ¬z ∨ ¬x, x ∨ ¬y} ⊨0 ¬y\``,
        hint: `\`¬(x → y) ∨ z ∼0 (x ∧ ¬y) ∨ z ∼0 (x ∨ z) ∧ (¬y ∨ z)\`, ez két klóz. A tagadott konklúzió \`y\`.`,
        solution: `\`S = {x ∨ z, ¬y ∨ z, ¬z ∨ ¬x, x ∨ ¬y, y}\`
\`\`\`text
1. y           (∈ S)
2. ¬y ∨ z      (∈ S)
3. z           res(1, 2)
4. ¬z ∨ ¬x     (∈ S)
5. ¬x          res(3, 4)
6. x ∨ ¬y      (∈ S)
7. x           res(1, 6)
8. □           res(5, 7)
\`\`\`
(Az \`x ∨ z\` klózra nem is volt szükség. Ez rendben van, nem kell minden klózt felhasználni.)`,
      },
      {
        prompt: `Igaz-e, hogy \`{x → y, y} ⊨0 x\`? Ha nem, mutass ellenpéldát, és mondd meg, mi történik a rezolúcióval!`,
        solution: `**Nem igaz** („a következmény állításának hibája”). Ellenpélda: \`x = h, y = i\`. Ekkor \`x → y = i\`,
\`y = i\`, de \`x = h\`.

A klózhalmaz \`S = {¬x ∨ y, y, ¬x}\` **kielégíthető** (pont ezzel az interpretációval), ezért \`□\` **nem**
vezethető le. A lehetséges rezolvensek (\`res(¬x ∨ y, …)\`) nem adnak új egységklózt, ami ellentmondana
valaminek.`,
      },
      {
        prompt: `Igazságtáblával lásd be, hogy a Tihany-feladatban \`{A1, A2, A3} ⊨0 B\`, ahol
\`A1 = t → f ∧ k\`, \`A2 = ¬k → f\`, \`A3 = k → t\`, \`B = f\`!`,
        solution: `| t | f | k | t → f ∧ k | ¬k → f | k → t | f |
|---|---|---|---|---|---|---|
| i | i | i | **i** | **i** | **i** | **i** |
| i | i | h | h | i | i | i |
| i | h | i | h | i | i | h |
| i | h | h | h | h | i | h |
| h | i | i | i | i | h | i |
| h | i | h | **i** | **i** | **i** | **i** |
| h | h | i | i | i | h | h |
| h | h | h | i | h | i | h |

Csak az **1. és a 6. sorban** igaz mindhárom premissza, és mindkettőben \`f = i\`. Tehát a következmény
fennáll.`,
      },
    ],
  },
  {
    slug: "elsorendu-interpretacio",
    title: `4. Elsőrendű logika — formula értéke egy interpretációban (4. feladattípus)`,
    summary: `A ZH 4. feladattípusa: ∀/∃ formulák logikai értéke egy véges interpretációban, indoklással. A reláció táblázatba rendezése, változókiértékelés, x-variánsok, kvantorsorrend. A végén röviden a többi elsőrendű téma is (formalizálás, prenex, Skolem).`,
    status: "complete",
    body: `## 1. Az elsőrendű nyelv elemei

* **Pred**: predikátumszimbólumok (\`P, Q, R\`, …), **Func**: függvényszimbólumok (\`f, g\`, …),
  **Cnst**: konstansok (\`a, b\`, …). Mindegyiknek van **aritása** (\`ar\`): hány argumentuma van.
  A konstansok aritása 0.
* **Termek:** változók, konstansok, és \`f(t1, …, tk)\` alakúak. Például \`x\`, \`a\`, \`f(x, a)\`.
  Egy term **objektumot** jelöl.
* **Atomi formula:** \`P(t1, …, tk)\`, például \`R(x, y)\`. Egy formula **igazságértéket** jelöl.
* **Formulák:** az atomiakból \`¬, ∧, ∨, →\` és a **kvantorok** (\`∀x\`, \`∃x\`) segítségével.
* Egy változó **kötött**, ha egy kvantor hatáskörében áll, különben **szabad**. Például
  \`∀xR(x, y)\`-ban \`x\` kötött, \`y\` szabad.

## 2. Interpretáció és változókiértékelés

Egy **interpretáció** \`I = ⟨U, I_Pred, I_Func, I_Cnst⟩\`:

* \`U\`: az **univerzum** (alaphalmaz), a 4. kidolgozott példában \`I_Srt(π) = {0, 1, 2}\`;
* minden predikátumszimbólumhoz egy **reláció** \`U\`-n (a példában \`R^I(u, v) = i\`, ha \`u + v ≤ 2\`);
* minden függvényszimbólumhoz egy függvény, minden konstanshoz egy elem.

A **változókiértékelés** (κ) minden változónak értéket ad \`U\`-ból. A jelölés:

\`\`\`text
|A|^(I,κ)                    az A formula értéke I-ben κ mellett
|A|^(I, x↦u)                 ugyanez, de x értéke u  (κ x-variánsa)
|A|^(I, x↦u, y↦v)            x értéke u, y értéke v
\`\`\`

### A kvantorok szemantikája: ezt kell alkalmazni

\`\`\`text
|∀x A| = i   ⟺   MINDEN u ∈ U-ra   |A|^(x↦u) = i
|∃x A| = i   ⟺   VAN olyan u ∈ U,  |A|^(x↦u) = i
\`\`\`

Indoklásnál ebből következik:

| Állítás | Mit kell megmutatni? |
|---|---|
| \`∀x A = i\` | **mindegyik** \`u\`-ra igaz (sorold fel mindet) |
| \`∀x A = h\` | **egy** ellenpélda: \`x ↦ u\`, ahol \`A\` hamis |
| \`∃x A = i\` | **egy** tanú: \`x ↦ u\`, ahol \`A\` igaz |
| \`∃x A = h\` | **mindegyik** \`u\`-ra hamis (sorold fel mindet) |

## 3. A recept: tedd táblázatba a relációt!

Kétváltozós \`R(u, v)\` esetén írd fel az **értéktáblázatot**: a **sor** az első argumentum (\`u\`), az
**oszlop** a második (\`v\`). Ezután a kvantoros formulák **leolvashatók**:

| Formula | Mit keresel a táblázatban? |
|---|---|
| \`∀x R(x, x)\` | a **főátló** csupa \`i\`? |
| \`∃x R(x, x)\` | van \`i\` a főátlóban? |
| \`∀x∃y R(x, y)\` | **minden sorban** van legalább egy \`i\`? |
| \`∃x∀y R(x, y)\` | van **csupa \`i\` sor**? |
| \`∀y∃x R(x, y)\` | **minden oszlopban** van \`i\`? |
| \`∃y∀x R(x, y)\` | van **csupa \`i\` oszlop**? |
| \`∃x∃y R(x, y)\` | van bárhol \`i\`? |
| \`∀x∀y R(x, y)\` | az egész táblázat csupa \`i\`? |
| \`∃x∃y(¬R(x, y) ∧ R(y, x))\` | van olyan \`(x, y)\` cella, ahol \`h\` áll, a **tükörképén** (\`(y, x)\`) pedig \`i\`? |

> **A kvantorok sorrendje számít!** \`∀x∃y\` = „mindenkihez van (akár különböző) párja”,
> \`∃y∀x\` = „van egy közös, mindenkinek jó elem”. Az \`∃y∀x\` erősebb: ebből következik a \`∀x∃y\`,
> fordítva nem.

---

## 4. Kidolgozott példa

> **Feladat.** Legyen az L nyelvnek I olyan interpretációja, amelyben \`U = {0, 1, 2}\` és
> \`R^I(u, v) = i\`, ha \`u + v ≤ 2\`, és \`h\` egyébként. Határozd meg a következő formulák logikai értékét
> I-ben, és indokold is meg a válaszodat!
> (a) \`∀x∃yR(x, y)\`  (b) \`∃x∀yR(x, y)\`  (c) \`∀x∃y¬R(x, y)\`

**0. lépés: a táblázat.** Egy cellában akkor van \`i\`, ha a sor \`u\` és az oszlop \`v\` értékének összege
legfeljebb 2.

| \`R(u, v)\` | v = 0 | v = 1 | v = 2 |
|---|---|---|---|
| **u = 0** | 0 + 0 ≤ 2: **i** | 0 + 1 ≤ 2: **i** | 0 + 2 ≤ 2: **i** |
| **u = 1** | 1 + 0 ≤ 2: **i** | 1 + 1 ≤ 2: **i** | 1 + 2 ≤ 2: **h** |
| **u = 2** | 2 + 0 ≤ 2: **i** | 2 + 1 ≤ 2: **h** | 2 + 2 ≤ 2: **h** |

**(a) \`∀x∃yR(x, y)\`: igaz.** Minden sorban kell legalább egy \`i\`. A \`v = 0\` oszlop csupa \`i\`, így
minden \`x\`-hez jó tanú az \`y = 0\`:

\`\`\`text
|∀x∃yR(x,y)|^I = i,  mert minden u ∈ {0, 1, 2}-re  |∃yR(x,y)|^(I, x↦u) = i,
hiszen  |R(x,y)|^(I, x↦u, y↦0) = i  (u + 0 ≤ 2).
\`\`\`

**(b) \`∃x∀yR(x, y)\`: igaz.** Olyan sor kell, amely csupa \`i\`: ez az \`u = 0\` sor.

\`\`\`text
|∃x∀yR(x,y)|^I = i,  mert  |∀yR(x,y)|^(I, x↦0) = i,
mert  |R(x,y)|^(I, x↦0, y↦v) = i  mindhárom v ∈ {0, 1, 2}-re  (0 + v ≤ 2).
\`\`\`

**(c) \`∀x∃y¬R(x, y)\`: hamis.** Ehhez minden sorban kellene egy \`h\`. Az \`u = 0\` sorban viszont nincs
\`h\`, ez az ellenpélda:

\`\`\`text
|∀x∃y¬R(x,y)|^I = h,  mert  |∃y¬R(x,y)|^(I, x↦0) = h,
hiszen  |R(x,y)|^(I, x↦0, y↦v) = i  minden v-re, így  ¬R  sehol sem igaz.
\`\`\`

Figyeld meg: a (b) és a (c) egymás tagadásai (\`¬∃x∀yR ∼ ∀x∃y¬R\`), ezért kell, hogy az egyik igaz,
a másik hamis legyen. Ez jó ellenőrzés a ZH-n is.## 5. Ha szabad változó is van: értéktábla (gy2, 12. példa)

Ha a formulában szabad változó van (pl. \`y\`), akkor az értéke **\`y\` értékétől függ**, ezért egy
táblázatot adsz meg: minden \`y ∈ U\`-ra a formula értékét.

> \`U = {0, 1, 2}\`, \`P^I = {(0,1), (0,2), (2,1), (2,2)}\`, \`Q^I = {0, 2}\`, \`f^I\` = összeadás mod 3,
> \`a ↦ 0\`, \`b ↦ 1\`. Mi a \`∀xP(x, y) ∨ Q(y)\` értéktáblája?

A \`P\` táblázata (sor: első arg., oszlop: második):

| \`P\` | 0 | 1 | 2 |
|---|---|---|---|
| **0** | h | i | i |
| **1** | h | h | h |
| **2** | h | i | i |

\`∀xP(x, y)\` adott \`y\`-ra azt kérdezi, hogy az \`y\` **oszlop** csupa \`i\`-e. Ez egyik oszlopra sem igaz
(az \`1\` sor csupa \`h\`), így mindig \`h\`. Tehát a formula értéke \`Q(y)\`:

| y | ∀xP(x, y) | Q(y) | ∀xP(x, y) ∨ Q(y) |
|---|---|---|---|
| 0 | h | i | **i** |
| 1 | h | h | **h** |
| 2 | h | i | **i** |

## 6. Kitekintés: a többi elsőrendű gyakorlati téma

A ZH-n az interpretációs feladattípus szerepel, de a gyakorlaton ezek is előkerültek. Ha mégis
előkerülnek, itt a lényeg.

**Formalizálás.** „Minden A B”: \`∀x(A(x) → B(x))\`, **implikációval**! „Van A, ami B”:
\`∃x(A(x) ∧ B(x))\`, **konjunkcióval**! Példák (gy2):
„Aki mer, az nyer”: \`∀x(M(x) → N(x))\`. „Nincsen rózsa tövis nélkül”: \`¬∃x(R(x) ∧ ¬T(x))\`.
„Nem mind arany, ami fénylik”: \`¬∀x(F(x) → A(x))\`.

**Fontos törvények:** \`¬∀xA ∼ ∃x¬A\`, \`¬∃xA ∼ ∀x¬A\`. Ha \`x\` nem szabad \`A\`-ban:
\`A ∧ ∀xB ∼ ∀x(A ∧ B)\` (ugyanígy \`∨\`, \`∃\` esetén), valamint \`A → ∀xB ∼ ∀x(A → B)\`, de **vigyázat:**
\`∀xB → A ∼ ∃x(B → A)\` és \`∃xB → A ∼ ∀x(B → A)\`, mert a \`→\` **előtagjából** kihozott kvantor átfordul!

**Prenex alak:** minden kvantor elöl van. Recept: (1) nevezd át a kötött változókat, hogy mind
különbözzön; (2) a fenti törvényekkel hozd ki a kvantorokat; (3) a magot (mátrixot) hozd KNF-re.
**Skolemizáció:** minden \`∃y\`-t elhagysz, \`y\` helyére egy új függvényt írsz, amelynek argumentumai az
**előtte álló** \`∀\`-os változók (ha nincs ilyen, új konstanst).`,
    exercises: [
      {
        prompt: `A kidolgozott példa interpretációjában (\`U = {0, 1, 2}\`, \`R(u, v) = i\` ⟺ \`u + v ≤ 2\`) határozd meg és indokold:
(a) \`∃x∀y¬R(x, y)\`  (b) \`∃y∀xR(x, y)\`  (c) \`∀x∀y(R(x, y) → R(y, x))\``,
        hint: `Használd a fenti táblázatot. (a): van-e csupa \`h\` sor? (b): van-e csupa \`i\` oszlop?
(c): szimmetrikus-e a reláció?`,
        solution: `(a) **h.** Nincs csupa \`h\` sor: minden sorban a \`v = 0\` oszlop \`i\` (\`u + 0 ≤ 2\`), így minden
\`x ↦ u\` variánsnál \`∀y¬R(x, y)\` hamis (az \`y ↦ 0\` ellenpélda).

(b) **i.** Tanú: \`y ↦ 0\`. A \`v = 0\` **oszlop** csupa \`i\`: \`u + 0 ≤ 2\` mindhárom \`u\`-ra igaz, tehát
\`|∀xR(x, y)|^(I, y↦0) = i\`.

(c) **i.** A reláció szimmetrikus, mert \`u + v = v + u\`: ha \`R(x, y) = i\`, akkor \`R(y, x) = i\` is. Az implikáció
tehát egyik \`(x, y)\` párra sem \`i → h\`, így mind a 9 variánsban igaz.`,
      },
      {
        prompt: `\`U = {0, 1, 2}\`, \`R(u, v) = i\` ⟺ \`u < v\`. Határozd meg indoklással:
(a) \`∀x∃yR(x, y)\`  (b) \`∃x∀y¬R(y, x)\`  (c) \`∃x∃y(R(x, y) ∧ R(y, x))\`  (d) \`∀x∃y(R(x, y) ∨ R(y, x))\``,
        hint: `Táblázat: az \`u\` sorban azoknál a \`v\` oszlopoknál van \`i\`, amelyek nagyobbak \`u\`-nál.`,
        solution: `| \`R\` | 0 | 1 | 2 |
|---|---|---|---|
| **0** | h | i | i |
| **1** | h | h | i |
| **2** | h | h | h |

(a) **h.** Ellenpélda: \`x ↦ 2\`, a 2-es sor csupa \`h\` (nincs 2-nél nagyobb elem \`U\`-ban).

(b) **i.** Tanú: \`x ↦ 0\`. \`∀y¬R(y, 0)\`: a 0-s **oszlop** csupa \`h\`, tehát minden \`y\`-ra \`¬R(y, 0) = i\`
(nincs 0-nál kisebb elem).

(c) **h.** Egyszerre \`x < y\` és \`y < x\` sosem teljesül. Minden \`(x, y)\` párra hamis.

(d) **i.** Minden \`x\`-hez jó egy tőle különböző \`y\`: \`x ↦ 0\`: \`y ↦ 1\` (\`0 < 1\`); \`x ↦ 1\`: \`y ↦ 2\`;
\`x ↦ 2\`: \`y ↦ 0\` (mert \`R(0, 2) = i\`, és ez a \`R(y, x)\` tag).`,
      },
      {
        prompt: `\`U = {1, 2, 3, 4}\`, \`P(u, v) = i\` ⟺ \`u\` osztója \`v\`-nek. Határozd meg indoklással:
(a) \`∃x∀yP(x, y)\`  (b) \`∃y∀xP(x, y)\`  (c) \`∀x∃y(P(x, y) ∧ ¬P(y, x))\`  (d) \`∃x∃y(¬P(x, y) ∧ ¬P(y, x))\``,
        solution: `| \`P\` | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **1** | i | i | i | i |
| **2** | h | i | h | i |
| **3** | h | h | i | h |
| **4** | h | h | h | i |

(a) **i.** Tanú \`x ↦ 1\`: az 1 minden számnak osztója (csupa \`i\` sor).

(b) **h.** Nincs csupa \`i\` oszlop, hiszen nincs olyan szám \`U\`-ban, amelynek 1, 2, 3, 4 mind osztója
(ehhez 12 többszöröse kellene). Például \`y ↦ 4\`: \`x ↦ 3\` ellenpélda.

(c) **h.** Ellenpélda: \`x ↦ 3\`. Olyan \`y\` kellene, amire \`3 | y\`, de \`y ∤ 3\`. \`U\`-ban csak \`y = 3\`
többszöröse a 3-nak, de \`3 | 3\`. Tehát nincs ilyen \`y\`. (Az \`x ↦ 4\` is ellenpélda.)

(d) **i.** Tanú: \`x ↦ 2, y ↦ 3\`: \`2 ∤ 3\` és \`3 ∤ 2\`.`,
      },
      {
        prompt: `\`U = {0, 1}\`, \`R(u, v) = i\` ⟺ \`u ≠ v\`. Számold ki \`∀x∃yR(x, y)\` és \`∃y∀xR(x, y)\` értékét! Mit mutat ez
a kvantorok sorrendjéről?`,
        solution: `Táblázat: \`R(0, 0) = h, R(0, 1) = i, R(1, 0) = i, R(1, 1) = h\`.

* \`∀x∃yR(x, y)\` = **i**: \`x ↦ 0\`-hoz jó \`y ↦ 1\`, \`x ↦ 1\`-hez jó \`y ↦ 0\`.
* \`∃y∀xR(x, y)\` = **h**: nincs csupa \`i\` oszlop. \`y ↦ 0\` esetén az \`x ↦ 0\`, \`y ↦ 1\` esetén az \`x ↦ 1\`
  ellenpélda.

Tanulság: a \`∀x∃y\` és az \`∃y∀x\` **nem** ekvivalens. A \`∀x∃y\`-nál minden \`x\` más \`y\`-t választhat.`,
      },
      {
        prompt: `gy2, 12. példa folytatása (\`U = {0, 1, 2}\`, \`P^I = {(0,1), (0,2), (2,1), (2,2)}\`, \`Q^I = {0, 2}\`,
\`f^I\` = összeadás mod 3, \`a ↦ 0\`, \`b ↦ 1\`). Készítsd el az értéktáblát:
(a) \`∃yP(x, y) → ∀yP(f(y, y), b)\` (szabad változó: \`x\`)
(b) \`(∀x(P(a, y) ∨ Q(x)) → ¬∀x∃yP(x, y)) ∧ P(f(y, y), b)\` (szabad változó: \`y\`)`,
        hint: `Először a zárt (szabad változó nélküli) részformulákat számold ki egyszer: \`∀yP(f(y, y), b)\` és
\`∀x∃yP(x, y)\`. \`f(y, y) = 2y mod 3\`: 0 ↦ 0, 1 ↦ 2, 2 ↦ 1.`,
        solution: `**Zárt részek:**
* \`∀yP(f(y, y), b)\`: \`y ↦ 0\`: \`P(0, 1) = i\`; \`y ↦ 1\`: \`P(2, 1) = i\`; \`y ↦ 2\`: \`P(1, 1) = h\`. Tehát **h**.
* \`∀x∃yP(x, y)\`: az \`x ↦ 1\` sor csupa \`h\`. Tehát **h**, és így \`¬∀x∃yP(x, y) = i\`.

**(a)** \`∃yP(x, y) → h\`, vagyis az érték \`¬∃yP(x, y)\`:

| x | ∃yP(x, y) | érték |
|---|---|---|
| 0 | i (y = 1) | **h** |
| 1 | h | **i** |
| 2 | i (y = 1) | **h** |

**(b)** Az implikáció utótagja \`¬∀x∃yP(x, y) = i\`, így az implikáció **mindig \`i\`**. Az érték tehát
\`P(f(y, y), 1)\`:

| y | f(y, y) | P(f(y,y), 1) | érték |
|---|---|---|---|
| 0 | 0 | P(0,1) = i | **i** |
| 1 | 2 | P(2,1) = i | **i** |
| 2 | 1 | P(1,1) = h | **h** |`,
      },
      {
        prompt: `\`U = {1, 2, 3}\`, \`R(u, v) = i\` ⟺ \`u + v\` páros, \`f(u) = 4 − u\`, \`c ↦ 2\`. Határozd meg:
(a) \`∀xR(x, f(x))\`  (b) \`∃x¬R(x, c)\`  (c) \`∀x∃y¬R(x, y)\``,
        solution: `\`f\`: 1 ↦ 3, 2 ↦ 2, 3 ↦ 1. \`R\` táblázata: \`i\`, ha azonos paritásúak.

| \`R\` | 1 | 2 | 3 |
|---|---|---|---|
| **1** | i | h | i |
| **2** | h | i | h |
| **3** | i | h | i |

(a) **i.** \`x ↦ 1\`: \`R(1, 3)\`, 4 páros, \`i\`; \`x ↦ 2\`: \`R(2, 2)\`, 4, \`i\`; \`x ↦ 3\`: \`R(3, 1)\`, 4, \`i\`.
Mind a három variáns igaz.

(b) **i.** Tanú \`x ↦ 1\`: \`R(1, 2)\`, 3 páratlan, tehát \`¬R(1, 2) = i\`.

(c) **i.** Minden sorban van \`h\`: \`x ↦ 1\`: \`y ↦ 2\`; \`x ↦ 2\`: \`y ↦ 1\`; \`x ↦ 3\`: \`y ↦ 2\`.`,
      },
      {
        prompt: `Formalizáld (a predikátumokat te vezesd be):
(a) Minden ember halandó. Szókratész ember. Szókratész halandó.
(b) A fiúk magasabbra nőnek, mint az apjuk.
(c) Van olyan személy, akinél Péter magasabb.`,
        solution: `(a) \`E(x)\`: x ember, \`H(x)\`: x halandó, \`s\`: Szókratész. \`∀x(E(x) → H(x))\`, \`E(s)\`, \`H(s)\`.

(b) \`M(x, y)\`: x magasabb, mint y, \`f(x)\`: x apja. \`∀xM(x, f(x))\`.
(Függvény nélkül, \`A(y, x)\`: y az x apja: \`∀x∀y(A(y, x) → M(x, y))\`.)

(c) \`p\`: Péter. \`∃yM(p, y)\`.`,
      },
      {
        prompt: `Hozd prenex alakra, majd Skolem-normálformára: \`∀x(P(x) → Q(x)) → (∀xP(x) → ∀xQ(x))\` (gy2, 14–15. példa)`,
        hint: `Előbb nevezd át: \`∀x(P(x) → Q(x)) → (∀yP(y) → ∀zQ(z))\`. A \`→\` előtagjából kihozott \`∀\` \`∃\`-re
fordul!`,
        solution: `\`\`\`text
∀x(P(x) → Q(x)) → (∀yP(y) → ∀zQ(z))                        [átnevezés]
∼  ∀x(P(x) → Q(x)) → ∃y(P(y) → ∀zQ(z))                     [∀yB → A ∼ ∃y(B → A)]
∼  ∀x(P(x) → Q(x)) → ∃y∀z(P(y) → Q(z))                     [A → ∀zB ∼ ∀z(A → B)]
∼  ∃x((P(x) → Q(x)) → ∃y∀z(P(y) → Q(z)))                   [∀xB → A ∼ ∃x(B → A)]
∼  ∃x∃y∀z((P(x) → Q(x)) → (P(y) → Q(z)))                   [A → ∃y.. , A → ∀z..]
\`\`\`
A mag KNF-je: \`¬(¬P(x) ∨ Q(x)) ∨ ¬P(y) ∨ Q(z) ∼ (P(x) ∧ ¬Q(x)) ∨ ¬P(y) ∨ Q(z)
∼ (P(x) ∨ ¬P(y) ∨ Q(z)) ∧ (¬Q(x) ∨ ¬P(y) ∨ Q(z))\`.

**Prenex KNF:** \`∃x∃y∀z((P(x) ∨ ¬P(y) ∨ Q(z)) ∧ (¬Q(x) ∨ ¬P(y) ∨ Q(z)))\`

**Skolemizáció:** \`∃x\` és \`∃y\` előtt nincs \`∀\`, ezért új konstansok jönnek: \`x ↦ a\`, \`y ↦ b\`:
\`∀z((P(a) ∨ ¬P(b) ∨ Q(z)) ∧ (¬Q(a) ∨ ¬P(b) ∨ Q(z)))\``,
      },
    ],
  },
  {
    slug: "aszimptotika",
    title: `5. Aszimptotika — O, Ω, Θ a határérték-módszerrel (5. feladattípus)`,
    summary: `A ZH 5. feladattípusa: melyik O / Ω állítás igaz három függvényre? A definíciók, a hányados-határérték módszer, a nagyságrendi sorrend, és hogyan kezeld a „csúnya” kitevőket.`,
    status: "complete",
    body: `> **Jelölés:** a kitevőt \`^\`-val írjuk: \`n^(1/100)\` = n a 1/100-on, \`2^(n/100)\` = 2 az n/100-on.

## 1. A definíciók

Legyenek \`f, g : ℕ → ℝ⁺₀\`.

| Jelölés | Jelentés | „Olvasat” |
|---|---|---|
| \`f(n) = O(g(n))\` | ∃ \`c > 0\`, ∃ \`N\`: ∀ \`n ≥ N\`: \`f(n) ≤ c · g(n)\` | f **legfeljebb** olyan gyors, mint g („≤”) |
| \`f(n) = Ω(g(n))\` | ∃ \`c > 0\`, ∃ \`N\`: ∀ \`n ≥ N\`: \`f(n) ≥ c · g(n)\` | f **legalább** olyan gyors, mint g („≥”) |
| \`f(n) = Θ(g(n))\` | ∃ \`c1, c2 > 0\`, ∃ \`N\`: ∀ \`n ≥ N\`: \`c1·g(n) ≤ f(n) ≤ c2·g(n)\` | **ugyanolyan** gyors („=”) |

Hasznos összefüggések:

* \`f = O(g)\` ⟺ \`g = Ω(f)\` (a kettő ugyanazt állítja, csak fordítva).
* \`f = Θ(g)\` ⟺ \`f = O(g)\` **és** \`f = Ω(g)\`.
* Tranzitivitás: \`f = O(g)\` és \`g = O(h)\` esetén \`f = O(h)\` (ugyanígy Ω-ra és Θ-ra).
* \`f + g = Θ(max(f, g))\`: egy összegben **csak a leggyorsabb tag számít**.
* Konstans szorzó nem számít: \`2^100 · n = Θ(n)\`, \`100 · n^2 = Θ(n^2)\`.

## 2. A fő eszköz: a hányados határértéke (gy3, 7. példa)

Számold ki \`lim f(n)/g(n)\`-t (n → ∞):

| \`f(n)/g(n) →\` | Következmény |
|---|---|
| **0** | \`f = O(g)\`, de \`f ≠ Ω(g)\` (tehát \`g = Ω(f)\`, \`g ≠ O(f)\`): **g nő gyorsabban** |
| **c**, ahol \`0 < c < ∞\` | \`f = Θ(g)\` (tehát O és Ω is, mindkét irányban) |
| **+∞** | \`f = Ω(g)\`, de \`f ≠ O(g)\`: **f nő gyorsabban** |

### A ZH-recept a „melyik igaz a 4 állításból” feladatra

1. Számold ki \`f/g\`-t és \`f/h\`-t, egyszerűsíts (vond össze a hatványokat, a konstansokat emeld ki).
2. Határozd meg a határértéket: 0, pozitív konstans vagy ∞.
3. Olvasd ki a táblázatból mind a négy állítást, és indoklásként írd le a határértéket.

## 3. Mi nő gyorsabban? A szabályok

Nagyságrendi sorrend (a \`≺\` jelentése: „lassabban nő”):

\`\`\`text
konst ≺ log log n ≺ log n ≺ √n ≺ n ≺ n·log n ≺ n² ≺ n²·log n ≺ n³ ≺ 2ⁿ ≺ 3ⁿ ≺ n! ≺ nⁿ
\`\`\`

A határértékek, amikre visszavezetsz:

| Összehasonlítás | Eredmény |
|---|---|
| \`n^a / n^b\`, ha \`a < b\` | → 0 (a nagyobb kitevő nyer) |
| \`(log n)^k / n^ε\` (bármely \`k\`, és bármely \`ε > 0\`) | → 0 (**bármely** pozitív hatvány legyőzi a log bármely hatványát) |
| \`n^k / cⁿ\`, ha \`c > 1\` | → 0 (az exponenciális legyőzi a polinomot) |
| \`cⁿ / dⁿ = (c/d)ⁿ\`, ha \`c < d\` | → 0 (nagyobb alap nyer) |
| \`cⁿ / n!\` | → 0 |
| \`n! / nⁿ\` | → 0 |
| \`log_a n / log_b n\` | = \`log_b a\` konstans, tehát **Θ** (a log alapja nem számít) |
| \`log(n!)\` | \`= Θ(n log n)\` |
| \`(n + a)^b\` | \`= Θ(n^b)\` (gy3, 3. példa) |

### Csúnya kitevők kezelése (ez kell a ZH-hoz!)

* \`2^(n/100) = (2^(1/100))ⁿ ≈ 1,007ⁿ\`: ez **exponenciális** (alapja > 1), legyőz **minden** polinomot,
  például \`n^100\`-at is. Ugyanígy \`2^(n+1) = 2·2ⁿ = Θ(2ⁿ)\`, de \`2^(2n) = 4ⁿ ≠ O(2ⁿ)\`.
* \`n^(n/100) = 2^((n/100)·log₂ n)\`: a kitevő \`n log n\` nagyságrendű, ezért ez **minden** \`cⁿ\`-nél
  gyorsabb („szuperexponenciális”).
* \`n^(1/100)\`: polinom, csak nagyon lassú. Mégis legyőz minden \`(log n)^k\`-t.
* **Általános trükk:** írd mindkettőt \`2^(valami)\` alakba, és hasonlítsd össze a kitevőket. Ha a
  kitevők különbsége → +∞, akkor a hányados → ∞. Ha → −∞, akkor → 0.

---

## 4. Kidolgozott példa

> **Feladat.** Legyen \`f(n) = 3^100 · n^50\`, \`g(n) = 1,01ⁿ\` és \`h(n) = 2^(√n)\`.
> Melyek igazak: \`f = Ω(g)\`, \`g = O(h)\`, \`f = O(h)\`, \`h = O(g)\`? Röviden indokold!

**Mit látunk?** \`f\` lényegében \`n^50\` (a \`3^100\` csak konstans szorzó!), \`g\` exponenciális
(alapja \`1,01 > 1\`), \`h\` a kettő között van: a kitevője \`√n\`, ami gyorsabban nő, mint \`log n\`, de
lassabban, mint \`n\`. Várható sorrend: \`f ≺ h ≺ g\`.

**Írjuk mindhármat \`2^(valami)\` alakba:**

\`\`\`text
f(n) = 3^100 · 2^(50 · log₂ n)
g(n) = 2^(n · log₂ 1,01)          (log₂ 1,01 ≈ 0,0144 > 0, tehát a kitevő ~ c · n)
h(n) = 2^(√n)
\`\`\`

**f / h:** a kitevők különbsége \`50 · log₂ n − √n → −∞\` (a \`√n\` legyőzi a logaritmust), ezért
\`f/h → 0\`.

**h / g:** a kitevők különbsége \`√n − 0,0144 · n → −∞\` (a lineáris tag legyőzi a gyököt), ezért
\`h/g → 0\`.

**f / g:** ebből következik: \`f/g = (f/h) · (h/g) → 0 · 0 = 0\`.

**Kiolvasás:**

| Állítás | Igaz? | Miért |
|---|---|---|
| \`f = Ω(g)\` | **hamis** | \`f/g → 0\`, tehát f lassabb |
| \`g = O(h)\` | **hamis** | \`h/g → 0\` ⟹ \`g/h → ∞\`, g gyorsabb |
| \`f = O(h)\` | **igaz** | \`f/h → 0\` |
| \`h = O(g)\` | **igaz** | \`h/g → 0\` |

> **Csapda:** a \`3^100\` óriási konstans, de **nem számít**: a hányadosban kiemelhető. A \`1,01ⁿ\` pedig
> „lassúnak” látszik, mégis legyőz minden polinomot és a \`2^(√n)\`-t is, mert az alapja nagyobb 1-nél.## 5. Bizonyítás a definícióval (ha „közvetlenül a definícióval” kérik)

Ilyenkor konkrét \`c\`-t és \`N\`-et kell mutatni.

**Példa (gy3, 1. példa):** \`5n + 6 = O(3n² + 2)\`. Ha \`n ≥ 1\`, akkor
\`5n + 6 ≤ 5n² + 6 < 9n² + 6 = 3(3n² + 2)\`, tehát **\`c = 3, N = 1\`** megfelel.

**Ellenkező irány**, hogy \`3n² + 2 ≠ O(5n + 6)\`: ha \`3n² + 2 ≤ c(5n + 6)\` teljesülne minden \`n ≥ N\`-re,
akkor \`(3n² + 2)/(5n + 6) ≤ c\` is teljesülne, de a bal oldal → ∞, ami ellentmondás.

**Példa (gy3, 2. példa):** \`2^(n+1) = O(2ⁿ)\`, mert \`2^(n+1) = 2·2ⁿ ≤ 2·2ⁿ\`, tehát \`c = 2, N = 1\`.
Viszont \`2^(2n) ≠ O(2ⁿ)\`: ha \`2^(2n) = 2ⁿ·2ⁿ ≤ c·2ⁿ\` lenne, akkor \`2ⁿ ≤ c\` minden nagy \`n\`-re, ami
ellentmondás.`,
    exercises: [
      {
        prompt: `Legyen \`f(n) = n²\` és \`g(n) = n · log₂ n\`. Melyik igaz: \`f = O(g)\`, \`f = Ω(g)\`, \`f = Θ(g)\`?`,
        solution: `\`f/g = n² / (n log n) = n / log n → ∞\`. Tehát **\`f = Ω(g)\`** igaz, \`f = O(g)\` hamis, \`f = Θ(g)\` hamis.`,
      },
      {
        prompt: `**ZH-szintű.** Legyen \`f(n) = 1000 · n^(1/10)\`, \`g(n) = (log₂ n)^100\` és \`h(n) = 2^(√n)\`.
Melyek igazak: \`f = Ω(g)\`, \`g = Ω(f)\`, \`f = O(h)\`, \`h = O(f)\`?`,
        hint: `\`(log n)^k / n^ε → 0\` **bármely** \`k\`-ra és \`ε > 0\`-ra, még \`k = 100\`, \`ε = 1/10\` esetén is.
\`h\`-nál írd \`n^(1/10)\`-et \`2^((1/10)·log₂ n)\` alakba.`,
        solution: `* \`f/g = 1000 · n^(1/10) / (log₂ n)^100 → ∞\` (egy pozitív hatvány legyőzi a log bármely hatványát,
  még ha ez csak nagyon nagy \`n\`-re látszik is).
* \`f/h = 1000 · 2^((1/10)·log₂ n) / 2^(√n) = 1000 · 2^((1/10)·log₂ n − √n) → 0\`, mert
  \`√n − (1/10)·log₂ n → ∞\`.

| Állítás | Igaz? |
|---|---|
| \`f = Ω(g)\` | **igaz** (\`f/g → ∞\`) |
| \`g = Ω(f)\` | **hamis** |
| \`f = O(h)\` | **igaz** (\`f/h → 0\`) |
| \`h = O(f)\` | **hamis** |`,
      },
      {
        prompt: `**ZH-szintű, csapdás.** Legyen \`f(n) = n³ · 2^(n/2)\`, \`g(n) = 10^6 · n^50\` és \`h(n) = 3^(n/3)\`.
Melyek igazak: \`f = Ω(g)\`, \`g = Ω(f)\`, \`f = O(h)\`, \`h = O(f)\`?`,
        hint: `\`2^(n/2) = (√2)ⁿ ≈ 1,414ⁿ\` és \`3^(n/3) = (∛3)ⁿ ≈ 1,442ⁿ\`. Melyik alap a nagyobb?`,
        solution: `* \`f/g = n³ · 2^(n/2) / (10^6 · n^50) = 10^(−6) · (√2)ⁿ / n^47 → ∞\` (exponenciális vs. polinom).
* \`f/h = n³ · (√2)ⁿ / (∛3)ⁿ = n³ · (√2 / ∛3)ⁿ\`. Mivel \`√2 ≈ 1,4142 < 1,4422 ≈ ∛3\`, a hányados
  \`q = √2/∛3 < 1\`, és \`n³ · qⁿ → 0\` (az exponenciális fogyás legyőzi a polinomot).
  Ellenőrzés hatodik hatvánnyal: \`(√2)⁶ = 8 < 9 = (∛3)⁶\`.

| Állítás | Igaz? |
|---|---|
| \`f = Ω(g)\` | **igaz** |
| \`g = Ω(f)\` | **hamis** |
| \`f = O(h)\` | **igaz** |
| \`h = O(f)\` | **hamis** |`,
      },
      {
        prompt: `Hasonlítsd össze \`f(n) = 7 · 2ⁿ + n³\` és \`g(n) = 3ⁿ + 2n\` aszimptotikus növekedését! (gy3, 11. példa)`,
        solution: `\`f/g = (7 · 2ⁿ + n³) / (3ⁿ + 2n)\`. Osszunk \`3ⁿ\`-nel:
\`= (7 · (2/3)ⁿ + n³/3ⁿ) / (1 + 2n/3ⁿ) → (0 + 0)/(1 + 0) = 0\`.

Tehát \`f = O(g)\`, de \`f ≠ Ω(g)\`: **g nő gyorsabban**. (Másképp: \`f = Θ(2ⁿ)\` és \`g = Θ(3ⁿ)\`, és
\`2ⁿ ≺ 3ⁿ\`.)`,
      },
      {
        prompt: `Igaz vagy hamis? Röviden indokold!
(a) \`2^(n+5) = Θ(2ⁿ)\`  (b) \`2^(2n) = O(2ⁿ)\`  (c) \`log₂(n²) = Θ(log₂ n)\`  (d) \`(n + 3)^5 = Θ(n^5)\`
(e) \`n^100 = O(1,01ⁿ)\`  (f) \`√n = O((log n)³)\`  (g) \`log₂ n = Θ(log₁₀ n)\`  (h) \`n! = O(nⁿ)\``,
        solution: `(a) **igaz**: \`2^(n+5) = 32 · 2ⁿ\`, a hányados 32.
(b) **hamis**: \`2^(2n)/2ⁿ = 2ⁿ → ∞\`.
(c) **igaz**: \`log(n²) = 2 log n\`, a hányados 2.
(d) **igaz**: \`((n+3)/n)^5 → 1\`.
(e) **igaz**: az exponenciális (alap > 1) legyőz minden polinomot, \`n^100 / 1,01ⁿ → 0\`.
(f) **hamis**: \`(log n)³ / √n → 0\`, tehát fordítva igaz: \`(log n)³ = O(√n)\`.
(g) **igaz**: \`log₂ n / log₁₀ n = log₂ 10 ≈ 3,32\` konstans.
(h) **igaz**: \`n!/nⁿ = (1/n)(2/n)⋯(n/n) ≤ 1/n → 0\`.`,
      },
      {
        prompt: `Rendezd aszimptotikus nagyságrend szerint növekvő sorrendbe (gy3, 12. példa):
(a) \`log₃(n!)\`  (b) \`n^1,03 + 3√n\`  (c) \`n^0,07 + 2 ln n\`  (d) \`(3/5)ⁿ\`  (e) \`100 n^100 + 3ⁿ\`
(f) \`3ⁿ + 2ⁿ\`  (g) \`4 log₁₇(n + 5)\`  (h) \`n!\`  (i) \`n^(3/2)\``,
        hint: `Mindegyiket egyszerűsítsd a leggyorsabb tagjára (\`Θ\`), utána rendezz.`,
        solution: `Egyszerűsítve: (d) → 0 (fogyó!), (g) \`Θ(log n)\`, (c) \`Θ(n^0,07)\`, (a) \`Θ(n log n)\`, (b) \`Θ(n^1,03)\`,
(i) \`n^1,5\`, (e) \`Θ(3ⁿ)\`, (f) \`Θ(3ⁿ)\`, (h) \`n!\`.

**Sorrend:** \`d ≺ g ≺ c ≺ a ≺ b ≺ i ≺ e ≈ f ≺ h\`

Kényes pontok: \`n log n ≺ n^1,03\`, mert \`n^0,03 / log n → ∞\`. Az (e) és az (f) azonos nagyságrendű
(\`Θ(3ⁿ)\`), mert a \`100 n^100\` elhanyagolható \`3ⁿ\` mellett.`,
      },
      {
        prompt: `Bizonyítsd **a definíció alapján** (adj meg \`c1, c2, N\` konstansokat), hogy \`3n² + 5n + 2 = Θ(n²)\`!`,
        solution: `* **Alsó becslés:** \`3n² + 5n + 2 ≥ 3n²\` minden \`n\`-re, tehát \`c1 = 3\`.
* **Felső becslés:** \`n ≥ 1\` esetén \`5n ≤ 5n²\` és \`2 ≤ 2n²\`, tehát
  \`3n² + 5n + 2 ≤ 3n² + 5n² + 2n² = 10n²\`, vagyis \`c2 = 10\`.

Tehát \`c1 = 3, c2 = 10, N = 1\` mellett \`3n² ≤ 3n² + 5n + 2 ≤ 10n²\` minden \`n ≥ 1\`-re. ∎`,
      },
      {
        prompt: `Bizonyítsd, hogy ha \`f(n) = O(g(n))\` és \`g(n) = O(h(n))\`, akkor \`f(n) = O(h(n))\`! (gy3, 5. példa)`,
        solution: `\`f = O(g)\` miatt ∃ \`c1 > 0, N1\`: \`f(n) ≤ c1 g(n)\` minden \`n ≥ N1\`-re.
\`g = O(h)\` miatt ∃ \`c2 > 0, N2\`: \`g(n) ≤ c2 h(n)\` minden \`n ≥ N2\`-re.
Ekkor minden \`n ≥ max(N1, N2)\`-re \`f(n) ≤ c1 g(n) ≤ c1 c2 h(n)\`, és \`c1 c2 > 0\`.
Tehát \`c = c1 c2\`, \`N = max(N1, N2)\` megfelel, így \`f = O(h)\`. ∎`,
      },
      {
        prompt: `Legyen \`f(n) = 5 · n · log₂ n\`, \`g(n) = n^(3/2)\`, \`h(n) = 2^(log₂ n)\`. Melyek igazak:
\`f = Ω(g)\`, \`g = Ω(f)\`, \`f = O(h)\`, \`h = O(f)\`?`,
        hint: `\`2^(log₂ n) = n\`!`,
        solution: `\`h(n) = n\`.
* \`f/g = 5 log n / n^(1/2) → 0\`, tehát \`f = Ω(g)\` **hamis**, \`g = Ω(f)\` **igaz**.
* \`f/h = 5 log₂ n → ∞\`, tehát \`f = O(h)\` **hamis**, \`h = O(f)\` **igaz**.`,
      },
    ],
  },
  {
    slug: "turing-gep",
    title: `6. Egyszalagos Turing-gép — tervezés, δ, konfigurációk (6. feladattípus)`,
    summary: `A ZH 6. feladattípusa: Turing-gép, amely eldönt egy nyelvet (pl. aⁿb²ⁿ). Definíció, működés, konfigurációsorozat, az „áthúzásos” tervezési technika, és a teljes mintamegoldás állapotdiagrammal.`,
    status: "complete",
    body: `## 1. A definíció (ezt a hetest le kell tudni írni)

\`M = (Q, Σ, Γ, δ, q0, qaccept, qreject)\`, ahol

* \`Q\`: az **állapotok** véges halmaza;
* \`Σ\`: az **inputábécé**, amely **nem** tartalmazza a \`⊔\` (üres) jelet;
* \`Γ\`: a **szalagábécé**, ahol \`⊔ ∈ Γ\` és \`Σ ⊆ Γ\` (ide kerülnek a segédjelek is, pl. \`A, B, x\`);
* \`δ : Q × Γ → Q × Γ × {L, R, S}\`: az **átmenetfüggvény** (új állapot, írt jel, fejmozgás:
  balra / jobbra / helyben);
* \`q0\`: a **kezdőállapot**, \`qaccept\`: az **elfogadó**, \`qreject\`: az **elutasító** állapot
  (\`qaccept ≠ qreject\`).

## 2. Hogyan számol?

* Az input \`w = w1…wn\` a szalag első \`n\` cellájában van, utána csupa \`⊔\`. A fej a **legbaloldalibb**
  cellán áll, az állapot \`q0\`.
* Minden lépésben: az aktuális állapot és az olvasott jel alapján \`δ\` megmondja, mit írjon, merre
  lépjen és melyik állapotba menjen.
* Ha a fej a **bal szélen** áll és \`L\`-t kap, **helyben marad** (nem esik le a szalagról).
* A gép **megáll**, amint \`qaccept\`-be vagy \`qreject\`-be lép. Ha egyikbe sem ér, **sosem áll meg**.

### Konfiguráció: \`u q v\`

A konfiguráció egy \`u q v\` szó: \`u\` a fej **előtti** szalagrész, \`q\` az állapot, \`v\` a fejtől kezdődő
rész. **A fej \`v\` első jelén áll.** Például \`AaBq₂bbb\`: a szalag \`AaBbbb\`, az állapot \`q₂\`, és a fej
a 4. cellán (az első \`b\`-n) áll.

Lépések (\`a, b, c ∈ Γ\`):

\`\`\`text
u a qᵢ b v  ⊢  u qⱼ a c v      ha δ(qᵢ, b) = (qⱼ, c, L)     (balra)
u a qᵢ b v  ⊢  u a c qⱼ v      ha δ(qᵢ, b) = (qⱼ, c, R)     (jobbra)
qᵢ b v      ⊢  qⱼ c v          ha δ(qᵢ, b) = (qⱼ, c, L)     (bal szélen: helyben marad)
\`\`\`

### Elfogad, felismer, eldönt

* \`M\` **elfogadja** \`w\`-t, ha a \`q0 w\` kezdőkonfigurációból elérhető egy \`qaccept\`-es konfiguráció.
  \`L(M)\` az elfogadott szavak halmaza.
* Egy nyelv **Turing-felismerhető** (rekurzívan felsorolható), ha van olyan TM, amelyre \`L(M) = L\`.
  A nem-elemeken a gép végtelen ciklusba is futhat.
* Egy nyelv **eldönthető** (rekurzív), ha van olyan TM, amely **minden** inputon **megáll**, és pontosan
  \`L\` elemeit fogadja el. Egy ilyen gép neve **eldöntő** (decider). **A ZH ilyet kér: „eldönti”!**

## 3. Az állapotdiagram jelölései

* Egy él \`qᵢ\`-ből \`qⱼ\`-be \`a → b, R\` címkével azt jelenti, hogy \`δ(qᵢ, a) = (qⱼ, b, R)\`: \`a\`-t olvas,
  \`b\`-t ír, jobbra lép. Ha \`a → a, R\`, akkor nem változtat a szalagon, csak továbblép.
* Egy élen több címke is lehet (több jelre ugyanaz történik).
* **Konvenció:** a hiányzó (állapot, jel) párok mind **\`qreject\`-be** mennek. Ezt a diagramon egy
  \`∀ más → qreject\` felirattal jelezd, így nem kell minden hibát külön berajzolni.

## 4. Tervezési technika: áthúzás és cikk-cakk

A tipikus ZH-nyelv \`aⁿbⁿ\`, \`aⁿb²ⁿ\`, \`aⁿbⁿcⁿ\`, \`w#w\` típusú, ahol **darabszámokat kell párosítani**. A
recept:

1. **Áthúzás:** az első még nem jelölt \`a\`-t cseréld le **nagybetűre** (\`a → A\`). Ez jelzi, hogy
   már „elhasználtad”.
2. **Keresés jobbra:** haladj jobbra a nem érdekes jeleken (\`a\`, már áthúzott \`B\`), amíg meg nem
   találod a párját. Azt is húzd át (\`b → B\`). \`aⁿb²ⁿ\`-nél **két** \`b\`-t húzol át.
3. **Vissza balra** az utolsó nagy \`A\`-ig, lépj egyet jobbra, és kezdd elölről.
4. **Ellenőrzés:** ha elfogytak az \`a\`-k (a fej \`B\`-n áll), menj végig jobbra. Csak áthúzott \`B\`
   lehet hátra, és utána \`⊔\`. Ekkor \`qaccept\`.
5. Minden más helyzet hibás input, ezért \`qreject\`.

**Miért jó ez?** A sorrendet (\`a\`-k a \`b\`-k előtt) is ellenőrzi: ha egy \`a\` a \`b\`-k mögött van, a
gép egy \`B\`-n vagy \`b\`-n át egy nem várt \`a\`-ra ér, vagy a végső ellenőrzésnél talál egy \`a\`-t, és
elutasít.

> **Ne felejtsd el az \`n = 0\` esetet!** Ha \`n ∈ ℕ\` és \`0 ∈ ℕ\`, akkor az **üres szó** is eleme a
> nyelvnek, ezért kell egy \`δ(q0, ⊔) = (qaccept, ⊔, R)\` átmenet. (A hivatalos mintamegoldás ezt
> kihagyja. Ha a ZH-n \`n ≥ 1\` a feltétel, akkor nem kell. Olvasd el figyelmesen!)

---

## 5. Kidolgozott példa: az aⁿb²ⁿ nyelv

> **Feladat.** Definiáljon egy olyan Turing-gépet, amely eldönti az \`L = {aⁿb²ⁿ | n ∈ ℕ}\` nyelvet!

**Ötlet (implementációs szintű leírás):** minden \`a\`-hoz két \`b\` tartozik. Húzz át egy \`a\`-t (\`A\`),
menj jobbra az első nem áthúzott \`b\`-ig, húzz át **két** \`b\`-t (\`B\`, \`B\`), menj vissza az \`A\`-ig, és
ismételd. Ha az \`a\`-k elfogytak, ellenőrizd, hogy csak \`B\`-k maradtak.

**A gép:** \`M = (Q, Σ, Γ, δ, q0, qaccept, qreject)\`, ahol

* \`Q = {q0, q1, q2, q3, q4, qaccept, qreject}\`,
* \`Σ = {a, b}\`, \`Γ = {a, b, A, B, ⊔}\`,
* \`δ\` a következő állapotdiagrammal adott:

![Turing-gép az aⁿb²ⁿ nyelvre](/diagrams/szamelmelet/tm-anb2n.svg)

**Ugyanez δ-táblázatban** (a ZH-n a diagram vagy a tábla is elfogadható; az üres cella \`qreject\`):

| δ | \`a\` | \`b\` | \`A\` | \`B\` | \`⊔\` |
|---|---|---|---|---|---|
| **q0** (új kör) | \`(q1, A, R)\` | | | \`(q4, B, R)\` | \`(qaccept, ⊔, R)\`\\* |
| **q1** (keresem az 1. b-t) | \`(q1, a, R)\` | \`(q2, B, R)\` | | \`(q1, B, R)\` | |
| **q2** (kell a 2. b) | | \`(q3, B, L)\` | | | |
| **q3** (vissza az A-ig) | \`(q3, a, L)\` | | \`(q0, A, R)\` | \`(q3, B, L)\` | |
| **q4** (végellenőrzés) | | | | \`(q4, B, R)\` | \`(qaccept, ⊔, R)\` |

\\* az \`n = 0\` (üres szó) miatt.

**Mit csinál az egyes állapot?**

| Állapot | Szerepe |
|---|---|
| \`q0\` | Kör eleje. \`a\`: áthúzza (\`A\`), indul jobbra (\`q1\`). \`B\`: elfogytak az \`a\`-k, jöhet a végellenőrzés (\`q4\`). |
| \`q1\` | Jobbra halad \`a\`-kon és \`B\`-ken. Az első \`b\`-t átírja \`B\`-re, és \`q2\`-be lép. |
| \`q2\` | A **következő** jelnek is \`b\`-nek kell lennie (a második \`b\`). Átírja \`B\`-re, és megfordul (\`L\`). Ha nem \`b\` jön, akkor \`qreject\`. |
| \`q3\` | Balra halad \`a\`-kon és \`B\`-ken, amíg \`A\`-t nem talál. Utána egyet jobbra lép, és vissza \`q0\`-ba. |
| \`q4\` | Csak \`B\`-k lehetnek hátra. \`⊔\`: \`qaccept\`. Bármi más (\`a\` vagy \`b\`): \`qreject\`. |

### Futtatás: konfigurációsorozatok

**\`aabbbb\` (n = 2), elfogadja:**

\`\`\`text
q₀aabbbb ⊢ Aq₁abbbb ⊢ Aaq₁bbbb ⊢ AaBq₂bbb ⊢ Aaq₃BBbb ⊢ Aq₃aBBbb ⊢ q₃AaBBbb
⊢ Aq₀aBBbb ⊢ AAq₁BBbb ⊢ AABq₁Bbb ⊢ AABBq₁bb ⊢ AABBBq₂b ⊢ AABBq₃BB ⊢ AABq₃BBB
⊢ AAq₃BBBB ⊢ Aq₃ABBBB ⊢ AAq₀BBBB ⊢ AABq₄BBB ⊢ AABBq₄BB ⊢ AABBBq₄B ⊢ AABBBBq₄⊔
⊢ AABBBB⊔qaccept
\`\`\`

**\`abbb\`, elutasítja** (egy \`b\`-vel több van):

\`\`\`text
q₀abbb ⊢ Aq₁bbb ⊢ ABq₂bb ⊢ Aq₃BBb ⊢ q₃ABBb ⊢ Aq₀BBb ⊢ ABq₄Bb ⊢ ABBq₄b ⊢ ABBqrejectb
\`\`\`

A \`q4\` állapot \`b\`-t olvas, erre nincs átmenet, ezért \`qreject\`.

**\`ab\`, elutasítja** (hiányzik a második \`b\`): \`q₀ab ⊢ Aq₁b ⊢ ABq₂⊔ ⊢ ABqreject⊔\`.

**\`ε\` (üres szó), elfogadja** a kiegészítő átmenettel: \`q₀⊔ ⊢ ⊔qaccept\`.

> **ZH-tipp:** a válaszod legyen teljes: (1) a hetes (\`Q, Σ, Γ\` felsorolva), (2) a diagram
> vagy a δ-tábla, a „\`∀ más → qreject\`” megjegyzéssel. Ha marad idő, 1–2 mondatos ötlet-leírás és
> egy rövid próbafuttatás sokat segít a javítónak.`,
    exercises: [
      {
        prompt: `Add meg a fenti gép (\`aⁿb²ⁿ\`) konfigurációsorozatát az \`abb\` és az \`aabb\` inputon! Melyiket
fogadja el?`,
        solution: `**\`abb\`, elfogadja:**
\`\`\`text
q₀abb ⊢ Aq₁bb ⊢ ABq₂b ⊢ Aq₃BB ⊢ q₃ABB ⊢ Aq₀BB ⊢ ABq₄B ⊢ ABBq₄⊔ ⊢ ABB⊔qaccept
\`\`\`
**\`aabb\`, elutasítja** (2 \`a\`-hoz 4 \`b\` kellene):
\`\`\`text
q₀aabb ⊢ Aq₁abb ⊢ Aaq₁bb ⊢ AaBq₂b ⊢ Aaq₃BB ⊢ Aq₃aBB ⊢ q₃AaBB ⊢ Aq₀aBB
⊢ AAq₁BB ⊢ AABq₁B ⊢ AABBq₁⊔ ⊢ AABBqreject⊔
\`\`\`
A második körben \`q1\` nem talál \`b\`-t, \`⊔\`-ra ér, ezért \`qreject\`.`,
      },
      {
        prompt: `Definiálj Turing-gépet, amely eldönti az \`L = {aⁿbⁿ | n ∈ ℕ}\` nyelvet! Add meg a hetest, a δ-t, és
futtasd az \`aabb\` és az \`aab\` inputon!`,
        hint: `Ugyanaz, mint a fenti gép, csak egy \`a\`-hoz **egy** \`b\`-t húzol át, így a \`q2\` („kell a 2. b”)
állapot kimarad. Az első \`b\` átírása után rögtön indulhatsz vissza balra.`,
        solution: `\`M = ({q0, q1, q2, q3, qaccept, qreject}, {a, b}, {a, b, A, B, ⊔}, δ, q0, qaccept, qreject)\`

![Turing-gép az aⁿbⁿ nyelvre](/diagrams/szamelmelet/tm-anbn.svg)

| δ | \`a\` | \`b\` | \`A\` | \`B\` | \`⊔\` |
|---|---|---|---|---|---|
| **q0** | \`(q1, A, R)\` | | | \`(q3, B, R)\` | \`(qaccept, ⊔, R)\` |
| **q1** | \`(q1, a, R)\` | \`(q2, B, L)\` | | \`(q1, B, R)\` | |
| **q2** | \`(q2, a, L)\` | | \`(q0, A, R)\` | \`(q2, B, L)\` | |
| **q3** | | | | \`(q3, B, R)\` | \`(qaccept, ⊔, R)\` |

(üres cella: \`qreject\`)

\`aabb\`: \`q₀aabb ⊢ Aq₁abb ⊢ Aaq₁bb ⊢ Aq₂aBb ⊢ q₂AaBb ⊢ Aq₀aBb ⊢ AAq₁Bb ⊢ AABq₁b ⊢ AAq₂BB ⊢ Aq₂ABB ⊢ AAq₀BB ⊢ AABq₃B ⊢ AABBq₃⊔ ⊢ AABB⊔qaccept\`

\`aab\`: \`q₀aab ⊢ Aq₁ab ⊢ Aaq₁b ⊢ Aq₂aB ⊢ q₂AaB ⊢ Aq₀aB ⊢ AAq₁B ⊢ AABq₁⊔ ⊢ AABqreject⊔\``,
      },
      {
        prompt: `Mit csinál az \`aⁿbⁿ\`-gép az \`abab\` inputon? Miért fontos, hogy \`q3\`-ban \`a\`-ra nincs átmenet?`,
        solution: `\`\`\`text
q₀abab ⊢ Aq₁bab ⊢ q₂ABab ⊢ Aq₀Bab ⊢ ABq₃ab ⊢ ABqrejectab
\`\`\`
Az első kör után \`q0\` \`B\`-t lát, tehát azt hiszi, hogy az \`a\`-k elfogytak, és végellenőrzésbe (\`q3\`)
lép. Ott egy \`a\`-ra bukkan, ami azt jelenti, hogy a szóban egy \`b\` után \`a\` jön, ez nem \`aⁿbⁿ\` alakú.
Ha \`q3\` átlépne az \`a\`-n, a gép hibásan elfogadhatna rossz sorrendű szavakat. **A végellenőrző
állapot csak a \`B\`-ket és a \`⊔\`-t engedheti át.**`,
      },
      {
        prompt: `Definiálj Turing-gépet, amely eldönti a \`{w ∈ {a, b}* | w-ben páros sok a van}\` nyelvet!`,
        hint: `Nem kell írni a szalagra! Elég két állapot, amely a paritást „jegyzi meg”, miközben jobbra halad.`,
        solution: `\`Q = {q0, q1, qaccept, qreject}\`, \`Σ = {a, b}\`, \`Γ = {a, b, ⊔}\`. Jelentés: \`q0\` = eddig páros, \`q1\` =
eddig páratlan sok \`a\`.

| δ | \`a\` | \`b\` | \`⊔\` |
|---|---|---|---|
| **q0** | \`(q1, a, R)\` | \`(q0, b, R)\` | \`(qaccept, ⊔, R)\` |
| **q1** | \`(q0, a, R)\` | \`(q1, b, R)\` | \`(qreject, ⊔, R)\` |

Példa: \`q₀abab ⊢ aq₁bab ⊢ abq₁ab ⊢ abaq₀b ⊢ ababq₀⊔ ⊢ abab⊔qaccept\`.

(Ez valójában egy véges automata. Minden reguláris nyelv eldönthető ilyen „csak jobbra olvasó” TM-mel.)`,
      },
      {
        prompt: `Definiálj Turing-gépet, amely eldönti az \`L = {aⁿbⁿcⁿ | n ∈ ℕ}\` nyelvet!`,
        hint: `Egy körben három jelet húzz át: \`a → A\`, a következő \`b → B\`, a következő \`c → C\`. A \`c\` keresése
közben a \`b\`-ken és a \`C\`-ken kell átlépni. Visszafelé mindenen átmész, amíg \`A\`-t nem találsz.`,
        solution: `\`Q = {q0, …, q4, qaccept, qreject}\`, \`Σ = {a, b, c}\`, \`Γ = {a, b, c, A, B, C, ⊔}\`.

| δ | \`a\` | \`b\` | \`c\` | \`A\` | \`B\` | \`C\` | \`⊔\` |
|---|---|---|---|---|---|---|---|
| **q0** (új kör) | \`(q1, A, R)\` | | | | \`(q4, B, R)\` | | \`(qaccept, ⊔, R)\` |
| **q1** (b-t keres) | \`(q1, a, R)\` | \`(q2, B, R)\` | | | \`(q1, B, R)\` | | |
| **q2** (c-t keres) | | \`(q2, b, R)\` | \`(q3, C, L)\` | | | \`(q2, C, R)\` | |
| **q3** (vissza) | \`(q3, a, L)\` | \`(q3, b, L)\` | | \`(q0, A, R)\` | \`(q3, B, L)\` | \`(q3, C, L)\` | |
| **q4** (ellenőrzés) | | | | | \`(q4, B, R)\` | \`(q4, C, R)\` | \`(qaccept, ⊔, R)\` |

Futás \`abc\`-n: \`q₀abc ⊢ Aq₁bc ⊢ ABq₂c ⊢ Aq₃BC ⊢ q₃ABC ⊢ Aq₀BC ⊢ ABq₄C ⊢ ABCq₄⊔ ⊢ ABC⊔qaccept\`.

\`abcc\`-n: \`… ⊢ ABCq₄c ⊢ ABCqrejectc\` (maradt egy át nem húzott \`c\`).

Miért helyes a sorrend-ellenőrzés? \`q2\` nem lép át \`a\`-n, \`q1\` nem lép át \`c\`-n, \`q4\` csak \`B\`-t és
\`C\`-t enged át. Így minden rossz sorrend elakad, és \`qreject\` lesz. (Szimulátorral az összes, legfeljebb
9 hosszú szón ellenőrizve.)`,
      },
      {
        prompt: `Definiálj Turing-gépet, amely eldönti az \`{a, b}\` feletti **palindromok** nyelvét (\`w = wᴿ\`)!`,
        hint: `Olvasd le az első jelet, töröld (\`⊔\`-ra írod), és „jegyezd meg” az állapotban (két külön ág: \`a\`-s és
\`b\`-s). Fuss el a jobb végéig, lépj vissza egyet, és ellenőrizd, hogy ugyanaz a jel áll-e ott. Ha igen,
azt is töröld, és menj vissza az elejére.`,
        solution: `\`Q = {q0, …, q5, qaccept, qreject}\`, \`Σ = {a, b}\`, \`Γ = {a, b, ⊔}\`.

| δ | \`a\` | \`b\` | \`⊔\` | szerep |
|---|---|---|---|---|
| **q0** | \`(q1, ⊔, R)\` | \`(q3, ⊔, R)\` | \`(qaccept, ⊔, R)\` | első jel leolvasása + törlése |
| **q1** | \`(q1, a, R)\` | \`(q1, b, R)\` | \`(q2, ⊔, L)\` | „a-t jegyeztem”, jobbra a végéig |
| **q2** | \`(q5, ⊔, L)\` | | \`(qaccept, ⊔, R)\` | az utolsónak \`a\`-nak kell lennie |
| **q3** | \`(q3, a, R)\` | \`(q3, b, R)\` | \`(q4, ⊔, L)\` | „b-t jegyeztem”, jobbra a végéig |
| **q4** | | \`(q5, ⊔, L)\` | \`(qaccept, ⊔, R)\` | az utolsónak \`b\`-nek kell lennie |
| **q5** | \`(q5, a, L)\` | \`(q5, b, L)\` | \`(q0, ⊔, R)\` | vissza balra az első \`⊔\`-ig |

\`q2\`/\`q4\` \`⊔\`-ra: páratlan hosszúnál a középső jel törlése után már nincs mit párosítani, tehát
\`qaccept\`.

\`aba\`: \`q₀aba ⊢ ⊔q₁ba ⊢ ⊔bq₁a ⊢ ⊔baq₁⊔ ⊢ ⊔bq₂a ⊢ ⊔q₅b ⊢ q₅⊔b ⊢ ⊔q₀b ⊢ ⊔⊔q₃⊔ ⊢ ⊔q₄⊔ ⊢ ⊔⊔qaccept\`

\`ab\`: \`q₀ab ⊢ ⊔q₁b ⊢ ⊔bq₁⊔ ⊢ ⊔q₂b ⊢ ⊔qrejectb\``,
      },
      {
        prompt: `A gyakorlat \`M2\` gépe az \`{0^(2ⁿ) | n ≥ 0}\` nyelvet dönti el (a 0-k száma 2-hatvány). Az algoritmus:
haladj végig, és húzz át minden második 0-t. Ha csak egy 0 maradt, \`accept\`. Ha több maradt, és a
számuk páratlan, \`reject\`. Különben vissza az elejére, és ismétlés. Az átmenetek:
\`δ(q1,0)=(q2,⊔,R)\`, \`δ(q2,x)=(q2,x,R)\`, \`δ(q2,⊔)=(qaccept,⊔,R)\`, \`δ(q2,0)=(q3,x,R)\`, \`δ(q3,x)=(q3,x,R)\`,
\`δ(q3,0)=(q4,0,R)\`, \`δ(q3,⊔)=(q5,⊔,L)\`, \`δ(q4,x)=(q4,x,R)\`, \`δ(q4,0)=(q3,x,R)\`, \`δ(q4,⊔)=(qreject,⊔,R)\`,
\`δ(q5,0)=(q5,0,L)\`, \`δ(q5,x)=(q5,x,L)\`, \`δ(q5,⊔)=(q2,⊔,R)\`. Add meg a konfigurációsorozatot a \`00\`
és a \`000\` inputon!`,
        solution: `\`00\`, elfogadja:
\`\`\`text
q₁00 ⊢ ⊔q₂0 ⊢ ⊔xq₃⊔ ⊢ ⊔q₅x ⊢ q₅⊔x ⊢ ⊔q₂x ⊢ ⊔xq₂⊔ ⊢ ⊔x⊔qaccept
\`\`\`
\`000\`, elutasítja (3 nem 2-hatvány):
\`\`\`text
q₁000 ⊢ ⊔q₂00 ⊢ ⊔xq₃0 ⊢ ⊔x0q₄⊔ ⊢ ⊔x0⊔qreject
\`\`\`
Figyeld meg: a gép az első 0-t \`⊔\`-ra írja, így „megjelöli” a szalag bal szélét (\`q5\` ezen fordul meg).`,
      },
      {
        prompt: `Adj **implementációs szintű leírást** (szöveges algoritmust) egy olyan Turing-géphez, amely eldönti a
\`{w ∈ {0, 1}* | w-ben ugyanannyi 0 van, mint 1}\` nyelvet! (gy4, 5. példa)`,
        solution: `Az \`w\` inputon:

1. Pásztázd végig a szalagot, és jelöld meg (\`x\`) az első még jelöletlen 0-t. Ha nincs ilyen, ugorj a
   4. lépésre. Különben vidd vissza a fejet a szalag elejére.
2. Pásztázd végig a szalagot, és jelöld meg az első még jelöletlen 1-est. Ha nincs ilyen, **reject**.
3. Vidd vissza a fejet az elejére, és ugorj az 1. lépésre.
4. Vidd vissza a fejet az elejére, és nézd meg, maradt-e jelöletlen 1-es. Ha nem, **accept**,
   különben **reject**.

(A „kétszer annyi 0, mint 1” változatnál az 1. lépésben **két** 0-t jelölsz meg egy 1-eshez.)`,
      },
      {
        prompt: `Elméleti kérdések: (a) Mi a különbség a Turing-felismerhető és az eldönthető nyelv között?
(b) Mi történik, ha a fej a bal szélen áll, és \`L\` irányú átmenet jön? (c) Miért kell, hogy
\`⊔ ∉ Σ\`?`,
        solution: `(a) **Felismerhető:** van TM, amely pontosan \`L\` elemeit fogadja el, de a nem-elemeken végtelen
ciklusba is futhat. **Eldönthető:** van TM, amely **minden inputon megáll**, és pontosan \`L\` elemeit
fogadja el. Minden eldönthető nyelv felismerhető, fordítva nem.

(b) A fej **helyben marad** (a szalagnak nincs bal oldali folytatása), az írás és az állapotváltás
megtörténik.

(c) Mert a \`⊔\` jelzi az input végét: az első \`⊔\` az input utáni első cella. Ha az input tartalmazhatna
\`⊔\`-t, nem lehetne tudni, hol ér véget.`,
      },
    ],
  },
];
