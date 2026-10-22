import type { Subject } from "@/lib/types";

export const programozasiTechnologia: Subject = {
  slug: "programozasi-technologia",
  name: "Programozási technológia",
  short: "Progtech",
  accent: "#c7a13f",
  tagline: "OOP Javában, tervezés, dokumentáció, tesztelés.",
  location: "Kedd 16:00–17:30 — Északi tömb 7.89 Bosch labor",
  requirementsSource: "Progtech/Progtech_informaciok.pdf",
  requirementsMd: `
## Számonkérések

1. **Előadás aszinkron** (videók a Teamsben). Előadásmentességtől függetlenül a **11 előadás-kvíz 75%-ának hibátlan** kitöltése szükséges.
2. **Gyakorlat kötelező**, **3 hiányzás** megengedett. A félév során **3 beadandó**; elkészítésük kötelező. Határidőre feltöltés: max **5 pont**, amely hetente csökken. Minden beadandóra **legalább 2 pont** kell.
3. **Dokumentáció** (PDF, a kódhoz mellékelve) — tartalma:
   - a feladat szövege,
   - a megoldás terve **osztálydiagrammal** (osztályok + kapcsolataik),
   - a szükséges típusok **osztályleírása**,
   - **részletes tesztelési terv táblázatosan** (teszteset leírás, bemenet, elvárt kimenet — user story-k).
4. A **metódusok leírása** csak a kódban, **JavaDoc** formában.
5. **Félév végi ZH** — információk később.

## Végső jegy
\`\`\`
(1. beadandó + 2. beadandó + 3. beadandó + 2 × ZH jegy) / 5
\`\`\`
Az eredmény **3.5 alatt lefelé** kerekítendő.
`,
  files: [
    { name: "Kurzusinformációk (PDF)", path: "/materials/Progtech/Progtech_informaciok.pdf", kind: "pdf" },
    { name: "Feladatsor (PDF)", path: "/materials/Progtech/Progtech_feladatsor.pdf", kind: "pdf" },
    { name: "Gyakorlat 1 (PDF)", path: "/materials/Progtech/Progtech_gyakorlat1.pdf", kind: "pdf" },
    { name: "Gyakorlat 2 (PDF)", path: "/materials/Progtech/Progtech_gyakorlat2.pdf", kind: "pdf" },
    { name: "Gyakorlat 3 (PDF)", path: "/materials/Progtech/Progtech_gyakorlat3.pdf", kind: "pdf" },
    { name: "Gyakorlat 4 (PDF)", path: "/materials/Progtech/Progtech_gyakorlat4.pdf", kind: "pdf" },
    { name: "Mintadokumentáció (PDF)", path: "/materials/Progtech/Progtech_mintadokumentacio.pdf", kind: "pdf", desc: "Kövesd ezt a beadandó dokumentációjához!" },
    { name: "gyak2 — Zoo/Animal példa (Java forrás)", path: "/materials/Progtech/gyak2/main.java", kind: "code" },
    { name: "gyak2 — sárkányos feladat (Main.java)", path: "/materials/Progtech/gyak2/sarkanyos/Main.java", kind: "code" },
    { name: "gyakorlat2 projekt — example1 (Main.java)", path: "/materials/Progtech/gyakorlat2/src/example1/Main.java", kind: "code" },
    { name: "gyakorlat2 projekt — task1 (Main.java)", path: "/materials/Progtech/gyakorlat2/src/task1/Main.java", kind: "code" },
  ],
  events: [
    { id: "pt-kviz", type: "kviz", title: "Előadás-kvízek (11 db)", topic: "Az aszinkron előadásvideók anyaga.", note: "A 11 kvíz 75%-ának hibátlan kitöltése kötelező.", recurring: true },
    { id: "pt-b1", type: "beadando", title: "1. beadandó", tba: true, topic: "OOP feladat + dokumentáció (osztálydiagram, tesztterv) + JavaDoc.", note: "Max 5 pont (hetente csökken), min 2 pont." },
    { id: "pt-b2", type: "beadando", title: "2. beadandó", tba: true, topic: "OOP feladat + dokumentáció.", note: "Max 5 pont, min 2 pont." },
    { id: "pt-b3", type: "beadando", title: "3. beadandó", tba: true, topic: "OOP feladat + dokumentáció.", note: "Max 5 pont, min 2 pont." },
    { id: "pt-zh", type: "zh", title: "Félév végi ZH", tba: true, topic: "A féléves anyag.", note: "Részletek később. A jegybe 2× súllyal számít." },
  ],
  lessons: [
    {
      slug: "oop-alapok",
      title: "1. OOP alapok Javában — osztály, mező, konstruktor, egységbezárás",
      summary: "Osztály és objektum, mezők/metódusok, konstruktor, this, private + getter/setter, package.",
      status: "complete",
      body: `
## Miről szól a tárgy?

Objektumorientált **tervezés és programozás Javában**, plusz a **mérnöki**
fegyelem: osztálydiagram, tesztelési terv, JavaDoc. A jegy három beadandóból és
a ZH-ból áll — a kód mellett a **dokumentáció** ugyanolyan fontos.

## Osztály és objektum

Az **osztály** egy típus (sablon), az **objektum** egy konkrét példány. Egy
osztály **mezőket** (állapot) és **metódusokat** (viselkedés) fog egybe:

\`\`\`java
public class Character {
    String name;   // mező
    int health;    // mező

    public boolean isAlive() {   // metódus
        return health > 0;
    }
}
\`\`\`

Példányosítás \`new\`-val:

\`\`\`java
Character c = new Character();
c.name = "Tibor";
c.health = 200;
System.out.println(c.isAlive());   // true
\`\`\`

## Konstruktor és a this

A **konstruktor** az objektum létrehozásakor állítja be a kezdőállapotot. A
\`this\` a **saját** objektumra utal — így oldható fel a paraméter és a mező
névütközése:

\`\`\`java
public class Character {
    String name;
    int health;
    int damage;

    public Character(String name, int health, int damage) {
        this.name = name;       // this.name a mező, name a paraméter
        this.health = health;
        this.damage = damage;
    }
}

Character c = new Character("Tibor", 200, 50);
\`\`\`

## Egységbezárás (encapsulation)

A **jó OOP** elrejti az állapotot: a mezők \`private\`-ok, a hozzáférés
**metódusokon** (getter/setter) keresztül megy. Így az osztály belseje
szabadon változtatható anélkül, hogy a használók kódja eltörne:

\`\`\`java
public class Character {
    private int health;              // kívülről nem látszik

    public int getHealth() {         // getter
        return health;
    }

    public void takeDamage(int amount) {   // ellenőrzött módosítás
        this.health = Math.max(0, this.health - amount);
    }
}
\`\`\`

A \`takeDamage\` a \`Math.max(0, ...)\`-szal biztosítja, hogy az életerő **ne
menjen 0 alá** — ez a lényeg: az objektum őrzi a saját érvényességét
(invariánsát).

## Láthatóság és package

| Módosító | Ki éri el |
|----------|-----------|
| \`private\` | csak az osztály maga |
| (semmi) | ugyanaz a **package** |
| \`protected\` | package + leszármazottak |
| \`public\` | bárki |

A **package** logikai csoport; a fájl elején \`package sarkanyos;\`, és a mappa-
szerkezetnek tükröznie kell. A \`final\` mező a konstruktor után nem
változtatható (\`private final String name;\`).

> A beadandó a tiszta OOP-ra megy: \`private\` mezők, konstruktor, ellenőrzött
> metódusok. A következő leckében ezekből építünk **öröklődési hierarchiát**.
`,
      exercises: [
        {
          prompt: "Írd meg a `Character` osztály konstruktorát, amely name, health, damage paramétereket kap és beállítja a megfelelő mezőket a `this`-szel!",
          hint: "`this.name = name;` mind a három mezőre.",
          check: "code",
          multiline: true,
          placeholder: "public Character(String name, int health, int damage) {\n",
          answer: [
            "public Character(String name, int health, int damage) {\n    this.name = name;\n    this.health = health;\n    this.damage = damage;\n}",
            "Character(String name, int health, int damage) {\n    this.name = name;\n    this.health = health;\n    this.damage = damage;\n}",
          ],
          solution: "```java\npublic Character(String name, int health, int damage) {\n    this.name = name;\n    this.health = health;\n    this.damage = damage;\n}\n```",
        },
        {
          prompt: "Írj egy `takeDamage(int amount)` metódust, amely csökkenti a `health` mezőt, de nem enged 0 alá menni!",
          hint: "`this.health = Math.max(0, this.health - amount);`",
          check: "code",
          multiline: true,
          placeholder: "public void takeDamage(int amount) {\n",
          answer: [
            "public void takeDamage(int amount) {\n    this.health = Math.max(0, this.health - amount);\n}",
            "void takeDamage(int amount) {\n    this.health = Math.max(0, this.health - amount);\n}",
            "public void takeDamage(int amount) {\n    health = Math.max(0, health - amount);\n}",
          ],
          solution: "```java\npublic void takeDamage(int amount) {\n    this.health = Math.max(0, this.health - amount);\n}\n```",
        },
        {
          prompt: "Melyik láthatósági módosítóval teszed a mezőt úgy, hogy CSAK az osztály maga érje el?",
          hint: "Az egységbezárás alapmódosítója.",
          check: "text",
          answer: ["private"],
          solution: "A **private** — kívülről csak getter/setter metódusokon át érhető el, ez az egységbezárás.",
        },
      ],
    },
    {
      slug: "oroklodes-polimorfizmus",
      title: "2. Öröklődés, absztrakt osztályok, polimorfizmus",
      summary: "extends, super, abstract class/method, @Override, dinamikus kötés — a Character/Orc/Dragon hierarchia.",
      status: "complete",
      body: `
## Öröklődés — a közös rész kiemelése

Ha több típusnak van közös állapota/viselkedése, azt egy **ősosztályba** emeljük,
és a leszármazottak \`extends\`-szel öröklik. A gyakorlat harci példája:
minden szereplő \`Character\`, ebből ágazik az \`Orc\` és a \`Dragon\`, azokból a
konkrét fajták:

\`\`\`text
Character (abstract)
├── Orc (abstract)
│   ├── BerserkerOrc
│   └── ShieldOrc
└── Dragon (abstract)
    ├── BlackDragon
    └── RedDragon
\`\`\`

## Absztrakt osztály és metódus

Az **absztrakt osztály** nem példányosítható közvetlenül (\`new Character(...)\`
tiltott) — csak közös alapot ad. Az **absztrakt metódusnak** nincs törzse, a
leszármazott **kötelezően** megvalósítja:

\`\`\`java
public abstract class Character {
    protected String name;
    protected int health;
    protected int damage;

    protected Character(String name, int health, int damage) {
        this.name = name;
        this.health = health;
        this.damage = damage;
    }

    /** A támadás ereje — fajtánként más. */
    public abstract int attackPower();

    public void attack(Character target) {
        target.takeDamage(this.attackPower());
    }

    protected void takeDamage(int amount) {
        this.health = Math.max(0, this.health - amount);
    }

    public boolean isAlive() { return health > 0; }
    public String getName()  { return name; }
}
\`\`\`

## super — az ős konstruktorának hívása

A leszármazott konstruktora a \`super(...)\`-ral adja tovább az adatokat az
ősnek (ennek az **első** utasításnak kell lennie):

\`\`\`java
public abstract class Orc extends Character {
    public Orc(String name, int health, int damage) {
        super(name, health, damage);
    }
}

public class BerserkerOrc extends Orc {
    public BerserkerOrc(String name, int health, int damage) {
        super(name, health, damage);
    }
    @Override
    public int attackPower() {
        return this.damage * 2;   // a berserker dupla sebzést oszt
    }
}

public class ShieldOrc extends Orc {
    public ShieldOrc(String name, int health, int damage) {
        super(name, health, damage);
    }
    @Override
    public int attackPower() {
        return this.damage;
    }
    @Override
    protected void takeDamage(int amount) {
        super.takeDamage(amount / 2);   // a pajzs feleZi a kapott sebzést
    }
}
\`\`\`

## Polimorfizmus és a @Override

A **polimorfizmus** lényege: ugyanarra a \`Character\`-hívásra **más-más**
viselkedés fut a tényleges típustól függően (dinamikus kötés):

\`\`\`java
Character a = new BerserkerOrc("Tibor", 200, 50);
Character b = new ShieldOrc("Turbo", 200, 50);
a.attack(b);   // a.attackPower() a BerserkerOrc verzióját hívja -> 100
               // b.takeDamage a ShieldOrc verzióját -> feleZi -> 50 sebzés
\`\`\`

Az \`@Override\` **annotáció** jelzi (és a fordítóval ellenőrizteti), hogy egy
ős-metódust írunk felül. Ha elgépeled a nevet, a fordító szól — ezért mindig tedd ki.

> Ez a lecke a beadandók magja. A ZH-n tipikus: adott hierarchiát megtervezni
> (mi legyen \`abstract\`, mi közös az ősben), \`@Override\`-dal felüldefiniálni,
> és megmondani, egy \`Character\`-változón át melyik verzió fut le.
`,
      exercises: [
        {
          prompt: "Írd meg a `BerserkerOrc` osztály `attackPower()` metódusát, amely a damage kétszeresét adja vissza (ne felejtsd az @Override-ot)!",
          hint: "`@Override public int attackPower() { return this.damage * 2; }`",
          check: "code",
          multiline: true,
          placeholder: "@Override\n",
          answer: [
            "@Override\npublic int attackPower() {\n    return this.damage * 2;\n}",
            "@Override\npublic int attackPower() {\n    return damage * 2;\n}",
            "@Override\npublic int attackPower() {\n    return this.damage*2;\n}",
          ],
          solution: "```java\n@Override\npublic int attackPower() {\n    return this.damage * 2;\n}\n```",
        },
        {
          prompt: "Írd meg egy `Orc` leszármazott konstruktorát, amely a name, health, damage paramétereket továbbadja az ősnek!",
          hint: "A super(...) hívás legyen az első utasítás.",
          check: "code",
          multiline: true,
          placeholder: "public Orc(String name, int health, int damage) {\n",
          answer: [
            "public Orc(String name, int health, int damage) {\n    super(name, health, damage);\n}",
            "Orc(String name, int health, int damage) {\n    super(name, health, damage);\n}",
          ],
          solution: "```java\npublic Orc(String name, int health, int damage) {\n    super(name, health, damage);\n}\n```",
        },
        {
          prompt: "Melyik annotációt teszed ki, ha egy ős-metódust írsz felül (hogy a fordító ellenőrizze)?",
          hint: "@ jellel kezdődik.",
          check: "text",
          answer: ["@Override", "Override", "@override"],
          solution: "Az **@Override** — a fordító hibát jelez, ha valójában nincs ilyen ős-metódus (pl. elgépelt név).",
        },
      ],
    },
    {
      slug: "interfeszek-kollekciok-dokumentacio",
      title: "3. Interfészek, kollekciók, Stream — és a beadandó mérnöki része",
      summary: "interface, List, Stream (filter/count/findFirst), Optional, Predicate; osztálydiagram, tesztterv, JavaDoc.",
      status: "complete",
      body: `
## Interfész — a viselkedés szerződése

Az **interfész** csak azt írja le, *mit* kell tudni egy típusnak, a *hogyan*
nélkül. Egy osztály \`implements\`-szel valósítja meg (akár többet is — Javában
osztályból csak egyet lehet örökölni, de sok interfészt megvalósítani):

\`\`\`java
public interface Attacker {
    int attackPower();
    void attack(Character target);
}

public abstract class Character implements Attacker {
    // ... meg kell valósítania az attackPower() és attack() metódusokat
}
\`\`\`

## Kollekciók — List

A \`List\` a leggyakoribb kollekció. A \`List.of(...)\` gyorsan létrehoz egy
(módosíthatatlan) listát:

\`\`\`java
List<Character> characters = List.of(
    new BerserkerOrc("Tibor", 200, 50),
    new ShieldOrc("Turbo", 200, 50),
    new BlackDragon("Ares", 200, 50)
);

for (Character c : characters) {       // for-each ciklus
    System.out.println(c.getName());
}
\`\`\`

## Stream — deklaratív feldolgozás

A **Stream API** a kollekciók szűrését/leképezését/összegzését teszi tömörré. A
\`filter\` szűr, a \`count\` számol, a \`findFirst\` az elsőt adja \`Optional\`-ban:

\`\`\`java
// hány szereplő él még?
long alive = characters.stream()
        .filter(Character::isAlive)
        .count();

// a győztes (az egyetlen, aki még él)
Optional<Character> winner = characters.stream()
        .filter(Character::isAlive)
        .findFirst();
winner.ifPresent(c -> System.out.println("Győztes: " + c.getName()));
\`\`\`

A \`Character::isAlive\` egy **metódusreferencia** (a \`c -> c.isAlive()\` lambda
rövidítése). A **Predicate** egy \`boolean\`-t adó függvény, amit feltételként
adhatunk át:

\`\`\`java
Predicate<List<Character>> fightIsOver = fighters ->
    fighters.stream().filter(Character::isAlive).count() <= 1;
\`\`\`

Az **Optional** a "lehet, hogy nincs érték" tiszta kezelése — így kerüljük el a
\`null\`-t és a \`NullPointerException\`-t.

## A beadandó mérnöki része

A kód **fele** a beadandónak; a másik fele a **dokumentáció (PDF)**:

1. **Feladatszöveg** — pontosan, ahogy kaptad.
2. **Tervezés — osztálydiagram:** az osztályok és **kapcsolataik** (öröklődés,
   tartalmazás). Az absztrakt osztályok, interfészek jelölve.
3. **Osztályleírások** — minden típus felelőssége egy-két mondatban.
4. **Tesztelési terv — táblázatosan:** teszteset-leírás, bemenet, elvárt kimenet
   (user story-k alapján).

| Teszteset | Bemenet | Elvárt kimenet |
|-----------|---------|----------------|
| Berserker támad | dmg=50, cél hp=200 | cél hp = 100 (dupla sebzés) |
| Pajzsos sebződik | dmg=50 bejön | hp csak 25-tel csökken |
| Harc vége 1 túlélőnél | 2 halott, 1 él | fightIsOver = true |

A **metódusok leírása NEM a PDF-be**, hanem a kódba, **JavaDoc** formában:

\`\`\`java
/**
 * A megadott célpontot megtámadja a saját támadóerejével.
 * @param target a megtámadott szereplő
 */
public void attack(Character target) {
    target.takeDamage(this.attackPower());
}
\`\`\`

> A **mintadokumentáció PDF** a mérce — a beadandó dokumentációját pontosan
> abban a formában kell leadni. A JavaDoc \`@param\`, \`@return\` címkéivel írd le
> a metódusokat.
`,
      exercises: [
        {
          prompt: "Írj egy Stream-kifejezést, amely megszámolja a `characters` listában az életben lévő szereplőket (long alive = ...)!",
          hint: "stream().filter(Character::isAlive).count()",
          check: "code",
          multiline: true,
          placeholder: "long alive = characters.stream()\n",
          answer: [
            "long alive = characters.stream()\n        .filter(Character::isAlive)\n        .count();",
            "long alive = characters.stream().filter(Character::isAlive).count();",
            "long alive = characters.stream().filter(c -> c.isAlive()).count();",
          ],
          solution: "```java\nlong alive = characters.stream()\n        .filter(Character::isAlive)\n        .count();\n```",
        },
        {
          prompt: "Melyik kulcsszóval valósít meg egy osztály egy interfészt Javában?",
          hint: "Nem az extends (az öröklődés). Osztályból egyet, interfészből többet.",
          check: "text",
          answer: ["implements"],
          solution: "Az **implements** — pl. `class Character implements Attacker`. Osztályt `extends`-szel örökölsz, interfészt `implements`-szel valósítasz meg.",
        },
        {
          prompt: "Melyik JavaDoc-címkével dokumentálod egy metódus egy paraméterét?",
          hint: "@-jellel kezdődik, a 'paraméter' angol rövidítése.",
          check: "text",
          answer: ["@param", "param"],
          solution: "A **@param** (a visszatérési értéké a `@return`). Ezek a kódban, a metódus fölötti `/** ... */` blokkban vannak — nem a PDF-ben.",
        },
      ],
    },
  ],
};
