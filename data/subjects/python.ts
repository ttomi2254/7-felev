import type { Subject } from "@/lib/types";

export const python: Subject = {
  slug: "python",
  name: "Python",
  short: "Python",
  accent: "#4a90c2",
  tagline: "A nyelvtől az OOP-n, webfejlesztésen át az AI/adatvizualizációig.",
  location: "Kedd 16:00–17:30 Ea · Péntek 12:00–14:00 Labor",
  requirementsSource: "Python/ea1/1 EA.pdf (tematika)",
  requirementsMd: `
> A **tematika** az 1. előadás PDF-jéből származik. A pontos **értékelés
> (ZH-pontok, időpontok, beadandó)** még **nincs megadva az anyagokban** —
> lásd a *Hiányzó / pótlandó* szekciót.

## Tematika (13 hét)
1. Python bevezetés, telepítés, az AI etikus használata
2. Adattípusok és változók
3. Függvények és hibakezelés
4. Objektumorientált programozás
5. OOP gyakorlati példákkal
6. Csomagkezelés (PIP/PIP3), grafikus felületek
7. Webfejlesztés Pythonban — Flask
8. REST API és API-k — FastAPI
9. OpenCV, képek, objektumfelismerés, computer vision
10. Mesterséges intelligencia és gépi tanulás alapjai, neurális hálók
11. Neurális hálók alkalmazása — TensorFlow
12. Adatkezelés, Big Data alapok
13. Adatvizualizáció, adatok térképeken (Big Data)

## Órai számonkérés
- A gyakorlatokon **röpzh** van (lásd \`ropzh.py\` a Fájlok között).

## Fontos jellemzők (1. EA)
- Magas szintű, interpretált nyelv; imperatív + funkcionális + OOP (nem tiszta OOP).
- **Case sensitive**, blokkok **indentálással**, utasítás vége a sor vége, vezérlőknél \`:\`.
- Eszközök: **IDLE**, **VSCode**, **Jupyter Notebook**; \`pip\` csomagkezelő; virtuális környezet (\`venv\`/\`uv\`).
`,
  files: [
    { name: "1. előadás (PDF)", path: "/materials/Python/ea1/1 EA.pdf", kind: "pdf" },
    { name: "Python alapok és futtatás (PDF)", path: "/materials/Python/ea1/pythonalapokesfuttatas.pdf", kind: "pdf" },
    { name: "2. előadás (PDF)", path: "/materials/Python/ea2/2 EA.pdf", kind: "pdf" },
    { name: "Bytecode / verem animáció (HTML)", path: "/materials/Python/ea2/python-verem-animacio.html", kind: "html", desc: "Interaktív: hogyan fut a bytecode a vermen." },
    { name: "Két függvény szekvenciális veremanimáció (HTML)", path: "/materials/Python/ea2/python-ket-fuggveny-szekvencialis-javitott-veremanimacio.html", kind: "html" },
    { name: "Három verem bytecode animáció (HTML)", path: "/materials/Python/ea2/python-harom-verem-bytecode-animacio.html", kind: "html" },
    { name: "While + három verem bytecode animáció (HTML)", path: "/materials/Python/ea2/python-while-harom-verem-bytecode-animacio.html", kind: "html" },
    { name: "ropzh.py — röpzh megoldás", path: "/materials/Python/ropzh.py", kind: "code" },
  ],
  events: [
    { id: "py-ropzh", type: "ropzh", title: "Órai röpzh", topic: "Az aktuális heti anyag (ld. ropzh.py mintát).", recurring: true },
    { id: "py-zh", type: "zh", title: "ZH", tba: true, topic: "A féléves anyag.", note: "Pontos időpont és pontszám: pótlandó (nincs az anyagokban)." },
  ],
  lessons: [
    {
      slug: "bevezetes",
      title: "1. Bevezetés — a nyelv, futtatás, első programok",
      summary: "Python-jellemzők, telepítés, IDLE/VSCode/Jupyter, első programok, pip, venv.",
      status: "complete",
      body: `
## Mi a Python?

Magas szintű, **interpretált** nyelv (Guido van Rossum, 1990-es évek eleje).
Olvasható szintaxis, gazdag könyvtárkészlet, széles felhasználás: adat­tudomány,
web, automatizálás, AI. **Nem tiszta OOP** — imperatív, funkcionális és OOP is.

**Kulcsjellemzők:**
- **Case sensitive**, a kulcsszavak kisbetűsek.
- A blokkokat **indentálni** kell (azonos számú szóköz).
- Utasítás vége = sor vége; vezérlő szerkezeteknél kettőspont \`:\`.

## Futtatás és környezetek
- **IDLE** — beépített, egyszerű.
- **VSCode** — hibakeresés, kódkiegészítés, integrált terminál.
- **Jupyter Notebook** (\`.ipynb\`) — interaktív, adatvizualizációhoz.

\`\`\`python
# az első program
x = 10
y = 20
print(x + y)   # 30
print(f"Az összeg: {x + y}")
\`\`\`

## Csomagkezelés és virtuális környezet

\`\`\`bash
python -m venv .venv          # virtuális környezet
# Windows:
.venv\\Scripts\\activate
pip install requests          # csomag telepítése
pip install --upgrade pip
pip list
\`\`\`

> A virtuális környezet elkülöníti a projekt függőségeit — mindig ezt használd.

## AI etikus használata (a tárgy külön kiemeli)
- A cél **saját, megértett kód** — a plágium kerülése.
- A generált kódot **felül kell vizsgálni**; a minőségért/biztonságért a fejlesztő felel.
`,
      exercises: [
        {
          prompt: "Írj programot, amely bekér egy nevet és kiírja: „Helló, <név>!”.",
          solution: "```python\nnev = input(\"Neved: \")\nprint(f\"Helló, {nev}!\")\n```",
        },
      ],
    },
    {
      slug: "adattipusok",
      title: "2. Adattípusok és változók",
      summary: "int, float, str, bool, list, tuple, dict, set; szeletelés, f-string.",
      status: "complete",
      body: `
## Alaptípusok

\`\`\`python
egesz = 42            # int
tort = 3.14           # float
szoveg = "Python"     # str
igaz = True           # bool
semmi = None          # NoneType

type(egesz)           # <class 'int'>
\`\`\`

## Gyűjtemények

\`\`\`python
lista = [1, 2, 3]              # módosítható, rendezett
parok = (10, 20)              # tuple: nem módosítható
halmaz = {1, 2, 2, 3}         # set: egyedi elemek -> {1,2,3}
szotar = {"nev": "Anna", "kor": 25}  # dict: kulcs-érték
\`\`\`

## Sztringek és szeletelés (slicing)

\`\`\`python
s = "programozás"
s[0]        # 'p'
s[-1]       # 's'
s[0:4]      # 'prog'
s[::-1]     # 'sázomargorp'  (megfordítás)
len(s)      # 11
s.upper()   # 'PROGRAMOZÁS'
"a" in s    # True
\`\`\`

## Lista-műveletek

\`\`\`python
t = [3, 1, 4, 1, 5]
t.append(9)          # hozzáad
t.sort()             # rendez helyben
sum(t), max(t), min(t)
parosak = [x for x in t if x % 2 == 0]   # lista-értelmezés
\`\`\`

## Szótár bejárása

\`\`\`python
raktar = {"csavar": 500, "anya": 300}
for nev, db in raktar.items():
    print(f"{nev}: {db} db")
\`\`\`

## Röpzh-példa (betűszámlálás)

Az órai \`ropzh.py\` egy szó ismétlődő betűit keresi — pythonikusabban:

\`\`\`python
from collections import Counter
szoveg = "almal"
szamlalo = Counter(szoveg)
ketszer = [betu for betu, db in szamlalo.items() if db >= 2]
print(ketszer)   # ['a', 'l']
\`\`\`
`,
      exercises: [
        {
          prompt: "Adott egy számlista. Add meg az átlagát, a maximumát, és a páratlan elemeit — lista-értelmezéssel.",
          solution: "```python\nszamok = [4, 7, 2, 9, 5]\natlag = sum(szamok) / len(szamok)\nmaxi = max(szamok)\nparatlanok = [x for x in szamok if x % 2 == 1]\nprint(atlag, maxi, paratlanok)\n```",
        },
      ],
    },
    {
      slug: "fuggvenyek-hibakezeles",
      title: "3. Függvények és hibakezelés",
      summary: "def, paraméterek, alapértékek, *args/**kwargs, try/except, saját kivétel.",
      status: "complete",
      body: `
## Függvények

\`\`\`python
def koszon(nev, udvozles="Helló"):
    return f"{udvozles}, {nev}!"

koszon("Anna")                    # 'Helló, Anna!'
koszon("Béla", udvozles="Szia")   # 'Szia, Béla!'
\`\`\`

## Rugalmas paraméterek

\`\`\`python
def osszeg(*szamok):          # tetszőleges pozicionális
    return sum(szamok)

def profil(**adatok):         # tetszőleges kulcsszavas
    for k, v in adatok.items():
        print(k, v)

osszeg(1, 2, 3)               # 6
profil(nev="Anna", kor=25)
\`\`\`

## Hibakezelés

\`\`\`python
def oszt(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Nullával nem osztunk!")
        return None
    finally:
        print("Kész.")
\`\`\`

## Saját kivétel

\`\`\`python
class ErvenytelenKor(Exception):
    pass

def regisztral(kor):
    if kor < 18:
        raise ErvenytelenKor("Legalább 18 évesnek kell lenni.")
    return True

try:
    regisztral(15)
except ErvenytelenKor as e:
    print("Hiba:", e)
\`\`\`

## Rekurzió vs. iteráció (Fibonacci)

\`\`\`python
def fib_rek(n):
    if n <= 1: return n
    return fib_rek(n - 1) + fib_rek(n - 2)

def fib_iter(n):          # hatékonyabb
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`
`,
      exercises: [
        {
          prompt: "Írj `biztonsagos_int(szoveg)` függvényt, ami stringből intet csinál, hibás bemenetre `None`-t ad vissza (kivételkezeléssel).",
          solution: "```python\ndef biztonsagos_int(szoveg):\n    try:\n        return int(szoveg)\n    except ValueError:\n        return None\n\nprint(biztonsagos_int(\"42\"))   # 42\nprint(biztonsagos_int(\"alma\")) # None\n```",
        },
      ],
    },
    {
      slug: "oop",
      title: "4. Objektumorientált programozás",
      summary: "class, __init__, metódusok, öröklődés, __str__, property.",
      status: "complete",
      body: `
## Osztály és példány

\`\`\`python
class Kutya:
    def __init__(self, nev, kor):
        self.nev = nev
        self.kor = kor

    def ugat(self):
        return f"{self.nev}: Vau!"

    def __str__(self):
        return f"Kutya({self.nev}, {self.kor})"

k = Kutya("Bodri", 3)
print(k.ugat())   # Bodri: Vau!
print(k)          # Kutya(Bodri, 3)
\`\`\`

- \`self\` — a példány maga; minden metódus első paramétere.
- \`__init__\` — konstruktor; \`__str__\` — szöveges reprezentáció.

## Öröklődés

\`\`\`python
class Allat:
    def __init__(self, nev):
        self.nev = nev
    def hang(self):
        return "..."

class Macska(Allat):
    def hang(self):          # felülírás
        return "Miáu"

class Kutya(Allat):
    def hang(self):
        return "Vau"

for a in [Macska("Cirmi"), Kutya("Bodri")]:
    print(a.nev, a.hang())   # polimorfizmus
\`\`\`

## Property (kapszulázás)

\`\`\`python
class Szamla:
    def __init__(self):
        self._egyenleg = 0

    @property
    def egyenleg(self):
        return self._egyenleg

    def befizet(self, osszeg):
        if osszeg <= 0:
            raise ValueError("Pozitív összeg kell.")
        self._egyenleg += osszeg
\`\`\`
`,
      exercises: [
        {
          prompt: "Készíts `Vector2D` osztályt `x`, `y` mezőkkel, `+` operátorral (`__add__`) és `__str__`-rel.",
          solution: "```python\nclass Vector2D:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\nprint(Vector2D(1, 2) + Vector2D(3, 4))  # (4, 6)\n```",
        },
      ],
    },
    {
      slug: "csomagok-gui",
      title: "5. Csomagkezelés és grafikus felület",
      summary: "pip, modulok importálása, saját modul, egyszerű tkinter GUI.",
      status: "complete",
      body: `
## Modulok és importálás

\`\`\`python
import math
from datetime import date
import random as rnd

math.sqrt(16)          # 4.0
date.today()
rnd.randint(1, 6)      # kockadobás
\`\`\`

## Saját modul

\`\`\`python
# eszkozok.py
def koszon(nev):
    return f"Helló, {nev}!"

# main.py
from eszkozok import koszon
print(koszon("Anna"))
\`\`\`

## Külső csomag telepítése

\`\`\`bash
pip install requests
\`\`\`

\`\`\`python
import requests
r = requests.get("https://api.github.com")
print(r.status_code)
\`\`\`

## Egyszerű GUI (tkinter)

\`\`\`python
import tkinter as tk

def kattint():
    cimke.config(text="Megnyomtad!")

ablak = tk.Tk()
ablak.title("Első GUI")
cimke = tk.Label(ablak, text="Helló")
cimke.pack()
tk.Button(ablak, text="Nyomj meg", command=kattint).pack()
ablak.mainloop()
\`\`\`
`,
      exercises: [
        {
          prompt: "Telepítsd a `requests` csomagot, és írj programot, ami lekér egy JSON API-t és kiírja egy mezőjét.",
          solution: "```python\nimport requests\nr = requests.get(\"https://api.github.com/repos/python/cpython\")\nadat = r.json()\nprint(adat[\"stargazers_count\"])\n```",
        },
      ],
    },
    {
      slug: "web-flask",
      title: "6. Webfejlesztés — Flask",
      summary: "Flask útvonalak, sablon, JSON válasz — az első webalkalmazás.",
      status: "complete",
      body: `
## Első Flask alkalmazás

\`\`\`bash
pip install flask
\`\`\`

\`\`\`python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def kezdolap():
    return "<h1>Helló, Flask!</h1>"

@app.route("/koszon/<nev>")
def koszon(nev):
    return f"Helló, {nev}!"

@app.route("/api/osszeg", methods=["POST"])
def osszeg():
    adat = request.get_json()
    return jsonify({"eredmeny": adat["a"] + adat["b"]})

if __name__ == "__main__":
    app.run(debug=True)
\`\`\`

Futtatás után: \`http://127.0.0.1:5000/\`.

- \`@app.route\` — útvonal + HTTP metódus.
- \`<nev>\` — útvonal-paraméter.
- \`request.get_json()\` — a POST törzse; \`jsonify(...)\` — JSON válasz.

> A 8. héten ugyanez **FastAPI**-val jön (modernebb, típusos, automatikus dokumentáció).
`,
      exercises: [
        {
          prompt: "Készíts Flask végpontot `/negyzet/<int:n>` útvonalon, ami visszaadja n négyzetét JSON-ként.",
          solution: "```python\n@app.route(\"/negyzet/<int:n>\")\ndef negyzet(n):\n    return jsonify({\"n\": n, \"negyzet\": n * n})\n```",
        },
      ],
    },
    {
      slug: "tovabbi-temak",
      title: "7. További témák — FastAPI, OpenCV, AI, adatvizualizáció",
      summary: "A 8–13. hét áttekintése: REST, computer vision, gépi tanulás, Big Data, térképek.",
      status: "skeleton",
      body: `
## A félév második fele (áttekintés)

| Hét | Téma | Kulcseszközök |
|-----|------|---------------|
| 8 | REST API | **FastAPI**, pydantic |
| 9 | Computer vision | **OpenCV**, objektumfelismerés |
| 10 | AI / gépi tanulás alapjai | neurális hálók |
| 11 | Neurális hálók | **TensorFlow** |
| 12 | Adatkezelés | Pandas, Big Data alapok |
| 13 | Adatvizualizáció | Matplotlib, térképek |

\`\`\`python
# FastAPI ízelítő
from fastapi import FastAPI
app = FastAPI()

@app.get("/koszon/{nev}")
def koszon(nev: str):
    return {"uzenet": f"Helló, {nev}!"}
# futtatás: uvicorn main:app --reload
\`\`\`

> Ezek a leckék részletesen bővülnek, ahogy az előadások haladnak. Az alapokat
> (1–6. lecke) érdemes biztosra venni, mert ezekre épül minden.
`,
    },
  ],
  missing: [
    "A ZH(k) pontos időpontja és pontszáma — nincs az anyagokban, pótlandó.",
    "Van-e beadandó Pythonból, és mi a határidő — pótlandó.",
    "A félévvégi jegy kiszámítása (súlyozás) — pótlandó.",
  ],
};
