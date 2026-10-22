import type { Subject } from "@/lib/types";
import { tipusZh1Lessons } from "./tipuselmelet-zh1";

export const tipuselmelet: Subject = {
  slug: "tipuselmelet",
  name: "Típuselmélet",
  short: "Típuselmélet",
  accent: "#63a95e",
  tagline: "Agda: függő típusok, bizonyítások, algebrai struktúrák.",
  location: "Kedd 10:00–12:00 Gy · Péntek 14:00–16:00 Ea",
  requirementsSource: "Tipuselmelet/gy01-hu.agda (a követelmény a fájl elején)",
  requirementsMd: `
> A követelmények a **gy01-hu.agda** fájl elején találhatók.

## Számonkérés
- **Házi feladatok:** gyakorlásra, **nem kötelező**.
- Órák végén (2. gyakorlattól) **+/-** feladatok.
- **2 db ZH.**
- A ZH-n **kötelező legalább 1 feladatot teljesen helyesen** megoldani (6–7 feladat van), **min. 30%** feladatonként, utána járnak részpontok.
- A két ZH-ból összesen **50% + 1** pontot kell elérni.

## Jegyhatárok
| Teljesítmény | Jegy |
|--------------|------|
| 85% – 100% | 5 |
| 75% – 84.99% | 4 |
| 65% – 74.99% | 3 |
| 50%+1 – 64.99% | 2 |
| 0% – 50% | 1 |

## Időpontok
| Esemény | Időpont |
|---------|---------|
| **1. ZH** | **2026. október 16.** 17:30–19:30 vagy 19:15–21:15 |
| **2. ZH** | **2026. december 15.** (pontos idő TBA) |
| **Javító ZH** | **2026. december 21.** (mindkét ZH javítható — "maraton") |
| **Első vizsga** | kb. **2026. december 23.** |

## Előkövetelmény-ismeretek (Haskell)
Szintaxis, típusok, alapfüggvények (\`+ * div mod\`, \`not && ||\`, lista-műveletek, \`fst/snd\`, \`Maybe\`, \`Either\`), operátorok kötési erőssége, **rekurzió**, **mintaillesztés**, parciális applikálás, névtelen függvények, típusrendszer (polimorfizmus, magasabb rendű függvények). Fogalmak: totális/parciális függvény, Curry-zés, homogén/heterogén szerkezet, félcsoport, egységelem, asszociativitás/kommutativitás/disztributivitás.

## Eszközök
- **Agda** + **Emacs** (agda-mode). Laborgépen: \`Alt-F2 "emacs"\`.
- Repó: \`git clone https://bitbucket.org/akaposi/ttt\`
- Típusellenőrzés: \`C-c C-l\`; normalizálás: \`C-c C-n\`; cél+kontextus: \`C-c C-,\`; lyuk kitöltése: \`C-c C-SPC\`.
- **Zárójel tilos** függvényalkalmazásnál (\`add3 4\`, nem \`add3(4)\`) — pontlevonás jár érte!
`,
  files: [
    { name: "gy01-hu.agda — 1. gyakorlat (+ követelmény)", path: "/materials/Tipuselmelet/gy01-hu.agda", kind: "code" },
    { name: "gy02-hu.agda — 2. gyakorlat", path: "/materials/Tipuselmelet/gy02-hu.agda", kind: "code" },
    { name: "pluszminusz01.agda — +/- feladat", path: "/materials/Tipuselmelet/pluszminusz01.agda", kind: "code" },
    { name: "ZH1Proba.agda — saját próba-ZH (7 feladat, tesztekkel)", path: "/tipuselmelet-zh1/ZH1Proba.agda", kind: "code" },
    { name: "ZH1ProbaMegoldas.agda — a próba-ZH megoldása", path: "/tipuselmelet-zh1/ZH1ProbaMegoldas.agda", kind: "code" },
    { name: "ZH1Gyakorlo.agda — a ZH1-leckék gyakorlóinak megoldásai", path: "/tipuselmelet-zh1/ZH1Gyakorlo.agda", kind: "code" },
  ],
  events: [
    { id: "te-zh1", type: "zh", title: "1. ZH", date: "2026-10-16", time: "17:30–19:30 / 19:15–21:15", topic: "7 feladat (gépen, Agda): polimorf + véges izomorfizmus, ℕ-függvény, listafüggvény, saját data, Stream, koinduktív gép. Felkészítő: 0–8. ZH1-lecke.", note: "Min. 1 feladat teljesen helyesen; feladatonként min. 30%." },
    { id: "te-zh2", type: "zh", title: "2. ZH", date: "2026-12-15", topic: "A második félrész anyaga (pontos idő TBA).", note: "A két ZH-ból összesen 50%+1 kell." },
    { id: "te-javzh", type: "potzh", title: "Javító ZH", date: "2026-12-21", topic: "Mindkét ZH javítható.", note: "Akinek mindkettőt kell: egymás után, 'maraton'." },
    { id: "te-vizsga", type: "vizsga", title: "Első vizsga", date: "2026-12-23", tba: true, topic: "A féléves anyag.", note: "Időpont közelítő (kb. dec. 23.)." },
  ],
  // ZH1-felkészítő: a 7 feladattípus + saját próba-ZH (tipuselmelet-zh1.ts), utána az alapleckék
  lessons: [
    ...tipusZh1Lessons,
    {
      slug: "bevezetes",
      title: "1. Agda alapok — típusok, függvények, definíciós egyenlőség",
      summary: "Haskell → Agda, típusírás, lambda, parciális applikálás, if-then-else, Emacs-kombók.",
      status: "complete",
      body: `
## Miről szól a tárgy?

A típuselmélet **függő típusokkal** dolgozik: a típusok maguk is számíthatnak
értékektől, és a **programozás = bizonyítás** (Curry–Howard-izomorfizmus). Az
eszköz az **Agda**, ami egyszerre programozási nyelv és **bizonyításellenőrző**.
Amit leírsz, azt a gép ellenőrzi: ha lefordul (\`C-c C-l\` zöld), akkor a
"bizonyítás" helyes.

A félév első fele a **Haskell → Agda** átállásról és az **egyszerű típusokról**
(véges típusok, függvények) szól — ez az **1. ZH (okt. 16.)** anyaga.

## Munkakörnyezet

\`\`\`text
git clone https://bitbucket.org/akaposi/ttt
\`\`\`

Emacs + agda-mode a szerkesztő. A leggyakoribb billentyűkombók:

| Kombó | Mit csinál |
|-------|-----------|
| \`C-c C-l\` | **Típusellenőrzés** (load) — kiszínezi a fájlt |
| \`C-c C-n\` | **Normalizálás** — kiértékel egy kifejezést, amennyire lehet |
| \`C-c C-,\` | A **lyuk** célja + kontextusa (mit kell odaírni, mi van kéznél) |
| \`C-c C-.\` | Cél + kontextus + a beírt kifejezés kikövetkeztetett típusa |
| \`C-c C-SPC\` | A **lyuk kitöltése** a beírt kifejezéssel |
| \`C-c C-c\` | **Mintaillesztés** (case split) egy változóra |
| \`C-\\\` | Az Agda **unicode-bevitel** ki/be kapcsolása |

**Unicode-jelek beírása** (agda input mode): \`→\` = \`\\to\`, \`ℕ\` = \`\\bN\`,
\`λ\` = \`\\Gl\`, \`≡\` = \`\\==\`, \`⊤\` = \`\\top\`, \`⊥\` = \`\\bot\`, \`⊎\` = \`\\uplus\`,
\`×\` = \`\\times\`. Itt a portálon a feladatoknál a **paletta gombokkal** is beírhatod őket.

## Az első függvény

\`\`\`agda
add3 : ℕ → ℕ        -- típus: természetes szám → természetes szám
add3 x = x + 3       -- definíció
\`\`\`

A **típust és a definíciót külön sorban** írjuk. Az \`add3\` egy \`ℕ\`-et vár és egy
\`ℕ\`-et ad. Alkalmazás **zárójel nélkül**:

\`\`\`agda
aNum : ℕ
aNum = add3 4        -- = 4 + 3 = 7
\`\`\`

> ⚠️ **SOHA ne írj \`add3(4)\`-et!** Függvényalkalmazás Agdában (és Haskellben) csak
> szóközzel megy: \`add3 4\`. A zárójeles alakért **pontlevonás jár** a ZH-n.
> Zárójel csak a **kifejezés csoportosítására** kell: \`add3 (add3 2)\`.

### Egyenlőségi levezetés (equational reasoning)

Az Agda kiszámolja a normál formát; te fejben ugyanígy tudod követni:

\`\`\`text
aNum = add3 4
     = 4 + 3
     = 7
\`\`\`

Próbáld ki: \`C-c C-n\` → \`add3 4\` → \`7\`.

## Lambda és definíciós egyenlőség

\`add3 x = x + 3\` pontosan **ugyanaz**, mint egy névtelen (lambda) függvényt
odaadni — ez a **definíciós egyenlőség**:

\`\`\`agda
add3' : ℕ → ℕ
add3' = λ x → x + 3
-- add3' 4 = (λ x → x + 3) 4 = 4 + 3 = 7
\`\`\`

## Parciális applikálás (szekciók)

Mint Haskellben, egy operátort félig alkalmazhatsz. Az \`_\` jelöli a hiányzó helyet:

\`\`\`agda
add4 : ℕ → ℕ
add4 = _+ 4          -- \\x → x + 4

add4' : ℕ → ℕ
add4' = 4 +_         -- \\x → 4 + x

pow2 : ℕ → ℕ
pow2 = _^ 2          -- \\x → x ^ 2
\`\`\`

## Elágazás — if_then_else_

Az aláhúzások a **paraméterek helyét** jelölik (mixfix operátor). Így a saját
\`if_then_else_\` pont úgy néz ki használatkor, mint egy beépített konstrukció:

\`\`\`agda
if_then_else_ : {A : Set} → Bool → A → A → A
if_then_else_ true  a1 a2 = a1
if_then_else_ false a1 a2 = a2

number : ℕ
number = if true then 2 else 1     -- = 2
\`\`\`

A \`{A : Set}\` egy **implicit paraméter**: bármely típusra működik, de nem kell
kiírni híváskor (az Agda kitalálja). Erről bővebben a következő leckében.

## Több paraméter és a Curry-zés

Egy kétparaméteres függvény típusa **jobbra zárójeleződik**:

\`\`\`agda
add : ℕ → ℕ → ℕ          -- ez valójában  ℕ → (ℕ → ℕ)
add x y = x + y
-- ugyanaz mint:  λ x → λ y → x + y   =   λ x y → x + y
\`\`\`

Ezért lehet **parciálisan** alkalmazni: \`add 3\` egy \`ℕ → ℕ\` függvény.
Az alkalmazás viszont **balra zárójeleződik**: \`add 3 4 = (add 3) 4\`.

\`\`\`agda
num4 : ℕ
num4 = add 3 (add 4 2)   -- = add 3 6 = 9
\`\`\`

Miért **hibás** az \`add (3 4)\`? Mert \`3 4\` azt jelentené, hogy a \`3\` számot
függvényként alkalmazzuk a \`4\`-re — a szám viszont nem függvény.

> A legközelebbi tét az **1. ZH (okt. 16.)**. A cél: függvények típusának és
> definíciójának magabiztos írása, a zárójelezés (\`→\` jobbra, alkalmazás balra),
> és a lenti magasabb rendű + mintaillesztéses feladatok.
`,
      exercises: [
        {
          prompt: "Írd meg az `add3` függvényt Agdában: természetes számhoz hozzáad 3-at! Add meg a típust és a definíciót is.",
          hint: "A `→` a paletta gombjával (vagy `\\to`), a `ℕ` a `\\bN`. Alkalmazásnál nincs zárójel.",
          palette: "agda",
          check: "code",
          placeholder: "add3 : ℕ → ℕ\n",
          answer: [
            "add3 : ℕ → ℕ\nadd3 x = x + 3",
            "add3 : ℕ -> ℕ\nadd3 x = x + 3",
            "add3 : Nat → Nat\nadd3 x = x + 3",
          ],
          solution: "```agda\nadd3 : ℕ → ℕ\nadd3 x = x + 3\n-- add3 4 = 4 + 3 = 7\n```",
        },
        {
          prompt: "Add meg az `add4` függvényt **parciális applikálással** (ne írj lambdát és paramétert), amely 4-et ad hozzá a bemenetéhez!",
          hint: "A hiányzó operandus helyét `_` jelöli: `_+ 4`.",
          palette: "agda",
          check: "code",
          placeholder: "add4 : ℕ → ℕ\n",
          answer: [
            "add4 : ℕ → ℕ\nadd4 = _+ 4",
            "add4 : ℕ → ℕ\nadd4 = 4 +_",
            "add4 : Nat → Nat\nadd4 = _+ 4",
          ],
          solution: "```agda\nadd4 : ℕ → ℕ\nadd4 = _+ 4     -- vagy: 4 +_\n```",
        },
        {
          prompt: "Definiáld az `if_then_else_` mixfix függvényt a lehető legáltalánosabb (polimorf) típussal, mintaillesztéssel a `Bool`-on!",
          hint: "Az aláhúzások a paraméterek helyét jelölik. `{A : Set}` implicit típusparaméter. Két eset: `true` és `false`.",
          palette: "agda",
          check: "code",
          placeholder: "if_then_else_ : {A : Set} → Bool → A → A → A\n",
          answer: [
            "if_then_else_ : {A : Set} → Bool → A → A → A\nif_then_else_ true a1 a2 = a1\nif_then_else_ false a1 a2 = a2",
            "if_then_else_ : {A : Set} -> Bool -> A -> A -> A\nif_then_else_ true a1 a2 = a1\nif_then_else_ false a1 a2 = a2",
          ],
          solution: "```agda\nif_then_else_ : {A : Set} → Bool → A → A → A\nif_then_else_ true  a1 a2 = a1\nif_then_else_ false a1 a2 = a2\n```",
        },
      ],
    },
    {
      slug: "magasabb-rendu-polimorfizmus",
      title: "2. Magasabb rendű függvények és parametrikus polimorfizmus",
      summary: "Függvény mint paraméter, tw (kétszer alkalmaz), implicit {A : Set}, ℕ mintaillesztés.",
      status: "complete",
      body: `
## Függvények mint paraméterek

Egy **magasabb rendű** függvény olyan függvényt vár, amely maga is függvény.
Haskellből ismerős: \`map :: (a -> b) -> [a] -> [b]\`. Agdában:

\`\`\`agda
f1 : (ℕ → ℕ) → ℕ
f1 f = f 0            -- a kapott függvényt a 0-ra alkalmazza
\`\`\`

\`\`\`agda
f1 add3    -- = add3 0 = 3
f1 add4    -- = add4 0 = 4     (más eredmény, mert más a függvény)
\`\`\`

A \`(ℕ → ℕ)\` körüli zárójel **kötelező**: e nélkül \`ℕ → ℕ → ℕ\` lenne, ami
két \`ℕ\`-et váró függvény — nem ugyanaz!

## Parametrikus polimorfizmus — implicit paraméter

Ha egy függvény **bármely típusra** ugyanúgy működik, akkor a típust
**implicit paraméterként** vezetjük be: \`{A : Set}\`. A \`Set\` a "típusok
típusa". Az implicit paramétert híváskor nem írjuk ki, az Agda kitalálja.

A klasszikus példa a \`tw\` ("twice"): egy függvényt **kétszer** alkalmaz:

\`\`\`agda
tw : {A : Set} → (A → A) → A → A
tw f x = f (f x)
-- tw add3 1 = add3 (add3 1) = add3 4 = 7
\`\`\`

Ugyanez **explicit** típusparaméterrel (ekkor a típust is át kell adni):

\`\`\`agda
tw' : (A : Set) → (A → A) → A → A
tw' A f x = f (f x)
\`\`\`

**Érdekesség:** mivel \`tw\` maga is \`(A → A) → A → A\` alakú, önmagára is
alkalmazható: \`tw tw add3 1\`. Kérdezd meg az Agdát (\`C-c C-d\` a típusra,
\`C-c C-n\` az értékre)!

## Mintaillesztés véges típuson

A \`Bool\` két értékű. Kétféleképp írhatunk rá "mindig igaz" függvényt — a kettő
**definíciósan egyenlő**:

\`\`\`agda
constTrue : Bool → Bool
constTrue _ = true               -- egy eset, wildcard

constTrue' : Bool → Bool
constTrue' false = true          -- külön esetek
constTrue' true  = true
\`\`\`

Emacsben a mintaillesztés: a változó nevét a lyukba írod, majd \`C-c C-c\` —
az Agda szétbontja az esetekre.

## A természetes számok mint adattípus

A \`ℕ\` valójában egy **rekurzív adattípus**: minden szám vagy \`zero\`, vagy egy
másik szám \`suc\` (rákövetkezője):

\`\`\`agda
data ℕ : Set where
  zero : ℕ
  suc  : ℕ → ℕ
-- 0 = zero, 1 = suc zero, 2 = suc (suc zero), ...
\`\`\`

Az összeadást a **bal operandus** szerkezetére való mintaillesztéssel és
**rekurzióval** definiáljuk:

\`\`\`agda
_+_ : ℕ → ℕ → ℕ
zero  + m = m                 -- 0 + m = m
suc n + m = suc (n + m)       -- (1+n) + m = 1 + (n + m)
\`\`\`

Levezetés: \`suc (suc zero) + m = suc (suc zero + m) = suc (suc (zero + m)) = suc (suc m)\`.
Ez a mintázat — **konstruktoronként egy egyenlet, a rekurzív esetben a "kisebb"
argumentumra hivatkozva** — végigkíséri az egész tárgyat.

> ZH-tipp: a \`tw\` típusának és definíciójának pontos leírása, valamint a
> \`_+_\` (vagy hasonló \`ℕ\`-rekurzió) tipikus feladat. A \`(A → A)\` körüli zárójelre
> és az implicit \`{A : Set}\`-re figyelj.
`,
      exercises: [
        {
          prompt: "Definiáld a `tw` függvényt, amely egy függvényt kétszer alkalmaz a paraméterén, a lehető legáltalánosabb (polimorf) típussal! Add meg a típust és a definíciót is.",
          hint: "A típus implicit `{A : Set}`-tel kezdődik, majd `(A → A) → A → A`. A speciális jelekhez használd a paletta gombjait.",
          palette: "agda",
          check: "code",
          placeholder: "tw : {A : Set} → (A → A) → A → A\n",
          answer: [
            "tw : {A : Set} → (A → A) → A → A\ntw f x = f (f x)",
            "tw : {A : Set} -> (A -> A) -> A -> A\ntw f x = f (f x)",
          ],
          solution: "```agda\ntw : {A : Set} → (A → A) → A → A\ntw f x = f (f x)\n\n-- pl. tw add3 1 = add3 (add3 1) = 7\n```",
        },
        {
          prompt: "Írj egy `f1 : (ℕ → ℕ) → ℕ` magasabb rendű függvényt, amely a kapott függvényt a `0`-ra alkalmazza!",
          hint: "A paraméter egy függvény, nevezd el `f`-nek, majd `f 0`.",
          palette: "agda",
          check: "code",
          placeholder: "f1 : (ℕ → ℕ) → ℕ\n",
          answer: [
            "f1 : (ℕ → ℕ) → ℕ\nf1 f = f 0",
            "f1 : (ℕ -> ℕ) -> ℕ\nf1 f = f 0",
            "f1 : (Nat → Nat) → Nat\nf1 f = f 0",
          ],
          solution: "```agda\nf1 : (ℕ → ℕ) → ℕ\nf1 f = f 0\n-- f1 add3 = add3 0 = 3\n```",
        },
        {
          prompt: "Add meg a természetes számok összeadását `_+_` mintaillesztéssel a bal operandus `zero`/`suc` konstruktorain, rekurzióval!",
          hint: "Két egyenlet: `zero + m = m`, és `suc n + m = suc (n + m)`.",
          palette: "agda",
          check: "code",
          placeholder: "_+_ : ℕ → ℕ → ℕ\n",
          answer: [
            "_+_ : ℕ → ℕ → ℕ\nzero + m = m\nsuc n + m = suc (n + m)",
            "_+_ : Nat → Nat → Nat\nzero + m = m\nsuc n + m = suc (n + m)",
            "_+_ : ℕ -> ℕ -> ℕ\nzero + m = m\nsuc n + m = suc (n + m)",
          ],
          solution: "```agda\n_+_ : ℕ → ℕ → ℕ\nzero  + m = m               -- nulla + bármi = bármi\nsuc n + m = suc (n + m)     -- (1+n) + m = 1 + (n + m)\n```",
        },
      ],
    },
    {
      slug: "veges-tipusok",
      title: "3. Véges típusok — ⊤, ⊥, ⊎, × és elemszámaik",
      summary: "Egység- és üres típus, összeg (Either) és szorzat (pár), konstruktorok, elemszám-számolás.",
      status: "complete",
      body: `
## A véges típusok ábécéje

Az egyszerű típusok mögött egy szép **algebra** húzódik: minden típusnak van egy
**elemszáma**, és a típusképző műveletek pont úgy viselkednek, mint a számtani
műveletek. Négy alapvető típus:

| Típus | Jel | Konstruktor(ok) | Elemszám | Analógia |
|-------|-----|-----------------|----------|----------|
| **egység** | \`⊤\` | \`tt\` | 1 | \`1\` |
| **üres** | \`⊥\` | — (nincs) | 0 | \`0\` |
| **Bool** | \`Bool\` | \`true\`, \`false\` | 2 | \`2\` |
| **összeg** | \`A ⊎ B\` | \`inl a\`, \`inr b\` | \\|A\\| + \\|B\\| | \`+\` |
| **szorzat** | \`A × B\` | \`(a , b)\` | \\|A\\| · \\|B\\| | \`·\` |

\`\`\`agda
-- egyelemű típus (η-szabály: minden x : ⊤ egyenlő tt-vel)
data ⊤ : Set where
  tt : ⊤

-- üres típus: nincs konstruktor, nincs eleme
data ⊥ : Set where

-- szorzat (record): egyszerre A ÉS B
record _×_ (A B : Set) : Set where
  constructor _,_
  field
    fst : A
    snd : B
\`\`\`

Az **összeg** \`⊎\` a Haskell \`Either\`-je: \`inl : A → A ⊎ B\` és
\`inr : B → A ⊎ B\` — vagy \`A\`-ból, **vagy** \`B\`-ből.

## Pár: szétszedés mintaillesztéssel

Egy pár komponenseit \`(a , b)\` mintával kapjuk vissza. Fordítsuk meg egy pár
két elemét:

\`\`\`agda
flip : ℕ × Bool → Bool × ℕ
flip (n , b) = (b , n)
\`\`\`

Ha **általános** \`A\`, \`B\` típusokra írjuk, akkor **nem tudunk butaságot
csinálni** — a típus kényszerít:

\`\`\`agda
comm× : {A B : Set} → A × B → B × A
comm× (a , b) = (b , a)
\`\`\`

## Az üres típus és a lehetetlen eset

Ha egy pár első és második komponensét is meg akarjuk kapni, de az egyik \`⊥\`,
akkor **nincs is olyan érték** — ezt az \`()\` (abszurd minta) fejezi ki. Így
lehet bizonyítani, hogy két érték **különböző**:

\`\`\`agda
b1 b2 : Bool × ⊤
b1 = (true  , tt)
b2 = (false , tt)

b1≠b2 : b1 ≡ b2 → ⊥      -- "ha b1 ≡ b2 volna, ellentmondásra jutnánk"
b1≠b2 ()                  -- nincs ilyen egyenlőség: abszurd minta
\`\`\`

## Elemszámok "kiszámolása"

A táblázat szabályaival bármelyik összetett típus elemszáma kijön. A
függvénytípus a **hatványozás**: \`A → B\` elemszáma \\|B\\|^\\|A\\| (minden \`A\`-beli
bemenethez \\|B\\| lehetséges kimenet).

\`\`\`text
| ⊤ |              = 1
| ⊥ |              = 0
| Bool |           = 2
| Bool ⊎ ⊤ |       = 2 + 1 = 3
| A ⊎ B |          = |A| + |B|
| A × B |          = |A| · |B|
| Bool × Bool × Bool | = 2·2·2 = 8
| ⊤ → ⊥ |          = 0^1 = 0     (nincs ilyen függvény!)
| ⊥ → ⊤ |          = 1^0 = 1     (az "üres" függvény)
| ⊥ → ⊥ |          = 0^0 = 1
| Bool → ⊤ |       = 1^2 = 1
| ⊤ → Bool |       = 2^1 = 2
| A → B |          = |B| ^ |A|
| Bool → Bool → Bool | = 2^(2·2) = ... = 2^4 = 16
\`\`\`

Ez a "számolás" nem véletlen: a következő leckében **bijekciókkal** bizonyítjuk,
hogy ezek a típusok tényleg úgy viselkednek, mint a számok (asszociativitás,
kommutativitás, egységelem, disztributivitás, hatványozási törvények).

> ZH-tipp: adott típusnak add meg az **összes elemét** (pl. \`Bool ⊎ ⊤\` → 3 elem),
> vagy döntsd el, van-e egyáltalán eleme (\`⊤ → ⊥\` → nincs). A pár- és
> összeg-mintaillesztést (\`(a , b)\`, \`inl\`/\`inr\`) gyakorold be.
`,
      exercises: [
        {
          prompt: "Írd meg a `flip` függvényt, amely egy `ℕ × Bool` pár két komponensét megcseréli, `Bool × ℕ`-et adva!",
          hint: "Illessz a párra: `(n , b)`, majd add vissza fordítva. A `×` a `\\times`, a paletta gombbal is elérhető.",
          palette: "agda",
          check: "code",
          placeholder: "flip : ℕ × Bool → Bool × ℕ\n",
          answer: [
            "flip : ℕ × Bool → Bool × ℕ\nflip (n , b) = (b , n)",
            "flip : ℕ × Bool → Bool × ℕ\nflip (n , b) = b , n",
            "flip : Nat × Bool → Bool × Nat\nflip (n , b) = (b , n)",
          ],
          solution: "```agda\nflip : ℕ × Bool → Bool × ℕ\nflip (n , b) = (b , n)\n```",
        },
        {
          prompt: "Definiáld a `comm×` függvényt, amely egy tetszőleges `A × B` pár komponenseit megcseréli, a lehető legáltalánosabb típussal!",
          hint: "Implicit `{A B : Set}`, a definíció pontosan olyan mint a flip, csak polimorf.",
          palette: "agda",
          check: "code",
          placeholder: "comm× : {A B : Set} → A × B → B × A\n",
          answer: [
            "comm× : {A B : Set} → A × B → B × A\ncomm× (a , b) = (b , a)",
            "comm× : {A B : Set} → A × B → B × A\ncomm× (a , b) = b , a",
            "comm× : {A B : Set} -> A × B -> B × A\ncomm× (a , b) = (b , a)",
          ],
          solution: "```agda\ncomm× : {A B : Set} → A × B → B × A\ncomm× (a , b) = (b , a)\n-- általános típuson nem lehet mást csinálni\n```",
        },
        {
          prompt: "Mennyi a `Bool ⊎ ⊤` típus elemszáma? (Csak a számot írd be.)",
          hint: "|A ⊎ B| = |A| + |B|. A Bool 2 elemű, a ⊤ 1 elemű.",
          check: "numeric",
          answer: "3",
          solution: "`|Bool ⊎ ⊤| = |Bool| + |⊤| = 2 + 1 = **3**` — az elemek: `inl true`, `inl false`, `inr tt`.",
        },
        {
          prompt: "Hány eleme van a `Bool → Bool` típusnak (hány különböző ilyen függvény van)? (Csak a számot.)",
          hint: "|A → B| = |B| ^ |A|. Itt |Bool| = 2.",
          check: "numeric",
          answer: "4",
          solution: "`|Bool → Bool| = 2^2 = **4**` — a négy függvény: id, not, const true, const false.",
        },
      ],
    },
    {
      slug: "bijekciok-algebra",
      title: "4. Bijekciók és algebrai törvények — ↔, asszociativitás, egységelem, Curry",
      summary: "Izomorfizmus (↔) mint bizonyíték, ⊎/× algebrai törvényei, disztributivitás, hatványozási törvények.",
      status: "complete",
      body: `
## Az izomorfizmus mint egyenlőség-bizonyíték

Két típus "ugyanannyi információt kódol", ha van közöttük **bijekció**
(oda-vissza átalakítás, ami visszaadja az eredetit). Ezt a \`↔\` (logikai
ekvivalencia / izomorfizmus) jelöli, és egy **párként** adjuk meg: az egyik
irány (\`fst\`) és a másik irány (\`snd\`).

\`\`\`agda
-- A ↔ B  ≈  (A → B) × (B → A)
\`\`\`

Amikor "bizonyítjuk", hogy egy típusalgebrai törvény igaz, valójában **megadunk
egy bijekciót** a két oldal között. A tesztek (\`refl\`) ellenőrzik, hogy tényleg
visszakapjuk az eredetit.

## Bijekció megadása — from' / to' példa

A gy02 egyik feladata: az \`A × A\` és a \`Bool → A\` típus **ugyanaz**
(egy \`Bool → A\` függvényt a két értéke, \`f true\` és \`f false\` teljesen leír):

\`\`\`agda
to' : {A : Set} → (Bool → A) → A × A
to' f = (f true , f false)

from' : {A : Set} → A × A → (Bool → A)
from' (a , b) = λ x → if x then a else b
\`\`\`

Ez épp a hatványozási törvény egy esete: \\|A\\|^2 = \\|A × A\\|, azaz \`A^Bool = A × A\`.

## (⊎, ⊥) — kommutatív, egységelemes félcsoport

Az összeg típus úgy viselkedik, mint a **+**, a \`⊥\` (0 elemű) pedig mint a **0**:

\`\`\`agda
-- asszociativitás:  (A ⊎ B) ⊎ C  ↔  A ⊎ (B ⊎ C)
assoc⊎ : {A B C : Set} → (A ⊎ B) ⊎ C ↔ A ⊎ (B ⊎ C)

-- kommutativitás:   A ⊎ B  ↔  B ⊎ A            (comm⊎)
-- bal egységelem:   ⊥ ⊎ A  ↔  A                (idl⊎)
-- jobb egységelem:  A ⊎ ⊥  ↔  A                (idr⊎)
\`\`\`

A bizonyítás mindig ugyanaz a recept: **mintaillesztés a konstruktorokra**
(\`inl\`/\`inr\`), és a megfelelő oldalra "átcímkézés". Pl. a kommutativitás oda-iránya:

\`\`\`text
inl a  ↦  inr a
inr b  ↦  inl b
\`\`\`

## (×, ⊤) — kommutatív, egységelemes félcsoport

A szorzat típus a **·**, a \`⊤\` (1 elemű) pedig az **1**:

\`\`\`agda
-- assoc× :  (A × B) × C  ↔  A × (B × C)
-- comm×  :  A × B  ↔  B × A          (már megírtuk az előző leckében!)
-- idl×   :  ⊤ × A  ↔  A
-- idr×   :  A × ⊤  ↔  A
-- nullr× :  A × ⊥  ↔  ⊥              (0-val szorozva 0)
\`\`\`

## Disztributivitás

Ahogy \`a·(b+c) = a·b + a·c\`, úgy a szorzat **disztributív** az összegre:

\`\`\`agda
dist : {A B C : Set} → A × (B ⊎ C) ↔ (A × B) ⊎ (A × C)
\`\`\`

## Hatványozási törvények

A függvénytípus a **hatvány** (\`A → B\` = \\|B\\|^\\|A\\|), és a szokásos azonosságok
mind típus-izomorfizmusként igazak:

| Számtan | Típusalgebra | Név |
|---------|--------------|-----|
| (c^b)^a = c^(a·b) | \`(A → B → C) ↔ (A × B → C)\` | **curry** |
| c^(a+b) = c^a · c^b | \`(A ⊎ B → C) ↔ (A → C) × (B → C)\` | ⊎×→ |
| a^0 = 1 | \`(⊥ → A) ↔ ⊤\` | law^0 |
| a^1 = a | \`(⊤ → A) ↔ A\` | law^1 |
| 1^a = 1 | \`(A → ⊤) ↔ ⊤\` | law1^ |

A **curry** a legfontosabb: pontosan a Haskellből ismert
\`curry\`/\`uncurry\` átalakítás, típusszinten.

\`\`\`agda
curry   : {A B C : Set} → (A × B → C) → (A → B → C)
curry f a b = f (a , b)

uncurry : {A B C : Set} → (A → B → C) → (A × B → C)
uncurry f (a , b) = f a b
\`\`\`

> ZH-tipp (2. ZH, dec. 15.): egy \`↔\` típus **mindkét irányának** megadása
> mintaillesztéssel. A leggyakoribb: \`comm\`, \`assoc\`, egységelem, \`curry\`/\`uncurry\`.
> Ismerd fel, **melyik algebrai törvényt** mondja ki egy adott típus.
`,
      exercises: [
        {
          prompt: "Add meg a `from'` függvényt, amely egy `A × A` párból `Bool → A` függvényt csinál (a `to'` inverze)! `to' f = (f true , f false)`.",
          hint: "Illessz a párra `(a , b)`, adj vissza egy lambdát, ami `if x then a else b`.",
          palette: "agda",
          check: "code",
          placeholder: "from' : {A : Set} → A × A → (Bool → A)\n",
          answer: [
            "from' : {A : Set} → A × A → (Bool → A)\nfrom' (a , b) = λ x → if x then a else b",
            "from' : {A : Set} → A × A → Bool → A\nfrom' (a , b) = λ x → if x then a else b",
            "from' : {A : Set} → A × A → (Bool → A)\nfrom' (a , b) x = if x then a else b",
          ],
          solution: "```agda\nfrom' : {A : Set} → A × A → (Bool → A)\nfrom' (a , b) = λ x → if x then a else b\n-- (vagy pontosan ekvivalensen:)\nfrom' (a , b) x = if x then a else b\n```",
        },
        {
          prompt: "Definiáld a `curry` függvényt: egy `A × B → C` függvényből csinálj `A → B → C`-t!",
          hint: "`curry f a b = f (a , b)` — a két külön argumentumból építs párt.",
          palette: "agda",
          check: "code",
          placeholder: "curry : {A B C : Set} → (A × B → C) → (A → B → C)\n",
          answer: [
            "curry : {A B C : Set} → (A × B → C) → (A → B → C)\ncurry f a b = f (a , b)",
            "curry : {A B C : Set} → (A × B → C) → A → B → C\ncurry f a b = f (a , b)",
            "curry : {A B C : Set} -> (A × B -> C) -> (A -> B -> C)\ncurry f a b = f (a , b)",
          ],
          solution: "```agda\ncurry : {A B C : Set} → (A × B → C) → (A → B → C)\ncurry f a b = f (a , b)\n\nuncurry : {A B C : Set} → (A → B → C) → (A × B → C)\nuncurry f (a , b) = f a b\n```",
        },
        {
          prompt: "Melyik algebrai törvényt mondja ki a `(⊥ → A) ↔ ⊤` típus? (Írd be a megfelelő azonosságot `a`-val és számokkal, pl. `a^0 = 1` alakban.)",
          hint: "A `⊥` a 0, a `⊤` az 1, a `→` a hatványozás. Hány függvény megy az üres típusból A-ba?",
          check: "text",
          answer: ["a^0 = 1", "a^0=1", "a⁰ = 1", "a0 = 1"],
          solution: "`(⊥ → A) ↔ ⊤` azt mondja: **a⁰ = 1**. Az üres típusból pontosan **egy** függvény van (az „üres\" függvény), tehát az elemszám 1.",
        },
      ],
    },
  ],
  links: [{ label: "Tananyag-repó (bitbucket akaposi/ttt)", url: "https://bitbucket.org/akaposi/ttt" }],
};
