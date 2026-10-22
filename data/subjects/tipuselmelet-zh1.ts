// GENERÁLT FÁJL — Típuselmélet ZH1-felkészítő: feladattípusok, receptek, saját gyakorló- és próbafeladatok.
// Minden Agda-kód le van fordítva a kurzus Lib-jével (ttt/src/Agda/ZH1*.agda). A body/prompt/hint/solution template literal.
import type { Lesson } from "@/lib/types";

export const tipusZh1Lessons: Lesson[] = [
  {
    slug: "zh1-terkep",
    title: `0. ZH1-térkép — a 7 feladattípus, napterv, túlélőkészlet`,
    summary: `Mit kérnek a ZH1-en (okt. 16.), melyik lecke melyik feladatra készít fel, egynapos tanulási terv, Emacs-parancsok és a Lib csapdái.`,
    status: "complete",
    body: `## Mi lesz a ZH-n?

A ZH1 a követelmények szerint ilyen felépítésű:
**7 feladat, 30–35 pont, 120 perc, gépen, Agdában**, a \`Lib\` könyvtárral (\`open import Lib\`). Minden feladat után
kommentben **tesztek** vannak (\`_ : ... ≡ ... ; _ = refl\`): ha kiveszed őket a kommentből és lefordul a fájl, a megoldás jó.

| # | Feladattípus | Pont | Lecke |
|---|--------------|------|-------|
| 1 | **Polimorf izomorfizmus** \`weirdEquiv₁\` (A, B, C típusváltozókkal, ⊤/⊥ „trükkökkel”) | 3 | **1** |
| 2 | **Véges izomorfizmus** \`weirdEquiv₂\` (Bool, ⊤, ⊥, Maybe) | 4 | **2** |
| 3 | **ℕ-függvény** (rekurzió / iterátor / rekurzor) | 2.5–4.5 | **3** |
| 4 | **Lista-függvény** | 3–5 | **4** |
| 5 | **Saját \`data\` + függvény rajta** | 6–6.5 | **5** |
| 6 | **Stream** (koinduktív, copattern) | 5 | **6** |
| 7 | **Koinduktív gép** (\`record … coinductive\`) | 6.5–7 | **7** |

A **8. lecke** egy általam írt **próba-ZH** ugyanebben a formában (Agda-fájl tesztekkel + megoldás) — ezt a nap végén,
**órával mérve** írd meg.

> **Követelmény:** min. **30%** és legalább **1 feladat teljesen hibátlan**. A legtöbb feladatnál: *„Ha a feladat típusa nem
> teljesen helyes, a pontból nem jár semmi.”* → **mindig a típussal kezdj**, és ellenőrizd \`C-c C-l\`-lel!

> **Stratégia a ZH-n:** az 1., 2. és 7. feladat **receptre megy** (≈14 pont) — ezekkel kezdj. A 3–6. közül azt csináld előbb, ami
> elsőre világos. Amivel elakadsz, azt hagyd \`{!!}\`-ben (a fájl így is lefordul!) és lépj tovább.

## Egynapos terv (≈ 9–10 óra)

| Idő | Mit | Lecke |
|-----|-----|-------|
| 0:00–0:30 | Ez az oldal + Emacs-parancsok kipróbálása egy üres fájlon | 0 |
| 0:30–1:45 | Elemszámok, precedencia, polimorf izomorfizmus + gyakorlás | 1 |
| 1:45–2:45 | Véges izomorfizmus (a teszteket is futtasd!) | 2 |
| *szünet* | | |
| 3:00–4:15 | ℕ: mintaillesztés, rekurzió, \`ite-ℕ\`/\`rec-ℕ\` | 3 |
| 4:15–5:15 | Listák, \`with\`, \`_==_\`, \`⦃ Eq A ⦄\` | 4 |
| *ebéd* | | |
| 5:45–6:45 | Saját \`data\` (fa, kétféle elemes lista) | 5 |
| 6:45–7:45 | Stream, copattern, guardedness | 6 |
| 7:45–8:45 | Koinduktív gépek (\`record coinductive\`) | 7 |
| *szünet* | | |
| 9:00–11:00 | **Próba-ZH** 120 percben, utána javítás a megoldással | 8 |

Ha kevesebb időd van: **1, 2, 7** (biztos pontok) → **3, 4** → **6** → **5**.

## Fájlok (a kurzus mappájában, \`ttt/src/Agda/\`, Emacsben megnyithatók)

| Fájl | Tartalom |
|------|----------|
| \`ZH1Proba.agda\` | a próba-ZH feladatai, kommentezett tesztekkel |
| \`ZH1ProbaMegoldas.agda\` | a próba-ZH megoldása |
| \`ZH1Gyakorlo.agda\` | a leckék gyakorlófeladatainak megoldásai |

Mindegyik **le van fordítva Agda 2.8-cal a kurzus \`Lib\`-jével**, minden teszt \`refl\`-lel átmegy. A portál *Fájlok* részéből is letölthetők.

## Emacs / agda-mode túlélőkészlet

| Billentyű | Mit csinál | Mikor kell |
|-----------|-----------|------------|
| \`C-c C-l\` | betölti (típusellenőrzi) a fájlt | **mindig**, minden lépés után |
| \`C-c C-,\` | a lyuk **céltípusa** + a kontextus | „mit kell ide írnom?” |
| \`C-c C-.\` | mint fent + a beírt kifejezés típusa | ellenőrzöd, hogy jó-e, amit beírtál |
| \`C-c C-c\` | **mintaillesztés** (case split) a megadott változón | \`x\` → \`inl a\`, \`inr b\`; ha **üresen** hagyod: **copattern** (a record mezőire bont!) |
| \`C-c C-SPC\` | a lyukba írt kifejezés elfogadása | |
| \`C-c C-r\` | finomítás (refine): konstruktort/függvényt tesz be, új lyukakkal | \`λ\`, \`_,_\`, … |
| \`C-c C-a\` | automatikus keresés (Agsy) | apró lyukakra néha működik |
| \`C-c C-n\` | kifejezés kiértékelése (normalizálás) | kipróbálod a függvényed: \`pow 2 10\` |
| \`C-c C-d\` | kifejezés típusa | |

Unicode bevitel: \`\\to\` →, \`\\bn\` ℕ, \`\\u+\` ⊎, \`\\x\` ×, \`\\top\` ⊤, \`\\bot\` ⊥, \`\\lr\` ↔, \`\\==\` ≡, \`\\::\` ∷, \`\\_1\` ₁, \`\\lambda\` vagy \`\\Gl\` λ, \`\\{{\` ⦃ \`\\}}\` ⦄.

## A \`Lib\` csapdái (élesben ezek viszik el az időt!)

1. **Lista- és Stream-függvények minősítve:** \`List.map\`, \`List._++_\`, \`List.length\`, \`Stream.map\`, \`Stream.iterate\`,
   \`Stream.List.take\`. A típusok (\`List\`, \`Stream\`, \`head\`, \`tail\`, \`[]\`, \`_∷_\`) minősítés nélkül is elérhetők.
2. **Névütközés:** a Lib rengeteg nevet exportál (\`max\`, \`maxℕ\`, \`curry\`, \`comm×\`, …). Ha *„Multiple definitions of …”* hibát kapsz,
   **nevezd át** a saját függvényedet (vagy \`open import Lib hiding (név)\`).
3. **Iterátor/rekurzor ℕ-en a Lib-ben: a szám az ELSŐ paraméter!** \`ite-ℕ : ℕ → A → (A → A) → A\`, \`rec-ℕ : ℕ → A → (ℕ → A → A) → A\`.
4. **Nincs csonkolt kivonás** (\`_-_\` bizonyítékot kér). Írj sajátot vagy kerüld (\`pred'\` van: \`pred' 0 = 0\`).
5. Hasznos Bool-függvények: \`if_then_else_\`, \`_==_\` (bármire, amire van \`Eq\` példány, pl. ℕ, Bool), \`_≤ᵇ_\`, \`even\`, \`not\`, \`_∧_\`, \`_∨_\`.
6. **\`--exact-split\`:** a „maradék” \`_\`-os klóz (pl. \`f _ = zero\` más klózok után) **warningot** ad. Írd ki az összes esetet.
7. **Számliterálok a tesztekben:** ha a függvényed polimorf (\`{A : Set}\`), a \`count 1 (1 ∷ 2 ∷ [])\` teszt sárga lehet, mert az \`1\` lehet
   \`ℕ\` vagy \`ℕ∞\` is. Megoldás: \`count {ℕ} (…)\`.
8. **\`let\` a rekurzív hívásra lassú lehet:** \`let k = f n in … k … k …\` a \`k\`-t kétszer számolja ki minden szinten (exponenciális!).
   Helyette segédfüggvény: \`f (suc n) = next (f n) where next k = …\`.
`,
  },
  {
    slug: "zh1-izo-polimorf",
    title: `1. Típusok, elemszámok, precedencia — polimorf izomorfizmus (1. feladat)`,
    summary: `⊤, ⊥, ⊎, ×, → és elemszámaik; hogyan kell zárójelezni; a weirdEquiv₁ receptje gyakorlófeladatokkal.`,
    status: "complete",
    body: `## Az alaptípusok (Lib)

| Típus | Elemek / konstruktorok | Eliminálás (ha van egy \`t\`-d) | Elemszám |
|-------|------------------------|-------------------------------|----------|
| \`⊤\` | \`tt\` | (nincs mit; \`t = tt\` mindig) | 1 |
| \`⊥\` | **nincs** | \`exfalso t : bármi\`, vagy **abszurd minta** \`()\` | 0 |
| \`Bool\` | \`true\`, \`false\` | \`if t then … else …\`, mintaillesztés | 2 |
| \`A ⊎ B\` | \`inl a\`, \`inr b\` | mintaillesztés \`inl a\` / \`inr b\` | \\|A\\| + \\|B\\| |
| \`A × B\` | \`a , b\` | \`fst t\`, \`snd t\`, mintaillesztés \`(a , b)\` | \\|A\\| · \\|B\\| |
| \`A → B\` | \`λ a → …\` | alkalmazás: \`t a\` | \\|B\\|^\\|A\\| |
| \`Maybe A\` | \`nothing\`, \`just a\` | mintaillesztés | 1 + \\|A\\| |

Hasznos következmények: \`A × ⊥\` **üres**, \`A × ⊤ ≅ A\`, \`A ⊎ ⊥ ≅ A\`, \`⊤ → A ≅ A\`, \`⊥ → A\` **egyelemű** (\`λ ()\`), \`A → ⊤\` egyelemű,
\`C × (C → ⊥)\` **üres** (ha lenne \`c\` és \`nc\`, akkor \`nc c : ⊥\`), \`Bool ⊎ X → ⊥\` **üres** (alkalmazd \`inl true\`-ra).

## Precedencia — itt csúszik el a legtöbb pont!

A Lib-ben: \`infixr 1 _⊎_\`, \`infixr 2 _×_\`, a \`→\` **a leggyengébb**, és **jobbra köt**. Tehát: **× köt a legerősebben, aztán ⊎, aztán →**.

\`\`\`
⊤ → A ⊎ B × ⊥ ⊎ B                 =  ⊤ → (A ⊎ ((B × ⊥) ⊎ B))
(Bool ⊎ A × B → ⊥) ⊎ A ⊎ B × ⊤    =  ((Bool ⊎ (A × B)) → ⊥) ⊎ (A ⊎ (B × ⊤))
Bool × Bool × Bool ⊎ ⊤            =  (Bool × (Bool × Bool)) ⊎ ⊤
Bool → Bool ⊎ ⊤                   =  Bool → (Bool ⊎ ⊤)
\`\`\`

A \`↔\` a Lib-ben: \`A ↔ B = (A → B) × (B → A)\` és \`infix 0\` (mindennél gyengébb). **Ha a feladat típusa tartalmaz \`→\`-t, a ↔ két oldalát
tedd zárójelbe**, különben a \`→\` „elnyeli” a ↔-t:

\`\`\`agda
weirdEquiv₁ : {A B : Set} → (⊤ → A ⊎ B × ⊥ ⊎ B) ↔ ((Bool ⊎ A × B → ⊥) ⊎ A ⊎ B × ⊤)
\`\`\`

[[feladat:0,1,2]]

## Recept: \`weirdEquiv₁\` (3 pont)

1. **Írd le a típust** pontosan a feladat szerint, \`{A B C : Set} →\` elöl, a két oldal zárójelben. \`C-c C-l\` → ha nincs hiba, megvan az alap.
2. **Egyszerűsítsd fejben** mindkét oldalt az elemszám-szabályokkal (pl. \`B × ⊥\` üres, \`X × ⊤ ≅ X\`) → kiderül, mi „valójában” mindkét oldal
   (gyakran ugyanaz: \`A ⊎ B\`, \`A → B\`, …).
3. **Két függvény** \`to\` és \`from\`, majd \`weirdEquiv₁ = to , from\`. Legkényelmesebb \`where\`-rel:
   \`\`\`agda
   weirdEquiv₁ {A} {B} = to , from where
     to   : … → …
     from : … → …
   \`\`\`
   (\`{A} {B}\` a bal oldalon: így a \`where\`-ben is látszanak a típusváltozók.)
4. Minden függvényben: \`C-c C-c\` a bemeneten → minden esetre a **megfelelő konstruktort** add vissza.
   - Ha az eset **üres típust** tartalmaz (pl. \`(b , ())\` a \`B × ⊥\`-ben): abszurd minta, nincs jobb oldal.
   - Ha van egy \`h : X → ⊥\` függvényed és egy \`x : X\`, akkor \`exfalso (h x)\`.
   - Ha a bemenet függvény (\`f : ⊤ → …\`), **alkalmazd** (\`f tt\`), és az eredményen illessz mintát (segédfüggvénnyel).
5. Ellenőrzés: oda-vissza alakítva ugyanazt kell kapnod (az információt nem dobhatod el!).

`,
    exercises: [
      {
        prompt: `Hány eleme van: \`Bool × (⊥ ⊎ ⊤)\`?`,
        solution: `|Bool| · (0 + 1) = 2 · 1 = **2**.`,
        answer: "2",
        check: "numeric",
      },
      {
        prompt: `Hány eleme van: \`⊤ → Bool → Maybe Bool\`?`,
        hint: `|B|^|A|, és a → jobbra köt: ⊤ → (Bool → Maybe Bool).`,
        solution: `\`Bool → Maybe Bool\`: 3² = 9; \`⊤ → X\` ≅ X, tehát **9**.`,
        answer: "9",
        check: "numeric",
      },
      {
        prompt: `Zárójelezd teljesen: \`A ⊎ B × C → D ⊎ ⊤\``,
        solution: `× a legerősebb, aztán ⊎, a → a leggyengébb: **\`(A ⊎ (B × C)) → (D ⊎ ⊤)\`**.`,
        answer: ["(A ⊎ (B × C)) → (D ⊎ ⊤)", "(A⊎(B×C))→(D⊎⊤)"],
        check: "code",
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`idr× : {A : Set} → A × ⊤ ↔ A\``,
        solution: `\`\`\`agda
idr× : {A : Set} → A × ⊤ ↔ A
idr× = (λ (a , _) → a) , (λ a → a , tt)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`⊎→ : {A B C : Set} → (A ⊎ B → C) ↔ (A → C) × (B → C)\``,
        hint: `to: két λ, mindkettő f-et hívja inl-lel ill. inr-rel. from: mintaillesztés a párra és az összegre.`,
        solution: `\`\`\`agda
⊎→ : {A B C : Set} → (A ⊎ B → C) ↔ (A → C) × (B → C)
⊎→ = to , from where
  to : {A B C : Set} → (A ⊎ B → C) → (A → C) × (B → C)
  to f = (λ a → f (inl a)) , (λ b → f (inr b))
  from : {A B C : Set} → (A → C) × (B → C) → (A ⊎ B → C)
  from (g , h) (inl a) = g a
  from (g , h) (inr b) = h b
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`bool→ : {A : Set} → (Bool → A) ↔ A × A\``,
        solution: `\`\`\`agda
bool→ : {A : Set} → (Bool → A) ↔ A × A
bool→ = (λ f → f true , f false) , (λ (x , y) b → if b then x else y)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`⊥→ : {A : Set} → (⊥ → A) ↔ ⊤\``,
        hint: `A ⊥-ból menő függvény: λ ()`,
        solution: `\`\`\`agda
⊥→ : {A : Set} → (⊥ → A) ↔ ⊤
⊥→ = (λ _ → tt) , (λ _ ())
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű: definiáld \`weird : {A B : Set} → (A ⊎ ⊥) × (⊤ → B) ↔ B × A\``,
        hint: `Bal oldal ≅ A × B. A to-ban az inr ()-ra nem kell klóz.`,
        solution: `\`\`\`agda
weird : {A B : Set} → (A ⊎ ⊥) × (⊤ → B) ↔ B × A
weird {A} {B} = to , from where
  to : (A ⊎ ⊥) × (⊤ → B) → B × A
  to (inl a , f) = f tt , a
  from : B × A → (A ⊎ ⊥) × (⊤ → B)
  from (b , a) = inl a , (λ _ → b)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-izo-veges",
    title: `2. Véges izomorfizmus (2. feladat) — Bool, ⊤, Maybe`,
    summary: `Hogyan párosítsd össze két véges típus elemeit; a weirdEquiv₂ receptje; a tesztek használata.`,
    status: "complete",
    body: `## Az ötlet

Két **véges** típus között akkor van izomorfizmus, ha **ugyanannyi elemük** van. A feladat: adj meg egy **párosítást** (bijekciót)
— \`to\` és \`from\` mintaillesztéssel, úgy, hogy \`from (to x) ≡ x\` és \`to (from y) ≡ y\` minden elemre.

## Recept (4 pont)

1. **Zárójelezd** a típusokat (× > ⊎ > →), és **számold meg** az elemeket mindkét oldalon (egyezniük kell!).
2. **Sorold fel** a bal oldal elemeit csoportokban (a \`⊎\` ágai szerint), és a jobb oldalét is.
3. **Párosíts csoportot csoporttal**, ahol lehet *változóval* (\`inl b ↦ …b…\`), így kevesebb klóz kell.
4. \`to\`: minden bal oldali mintára egy klóz. \`from\`: minden jobb oldalira. A **\`from\` legyen pontosan a \`to\` megfordítása**.
5. ⊥-t tartalmazó ágakra abszurd minta (\`inr ()\`), vagy el is hagyhatod (Agda magától kizárja).
6. **Futtasd a teszteket!** Ha nem mennek: először cseréld meg \`f\` és \`g\` nevét a tesztmodulban (lehet, hogy fordítva írtad a ↔-t).

### Ha az egyik oldal függvény (\`Bool → X\`)

\`Bool → X\` ≅ \`X × X\` (az értéke \`true\`-n és \`false\`-on). Tehát:
- \`from h = go (h true) (h false)\` — **alkalmazd** a függvényt mindkét Bool-ra, és a két eredményen illessz mintát egy segédfüggvényben.
- \`to … = λ b → if b then … else …\` — a két értékből építs függvényt.

`,
    exercises: [
      {
        prompt: `Hány eleme van: \`Bool × Bool × Bool ⊎ ⊤\`?`,
        solution: `(Bool × Bool × Bool) ⊎ ⊤ → 8 + 1 = **9**.`,
        answer: "9",
        check: "numeric",
      },
      {
        prompt: `Definiáld: \`bb : Bool × Bool ↔ Bool ⊎ Bool\``,
        solution: `\`\`\`agda
bb : Bool × Bool ↔ Bool ⊎ Bool
bb = to , from where
  to : Bool × Bool → Bool ⊎ Bool
  to (true , b) = inl b
  to (false , b) = inr b
  from : Bool ⊎ Bool → Bool × Bool
  from (inl b) = true , b
  from (inr b) = false , b
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`mb : Bool ⊎ ⊤ ↔ Maybe Bool\``,
        solution: `\`\`\`agda
mb : Bool ⊎ ⊤ ↔ Maybe Bool
mb = to , from where
  to : Bool ⊎ ⊤ → Maybe Bool
  to (inl b) = just b
  to (inr tt) = nothing
  from : Maybe Bool → Bool ⊎ ⊤
  from (just b) = inl b
  from nothing = inr tt
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű: definiáld \`bt : (Bool → ⊤ ⊎ ⊤) ↔ Bool × Bool\` — és teszteld: \`snd bt (fst bt (λ b → if b then inr tt else inl tt)) true ≡ inr tt\``,
        hint: `Két segédfüggvény ⊤ ⊎ ⊤ és Bool között, aztán a „Bool → X ≅ X × X” séma.`,
        solution: `\`\`\`agda
bt : (Bool → ⊤ ⊎ ⊤) ↔ Bool × Bool
bt = to , from where
  b2 : ⊤ ⊎ ⊤ → Bool
  b2 (inl tt) = true
  b2 (inr tt) = false
  t2 : Bool → ⊤ ⊎ ⊤
  t2 true = inl tt
  t2 false = inr tt
  to : (Bool → ⊤ ⊎ ⊤) → Bool × Bool
  to f = b2 (f true) , b2 (f false)
  from : Bool × Bool → (Bool → ⊤ ⊎ ⊤)
  from (x , y) b = if b then t2 x else t2 y

_ : snd bt (fst bt (λ b → if b then inr tt else inl tt)) true ≡ inr tt
_ = refl
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-nat",
    title: `3. ℕ-függvények (3. feladat) — mintaillesztés, rekurzió, ite-ℕ, rec-ℕ`,
    summary: `Rekurzió ℕ-en, terminálás, a Lib iterátora és rekurzora (a szám az első paraméter!), gyakorlófeladatokkal.`,
    status: "complete",
    body: `## ℕ és a rekurzió

\`\`\`agda
data ℕ : Set where
  zero : ℕ
  suc  : ℕ → ℕ
\`\`\`
A számliterálok (\`3\`) ℕ-ként is működnek, mintaként is (\`f 0 = …\`), de **mintában a \`suc n\` forma** a hasznos.

**Terminálás:** a rekurzív hívás argumentuma **szerkezetileg kisebb** kell legyen (\`f (suc n) = … f n …\`). Több paraméternél
**lexikografikusan** is elfogadja: \`g (suc n) m = g n (suc m)\` jó (az első csökken), \`g zero (suc (suc m)) = … g zero m\` is jó.

## Iterátor és rekurzor a Lib-ben

| | Típus (Lib) | Jelentés |
|---|---|---|
| \`ite-ℕ\` | \`ℕ → A → (A → A) → A\` | \`ite-ℕ n z s = s (s (… (s z)))\` (n-szer) |
| \`rec-ℕ\` | \`ℕ → A → (ℕ → A → A) → A\` | mint fent, de \`s\` megkapja az aktuális **k**-t is: \`rec-ℕ (suc k) z s = s k (rec-ℕ k z s)\` |

> ⚠️ **A szám az első paraméter!** (Az órai \`iteNat z s n\`-ben az utolsó.) Ha a feladat „csak iterátort/rekurzort” enged,
> akkor **nem** írhatsz mintaillesztést/rekurziót, csak \`ite-ℕ\`/\`rec-ℕ\`-t (λ-kkal).

\`\`\`agda
double : ℕ → ℕ
double n = ite-ℕ n 0 (λ k → suc (suc k))

pred'' : ℕ → ℕ
pred'' n = rec-ℕ n 0 (λ k _ → k)       -- az előző szám maga k

isEven : ℕ → Bool
isEven n = ite-ℕ n true not
\`\`\`

Ha az iterációs állapot több adat, használj **párt** (\`A = ℕ × Bool\`), és add meg a típust: \`ite-ℕ {A = ℕ × Bool} …\`
(különben a mintás λ típusát nem tudja kitalálni).

## Recept

1. Típus: \`f : ℕ → ℕ\` (vagy amit kér). \`C-c C-l\`.
2. \`C-c C-c\` a paraméteren → \`zero\` és \`suc n\` eset. Ha 2-esével / 3-asával lép a függvény, **bonts tovább** (\`suc (suc n)\`).
3. Kérdezd meg: **ha tudom \`f n\`-et, hogyan kapom \`f (suc n)\`-et?** — ez a rekurzív klóz.
4. \`C-c C-n\`-nel próbáld ki néhány értékre, aztán futtasd a teszteket.

`,
    exercises: [
      {
        prompt: `Mi \`ite-ℕ 3 1 (λ k → k * 2)\` értéke?`,
        solution: `1 → 2 → 4 → 8: **8**.`,
        answer: "8",
        check: "numeric",
      },
      {
        prompt: `Mi \`rec-ℕ 3 0 (λ k acc → k + acc)\` értéke?`,
        hint: `rec-ℕ (suc k) z s = s k (rec-ℕ k z s); a k-k: 0, 1, 2.`,
        solution: `s 2 (s 1 (s 0 0)) = 2 + (1 + (0 + 0)) = **3**.`,
        answer: "3",
        check: "numeric",
      },
      {
        prompt: `Definiáld a \`pow : ℕ → ℕ → ℕ\` hatványozást (\`pow a n = aⁿ\`) mintaillesztéssel.`,
        solution: `\`\`\`agda
pow : ℕ → ℕ → ℕ
pow a zero = 1
pow a (suc n) = a * pow a n
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld a \`mod3 : ℕ → ℕ\` függvényt csak mintaillesztéssel és rekurzióval (\`--exact-split\` mellett warning nélkül!).`,
        hint: `Négy klóz: 0, 1, 2 és suc (suc (suc n)).`,
        solution: `\`\`\`agda
mod3 : ℕ → ℕ
mod3 zero = 0
mod3 (suc zero) = 1
mod3 (suc (suc zero)) = 2
mod3 (suc (suc (suc n))) = mod3 n
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld a \`maxi : ℕ → ℕ → ℕ\` maximumot csak konstruktorokkal és rekurzióval. (Miért nem nevezheted \`max\`-nak?)`,
        solution: `A \`max\` (és \`maxℕ\`) már létezik a Lib-ben → *Multiple definitions*.

\`\`\`agda
maxi : ℕ → ℕ → ℕ
maxi zero m = m
maxi (suc n) zero = suc n
maxi (suc n) (suc m) = suc (maxi n m)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű: definiáld a \`tri n = 0 + 1 + … + n\` függvényt **csak \`rec-ℕ\`-kel** (és \`_+_\`-szal). Teszt: \`tri 10 ≡ 55\`.`,
        hint: `rec-ℕ n 0 (λ k acc → …): a k-adik lépésben (suc k)-t kell hozzáadni.`,
        solution: `\`\`\`agda
tri : ℕ → ℕ
tri n = rec-ℕ n 0 (λ k acc → suc k + acc)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-listak",
    title: `4. Listafüggvények (4. feladat) — with, _==_, ad-hoc polimorfizmus`,
    summary: `Rekurzió listán, mintaillesztés a rekurzív hívás eredményén (with), Eq-példány, gyakorlófeladatokkal.`,
    status: "complete",
    body: `## Lista a Lib-ben

\`\`\`agda
data List (A : Set) : Set where
  []  : List A
  _∷_ : A → List A → List A        -- infixr 5
\`\`\`
Függvények: \`List.map\`, \`List._++_\`, \`List.length\`, \`List.reverse\`, \`List.filterᵇ\`, \`List.foldr\` … (**minősítve!**).

## Polimorfizmus két fajtája

- **Parametrikus:** \`{A : Set} → List A → …\` — bármilyen elemtípusra, az elemekről nem tud semmit.
- **Ad-hoc** (a ZH-n +1 pont!): \`{A : Set} → ⦃ Eq A ⦄ → List A → …\` — csak olyan \`A\`-ra, aminek van **\`Eq\` példánya**
  (ℕ, Bool, …), és ekkor használhatod az **\`_==_ : A → A → Bool\`**-t. A \`⦃ ⦄\` = \`\\{{\` és \`\\}}\`.

## \`with\`: mintaillesztés egy kiszámolt értéken

\`\`\`agda
keepEven : List ℕ → List ℕ
keepEven [] = []
keepEven (x ∷ xs) with even x
... | true  = x ∷ keepEven xs
... | false = keepEven xs
\`\`\`
Agdában: írd be \`with even x\`, \`C-c C-l\`, majd a \`...\` sorban \`C-c C-c\` a with-változón.
(Alternatíva: segédfüggvény, ami a \`Bool\`-ra illeszt mintát.)

## Recept

1. Típus! Polimorf? Kell-e \`==\`? → \`⦃ Eq A ⦄\`.
2. \`C-c C-c\` a listán: \`[]\` és \`x ∷ xs\`.
3. A \`x ∷ xs\` esetben gondolj úgy, hogy **\`f xs\` már kész** (rekurzió) — hogyan teszed hozzá \`x\`-et? Ha az \`f xs\` eredményének
   *alakja* számít (pl. az első csoport), használj **\`with f xs\`**-t.
4. Tesztek polimorf függvénynél: \`count {ℕ} (…)\` (különben a literálok típusa nem egyértelmű).

`,
    exercises: [
      {
        prompt: `Definiáld: \`sum : List ℕ → ℕ\``,
        solution: `\`\`\`agda
sum : List ℕ → ℕ
sum [] = 0
sum (x ∷ xs) = x + sum xs
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`tails : {A : Set} → List A → List (List A)\`, pl. \`tails (1 ∷ 2 ∷ []) ≡ (1 ∷ 2 ∷ []) ∷ (2 ∷ []) ∷ [] ∷ []\``,
        solution: `\`\`\`agda
tails : {A : Set} → List A → List (List A)
tails [] = [] ∷ []
tails (x ∷ xs) = (x ∷ xs) ∷ tails xs
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`myFilter : {A : Set} → (A → Bool) → List A → List A\``,
        solution: `\`\`\`agda
myFilter : {A : Set} → (A → Bool) → List A → List A
myFilter p [] = []
myFilter p (x ∷ xs) = if p x then x ∷ myFilter p xs else myFilter p xs
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld **ad-hoc polimorfan**: \`count : … → A → List A → ℕ\` (hányszor szerepel az elem). Teszt: \`count {ℕ} 3 (3 ∷ 1 ∷ 3 ∷ 3 ∷ []) ≡ 3\``,
        solution: `\`\`\`agda
count : {A : Set} → ⦃ Eq A ⦄ → A → List A → ℕ
count a [] = 0
count a (x ∷ xs) = if a == x then suc (count a xs) else count a xs
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`lastM : {A : Set} → List A → Maybe A\` (az utolsó elem, ha van).`,
        solution: `\`\`\`agda
lastM : {A : Set} → List A → Maybe A
lastM [] = nothing
lastM (x ∷ []) = just x
lastM (x ∷ y ∷ xs) = lastM (y ∷ xs)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű: \`runLength\` — \`runLength (1 ∷ 1 ∷ 2 ∷ 3 ∷ 3 ∷ 3 ∷ 1 ∷ []) ≡ (1 , 2) ∷ (2 , 1) ∷ (3 , 3) ∷ (1 , 1) ∷ []\`, ad-hoc polimorf típussal.`,
        hint: `with runLength xs, és nézd meg az első párt: ugyanaz az elem jön-e.`,
        solution: `\`\`\`agda
runLength : {A : Set} → ⦃ Eq A ⦄ → List A → List (A × ℕ)
runLength [] = []
runLength (x ∷ xs) with runLength xs
... | [] = (x , 1) ∷ []
... | (y , n) ∷ rest = if x == y then (y , suc n) ∷ rest else (x , 1) ∷ (y , n) ∷ rest
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-data",
    title: `5. Saját adattípus (5. feladat) — data, pozitivitás, fa és kétféle elemes lista`,
    summary: `Hogyan definiálj data-t a leírás alapján, mi a szigorú pozitivitás, gyakorlófeladatokkal.`,
    status: "complete",
    body: `## \`data\` definiálása

\`\`\`agda
data T (A : Set) : Set where     -- A: paraméter (minden konstruktornál ugyanaz)
  c₁ : A → T A                   -- minden konstruktor T A-ba tér vissza!
  c₂ : T A → A → T A → T A       -- rekurzív konstruktor
\`\`\`
Szabályok (a beugróban is kérdezik!):
- Minden konstruktor eredménytípusa **maga a definiált típus** (\`ctor2 : Bool → Bool\` hibás).
- **Szigorú pozitivitás:** a definiált típus egy konstruktor paraméterében **nem lehet \`→\` bal oldalán**:
  \`(D → D) → D\` ✗, \`(D → Bool) → D\` ✗, \`(ℕ → D) → D\` ✓, \`D → D → D\` ✓, \`List D → D\` ✓.

## Recept

1. Olvasd ki a leírásból a **konstruktorokat**: „mi lehet egy ilyen érték?” Minden eset egy konstruktor.
   - „levélben és csomópontban is van adat” → \`leaf : A → T A\`, \`node : T A → A → T A → T A\`
   - „két különböző típusú elem bármilyen sorrendben” → két „cons”: \`_∷ᴬ_ : A → …\`, \`_∷ᴮ_ : B → …\`
2. Ha tiltott a segédtípus (×, ⊎, ⊤ …): **minden adatot külön paraméterként** add a konstruktornak.
3. Függvény rajta: \`C-c C-c\` → minden konstruktorra egy klóz, a rekurzív részekre rekurzív hívás.
4. Ha bonyolult: **ne a típuson belül** oldd meg — alakítsd át egyszerűbbre (két lista), és építsd vissza.

## Iterátor típusa (elmélet, a beugróhoz is)

Az iterátor minden konstruktorhoz kap egy „függvényt”, amelyben a rekurzív \`T\` helyére \`M\` kerül:
\`\`\`
data 𝔹 : Set where  C1 : ⊥ → 𝔹 ;  C3 : ⊤ → 𝔹 ;  C4 : 𝔹 → 𝔹
ite𝔹 : {M : Set} → (⊥ → M) → (⊤ → M) → (M → M) → 𝔹 → M
\`\`\`

[[feladat:0,1,2,3,4,5]]
`,
    exercises: [
      {
        prompt: `Melyik konstruktor sérti a szigorú pozitivitást? \`C1 : (ℕ → D) → D\`, \`C2 : (D → D) → (D → D) → D\`, \`C3 : ⊥ → D\`, \`C4 : (D → D) → D\`, \`C5 : (D → ⊤) → D\``,
        solution: `Ahol \`D\` egy \`→\` **bal** oldalán áll a paraméterben: **C2, C4, C5**. (C1 jó: ott D csak jobb oldalon van; C3 jó.)`,
        answer: ["C2, C4, C5", "C2,C4,C5", "C2 C4 C5"],
        check: "text",
      },
      {
        prompt: `Mik a hibák? \`data 𝔻 : Set where ctor : (𝔻 → Bool) → 𝔻 ; ctor2 : Bool → Bool\``,
        solution: `1. \`ctor\` nem szigorúan pozitív (𝔻 a \`→\` bal oldalán).
2. \`ctor2\` nem a 𝔻 típusba tér vissza.`,
        multiline: true,
      },
      {
        prompt: `Definiálj egy \`Tree A\` típust, ahol a levél **üres** (\`empty\`), a csomópontban van adat; és a \`size : {A : Set} → Tree A → ℕ\` függvényt (a csomópontok száma).`,
        solution: `\`\`\`agda
data Tree (A : Set) : Set where
  empty : Tree A
  node  : Tree A → A → Tree A → Tree A

size : {A : Set} → Tree A → ℕ
size empty = 0
size (node l _ r) = suc (size l + size r)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Az előző \`Tree\`-re: \`mirror\` (tükrözés) és \`preorder\` (gyökér, bal, jobb) bejárás.`,
        solution: `\`\`\`agda
mirror : {A : Set} → Tree A → Tree A
mirror empty = empty
mirror (node l a r) = node (mirror r) a (mirror l)

preorder : {A : Set} → Tree A → List A
preorder empty = []
preorder (node l a r) = a ∷ (preorder l List.++ preorder r)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiálj egy **nem üres lista** típust \`NonEmpty\` (\`[_]\` és \`_∷⁺_\` konstruktorral), és \`maxNE : NonEmpty ℕ → ℕ\`-t.`,
        solution: `\`\`\`agda
data NonEmpty (A : Set) : Set where
  [_]  : A → NonEmpty A
  _∷⁺_ : A → NonEmpty A → NonEmpty A
infixr 5 _∷⁺_

maxNE : NonEmpty ℕ → ℕ
maxNE [ a ] = a
maxNE (a ∷⁺ as) = maxi a (maxNE as)     -- maxi: a 3. leckéből
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű (próba-ZH 5.): \`Expr\` = \`lit : ℕ → Expr\`, \`_:+_\`, \`_:*_\`, \`ifZero : Expr → Expr → Expr → Expr\`, és \`eval : Expr → ℕ\`. Teszt: \`eval (lit 3 :+ lit 4 :* lit 5) ≡ 23\`.`,
        hint: `Fixitás: infixl 6 _:+_, infixl 7 _:*_. Az ifZero-nál: with eval c.`,
        solution: `\`\`\`agda
data Expr : Set where
  lit     : ℕ → Expr
  _:+_    : Expr → Expr → Expr
  _:*_    : Expr → Expr → Expr
  ifZero  : Expr → Expr → Expr → Expr
infixl 6 _:+_
infixl 7 _:*_

eval : Expr → ℕ
eval (lit n) = n
eval (e :+ f) = eval e + eval f
eval (e :* f) = eval e * eval f
eval (ifZero c t e) with eval c
... | zero  = eval t
... | suc _ = eval e
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-stream",
    title: `6. Stream (6. feladat) — koinduktív típus, copattern, guardedness`,
    summary: `A Stream mint record (head, tail), definiálás copatternnel, a guardedness szabály, gyakorlófeladatokkal.`,
    status: "complete",
    body: `## Stream a Lib-ben

\`\`\`agda
record Stream (A : Set) : Set where
  coinductive
  constructor _∷_
  field
    head : A
    tail : Stream A
\`\`\`
Egy végtelen sorozatot **nem felsorolással**, hanem azzal adunk meg, hogy **mit ad a \`head\` és mit a \`tail\`** — ez a **copattern**:

\`\`\`agda
from : ℕ → Stream ℕ
head (from n) = n
tail (from n) = from (suc n)
\`\`\`
Emacsben: írd le a típust és \`from n = {!!}\`, majd a lyukban **üres** \`C-c C-c\` → létrehozza a \`head (from n)\` és \`tail (from n)\` sorokat.

Hasznos Lib-függvények: \`Stream.map\`, \`Stream.iterate f x\` (x, f x, f (f x), …), \`Stream.repeat x\`, \`Stream.[0-∞]\`,
\`Stream.[ n …]\`, \`s Stream.‼ n\` (n-edik elem), \`Stream.List.take n s\` (első n elem listában), \`Stream.List._++_\` (lista elé fűzés).

## Guardedness — mikor fogadja el Agda?

A \`tail\` sorban a korekurzív hívásnak **közvetlenül** kell ott állnia (vagy \`_∷_\` konstruktor alatt):
- ✓ \`tail (f s) = f (tail s)\` — közvetlenül
- ✓ \`tail (f s) = x ∷ f s'\`
- ✗ \`tail (f s) = Stream.map g (f s)\` — függvény (map) alatt van a hívás
- ✗ \`tail (f s) = if b then f s1 else f s2\` — \`if\` alatt! Helyette: \`f (if b then s1 else s2)\`

## Recept

1. Típus. Ha mátrix / szalag kell: definiálj **típusszinonimát** vagy recordot (\`Matrix A = Stream (Stream A)\`).
2. Copattern: mit ad \`head\`? Mit ad \`tail\`? A \`tail\` szinte mindig: **ugyanaz a függvény, „egy lépéssel arrébb”** paraméterekkel.
3. Teszt: \`Stream.List.take 5 (f …) ≡ … ∷ []\`.

`,
    exercises: [
      {
        prompt: `Definiáld a Fibonacci-streamet: \`fibFrom : ℕ → ℕ → Stream ℕ\`, \`Stream.List.take 7 (fibFrom 0 1) ≡ 0 ∷ 1 ∷ 1 ∷ 2 ∷ 3 ∷ 5 ∷ 8 ∷ []\``,
        solution: `\`\`\`agda
fibFrom : ℕ → ℕ → Stream ℕ
head (fibFrom a b) = a
tail (fibFrom a b) = fibFrom b (a + b)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`zipWithS : {A B C : Set} → (A → B → C) → Stream A → Stream B → Stream C\``,
        solution: `\`\`\`agda
zipWithS : {A B C : Set} → (A → B → C) → Stream A → Stream B → Stream C
head (zipWithS f s t) = f (head s) (head t)
tail (zipWithS f s t) = zipWithS f (tail s) (tail t)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld: \`partialSums : Stream ℕ → Stream ℕ\` (részletösszegek: 1,2,3,… ↦ 1,3,6,…).`,
        hint: `Segédfüggvény akkumulátorral, copatternnel a where-ben.`,
        solution: `\`\`\`agda
partialSums : Stream ℕ → Stream ℕ
partialSums s = go 0 s where
  go : ℕ → Stream ℕ → Stream ℕ
  head (go acc s) = acc + head s
  tail (go acc s) = go (acc + head s) (tail s)
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Definiáld egy végtelen mátrix főátlóját: \`diagonal : {A : Set} → Stream (Stream A) → Stream A\``,
        hint: `A következő átlóelem a mátrix első sora és első oszlopa nélküli rész átlójának feje.`,
        solution: `\`\`\`agda
diagonal : {A : Set} → Stream (Stream A) → Stream A
head (diagonal m) = head (head m)
tail (diagonal m) = diagonal (Stream.map tail (tail m))
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű (próba-ZH 6.): \`interleave\` (két stream felváltva, az elsővel kezdve) és \`everyOther\` (a 0., 2., 4., … elemek).`,
        hint: `interleave: a tail-ben cseréld meg a két streamet!`,
        solution: `\`\`\`agda
interleave : {A : Set} → Stream A → Stream A → Stream A
head (interleave s t) = head s
tail (interleave s t) = interleave t (tail s)

everyOther : {A : Set} → Stream A → Stream A
head (everyOther s) = head s
tail (everyOther s) = everyOther (tail (tail s))
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-gepek",
    title: `7. Koinduktív gépek (7. feladat) — record coinductive, destruktorok`,
    summary: `Hogyan lesz a leírásból record-mezőlista, és a gép belső állapotából konstruáló függvény, gyakorlófeladatokkal.`,
    status: "complete",
    body: `## A gép = koinduktív record

Egy „gép” **műveletei a destruktorai** (record-mezők). Minden művelet típusa a leírásból jön:

| Leírás | Mező típusa |
|--------|-------------|
| „le lehet kérdezni egy X-et” | \`get : X\` |
| „be lehet adni neki egy X-et” | \`put : X → Machine\` |
| „van egy gombja” | \`press : Machine\` |
| „be lehet adni egy X-et, és visszaad egy Y-t” | \`f : X → Y × Machine\` (ritka) |

Tipikus kérdés: *„beadni Bool-t, megnyomni egy gombot, elkérni egy Bool-t”* → a destruktorok típusa (a gépet \`X\`-szel jelölve):
\`X → Bool → X\`, \`X → X\`, \`X → Bool\`.

## Recept (2 + 0.5 + 4–4.5 pont)

1. **Record** (2 pont): \`record M : Set where coinductive ; field …\` — mezők a leírás szerint, **a megadott nevekkel**!
2. **Konstruáló függvény típusa** (0.5 pont): a paraméterei = **amit a gép memóriája tárol** (lista, két szám, …):
   \`counter : ℕ → Counter\`.
3. **Copattern** (üres \`C-c C-c\`): minden mezőhöz egy sor.
   - lekérdezés → visszaadod a tárolt adatot (vagy ami belőle kell);
   - művelet → **ugyanaz a függvény, új memóriával**: \`inc (counter n) = counter (suc n)\`.
4. A **számolást** (rendezett beszúrás, kiosztás) **külön segédfüggvénybe** írd, ami sima \`List\`/\`ℕ\` függvény.
5. ⚠️ **\`if\` a korekurzív hívás körül nem guarded!** \`if c then m x else m y\` ✗ → \`m (if c then x else y)\` ✓.
6. A tesztekben: \`open M\` (vagy \`M.get\` stb.).

`,
    exercises: [
      {
        prompt: `Egy gépről: *„le lehet kérni egy számot; be lehet adni egy Bool-t; van egy reset gombja.”* Írd fel a recordot (\`NumMachine\`).`,
        solution: `\`\`\`agda
record NumMachine : Set where
  coinductive
  field
    get   : ℕ
    give  : Bool → NumMachine
    reset : NumMachine
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Számláló gép: \`value : ℕ\`, \`inc\`, \`dec\` (0 alá nem megy), \`reset\` (0-ra). Írd meg a recordot és a \`counter : ℕ → Counter\` függvényt.`,
        solution: `\`\`\`agda
record Counter : Set where
  coinductive
  field
    value : ℕ
    inc   : Counter
    dec   : Counter
    reset : Counter
open Counter

counter : ℕ → Counter
value (counter n) = n
inc (counter n) = counter (suc n)
dec (counter n) = counter (pred' n)
reset (counter n) = counter 0
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `Bankszámla: \`balance : ℕ\`, \`deposit : ℕ → Account\`, \`withdraw : ℕ → Account\` (csak ha van rá fedezet, különben nem változik). Vigyázz a guardedness-re!`,
        hint: `A Lib-ben nincs csonkolt kivonás: írj egy monus függvényt. Az if a konstruáló függvény ARGUMENTUMÁBA kerüljön.`,
        solution: `\`\`\`agda
record Account : Set where
  coinductive
  field
    balance  : ℕ
    deposit  : ℕ → Account
    withdraw : ℕ → Account
open Account

monus : ℕ → ℕ → ℕ
monus n zero = n
monus zero (suc m) = zero
monus (suc n) (suc m) = monus n m

account : ℕ → Account
balance (account b) = b
deposit (account b) n = account (b + n)
withdraw (account b) n = account (if n ≤ᵇ b then monus b n else b)
-- ✗ withdraw (account b) n = if n ≤ᵇ b then account (monus b n) else account b
--   → Termination checking failed!
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `ZH-szintű (próba-ZH 7.): \`StackMachine\` — \`top : Maybe ℕ\`, \`size : ℕ\`, \`push : ℕ → …\`, \`pop\`, \`add\` (a felső kettő helyett az összegük; ha < 2 elem, semmi). \`stackMachine : List ℕ → StackMachine\`.`,
        solution: `\`\`\`agda
record StackMachine : Set where
  coinductive
  field
    top  : Maybe ℕ
    size : ℕ
    push : ℕ → StackMachine
    pop  : StackMachine
    add  : StackMachine
open StackMachine

stackMachine : List ℕ → StackMachine
top (stackMachine []) = nothing
top (stackMachine (x ∷ xs)) = just x
size (stackMachine xs) = List.length xs
push (stackMachine xs) n = stackMachine (n ∷ xs)
pop (stackMachine []) = stackMachine []
pop (stackMachine (x ∷ xs)) = stackMachine xs
add (stackMachine (x ∷ y ∷ xs)) = stackMachine (x + y ∷ xs)
add (stackMachine []) = stackMachine []
add (stackMachine (x ∷ [])) = stackMachine (x ∷ [])
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
  {
    slug: "zh1-proba",
    title: `8. Próba-ZH — 120 perc, 35 pont, tesztekkel`,
    summary: `Egy saját írású, teljes ZH1-szerkezetű próba (ZH1Proba.agda), értékelési útmutató és a feladatonkénti megoldás.`,
    status: "complete",
    body: `## Hogyan írd meg

1. Nyisd meg Emacsben: \`ttt/src/Agda/ZH1Proba.agda\` (vagy töltsd le a *Fájlok* közül, és tedd a \`Lib.agda\` mellé).
2. Indíts egy **120 perces** órát. Jegyzet, a saját gyakorlófájljaid használhatók (a ZH-n is a saját géped/labor van).
3. Minden feladatnál: **típus → \`C-c C-l\` → kitöltés → tesztek kivétele a kommentből → \`C-c C-l\`**.
4. A végén hasonlítsd össze: \`ZH1ProbaMegoldas.agda\`, illetve lent a feladatonkénti megoldások.

| # | Feladat | Pont | Lecke |
|---|---------|------|-------|
| 1 | \`weirdEquiv₁ : (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) ↔ (A → B)\` | 3 | 1 |
| 2 | \`weirdEquiv₂ : Maybe Bool × Bool ↔ Bool ⊎ Bool × Bool\` | 4 | 2 |
| 3 | \`tri\` csak \`rec-ℕ\`-kel, \`div3\` csak mintaillesztéssel | 4.5 | 3 |
| 4 | \`runLength\` (ad-hoc polimorf) | 5 | 4 |
| 5 | \`Expr\` + \`eval\` | 6.5 | 5 |
| 6 | \`interleave\`, \`everyOther\` (Stream) | 5 | 6 |
| 7 | \`StackMachine\` + \`stackMachine\` | 7 | 7 |

**Értékelés:** ≥ 10.5 pont (30%) és 1 hibátlan feladat → átmentél; ≥ 17.5 (50%) → jó úton vagy; ≥ 26 → nyugodtan aludj. 😴

> Ha valamelyik feladat 15 percnél tovább tart: jelöld meg, lépj tovább, a végén térj vissza. Ugyanezt csináld holnap is!

## Feladatonkénti megoldások

A megoldás a **✅ Megoldás** gombbal nyílik — előbb próbáld meg magad!

[[feladat:0,1,2,3,4,5,6]]

## Utolsó ellenőrzőlista a ZH előtt

- [ ] \`C-c C-l\`, \`C-c C-,\`, \`C-c C-c\` (üresen is → copattern!), \`C-c C-n\` megy kézből
- [ ] Precedencia: × > ⊎ > →, a ↔ két oldalát zárójelezem
- [ ] \`ite-ℕ\`/\`rec-ℕ\`: **a szám az első** paraméter
- [ ] \`List.\`/\`Stream.\` előtag, névütközésnél átnevezés
- [ ] \`⦃ Eq A ⦄\` + \`_==_\` az ad-hoc polimorf típushoz
- [ ] Koinduktív hívás nincs \`if\` / \`map\` alatt
- [ ] Polimorf tesztnél \`{ℕ}\` a literálok miatt
- [ ] Ami nem megy, \`{!!}\`-ben marad — a fájl így is lefordul, a többi feladat pontot ér
`,
    exercises: [
      {
        prompt: `**1. feladat (3 p):** \`weirdEquiv₁ : {A B : Set} → (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) ↔ (A → B)\``,
        hint: `Bal: (⊥ ⊎ (A × ⊤)) → (B ⊎ (B × ⊥)) ≅ A → B. Kell egy getB : B ⊎ B × ⊥ → B.`,
        solution: `\`\`\`agda
weirdEquiv₁ : {A B : Set} → (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) ↔ (A → B)
weirdEquiv₁ {A} {B} = to , from where
  getB : B ⊎ B × ⊥ → B
  getB (inl b) = b
  getB (inr (_ , ()))
  to : (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) → (A → B)
  to f a = getB (f (inr (a , tt)))
  from : (A → B) → (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥)
  from g (inr (a , tt)) = inl (g a)      -- az inl ()-t Agda magától kizárja
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**2. feladat (4 p):** \`weirdEquiv₂ : Maybe Bool × Bool ↔ Bool ⊎ Bool × Bool\``,
        hint: `3·2 = 6 = 2 + 4. nothing ↔ inl, just a ↔ inr.`,
        solution: `\`\`\`agda
weirdEquiv₂ : Maybe Bool × Bool ↔ Bool ⊎ Bool × Bool
weirdEquiv₂ = to , from where
  to : Maybe Bool × Bool → Bool ⊎ Bool × Bool
  to (nothing , b) = inl b
  to (just a , b)  = inr (a , b)
  from : Bool ⊎ Bool × Bool → Maybe Bool × Bool
  from (inl b) = nothing , b
  from (inr (a , b)) = just a , b
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**3. feladat (4.5 p):** \`tri\` csak \`rec-ℕ\`-kel, \`div3\` = ⌊n/3⌋ csak mintaillesztéssel.`,
        solution: `\`\`\`agda
tri : ℕ → ℕ
tri n = rec-ℕ n 0 (λ k acc → suc k + acc)

div3 : ℕ → ℕ
div3 zero = zero
div3 (suc zero) = zero
div3 (suc (suc zero)) = zero
div3 (suc (suc (suc n))) = suc (div3 n)
-- a 'div3 _ = zero' maradék-klóz --exact-split mellett warningot ad!
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**4. feladat (5 p):** \`runLength\` ad-hoc polimorf típussal.`,
        solution: `\`\`\`agda
runLength : {A : Set} → ⦃ Eq A ⦄ → List A → List (A × ℕ)
runLength [] = []
runLength (x ∷ xs) with runLength xs
... | [] = (x , 1) ∷ []
... | (y , n) ∷ rest = if x == y then (y , suc n) ∷ rest else (x , 1) ∷ (y , n) ∷ rest
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**5. feladat (6.5 p):** \`Expr\` és \`eval\`.`,
        solution: `\`\`\`agda
data Expr : Set where
  lit     : ℕ → Expr
  _:+_    : Expr → Expr → Expr
  _:*_    : Expr → Expr → Expr
  ifZero  : Expr → Expr → Expr → Expr
infixl 6 _:+_
infixl 7 _:*_

eval : Expr → ℕ
eval (lit n) = n
eval (e :+ f) = eval e + eval f
eval (e :* f) = eval e * eval f
eval (ifZero c t e) with eval c
... | zero  = eval t
... | suc _ = eval e
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**6. feladat (5 p):** \`interleave\` és \`everyOther\`.`,
        solution: `\`\`\`agda
interleave : {A : Set} → Stream A → Stream A → Stream A
head (interleave s t) = head s
tail (interleave s t) = interleave t (tail s)

everyOther : {A : Set} → Stream A → Stream A
head (everyOther s) = head s
tail (everyOther s) = everyOther (tail (tail s))
\`\`\``,
        multiline: true,
        palette: "agda",
      },
      {
        prompt: `**7. feladat (7 p):** \`StackMachine\` + \`stackMachine : List ℕ → StackMachine\`.`,
        solution: `\`\`\`agda
record StackMachine : Set where
  coinductive
  field
    top  : Maybe ℕ
    size : ℕ
    push : ℕ → StackMachine
    pop  : StackMachine
    add  : StackMachine
open StackMachine

stackMachine : List ℕ → StackMachine
top (stackMachine []) = nothing
top (stackMachine (x ∷ xs)) = just x
size (stackMachine xs) = List.length xs
push (stackMachine xs) n = stackMachine (n ∷ xs)
pop (stackMachine []) = stackMachine []
pop (stackMachine (x ∷ xs)) = stackMachine xs
add (stackMachine (x ∷ y ∷ xs)) = stackMachine (x + y ∷ xs)
add (stackMachine []) = stackMachine []
add (stackMachine (x ∷ [])) = stackMachine (x ∷ [])
\`\`\``,
        multiline: true,
        palette: "agda",
      },
    ],
  },
];
