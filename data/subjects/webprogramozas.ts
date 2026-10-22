import type { Subject } from "@/lib/types";

export const webprogramozas: Subject = {
  slug: "webprogramozas",
  name: "Webprogramozás",
  short: "Webprog",
  accent: "#d98e4f",
  tagline: "Kliensoldal (JavaScript) és szerveroldal (PHP) — a teljes webes stack.",
  location: "Szerda 14:00–15:00 Ea+Gy · Péntek 14:00–16:00 Labor",
  requirementsSource: "Webprog/kovetelmenyek.txt",
  requirementsMd: `
Aktív jelenlét a gyakorlatok (nappali BSc-n az előadások) **75%-án**, legfeljebb **3 hiányzás**. Folyamatos számonkérésű — **nincs gyakorlati jegy UV**.

## Számonkérések (összesen 120 pont)
| Név | Időpont | Max (min) | Beadás | Értékelés |
|-----|---------|-----------|--------|-----------|
| **JavaScript kvíz** | 4. gyakorlat (20 perc) | 20 (min 8) | Canvas | automatikus, vizsgaidőszakban javítható |
| **JavaScript beadandó** | félév közepe, TBA | elfogadott/elutasított | Canvas | gyakvezető, nem javítható |
| **JavaScript ZH** | félév közepe, TBA | 40 (min 16) | ZH rendszer | automatikus |
| **PHP kvíz** | 10. gyakorlat (20 perc) | 20 (min 8) | Canvas | automatikus, javítható |
| **PHP beadandó** | vizsgaidőszak eleje, TBA | elfogadott/elutasított | Canvas | gyakvezető, nem javítható |
| **PHP ZH (évfolyam ZH)** | vizsgaidőszak, TBA | 40 (min 16) | ZH rendszer | automatikus |

- **Mindkét beadandó** elfogadott kell legyen. A kvízeket egyszer lehet pótolni/javítani (vizsgaidőszak eleje).
- Az **évfolyam ZH** a teljes féléves anyagot fedi; **JS és PHP részből is min. 40% (16 pont)**. Csak jelenléttel, ellenőrzött környezetben; hozott segédanyag + nyelvi dokumentáció **igen**, internet **nem**. Javító/pót: nem lehet rontani.

## Érdemjegy (min. követelmények teljesülése esetén)
| Pont | Jegy |
|------|------|
| 102 (85%) | jeles (5) |
| 84 (70%) | jó (4) |
| 66 (55%) | közepes (3) |
| 48 (40%) | elégséges (2) |

Nincs jegy, ha hiányzik bármely beadandó, kvíz vagy az évfolyam ZH, vagy nincs meg a jelenlét. Csalás → azonnali elégtelen.

## Adminisztráció
**Canvas** (közös anyagok, előadás-diák + videók, gyakorlati videók, feladatsorok) és **Teams** (kommunikáció, gyakorlatonként privát csatorna).
`,
  files: [
    { name: "01 — Bevezetés, JavaScript alapok", path: "/materials/Webprog/Eloadasok/01_bevezetes_javascript_alapok.md", kind: "md" },
    { name: "02 — DOM, felületi elemek", path: "/materials/Webprog/Eloadasok/02_dom_feluleti_elemek.md", kind: "md" },
    { name: "03 — Eseménykezelés", path: "/materials/Webprog/Eloadasok/03_esemenykezeles.md", kind: "md" },
    { name: "04 — JS kódszervezés", path: "/materials/Webprog/Eloadasok/04_javascript_kodszervezes.md", kind: "md" },
    { name: "05 — Speciális DOM, progresszív fejlesztés", path: "/materials/Webprog/Eloadasok/05_specialis_dom_progressziv.md", kind: "md" },
    { name: "06 — Window, canvas, API", path: "/materials/Webprog/Eloadasok/06_window_canvas_api.md", kind: "md" },
    { name: "07 — Aszinkron, AJAX, JSON", path: "/materials/Webprog/Eloadasok/07_aszinkron_ajax_json.md", kind: "md" },
    { name: "08 — Szerveroldal, HTTP, PHP", path: "/materials/Webprog/Eloadasok/08_szerveroldal_http_php.md", kind: "md" },
    { name: "09 — Űrlapfeldolgozás", path: "/materials/Webprog/Eloadasok/09_urlapfeldolgozas.md", kind: "md" },
    { name: "10 — Adattárolás (PHP)", path: "/materials/Webprog/Eloadasok/10_adattarolas.md", kind: "md" },
    { name: "11 — Munkamenet, hitelesítés", path: "/materials/Webprog/Eloadasok/11_munkamenet_hitelesites.md", kind: "md" },
    { name: "12 — Tervezési minták, AJAX", path: "/materials/Webprog/Eloadasok/12_tervezesi_mintak_ajax.md", kind: "md" },
    { name: "13 — Kliens-szerver, tesztelés", path: "/materials/Webprog/Eloadasok/13_kliens_szerver_teszteles.md", kind: "md" },
    { name: "Gyakorlatok 01–13 (feladatsorok)", path: "/materials/Webprog/Gyakorlatok/01.md", kind: "md", desc: "A Gyakorlatok mappa mind a 13 feladatsora." },
    { name: "Segéd — JS csoport ZH minta", path: "/materials/Webprog/Kliensoldal/Seged/JavaScript csoportZH minta.txt", kind: "other" },
    { name: "Segéd — JS évfolyam ZH 2021", path: "/materials/Webprog/Kliensoldal/Seged/JavaScript evfolyamZH 2021.txt", kind: "other" },
    { name: "Segéd — JS évfolyam ZH 2022", path: "/materials/Webprog/Kliensoldal/Seged/JavaScript evfolyamZH 2022.txt", kind: "other" },
    { name: "Segéd — 01 data (PDF)", path: "/materials/Webprog/Kliensoldal/Seged/01-data-hun.pdf", kind: "pdf" },
    { name: "Segéd — 02 events (PDF)", path: "/materials/Webprog/Kliensoldal/Seged/02-events-hun.pdf", kind: "pdf" },
    { name: "Segéd — 03 canvas (PDF)", path: "/materials/Webprog/Kliensoldal/Seged/03-canvas-hun.pdf", kind: "pdf" },
    { name: "Projekt — Hangman (index.html)", path: "/materials/Webprog/Kliensoldal/hangman/index.html", kind: "html" },
    { name: "Projekt — Labyrinth (index.html)", path: "/materials/Webprog/Kliensoldal/labyrinth/index.html", kind: "html" },
    { name: "Projekt — Mapmakers (index.html)", path: "/materials/Webprog/Kliensoldal/mapmakers/index.html", kind: "html" },
    { name: "Projekt — Number-link (index.html)", path: "/materials/Webprog/Kliensoldal/number-link/index.html", kind: "html" },
  ],
  events: [
    { id: "wp-jskviz", type: "kviz", title: "JavaScript kvíz", topic: "JS nyelvi alapok, DOM, eseménykezelés, űrlapok (1–4. gyakorlat).", note: "A 4. gyakorlat idejében, 20 perc, 20 pont (min 8). Canvas.", tba: true },
    { id: "wp-jsbead", type: "beadando", title: "JavaScript beadandó", tba: true, topic: "Kliensoldali alkalmazás JS-ben.", note: "Határidő a félév közepén (TBA). Elfogadott/elutasított, nem javítható." },
    { id: "wp-jszh", type: "zh", title: "JavaScript ZH", tba: true, topic: "A teljes JS/kliensoldali anyag.", note: "Félév közepe (TBA), 40 pont (min 16). Javító: vizsgaidőszak." },
    { id: "wp-phpkviz", type: "kviz", title: "PHP kvíz", topic: "PHP alapok, kimenet, űrlapfeldolgozás, adattárolás (8–10. gyakorlat).", note: "A 10. gyakorlat idejében, 20 perc, 20 pont (min 8). Canvas.", tba: true },
    { id: "wp-phpbead", type: "beadando", title: "PHP beadandó", tba: true, topic: "Szerveroldali alkalmazás PHP-ban.", note: "Határidő a vizsgaidőszak elején (TBA). Elfogadott/elutasított." },
    { id: "wp-evfzh", type: "zh", title: "Évfolyam ZH (PHP)", tba: true, topic: "A teljes féléves anyag (JS + PHP).", note: "Vizsgaidőszak (TBA), 40 pont. JS és PHP részből is min. 40%!" },
  ],
  lessons: [
    {
      slug: "js-alapok",
      title: "1. JavaScript alapok — algoritmusok és programozási tételek",
      summary: "Változók, típusok, függvények, tömbök, objektumok; a klasszikus programozási tételek JS-ben.",
      status: "complete",
      body: `
## Miért JavaScript?

A JavaScript a böngésző natív nyelve — minden kliensoldali interakció ezen fut.
Ebben az első blokkban még **nincs böngésző**: a \`console.log()\`-gal írunk ki, és
a feladatokat **külön függvényként** oldjuk meg (bemenet paraméter, kimenet
visszatérési érték). Ez a gyakorlati követelmény is (1. gyakorlat).

## Változók, típusok

\`\`\`js
let x = 10;         // változó (újraértékelhető)
const PI = 3.14159; // konstans
var regi = 1;       // kerüld: függvény-szintű hatókör

// típusok: number, string, boolean, null, undefined, object, symbol, bigint
typeof 42;        // "number"
typeof "szia";    // "string"
typeof true;      // "boolean"
\`\`\`

**Fontos buktatók:**
- \`==\` típuskonverzióval hasonlít (\`0 == "0"\` → true). **Mindig \`===\`-t használj!**
- \`NaN !== NaN\`; ellenőrzés: \`Number.isNaN(x)\`.
- A \`+\` stringnél összefűz: \`"1" + 2 === "12"\`, de \`"3" * 2 === 6\`.

## Függvények

\`\`\`js
// klasszikus
function celsiusbol(f) {
  return (f - 32) * 5 / 9;
}

// nyíl (arrow) — rövid, nincs saját 'this'
const szazalek = (szam, p) => szam * p / 100;

console.log(celsiusbol(98.6)); // 37
console.log(szazalek(200, 15)); // 30
\`\`\`

## Elágazás, ciklus

\`\`\`js
function haromszogE(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function faktorialis(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
\`\`\`

## Tömbök és a programozási tételek

A tömb (\`Array\`) a legfontosabb adatszerkezet. A klasszikus tételek beépített
metódusokkal is megoldhatók — de értsd is a működést!

\`\`\`js
const t = [3, -2, 7, 0, -5, 8];

// Eldöntés: van-e negatív?
const vanNegativ = t.some(x => x < 0);        // true
// Kiválasztás: az első negatív
const elsoNeg = t.find(x => x < 0);           // -2
// Megszámlálás: hány páros?
const parosDb = t.filter(x => x % 2 === 0).length; // 3
// Összegzés
const osszeg = t.reduce((a, x) => a + x, 0);  // 11
// Maximumkiválasztás
const max = t.reduce((m, x) => x > m ? x : m, t[0]); // 8
\`\`\`

## Objektumok — adatszerkezetek modellezése

\`\`\`js
const konyv = {
  szerzo: "Orwell",
  cim: "1984",
  ev: 1949,
  isbn: "978-0451524935",
};

// raktár: objektumok tömbje
const raktar = [
  { nev: "csavar", gyarto: "A", cikkszam: 101, ar: 10, db: 500 },
  { nev: "anya",   gyarto: "B", cikkszam: 102, ar: 8,  db: 300 },
];

const osszErtek = raktar.reduce((s, p) => s + p.ar * p.db, 0);
const legkevesebb = raktar.reduce((m, p) => p.db < m.db ? p : m);
\`\`\`

## Verem (stack) — zárójel-ellenőrzés

\`\`\`js
function helyesZarojelezes(str) {
  const par = { ")": "(", "]": "[", "}": "{" };
  const verem = [];
  for (const ch of str) {
    if (ch === "(" || ch === "[" || ch === "{") verem.push(ch);
    else if (par[ch]) {
      if (verem.pop() !== par[ch]) return false;
    }
  }
  return verem.length === 0;
}
console.log(helyesZarojelezes("({[]})")); // true
console.log(helyesZarojelezes("([)]"));   // false
\`\`\`
`,
      exercises: [
        {
          prompt: "Írj `lnko(a, b)` függvényt euklideszi algoritmussal, majd erre építve `lkkt(a, b)`-t.",
          hint: "lkkt(a,b) = a*b / lnko(a,b).",
          solution: "```js\nfunction lnko(a, b) {\n  while (b !== 0) [a, b] = [b, a % b];\n  return a;\n}\nfunction lkkt(a, b) {\n  return a * b / lnko(a, b);\n}\nconsole.log(lnko(12, 18)); // 6\nconsole.log(lkkt(4, 6));   // 12\n```",
        },
        {
          prompt: "Adott a Balaton napi vízhőmérséklet-sorozata. Add meg az átlagot, a 26°C feletti mérések számát, és a leghosszabb 25°C feletti időszak hosszát.",
          solution: "```js\nfunction elemzes(t) {\n  const atlag = t.reduce((a, x) => a + x, 0) / t.length;\n  const felette26 = t.filter(x => x > 26).length;\n  let leghosszabb = 0, akt = 0;\n  for (const x of t) {\n    akt = x > 25 ? akt + 1 : 0;\n    if (akt > leghosszabb) leghosszabb = akt;\n  }\n  return { atlag, felette26, leghosszabb };\n}\n```",
        },
      ],
    },
    {
      slug: "dom",
      title: "2. A DOM — a felület programozása",
      summary: "Elemek kiválasztása, tartalom és attribútumok módosítása, elemek létrehozása.",
      status: "complete",
      body: `
## Mi a DOM?

A **Document Object Model** a HTML-oldal fa-szerkezetű, programozható reprezentációja.
A JavaScript ezen a fán keresztül olvassa és módosítja az oldalt.

\`\`\`html
<ul id="lista"></ul>
<button id="gomb">Hozzáad</button>
<p class="statusz"></p>
\`\`\`

## Elemek kiválasztása

\`\`\`js
const lista = document.getElementById("lista");
const gomb  = document.querySelector("#gomb");          // CSS-szelektor
const összes = document.querySelectorAll(".statusz");   // NodeList
\`\`\`

- \`querySelector\` — az **első** találat, CSS-szelektorral.
- \`querySelectorAll\` — **minden** találat (NodeList; \`forEach\`-elhető).

## Tartalom és attribútumok

\`\`\`js
const p = document.querySelector(".statusz");
p.textContent = "Kész";                 // biztonságos szöveg
p.innerHTML = "<b>Kész</b>";            // HTML — óvatosan (XSS)!
p.classList.add("ok");                  // osztály hozzáadás
p.classList.toggle("rejtett");          // váltás
p.setAttribute("data-id", "42");
p.dataset.id;                            // "42"
p.style.color = "green";                // inline stílus (kerüld, ha lehet CSS)
\`\`\`

> **textContent vs innerHTML:** ha felhasználói adatot írsz ki, használj
> \`textContent\`-et — az \`innerHTML\` HTML-t értelmez, ami **XSS-sebezhetőség**.

## Elemek létrehozása

\`\`\`js
function elemHozzaad(szoveg) {
  const li = document.createElement("li");
  li.textContent = szoveg;
  lista.appendChild(li);
}
elemHozzaad("első");
elemHozzaad("második");
\`\`\`

## Táblázat generálása adatból

\`\`\`js
function raktarTabla(raktar) {
  const tbody = document.querySelector("#raktar tbody");
  tbody.innerHTML = "";
  for (const p of raktar) {
    const tr = document.createElement("tr");
    for (const mezo of [p.nev, p.ar, p.db]) {
      const td = document.createElement("td");
      td.textContent = mezo;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}
\`\`\`
`,
      exercises: [
        {
          prompt: "Írj függvényt, amely egy neveket tartalmazó tömbből `<ul><li>` listát épít egy adott konténerbe.",
          solution: "```js\nfunction nevlista(nevek, container) {\n  const ul = document.createElement('ul');\n  for (const nev of nevek) {\n    const li = document.createElement('li');\n    li.textContent = nev;\n    ul.appendChild(li);\n  }\n  container.innerHTML = '';\n  container.appendChild(ul);\n}\n```",
        },
      ],
    },
    {
      slug: "esemenykezeles",
      title: "3. Eseménykezelés — interaktív programok",
      summary: "addEventListener, event objektum, delegálás, alapértelmezett viselkedés.",
      status: "complete",
      body: `
## Események

A felhasználói interakció eseményeken keresztül történik: \`click\`, \`input\`,
\`submit\`, \`keydown\`, \`mouseover\` stb.

\`\`\`js
const gomb = document.querySelector("#gomb");
gomb.addEventListener("click", (event) => {
  console.log("kattintás!", event.target);
});
\`\`\`

## Az event objektum

\`\`\`js
input.addEventListener("input", (e) => {
  console.log(e.target.value); // az aktuális mezőérték
});

form.addEventListener("submit", (e) => {
  e.preventDefault();          // ne töltsön újra az oldal!
  // ... feldolgozás
});
\`\`\`

- \`e.preventDefault()\` — az alapértelmezett viselkedés (pl. űrlapküldés, link) letiltása.
- \`e.stopPropagation()\` — az esemény ne buborékoljon feljebb.
- \`e.target\` — az eredeti forráselem; \`e.currentTarget\` — ahol a figyelő van.

## Eseménydelegálás

Sok elem helyett **egy** figyelő a szülőn — új elemekre is működik:

\`\`\`js
lista.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) li.classList.toggle("kesz");
});
\`\`\`

## Példa: teendőlista

\`\`\`js
const input = document.querySelector("#uj");
const gomb  = document.querySelector("#hozzaad");
const lista = document.querySelector("#teendok");

gomb.addEventListener("click", () => {
  const szoveg = input.value.trim();
  if (!szoveg) return;
  const li = document.createElement("li");
  li.textContent = szoveg;
  lista.appendChild(li);
  input.value = "";
  input.focus();
});
\`\`\`
`,
      exercises: [
        {
          prompt: "Készíts számlálót: egy gombra kattintva növekedjen egy szám a képernyőn, egy másik gomb nullázza.",
          solution: "```js\nlet n = 0;\nconst kijelzo = document.querySelector('#szam');\ndocument.querySelector('#novel').addEventListener('click', () => {\n  n++; kijelzo.textContent = n;\n});\ndocument.querySelector('#null').addEventListener('click', () => {\n  n = 0; kijelzo.textContent = n;\n});\n```",
        },
      ],
    },
    {
      slug: "urlapok",
      title: "4. Űrlapok és validáció",
      summary: "Mezők beolvasása, ellenőrzés, hibaüzenetek, submit kezelése.",
      status: "complete",
      body: `
## Űrlapmezők elérése

\`\`\`html
<form id="reg">
  <input name="email" type="email" />
  <input name="kor" type="number" />
  <button>Küldés</button>
</form>
\`\`\`

\`\`\`js
const form = document.querySelector("#reg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const email = data.get("email");
  const kor = Number(data.get("kor"));
  const hibak = ellenoriz(email, kor);
  if (hibak.length) mutatHibak(hibak);
  else kuld({ email, kor });
});
\`\`\`

## Validáció — hibák gyűjtése adatszerkezetbe

\`\`\`js
function ellenoriz(email, kor) {
  const hibak = [];
  if (!email.includes("@")) hibak.push({ mezo: "email", uzenet: "Érvénytelen email." });
  if (Number.isNaN(kor) || kor < 18) hibak.push({ mezo: "kor", uzenet: "Legalább 18." });
  return hibak;
}

function mutatHibak(hibak) {
  const ul = document.querySelector("#hibak");
  ul.innerHTML = "";
  for (const h of hibak) {
    const li = document.createElement("li");
    li.textContent = \`\${h.mezo}: \${h.uzenet}\`;
    ul.appendChild(li);
  }
}
\`\`\`

> A **JavaScript kvíz a 4. gyakorlaton** pontosan ezt a blokkot (alapok → DOM →
> események → űrlapok) méri. Gyakorolj a Segéd/évfolyam ZH mintákkal!
`,
      exercises: [
        {
          prompt: "Írj jelszó-ellenőrzőt: min. 8 karakter, legyen benne kis- és nagybetű és szám. Adj vissza hibalistát.",
          solution: "```js\nfunction jelszoHibak(j) {\n  const h = [];\n  if (j.length < 8) h.push('Legalább 8 karakter.');\n  if (!/[a-z]/.test(j)) h.push('Kell kisbetű.');\n  if (!/[A-Z]/.test(j)) h.push('Kell nagybetű.');\n  if (!/[0-9]/.test(j)) h.push('Kell szám.');\n  return h;\n}\n```",
        },
      ],
    },
    {
      slug: "ajax-json",
      title: "5. Aszinkron műveletek — fetch, JSON, API",
      summary: "Promise, async/await, fetch, JSON feldolgozás, hibakezelés.",
      status: "complete",
      body: `
## Miért aszinkron?

A hálózati kérés lassú; nem várhatjuk meg blokkolva. A JS **eseményhurokkal** és
**Promise**-okkal old meg mindent, ami később fejeződik be.

## fetch + async/await

\`\`\`js
async function felhasznalok() {
  try {
    const valasz = await fetch("https://api.example.com/users");
    if (!valasz.ok) throw new Error("HTTP " + valasz.status);
    const adat = await valasz.json();   // JSON → JS objektum
    return adat;
  } catch (hiba) {
    console.error("Sikertelen lekérés:", hiba);
    return [];
  }
}

felhasznalok().then(lista => console.log(lista));
\`\`\`

## JSON

\`\`\`js
const obj = { nev: "Anna", kor: 25 };
const szoveg = JSON.stringify(obj);      // '{"nev":"Anna","kor":25}'
const vissza = JSON.parse(szoveg);       // objektum
\`\`\`

## POST kérés

\`\`\`js
await fetch("/api/mentes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nev: "Béla" }),
});
\`\`\`

## Több kérés párhuzamosan

\`\`\`js
const [a, b] = await Promise.all([
  fetch("/a").then(r => r.json()),
  fetch("/b").then(r => r.json()),
]);
\`\`\`
`,
      exercises: [
        {
          prompt: "Írj függvényt, amely lekér egy JSON API-t, és a kapott tömb elemeit kilistázza egy `<ul>`-be. Hiba esetén írjon ki hibaüzenetet.",
          solution: "```js\nasync function listaz(url, container) {\n  try {\n    const r = await fetch(url);\n    if (!r.ok) throw new Error('HTTP ' + r.status);\n    const elemek = await r.json();\n    container.innerHTML = '';\n    for (const e of elemek) {\n      const li = document.createElement('li');\n      li.textContent = e.name ?? JSON.stringify(e);\n      container.appendChild(li);\n    }\n  } catch (err) {\n    container.textContent = 'Hiba: ' + err.message;\n  }\n}\n```",
        },
      ],
    },
    {
      slug: "php-alapok",
      title: "6. PHP alapok — szerveroldali kimenet",
      summary: "PHP szintaxis, változók, HTTP, HTML generálás, tömbök.",
      status: "complete",
      body: `
## Kliensről szerverre

A félév második fele **PHP**: a szerver dolgozza fel a kérést és generálja a
HTML-t. A PHP-kód \`<?php ... ?>\` blokkban fut, a többi közvetlen kimenet.

\`\`\`php
<?php
$nev = "Világ";
?>
<!DOCTYPE html>
<html><body>
  <h1>Helló, <?= htmlspecialchars($nev) ?>!</h1>
</body></html>
\`\`\`

- \`<?= $x ?>\` = \`<?php echo $x; ?>\`.
- \`htmlspecialchars()\` — **mindig** használd kiíráskor (XSS-védelem).

## Változók, típusok, vezérlés

\`\`\`php
<?php
$szam = 42;            // int
$ar = 9.99;            // float
$nev = "Anna";         // string
$aktiv = true;         // bool
$lista = [1, 2, 3];    // indexelt tömb
$szemely = ["nev" => "Anna", "kor" => 25]; // asszociatív tömb

for ($i = 0; $i < 3; $i++) echo $i;
foreach ($lista as $elem) echo $elem;
foreach ($szemely as $kulcs => $ertek) echo "$kulcs: $ertek\\n";
\`\`\`

## Függvények és HTML-generálás

\`\`\`php
<?php
function lista_html(array $elemek): string {
    $html = "<ul>";
    foreach ($elemek as $e) {
        $html .= "<li>" . htmlspecialchars($e) . "</li>";
    }
    return $html . "</ul>";
}

echo lista_html(["alma", "körte", "szilva"]);
\`\`\`

## Hasznos tömbfüggvények

\`\`\`php
$szamok = [3, 1, 4, 1, 5];
sort($szamok);                       // rendezés helyben
$osszeg = array_sum($szamok);        // 14
$parosak = array_filter($szamok, fn($x) => $x % 2 === 0);
$duplak = array_map(fn($x) => $x * 2, $szamok);
$db = count($szamok);
\`\`\`
`,
      exercises: [
        {
          prompt: "Írj PHP függvényt, amely egy asszociatív tömbökből álló terméklistából HTML-táblázatot generál (név, ár oszlopokkal).",
          solution: "```php\n<?php\nfunction tabla(array $termekek): string {\n    $s = \"<table><tr><th>Név</th><th>Ár</th></tr>\";\n    foreach ($termekek as $t) {\n        $s .= \"<tr><td>\" . htmlspecialchars($t['nev']) . \"</td>\";\n        $s .= \"<td>\" . (int)$t['ar'] . \"</td></tr>\";\n    }\n    return $s . \"</table>\";\n}\n```",
        },
      ],
    },
    {
      slug: "php-urlap-session",
      title: "7. PHP — űrlapok, munkamenet, hitelesítés",
      summary: "$_GET/$_POST, validáció, session, egyszerű login, CSV tárolás.",
      status: "complete",
      body: `
## Bemenet: $_GET és $_POST

\`\`\`php
<?php
// URL: ?nev=Anna&kor=25
$nev = $_GET["nev"] ?? "";
$kor = (int)($_GET["kor"] ?? 0);

// űrlap POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $hibak = [];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $hibak[] = "Érvénytelen email.";
    }
    // ...
}
\`\`\`

> **Soha ne bízz a bemenetben.** Validálj, és kiíráskor mindig \`htmlspecialchars\`.

## Munkamenet (session)

\`\`\`php
<?php
session_start();
$_SESSION["felhasznalo"] = $email;   // eltárolás
// másik oldalon:
session_start();
$aktualis = $_SESSION["felhasznalo"] ?? null;
if (!$aktualis) { header("Location: login.php"); exit; }
\`\`\`

## Egyszerű hitelesítés

\`\`\`php
<?php
// jelszó tárolása (regisztrációkor):
$hash = password_hash($jelszo, PASSWORD_DEFAULT);

// ellenőrzés (belépéskor):
if (password_verify($beirtJelszo, $taroltHash)) {
    session_start();
    $_SESSION["belepve"] = true;
}
\`\`\`

## Adattárolás CSV-ben

\`\`\`php
<?php
// írás
$f = fopen("adatok.csv", "a");
fputcsv($f, [$nev, $email, date("Y-m-d")]);
fclose($f);

// olvasás
$sorok = [];
if (($f = fopen("adatok.csv", "r")) !== false) {
    while (($sor = fgetcsv($f)) !== false) $sorok[] = $sor;
    fclose($f);
}
\`\`\`

> Az **évfolyam ZH** (PHP) a teljes stacket kéri számon — a JS és a PHP részből
> **külön kell 40%**. A Segéd mappa mintái + a 08–13 előadás/gyakorlat a felkészülés.
`,
      exercises: [
        {
          prompt: "Írj egy egyszerű vendégkönyvet: POST-tal érkező névet és üzenetet ments CSV-be, majd listázd ki az eddigi bejegyzéseket HTML-ben.",
          solution: "```php\n<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $nev = trim($_POST['nev'] ?? '');\n    $uzenet = trim($_POST['uzenet'] ?? '');\n    if ($nev && $uzenet) {\n        $f = fopen('vendegkonyv.csv', 'a');\n        fputcsv($f, [$nev, $uzenet, date('Y-m-d H:i')]);\n        fclose($f);\n    }\n}\n$sorok = [];\nif (($f = @fopen('vendegkonyv.csv', 'r')) !== false) {\n    while (($s = fgetcsv($f)) !== false) $sorok[] = $s;\n    fclose($f);\n}\nforeach ($sorok as $s) {\n    echo '<p><b>' . htmlspecialchars($s[0]) . '</b>: '\n       . htmlspecialchars($s[1]) . ' <i>(' . htmlspecialchars($s[2]) . ')</i></p>';\n}\n```",
        },
      ],
    },
  ],
  links: [
    { label: "Tananyag online (webprogramozas.inf.elte.hu)", url: "https://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti" },
  ],
};
