import type { Subject } from "@/lib/types";

export const diszkretModellek: Subject = {
  slug: "diszkret-modellek",
  name: "Diszkrét modellek alkalmazásai",
  short: "Dimod",
  accent: "#7e7bd8",
  tagline: "Diszkrét matematikai modellek programozása (Python, TMS).",
  location: "Kedd 14:00–16:00 — Labor",
  requirementsSource: "Dimod/kovetelmenyek.md",
  requirementsMd: `
## Teljesítés feltételei

- **Részvétel a gyakorlatokon** — legfeljebb **3 hiányzás**.
- **Heti órai számonkérések** sikeres teljesítése.
- **Heti TMS (programozási) feladatok** megoldása és beadása — legalább a feladatok **2/3-a**.
- **Két sikeres (legalább elégséges) zárthelyi.**
  - A ZH egyharmada elméleti (papíros), a többi gyakorlati (programozás).
  - 90 perces: első 30 perc papíros rész (segédeszköz nélkül), utána programozás (a programozási feladat csak 30 perc után kezdhető).

## Pontszámok

| Feladat | Pontszám | Feltétel |
|---------|----------|----------|
| Órai számonkérések | 10×1 = 10 | legalább 6 pont |
| TMS feladatok | 10×1 = 10 | legalább 6 pont |
| 1. Zárthelyi | 40 | legalább 16 pont |
| 2. Zárthelyi | 40 | legalább 16 pont |

## Értékelés (összpontszám)

| Pontszám | Érdemjegy |
|----------|-----------|
| 86+ | jeles (5) |
| 72+ | jó (4) |
| 58+ | közepes (3) |
| 44+ | elégséges (2) |
`,
  files: [
    { name: "gyak1 — feladatleírás", path: "/materials/Dimod/gyak1/gyak1.txt", kind: "other" },
    { name: "gyak1 — digit_sum.py", path: "/materials/Dimod/gyak1/digit_sum.py", kind: "code" },
    { name: "gyak1 — dupl.py", path: "/materials/Dimod/gyak1/dupl.py", kind: "code" },
    { name: "gyak1 — factorial.py", path: "/materials/Dimod/gyak1/factorial.py", kind: "code" },
    { name: "gyak1 — my_count.py", path: "/materials/Dimod/gyak1/my_count.py", kind: "code" },
    { name: "gyak1 — p1.py", path: "/materials/Dimod/gyak1/p1.py", kind: "code" },
    { name: "gyak2 — create_string.py", path: "/materials/Dimod/gyak2/create_string.py", kind: "code" },
    { name: "gyak2 — leghosszabb.py", path: "/materials/Dimod/gyak2/leghosszabb.py", kind: "code" },
    { name: "gyak2 — spongebob.py", path: "/materials/Dimod/gyak2/spongebob.py", kind: "code" },
    { name: "gyak2 — to_list.py", path: "/materials/Dimod/gyak2/to_list.py", kind: "code" },
    { name: "gyak3 — orai.py", path: "/materials/Dimod/gyak3/orai.py", kind: "code" },
    { name: "gyak3 — ropzh.py", path: "/materials/Dimod/gyak3/ropzh.py", kind: "code" },
  ],
  events: [
    { id: "dm-ora", type: "kviz", title: "Heti órai számonkérés", topic: "Az aktuális heti anyag.", note: "10×1 pont, min. 6.", recurring: true },
    { id: "dm-tms", type: "beadando", title: "Heti TMS feladat", topic: "Programozási feladat a TMS-ben.", note: "Legalább a feladatok 2/3-a. 10×1 pont, min. 6.", recurring: true },
    { id: "dm-zh1", type: "zh", title: "1. Zárthelyi", tba: true, topic: "1/3 elmélet (papír) + 2/3 programozás. 90 perc.", note: "40 pont, min. 16. Időpont: TBA." },
    { id: "dm-zh2", type: "zh", title: "2. Zárthelyi", tba: true, topic: "1/3 elmélet (papír) + 2/3 programozás. 90 perc.", note: "40 pont, min. 16. Időpont: TBA." },
  ],
  lessons: [
    {
      slug: "python-alapok",
      title: "1. Python alapok — változók, elágazás, ciklus, lista",
      summary: "print, típusok, if/else, for-ciklus, lista, faktoriális, számjegyösszeg, számlálás, duplikátumszűrés.",
      status: "complete",
      body: `
## Miről szól a tárgy?

Diszkrét matematikai modellek **programozott** vizsgálata Pythonban: számelmélet,
kombinatorika, gráfok, prímek — mindezt kis, önálló függvényekben. Az első
gyakorlat a Python-alapokat frissíti fel, amikre a többi épül.

## A legelső program

\`\`\`python
print("hello world")

a = 1
print("a=" + str(a))      # számot stringgé kell alakítani a +-hoz
\`\`\`

Pythonban a **behúzás (indentáció) jelöli a blokkokat** — nincs \`{}\`. A dupla
pontosvessző helyett \`:\` vezeti be a blokkot.

## Elágazás

\`\`\`python
if a > 0:
    print("greater than 0")
    print("second print")
else:
    print("not greater than 0")
\`\`\`

## Lista és for-ciklus

\`\`\`python
L = [1, 2, 3]
L.append(10)          # a végére fűz  ->  [1, 2, 3, 10]

for item in L:
    print("item =", item)
\`\`\`

## Faktoriális — for-ciklussal

Az \`n! = 1·2·…·n\`. A \`range(1, n+1)\` az \`1\`-től \`n\`-ig terjedő számokat adja
(a felső határ **nem** benne van, ezért \`n+1\`):

\`\`\`python
def factorial(n):
    res = 1
    for i in range(1, n + 1):
        res = res * i
    return res

print(factorial(5))    # 120
\`\`\`

## Számjegyek összege

Két bevett trükk. **String-módszer:** a számot szöveggé alakítjuk, karakterenként
összeadjuk (\`int(ch)\` visszaalakít számmá):

\`\`\`python
def digit_sum(n):
    s = 0
    for ch in str(n):
        s += int(ch)
    return s

print(digit_sum(1234))   # 10
\`\`\`

**Számtani módszer** (osztásokkal): \`n % 10\` az utolsó számjegy, \`n // 10\`
levágja azt (egész osztás):

\`\`\`python
def digit_sum2(n):
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    return s
\`\`\`

## Előfordulások számlálása

\`\`\`python
def my_count(s, letter):
    count = 0
    for char in s:
        if char == letter:
            count += 1
    return count

print(my_count("alma", "a"))   # 2
\`\`\`

## Duplikátumok kiszűrése (sorrendtartással)

A \`not in\` megnézi, benne van-e már az elem az eddigi eredményben:

\`\`\`python
def dupl(L):
    res = []
    for item in L:
        if item not in res:
            res.append(item)
    return res

print(dupl([1, 2, 2, 3, 3, 3, 10]))   # [1, 2, 3, 10]
\`\`\`

> A ZH fele **papíros elmélet** (30 perc, segédeszköz nélkül), utána programozás.
> Ezek az alap-minták (ciklus + akkumulátor, \`% 10 / // 10\`, \`in\`/\`not in\`)
> minden későbbi feladatban visszaköszönnek.
`,
      exercises: [
        {
          prompt: "Írj `factorial(n)` függvényt for-ciklussal, amely visszaadja n faktoriálisát!",
          hint: "Kezdj `res = 1`-gyel, szorozz végig `range(1, n+1)`-en.",
          check: "code",
          multiline: true,
          placeholder: "def factorial(n):\n",
          answer: [
            "def factorial(n):\n    res = 1\n    for i in range(1, n + 1):\n        res = res * i\n    return res",
            "def factorial(n):\n    res = 1\n    for i in range(1, n + 1):\n        res *= i\n    return res",
          ],
          solution: "```python\ndef factorial(n):\n    res = 1\n    for i in range(1, n + 1):\n        res = res * i\n    return res\n```",
        },
        {
          prompt: "Írj `digit_sum(n)` függvényt, amely egy egész szám számjegyeinek összegét adja (string-módszerrel)!",
          hint: "`for ch in str(n):` majd `int(ch)` hozzáadása.",
          check: "code",
          multiline: true,
          placeholder: "def digit_sum(n):\n",
          answer: [
            "def digit_sum(n):\n    s = 0\n    for ch in str(n):\n        s += int(ch)\n    return s",
            "def digit_sum(n):\n    s = 0\n    for ch in str(n):\n        s = s + int(ch)\n    return s",
          ],
          solution: "```python\ndef digit_sum(n):\n    s = 0\n    for ch in str(n):\n        s += int(ch)\n    return s\n```",
        },
        {
          prompt: "Írj `dupl(L)` függvényt, amely a lista elemeit egyszer tartja meg, az eredeti sorrendben!",
          hint: "Építs egy `res` listát, csak akkor fűzz hozzá, ha `item not in res`.",
          check: "code",
          multiline: true,
          placeholder: "def dupl(L):\n",
          answer: [
            "def dupl(L):\n    res = []\n    for item in L:\n        if item not in res:\n            res.append(item)\n    return res",
          ],
          solution: "```python\ndef dupl(L):\n    res = []\n    for item in L:\n        if item not in res:\n            res.append(item)\n    return res\n```",
        },
        {
          prompt: "Mit ad vissza `digit_sum(1234)`? (Csak a számot.)",
          check: "numeric",
          answer: "10",
          solution: "1 + 2 + 3 + 4 = **10**.",
        },
      ],
    },
    {
      slug: "stringek-listak",
      title: "2. Stringek és listák — építés, bontás, keresés, számlálás",
      summary: "String-ismétlés, join, számjegylista, leghosszabb szó (max key=len), betűgyakoriság (röpzh).",
      status: "complete",
      body: `
## String építése ismétléssel

Pythonban a \`*\` operátor **ismétli** a stringet — ez a legrövidebb megoldás:

\`\`\`python
def create_string(ch, num):
    return num * ch      # "k" * 3 == "kkk"
\`\`\`

Ugyanez ciklussal (érdemes látni a "kézi" verziót is). A hatékonyabb minta:
egy **listába gyűjtünk**, majd a végén \`"".join(...)\` fűzi össze (a stringek
ismételt \`+=\`-e lassú lehet):

\`\`\`python
def create_string3(ch, num):
    result = []
    for i in range(num):
        result.append(ch)
    return "".join(result)
\`\`\`

## Számból számjegylista

A számot stringgé alakítjuk, karakterenként visszaszámmá:

\`\`\`python
def to_list(n):
    res = []
    for x in str(n):
        res.append(int(x))
    return res

print(to_list(123456))   # [1, 2, 3, 4, 5, 6]
\`\`\`

A \`len(s)\` a hossz — stringre és listára is működik.

## Leghosszabb szó — a max kulcsfüggvénnyel

A \`max\` egy **\`key\`** paramétert is elfogad: eszerint hasonlítja össze az
elemeket. A \`key=len\` azt jelenti: a leghosszabbat keressük:

\`\`\`python
def leghosszabb_szo(szavak):
    return max(szavak, key=len)

print(leghosszabb_szo(["a", "abc", "helloworld", "aa"]))   # "helloworld"
\`\`\`

Kézzel, ciklussal ugyanez: tarts nyilván egy \`best\`-et, és cseréld, ha
hosszabbat találsz.

## SpongeBob-szöveg — véletlen kis/nagybetű

A \`random.randint(0, 1)\` érmefeldobás; string karakterei csak úgy módosíthatók,
ha **listává** alakítjuk (a string maga megváltoztathatatlan):

\`\`\`python
from random import randint

def randomize_casing(inp):
    chars = list(inp.lower())
    for i in range(len(chars)):
        if randint(0, 1) == 0:
            chars[i] = chars[i].upper()
    return "".join(chars)
\`\`\`

## Betűgyakoriság — a röpzh mintája

Két párhuzamos lista: \`betuk\` (mely betű) és \`hanyszor\` (hányszor). Ha új a
betű, felvesszük 1-gyel; ha már láttuk, az \`index()\`-szel megkeresett helyen
növeljük. Végül kigyűjtjük a **legalább kétszer** előfordulókat:

\`\`\`python
def tobbszor(szoveg):
    betuk, hanyszor = [], []
    for ch in szoveg:
        if ch not in betuk:
            betuk.append(ch)
            hanyszor.append(1)
        else:
            hanyszor[betuk.index(ch)] += 1
    return [betuk[i] for i in range(len(betuk)) if hanyszor[i] >= 2]

print(tobbszor("almal"))   # ['a', 'l']
\`\`\`

> Az utolsó sor egy **listakifejezés** (list comprehension): \`[kifejezés for … if …]\`.
> Ez Pythonban a szűrés+leképezés tömör formája — érdemes begyakorolni.
`,
      exercises: [
        {
          prompt: "Írj `to_list(n)` függvényt, amely egy egész szám számjegyeit adja vissza egész számok listájaként!",
          hint: "`for x in str(n):` majd `int(x)` hozzáfűzése a listához.",
          check: "code",
          multiline: true,
          placeholder: "def to_list(n):\n",
          answer: [
            "def to_list(n):\n    res = []\n    for x in str(n):\n        res.append(int(x))\n    return res",
            "def to_list(n):\n    return [int(x) for x in str(n)]",
          ],
          solution: "```python\ndef to_list(n):\n    res = []\n    for x in str(n):\n        res.append(int(x))\n    return res\n\n# vagy tömören:\ndef to_list(n):\n    return [int(x) for x in str(n)]\n```",
        },
        {
          prompt: "Írj `leghosszabb_szo(szavak)` függvényt, amely a lista leghosszabb szavát adja vissza (egy sorban, a max-szal)!",
          hint: "`max(..., key=len)`.",
          check: "code",
          multiline: true,
          placeholder: "def leghosszabb_szo(szavak):\n",
          answer: [
            "def leghosszabb_szo(szavak):\n    return max(szavak, key=len)",
          ],
          solution: "```python\ndef leghosszabb_szo(szavak):\n    return max(szavak, key=len)\n```",
        },
        {
          prompt: "Írd fel listakifejezéssel: a `szavak` listából azok, amelyek hossza legalább 5! (Add meg a teljes `[... for ... if ...]` kifejezést.)",
          hint: "`[sz for sz in szavak if len(sz) >= 5]`.",
          check: "code",
          answer: [
            "[sz for sz in szavak if len(sz) >= 5]",
            "[s for s in szavak if len(s) >= 5]",
            "[w for w in szavak if len(w) >= 5]",
          ],
          solution: "```python\n[sz for sz in szavak if len(sz) >= 5]\n```",
        },
      ],
    },
    {
      slug: "primek-szamelmelet",
      title: "3. Prímek és számelmélet — sympy, osztók, ikerprímek",
      summary: "isprime, divisors, primerange a sympy-ből; ikerprímek listakifejezéssel.",
      status: "complete",
      body: `
## Számelmélet készen kapott függvényekkel

A **sympy** könyvtár számelméleti függvényeket ad, amiket a diszkrét modelleknél
használunk. A három leggyakoribb:

\`\`\`python
from sympy import isprime, divisors, primerange

isprime(5)              # True  — prím-e?
divisors(30)            # [1, 2, 3, 5, 6, 10, 15, 30] — az összes osztó
list(primerange(2, 30)) # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] — prímek [2, 30)
\`\`\`

A \`primerange(a, b)\` egy **generátort** ad; \`list(...)\`-tal kérjük listaként.
A felső határ (mint a \`range\`-nél) **nincs benne**.

## Ikerprímek

**Ikerprímek** azok a \`(p, p+2)\` párok, ahol mindkettő prím (pl. 3–5, 5–7, 11–13).
Egy listakifejezéssel: vegyük a prímeket, és tartsuk meg azokat, amikre \`p+2\` is prím:

\`\`\`python
from sympy import primerange

def twin_primes(n):
    primes = list(primerange(2, n))
    return [(p, p + 2) for p in primes if p + 2 in primes]

print(twin_primes(30))
# [(3, 5), (5, 7), (11, 13), (17, 19)]
\`\`\`

Figyeld meg a mintát: **generálás** (\`primerange\`) → **szűrés** (\`if p+2 in primes\`)
→ **átalakítás** (\`(p, p+2)\` pár). Ez a diszkrét feladatok tipikus felépítése.

## Saját prímteszt (a beépített nélkül)

Ha a ZH papíros részén kézzel kell, a definíció: \`n\` prím, ha \`n ≥ 2\` és nincs
valódi osztója. Elég \`√n\`-ig próbálgatni:

\`\`\`python
def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True
\`\`\`

## Osztók saját kézzel

\`\`\`python
def divisors_of(n):
    return [d for d in range(1, n + 1) if n % d == 0]

print(divisors_of(30))   # [1, 2, 3, 5, 6, 10, 15, 30]
\`\`\`

> A vizsgán a beépített sympy-függvények kényelmesek, de a **papíros részen**
> a saját \`is_prime\` / osztó-logika kell — érdemes mindkettőt tudni.
`,
      exercises: [
        {
          prompt: "Írj `is_prime(n)` függvényt beépített könyvtár NÉLKÜL, ami eldönti, prím-e n! (√n-ig próbálgatva.)",
          hint: "n < 2 → False. Aztán `while i*i <= n:` és `if n % i == 0: return False`.",
          check: "code",
          multiline: true,
          placeholder: "def is_prime(n):\n",
          answer: [
            "def is_prime(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True",
          ],
          solution: "```python\ndef is_prime(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True\n```",
        },
        {
          prompt: "Írj `twin_primes(n)` függvényt, amely az összes (p, p+2) ikerprímpárt adja n alatt, a sympy primerange-ével!",
          hint: "`primes = list(primerange(2, n))`, majd listakifejezés: `(p, p+2) for p in primes if p+2 in primes`.",
          check: "code",
          multiline: true,
          placeholder: "from sympy import primerange\n",
          answer: [
            "from sympy import primerange\n\ndef twin_primes(n):\n    primes = list(primerange(2, n))\n    return [(p, p + 2) for p in primes if p + 2 in primes]",
            "def twin_primes(n):\n    primes = list(primerange(2, n))\n    return [(p, p + 2) for p in primes if p + 2 in primes]",
          ],
          solution: "```python\nfrom sympy import primerange\n\ndef twin_primes(n):\n    primes = list(primerange(2, n))\n    return [(p, p + 2) for p in primes if p + 2 in primes]\n```",
        },
        {
          prompt: "Hány osztója van a 30-nak? (Csak a számot: divisors(30) elemszáma.)",
          hint: "1, 2, 3, 5, 6, 10, 15, 30.",
          check: "numeric",
          answer: "8",
          solution: "`divisors(30) = [1, 2, 3, 5, 6, 10, 15, 30]` → **8** osztó.",
        },
      ],
    },
  ],
};
