import type { Subject } from "@/lib/types";

export const funkcionalisProgramozas: Subject = {
  slug: "funkcionalis-programozas",
  name: "Funkcionális programozás",
  short: "Funkcprog",
  accent: "#a077cf",
  tagline: "Haskell: típusok, rekurzió, magasabb rendű függvények.",
  location: "Hétfő 12:00–14:00 EA · 14:00–16:00 Labor",
  requirementsSource: "Funkcprog/kovetelmeny.md",
  requirementsMd: `
A tárgyat egy **sikeres vizsgával** lehet teljesíteni. Előfeltétel: a gyakorlati követelmények teljesítése és az előadások látogatása.

## Előadás
Látogatása **kötelező**, legfeljebb **négy** hiányzás.

## Gyakorlat (négy rész)
- **Jelenlét:** legfeljebb **3 hiányzás**, különben nincs jegy.
- **Röpdolgozatok:** kb. **12 db** a féléven át, 1-1 pont. A max. pontok legalább **50%-a** kell. **Nem javítható/pótolható.**
- **Beadandók:** hetente (összesen 11–12), a **TMS**-ben. Csak az vizsgázhat, akinek **legfeljebb 3** elutasított/hiányos beadandója van. Önállóan, másolás tilos.
- **Félévközi zárthelyi:** évfolyamszintű géptermi ZH, 45–50 perc, **6 pont**, min. **1 pont**. A pontszáma **hozzáadódik a vizsgához**.

## Vizsga (két rész)
- **Elméleti teszt (20 perc):** 12 kérdés, min. **7 helyes**.
- **Programozási rész (90 perc):** **18 pont**, min. **8 pont** működő megoldásból, és **legalább egy rekurzív** definíció.

## Értékelés
Vizsga 30 pont + félévközi ZH 6 pont = **36 pont**.

| Pont | Jegy |
|------|------|
| 30+ | jeles (5) |
| 25+ | jó (4) |
| 20+ | közepes (3) |
| 16+ | elégséges (2) |
| <16 | elégtelen (1) |

Sikeres, ha: teszt ≥ 7, programozás ≥ 8 (működő), és van rekurzív definíció.

## Segédanyagok a vizsgán
Haskell könyvtár-dokumentáció, Hoogle, tárgy honlapja, Cheat Sheet.

## Időpontok
- Röpdolgozat / beadandó: **hetente**.
- Zárthelyi: **2026. október** (TBA), pótZH: **2026. november** (TBA).
- Vizsga: TBA (Neptun).
- **Konzultáció:** péntekenként **12:00–14:00**, Programozási Nyelvi labor (00-803).
`,
  files: [
    { name: "Előadás + Gyakorlat tematika (PDF)", path: "/materials/Funkcprog/Funkcionalis_programozas_EA+GY_26-27-1.pdf", kind: "pdf" },
    { name: "FPEA_01.hs — 1. előadás kód", path: "/materials/Funkcprog/FPEA_01.hs", kind: "code" },
    { name: "FPEA_02.hs — 2. előadás kód", path: "/materials/Funkcprog/FPEA_02.hs", kind: "code" },
    { name: "Haskell/gyak2.hs", path: "/materials/Funkcprog/Haskell/gyak2.hs", kind: "code" },
    { name: "hazi.hs", path: "/materials/Funkcprog/hazi.hs", kind: "code" },
    { name: "Jegyzetek — 01 Bevezető a Haskell nyelvbe", path: "/materials/Funkcprog/jegyzetek/01_Bevezeto_a_Haskell_nyelvbe.md", kind: "md" },
    { name: "Jegyzetek — 03 Egész számok, rekurzió", path: "/materials/Funkcprog/jegyzetek/03_Egesz_szamok_rekurzio.md", kind: "md" },
    { name: "Jegyzetek — 05 Listák", path: "/materials/Funkcprog/jegyzetek/05_Listak.md", kind: "md" },
    { name: "Jegyzetek — 08 Listakifejezések", path: "/materials/Funkcprog/jegyzetek/08_Listakifejezesek.md", kind: "md" },
    { name: "Jegyzetek — 09 Algebrai adattípus", path: "/materials/Funkcprog/jegyzetek/09_Algebrai_adattipus.md", kind: "md" },
    { name: "Jegyzetek — 11 Magasabb rendű függvények", path: "/materials/Funkcprog/jegyzetek/11_Magasabb_rendu_fuggvenyek.md", kind: "md" },
    { name: "Jegyzetek — O3 Cheat sheet", path: "/materials/Funkcprog/jegyzetek/O3_Cheat_sheet.md", kind: "md" },
    { name: "Jegyzetek — teljes mappa (README)", path: "/materials/Funkcprog/jegyzetek/README.md", kind: "md" },
  ],
  events: [
    { id: "fp-rop", type: "ropzh", title: "Heti röpdolgozat", topic: "Az aktuális gyakorlat anyaga.", note: "Kb. 12 db, 1-1 pont, min. 50%. Nem javítható/pótolható.", recurring: true },
    { id: "fp-bead", type: "beadando", title: "Heti beadandó (TMS)", topic: "A gyakorlat témájához.", note: "Max. 3 elutasított lehet. Önállóan!", recurring: true },
    { id: "fp-zh", type: "zh", title: "Félévközi (évfolyam) ZH", tba: true, date: "2026-10-15", topic: "Géptermi, a féléves anyag. 45–50 perc, 6 pont, min. 1.", note: "Október (pontos időpont TBA). Pontja beszámít a vizsgába." },
    { id: "fp-potzh", type: "potzh", title: "Pót-zárthelyi", tba: true, date: "2026-11-15", topic: "A félévközi ZH pótlása.", note: "November (pontos időpont TBA)." },
    { id: "fp-vizsga", type: "vizsga", title: "Vizsga", tba: true, topic: "Elméleti teszt (12 kérdés) + programozás (18 pont).", note: "Neptun jelentkezés. Időpont TBA." },
    { id: "fp-konz", type: "konzultacio", title: "Konzultáció", topic: "Péntek 12:00–14:00, Prog. Nyelvi labor (00-803).", recurring: true },
  ],
  lessons: [
    {
      slug: "alapok",
      title: "1. Alapok — függvények, típusok, GHCi",
      summary: "Függvényalkalmazás zárójel nélkül, típusszignatúrák, operátorok, GHCi parancsok.",
      status: "complete",
      body: `
## Miről szól?

A funkcionális programozásban a **függvény** a központi elem: minden érték
függvényből és függvényalkalmazásból épül fel, nincs mellékhatás, a
kiértékelés **lusta** (csak akkor számol, ha az eredményre tényleg szükség van).

## Függvényalkalmazás

A függvény nevét írjuk előre, a paramétereket **szóközzel** elválasztva — **nem
zárójelezzük** őket:

\`\`\`haskell
circle 5        -- helyes:  'circle' függvény, paramétere 5
rect 10 12      -- két paraméter, szóközzel
circle (2 + 3)  -- ha a paraméter kifejezés, AZT zárójelezzük
\`\`\`

> A zárójel csak a kifejezések csoportosítására szolgál — a hívást **soha** ne
> írd \`circle(5)\` alakban.

## Típusok és szignatúrák

Minden értéknek van **típusa**, ami meghatározza, milyen műveletek végezhetők
rajta. A típust a \`::\` jelöléssel írjuk le:

\`\`\`haskell
circle :: Double -> Diagram          -- egy Double-t vár, Diagram-ot ad
rect   :: Double -> Double -> Diagram -- két Double-t vár
\`\`\`

A nyíl (\`->\`) nem csak a paraméter és az eredmény közé kerül, hanem a
paraméterek közé is. Egyelőre fogadd el, később kiderül, miért (curry-zés).

## Operátorok, kötési erő

Az **operátor** speciális, szimbólumokból álló függvény, amit **infix** (két
kifejezés közé) írunk: \`+\`, \`*\`, \`<|>\` stb. A kötési erő (0–9) dönti el a
sorrendet — mint matekban a szorzás az összeadás előtt:

\`\`\`haskell
3 + 4 * 5   -- = 23, mert a (*) erősebben köt, mint a (+)
\`\`\`

Bármely kétparaméteres függvényt infixként használhatsz backtick közé téve:

\`\`\`haskell
mod 10 3     -- prefix
10 \`mod\` 3  -- ugyanaz, infix
\`\`\`

## GHCi — az interaktív értelmező

- Betöltés: \`:l fajl.hs\`, újratöltés: \`:r\`
- Egy kifejezés típusa: \`:t kifejezes\` (nem értékeli ki, csak a típust írja ki)
- Kilépés: \`:q\`

\`\`\`haskell
Prelude> :t (+)
(+) :: Num a => a -> a -> a
\`\`\`

A \`Num a =>\` egy **típusosztály-megszorítás**: az \`a\` valamilyen szám.
`,
      exercises: [
        {
          prompt: "Mi a `rect 10 (2 + 3)` kifejezés jelentése — hány paramétert kap a `rect`, és mik az értékei?",
          hint: "A szóköz választja el a paramétereket; a zárójel egy kifejezést fog össze.",
          solution: "Két paramétert kap: `10` és `5` (a `2 + 3` kiértékelve). A zárójel csak azért kell, hogy a `2 + 3` **egy** paraméterként menjen át.",
        },
        {
          prompt: "Írd fel a `double :: Integer -> Integer` függvényt, ami megduplázza a paraméterét.",
          hint: "double x = ...",
          check: "code",
          placeholder: "double :: Integer -> Integer\n",
          answer: [
            "double :: Integer -> Integer\ndouble x = x * 2",
            "double x = x * 2",
            "double x = 2 * x",
            "double x = x + x",
          ],
          solution: "```haskell\ndouble :: Integer -> Integer\ndouble x = x * 2\n```",
        },
        {
          prompt: "Milyen GHCi-paranccsal kérdezed le a `(*)` operátor típusát (kiértékelés nélkül)?",
          check: "code",
          answer: [":t (*)", ":type (*)"],
          solution: "```\n:t (*)\n-- (*) :: Num a => a -> a -> a\n```",
        },
      ],
    },
    {
      slug: "egesz-rekurzio",
      title: "2. Egész számok, mintaillesztés, rekurzió",
      summary: "Int vs Integer, div/mod, mintaillesztés számokra, a rekurzió alapmintája.",
      status: "complete",
      body: `
## Egész típusok: \`Int\` vs \`Integer\`

- \`Int\` — **fix** bitszélességű (általában 64 bit). Gyors, de **túlcsordulhat**
  (csendben, negatív eredménnyel!).
- \`Integer\` — **tetszőleges** pontosságú, csak a memória a korlát. Ha nagy
  számokkal dolgozol, ezt használd.

\`\`\`haskell
maxBound :: Int   -- 9223372036854775807 (64 biten)
-- Integer-nek nincs minBound/maxBound-ja
\`\`\`

## Alapműveletek

\`\`\`haskell
(+), (-), (*) :: Num a     => a -> a -> a
div, mod      :: Integral a => a -> a -> a  -- egészosztás és maradék
\`\`\`

\`\`\`haskell
17 \\\`div\\\` 5   -- 3
17 \`mod\` 5   -- 2
\`\`\`

## Mintaillesztés számokra

Konkrét értékeket írhatunk a formális paraméter helyére. A minták **fentről
lefelé** illesztődnek, az első illeszkedő ág nyer:

\`\`\`haskell
oneIfZero :: Int -> Int
oneIfZero 0 = 1   -- ha a paraméter pontosan 0
oneIfZero n = n   -- minden más esetben (n illeszkedik bármire)
\`\`\`

## Rekurzió — az alapminta

Egy rekurzív függvény **alapesetből** és **rekurzív ágból** áll. A klasszikus
példa a faktoriális:

\`\`\`haskell
fact :: Integer -> Integer
fact 0 = 1               -- alapeset: nincs önhívás
fact n = n * fact (n-1)  -- rekurzív ág: kisebb részfeladatra vezet vissza
\`\`\`

A kiértékelés "kihajtogat", majd az alapesettől visszafelé számol:

\`\`\`haskell
fact 3  =  3 * fact 2  =  3 * (2 * fact 1)  =  3 * (2 * (1 * fact 0))
        =  3 * (2 * (1 * 1))  =  6
\`\`\`

> **Fontos:** a rekurzív hívás paraméterét (\`n-1\`) mindig zárójelezd — enélkül
> \`fact n - 1\` lenne, ami mást jelent és végtelen ciklust okoz.

Minden feladathoz alul beírhatod és **ellenőrizheted** a megoldásod.
`,
      exercises: [
        {
          prompt: "Írd meg az `isEven :: Integer -> Bool` függvényt (páros-e), egyenlőségvizsgálattal és `mod`-dal.",
          hint: "Egy szám páros, ha 2-vel osztva a maradék 0.",
          check: "code",
          placeholder: "isEven :: Integer -> Bool\n",
          answer: [
            "isEven :: Integer -> Bool\nisEven n = mod n 2 == 0",
            "isEven n = mod n 2 == 0",
            "isEven n = n `mod` 2 == 0",
            "isEven n = even n",
          ],
          solution: "```haskell\nisEven :: Integer -> Bool\nisEven n = mod n 2 == 0\n```",
        },
        {
          prompt: "Írd meg a `divides :: Integer -> Integer -> Bool` függvényt: az első paraméter osztója-e a másodiknak.",
          hint: "a osztója b-nek, ha b `mod` a == 0.",
          check: "code",
          placeholder: "divides :: Integer -> Integer -> Bool\n",
          answer: [
            "divides :: Integer -> Integer -> Bool\ndivides a b = mod b a == 0",
            "divides a b = mod b a == 0",
            "divides a b = b `mod` a == 0",
          ],
          solution: "```haskell\ndivides :: Integer -> Integer -> Bool\ndivides a b = mod b a == 0\n```",
        },
        {
          prompt: "Írd meg a `sumTo :: Integer -> Integer` rekurzív függvényt, ami 0-tól n-ig összeadja a számokat (sumTo 0 = 0).",
          hint: "Alapeset: 0. Rekurzív ág: n + sumTo (n-1).",
          check: "code",
          placeholder: "sumTo :: Integer -> Integer\n",
          answer: [
            "sumTo :: Integer -> Integer\nsumTo 0 = 0\nsumTo n = n + sumTo (n - 1)",
            "sumTo 0 = 0\nsumTo n = n + sumTo (n - 1)",
            "sumTo 0 = 0\nsumTo n = n + sumTo (n-1)",
          ],
          solution: "```haskell\nsumTo :: Integer -> Integer\nsumTo 0 = 0\nsumTo n = n + sumTo (n - 1)\n```",
        },
        {
          prompt: "Írd meg a `fact :: Integer -> Integer` faktoriális függvényt rekurzívan.",
          check: "code",
          placeholder: "fact :: Integer -> Integer\n",
          answer: [
            "fact :: Integer -> Integer\nfact 0 = 1\nfact n = n * fact (n - 1)",
            "fact 0 = 1\nfact n = n * fact (n - 1)",
            "fact 0 = 1\nfact n = n * fact (n-1)",
          ],
          solution: "```haskell\nfact :: Integer -> Integer\nfact 0 = 1\nfact n = n * fact (n - 1)\n```",
        },
      ],
    },
    {
      slug: "listak",
      title: "3. Listák — felépítés, mintaillesztés, rekurzió",
      summary: "A (:) és [] konstruktorok, listaminták (x:xs), rekurzív feldolgozás.",
      status: "complete",
      body: `
## Mi a lista?

A lista **dinamikus** (tetszőleges hosszú, akár végtelen), **polimorf**
(bármilyen elemtípus) és **homogén** (minden elem azonos típusú) adatszerkezet.
A \`String\` is csak \`[Char]\`.

> A listaelemek elérése **nem** konstans idejű, mint a tömböknél — az \`i.\` elem
> \`i\` lépés. Ezért nem indexelünk, hanem **bejárjuk** a listát.

## A lista két konstruktora

Minden lista e kettőből épül fel:

\`\`\`haskell
[]  :: [a]                 -- üres lista
(:) :: a -> [a] -> [a]     -- egy elemet a lista ELEJÉRE fűz ("cons")
\`\`\`

\`\`\`haskell
1 : 2 : 3 : []   ==   [1, 2, 3]   -- a [..] csak "szintaktikai cukorka"
\`\`\`

## Listaminták

- \`[]\` — csak az üres lista
- \`(x:xs)\` — **legalább egy** elem: \`x\` a fejelem, \`xs\` a törzs (maradék)
- \`(x:y:xs)\` — legalább két elem
- \`(x:[])\` vagy \`[x]\` — pontosan egy elem

\`\`\`haskell
isEmpty :: [a] -> Bool
isEmpty [] = True
isEmpty _  = False        -- a _ "akármi" minta
\`\`\`

## Rekurzió listákon

Ugyanaz a séma, mint számoknál: alapeset az üres lista, rekurzív ág a fejelem +
a törzs feldolgozása.

\`\`\`haskell
length :: [a] -> Int
length []     = 0
length (x:xs) = 1 + length xs      -- x-et eldobjuk, csak számolunk

sum :: Num a => [a] -> a
sum []     = 0
sum (x:xs) = x + sum xs            -- a fejelemet hozzáadjuk a törzs összegéhez
\`\`\`

## Lista építése

Nem csak fogyasztani, építeni is tudunk listát a \`(:)\`-vel:

\`\`\`haskell
init :: [a] -> [a]     -- utolsó elem elhagyása (új listát épít)
init (x:[]) = []
init (x:xs) = x : init xs
\`\`\`
`,
      exercises: [
        {
          prompt: "Add meg a `[1,2,3]` listát kizárólag a (:) és [] konstruktorokkal (cukorka nélkül).",
          check: "code",
          answer: ["1 : 2 : 3 : []", "1:2:3:[]"],
          solution: "```haskell\n1 : 2 : 3 : []\n```",
        },
        {
          prompt: "Írd meg a `len :: [a] -> Int` függvényt (a length saját változata) mintaillesztéssel és rekurzióval.",
          hint: "Alapeset: []. Rekurzív ág: (x:xs) → 1 + len xs.",
          check: "code",
          placeholder: "len :: [a] -> Int\n",
          answer: [
            "len :: [a] -> Int\nlen [] = 0\nlen (x:xs) = 1 + len xs",
            "len [] = 0\nlen (x:xs) = 1 + len xs",
            "len [] = 0\nlen (_:xs) = 1 + len xs",
          ],
          solution: "```haskell\nlen :: [a] -> Int\nlen []     = 0\nlen (x:xs) = 1 + len xs\n```",
        },
        {
          prompt: "Írd meg az `sum' :: Num a => [a] -> a` függvényt (a lista összege) rekurzívan.",
          check: "code",
          placeholder: "sum' :: Num a => [a] -> a\n",
          answer: [
            "sum' :: Num a => [a] -> a\nsum' [] = 0\nsum' (x:xs) = x + sum' xs",
            "sum' [] = 0\nsum' (x:xs) = x + sum' xs",
          ],
          solution: "```haskell\nsum' :: Num a => [a] -> a\nsum' []     = 0\nsum' (x:xs) = x + sum' xs\n```",
        },
        {
          prompt: "Írd meg a `myProduct :: Num a => [a] -> a` függvényt (a lista elemeinek szorzata; üres lista → 1).",
          hint: "Az üres szorzat 1, ez az alapeset.",
          check: "code",
          placeholder: "myProduct :: Num a => [a] -> a\n",
          answer: [
            "myProduct :: Num a => [a] -> a\nmyProduct [] = 1\nmyProduct (x:xs) = x * myProduct xs",
            "myProduct [] = 1\nmyProduct (x:xs) = x * myProduct xs",
          ],
          solution: "```haskell\nmyProduct :: Num a => [a] -> a\nmyProduct []     = 1\nmyProduct (x:xs) = x * myProduct xs\n```",
        },
      ],
    },
    {
      slug: "magasabb-rendu",
      title: "4. Magasabb rendű függvények, listakifejezés",
      summary: "map, filter, foldr, függvénykompozíció és listakifejezések.",
      status: "complete",
      body: `
## Magasabb rendű függvény

Olyan függvény, ami **függvényt kap paraméterként** vagy függvényt ad vissza. Ez
teszi tömörré a listafeldolgozást.

### map — minden elemre alkalmaz

\`\`\`haskell
map :: (a -> b) -> [a] -> [b]
map f []     = []
map f (x:xs) = f x : map f xs

map (*2) [1,2,3]      -- [2,4,6]
map even [1,2,3,4]    -- [False,True,False,True]
\`\`\`

### filter — szűrés feltétellel

\`\`\`haskell
filter :: (a -> Bool) -> [a] -> [a]
filter p []     = []
filter p (x:xs)
  | p x       = x : filter p xs
  | otherwise = filter p xs

filter even [1..10]   -- [2,4,6,8,10]
\`\`\`

### foldr — összecsukás (redukció)

\`\`\`haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f z []     = z
foldr f z (x:xs) = f x (foldr f z xs)

foldr (+) 0 [1,2,3]   -- 1 + (2 + (3 + 0)) = 6
sum'  = foldr (+) 0
product' = foldr (*) 1
\`\`\`

## Függvénykompozíció és alkalmazás

\`\`\`haskell
(.)  :: (b -> c) -> (a -> b) -> a -> c   -- (f . g) x = f (g x)
($)  :: (a -> b) -> a -> b               -- f $ x   = f x  (gyenge kötés)

(map (*2) . filter even) [1..6]   -- [4,8,12]
\`\`\`

## Listakifejezés

Rövid, olvasható szintaxis map+filter helyett:

\`\`\`haskell
[ x*x | x <- [1..10], even x ]    -- [4,16,36,64,100]
--   ^kimenet  ^generátor  ^szűrő
\`\`\`

Több generátor is lehet (mint egymásba ágyazott ciklus):

\`\`\`haskell
[ (x,y) | x <- [1,2], y <- "ab" ]  -- [(1,'a'),(1,'b'),(2,'a'),(2,'b')]
\`\`\`
`,
      exercises: [
        {
          prompt: "Írd fel `map`-pel azt a kifejezést, ami a `[1,2,3,4]` minden elemét négyzetre emeli.",
          check: "code",
          answer: ["map (^2) [1,2,3,4]", "map (\\x -> x*x) [1,2,3,4]", "map (\\x -> x^2) [1,2,3,4]"],
          solution: "```haskell\nmap (^2) [1,2,3,4]   -- [1,4,9,16]\n```",
        },
        {
          prompt: "Írd fel egy listakifejezéssel a `[1..20]` páros elemeinek négyzetét.",
          hint: "[ kimenet | generátor, szűrő ]",
          check: "code",
          answer: [
            "[ x*x | x <- [1..20], even x ]",
            "[x*x | x <- [1..20], even x]",
            "[ x^2 | x <- [1..20], even x ]",
          ],
          solution: "```haskell\n[ x*x | x <- [1..20], even x ]\n```",
        },
        {
          prompt: "Fejezd ki a lista összegzését `foldr`-rel (mint pontmentes definíció): `sum' = ...`.",
          check: "code",
          answer: ["sum' = foldr (+) 0", "foldr (+) 0"],
          solution: "```haskell\nsum' = foldr (+) 0\n```",
        },
      ],
    },
  ],
  links: [
    { label: "Tárgy honlapja (lambda.inf.elte.hu)", url: "http://lambda.inf.elte.hu/" },
    { label: "Haskell Cheat Sheet", url: "http://lambda.inf.elte.hu/CheatSheet.xml" },
    { label: "Hoogle", url: "http://lambda.inf.elte.hu/haskell/hoogle/" },
    { label: "TMS", url: "https://tms.inf.elte.hu/" },
  ],
};
