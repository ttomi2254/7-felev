import type { Subject } from "@/lib/types";

export const konkurensProgramozas: Subject = {
  slug: "konkurens-programozas",
  name: "Konkurens programozás",
  short: "Konkurens",
  accent: "#cf6b52",
  tagline: "Java szálkezelés, szinkronizáció, monitor, Executor.",
  location: "Hétfő 16:00–16:45 Ea+Gy · Péntek 16:00–16:45 Labor · GY15, D 2-709",
  requirementsSource: "Konkurens/hu-syllabus-Konkurens-grading.html",
  requirementsMd: `
A tárgy **kombinált számonkérésű** — egyetlen (gyakorlati) jegy zárja. Ha valaki több mint **négyszer** hiányzik akár az előadásról, akár a gyakorlatról, a jegyet megtagadjuk.

## Pontrendszer (összesen 100 pont)
- Elméleti órai kvízek: **nem érnek pontot** (jelenlét + tanulás).
- Gyakorlati **órai kvíz: 2-2 pont, 10 alkalommal → max. 20 pont.**
- **Beadandó feladat:** működőképes megoldás kell határidőre, de **gyakorlási célú, nem ér pontot** (aki nem ad be, elesik a teljesítéstől).
- **Fennmaradó 10 pont:** a gyakorlatvezető ismerteti a félév elején (Canvas Tematika).
- **Vizsgaidőszaki ZH:** elméleti rész **20 pont** (kvíz) + programozási rész **max. 50 pont**.

## Érdemjegy
| Pont | Jegy |
|------|------|
| 80+ | jeles (5) |
| 70+ | jó (4) |
| 60+ | közepes (3) |
| 50+ | elégséges (2) |

## ZH-feltételek
- Minden Java fájlnak **hiba nélkül le kell fordulnia** — a nem forduló fájlokat nem értékelik (más fájlokat is elvethetnek emiatt).
- Több beküldés lehet; az **utolsót** értékelik. Az oktató kérheti a megoldás megvédését.
- ZH alatt **nincs hozott segédanyag**; elérhető: Java API + JUnit API dokumentáció, \`junit6all.jar\`. **Internet, fóliák, saját gép, MI tilos.** Mosdó nem látogatható.
- A ZH **egyszer** megismételhető — csak javítani lehet (az összpontszámra).

## Tematika
Alapvető szálkezelés · műveletek szálakkal · szálak kivételkezelése · egyszerű leállítás · blokkoló I/O · versenyhelyzet, interferencia, **monitor** · objektumok másolhatósága · szinkronizált adatszerkezetek (\`ConcurrentMap\`, \`BlockingQueue\`) · \`wait\`–\`notify\` · \`Executor\` · időzítés, holtpont.
`,
  files: [
    { name: "Syllabus — áttekintés (HTML)", path: "/materials/Konkurens/hu-syllabus-Konkurens-overview.html", kind: "html" },
    { name: "Syllabus — számonkérés (HTML)", path: "/materials/Konkurens/hu-syllabus-Konkurens-grading.html", kind: "html" },
    { name: "labs/example — ThreadCreationExample.java", path: "/materials/Konkurens/concurent/labs/example/ThreadCreationExample.java", kind: "code" },
    { name: "labs/example — ClassExtendingThread.java", path: "/materials/Konkurens/concurent/labs/example/ClassExtendingThread.java", kind: "code" },
    { name: "labs/example — ClassImplementingRunnable.java", path: "/materials/Konkurens/concurent/labs/example/ClassImplementingRunnable.java", kind: "code" },
    { name: "labs/example — JoinSleepSynchronizedExample.java", path: "/materials/Konkurens/concurent/labs/example/JoinSleepSynchronizedExample.java", kind: "code" },
    { name: "labs/example — LifecycleInterruptExample.java", path: "/materials/Konkurens/concurent/labs/example/LifecycleInterruptExample.java", kind: "code" },
    { name: "labs/example — ExampleHub.java", path: "/materials/Konkurens/concurent/labs/example/ExampleHub.java", kind: "code" },
    { name: "labs/example — ExampleHelper.java", path: "/materials/Konkurens/concurent/labs/example/ExampleHelper.java", kind: "code" },
    { name: "labs/task — ThreadCraft.java", path: "/materials/Konkurens/concurent/labs/task/ThreadCraft.java", kind: "code" },
    { name: "labs/task — Resources.java", path: "/materials/Konkurens/concurent/labs/task/Resources.java", kind: "code" },
    { name: "labs/task — Configuration.java", path: "/materials/Konkurens/concurent/labs/task/Configuration.java", kind: "code" },
  ],
  events: [
    { id: "kp-kviz", type: "kviz", title: "Gyakorlati órai kvíz", topic: "Az aktuális szálkezelési téma.", note: "2 pont/alkalom, 10× → max 20 pont.", recurring: true },
    { id: "kp-bead", type: "beadando", title: "Beadandó feladat", tba: true, topic: "Működőképes Java megoldás.", note: "Gyakorlási célú (0 pont), de kötelező beadni — különben nincs teljesítés. Határidő: TBA." },
    { id: "kp-zh", type: "zh", title: "Vizsgaidőszaki ZH", tba: true, topic: "Elmélet (20 pont kvíz) + programozás (max 50 pont).", note: "Java + JUnit dok. és junit6all.jar elérhető; internet/MI tilos. Egyszer javítható." },
  ],
  lessons: [
    {
      slug: "szalak-letrehozasa",
      title: "1. Szálak létrehozása Javában — 7 módszer",
      summary: "run() vs start(), Thread vs Runnable, anonim osztály, metódusreferencia, lambda; nemdeterminizmus.",
      status: "complete",
      body: `
## Miről szól? (az 1. gyakorlat alapján)

A gyakorlat a \`ThreadCreationExample\` osztályt járja végig: **hányféleképpen
lehet szálat (thread) létrehozni Javában**, és mi a különbség \`run()\` és
\`start()\` között. A példákat az \`ExampleHelper\` segédosztály futtatja (statikus
metódusokkal — nem kell példányosítani), az \`ExampleHub\` pedig összefogja a
kipróbálható témákat (szálkészítés · join/sleep/synchronized · életciklus/interrupt).

> **Elnevezési tipp a ZH-ra és beadandóra:** adj beszédes neveket! Ha egy metódus
> a \`ThreadCreationExample\`-t futtatja, legyen a neve \`runThreadCreationExample\`.
> A rendezett, jól elnevezett kód a beadandó és a ZH értékelésénél is elvárás.

## A kulcskülönbség: \`run()\` vs \`start()\`

A \`Thread\` osztály a \`Runnable\` interfészt valósítja meg, aminek egyetlen
metódusa a \`run()\`. Amikor **saját viselkedést** akarsz egy szálnak, a \`run()\`-t
írod felül (\`@Override\`), de **elindítani a \`start()\`-tal** kell:

\`\`\`java
Thread t = new MyThread();
t.run();    // ❌ csak sima függvényhívás — a MAIN szálon fut le!
t.start();  // ✅ új szálat indít, azon futtatja a run()-t
\`\`\`

Ha véletlenül \`run()\`-t írsz, az IDE gyakran jelzi, hogy valószínűleg \`start()\`-ra
gondoltál. Ez egy klasszikus, nehezen észrevehető hiba.

## 1) \`extends Thread\`

\`\`\`java
class ClassExtendingThread extends Thread {
    @Override
    public void run() {
        ExampleHelper.printHelloSource(100); // 100× kiír egy "hello"-t
    }
}
new ClassExtendingThread().start();
\`\`\`

## 2) \`implements Runnable\` (általában ezt preferáljuk)

\`\`\`java
class ClassImplementingRunnable implements Runnable {
    @Override
    public void run() {
        ExampleHelper.printHelloSource(100);
    }
}
new Thread(new ClassImplementingRunnable()).start();
\`\`\`

**Miért jobb a Runnable?** Javában **csak egy** osztályból lehet leszármazni, de
**több** interfészt is meg lehet valósítani. Ha \`extends Thread\`, akkor
"elhasználtad" az egyetlen ősödet. Pl. ha van egy \`Car\` absztrakt osztályod és
egy autót külön szálon akarsz futtatni, akkor \`extends Car\` **és**
\`implements Runnable\` együtt megoldható — \`extends Thread\`-del nem. (Bónusz: a
\`start()\` \`final\`, így véletlenül sem tudod felülírni.)

## 3) Anonim osztály

\`\`\`java
new Thread() {
    @Override public void run() {
        ExampleHelper.printHelloSource(100);
    }
}.start();
\`\`\`
Nem kell külön fájl/osztály, ha csak egyszer, itt helyben kell a viselkedés.

## 4) Metódusreferencia

\`\`\`java
new Thread(ExampleHelper::printHelloSource100).start();
\`\`\`
Működik, mert a \`Runnable.run()\` **paraméter nélküli, void** — és a hivatkozott
metódus is pontosan ilyen. (Ezért nem jó pl. egy \`int\`-et váró metódus.)

## 5) Lambda — a Runnable egy **funkcionális interfész**

\`\`\`java
Runnable r = () -> ExampleHelper.printHelloSource(100);
new Thread(r).start();

// inline, külön változó nélkül:
new Thread(() -> ExampleHelper.printHelloSource(100)).start();
\`\`\`
A \`() -> ...\` pontosan illeszkedik a \`run()\` sémájára: nincs paraméter, nincs
visszatérési érték. (Ezt hívják Dependency Injection-szerű mintának is: interfész
mögé rejtett konkrét megvalósítás.)

## 6) Több utasításos lambda (blokk)

\`\`\`java
new Thread(() -> {
    System.out.println("kezdés");
    ExampleHelper.printHelloSource(100);
    System.out.println("vége");
}).start();
\`\`\`

## Nemdeterminizmus

Ha a fő szál is ír (\`printSomethingElse(100)\`) miközben a másik szál a "hello"-kat
írja, a kimenet **összekeveredik**, és **minden futásnál más**. Ez a párhuzamosság
lényege: az ütemezés **nemdeterminisztikus** — ne építs a sorrendre.

## Szálak és a main szál

Képzeld el a szálakat egy fa gyökeréből induló ágakként: a \`main\` a gyökér.
**Általában** ha a \`main\` (a program) leáll, a benne indított szálak is
megszűnnek. (Később lesz mód arra is, hogy szálak túléljék a main végét.)

> A teljes, futtatható példák a **Fájlok** szekcióban: \`ThreadCreationExample\`,
> \`ClassExtendingThread\`, \`ClassImplementingRunnable\`, \`ExampleHelper\`,
> \`ExampleHub\`. A \`labs/task/ThreadCraft\` a hozzá tartozó feladat.
`,
      exercises: [
        {
          prompt: "Írd meg ugyanazt a szálindítást mind az 5 fő módon (extends Thread, implements Runnable, anonim osztály, metódusreferencia, lambda), amely kiírja a szál nevét.",
          hint: "A Runnable paraméter nélküli, void metódus — ehhez kell illeszkednie a metódusreferenciának/lambdának.",
          solution: "```java\nRunnable feladat = () ->\n    System.out.println(Thread.currentThread().getName());\n\n// 1) extends Thread\nclass T extends Thread { public void run(){ System.out.println(getName()); } }\nnew T().start();\n\n// 2) implements Runnable\nnew Thread(feladat).start();\n\n// 3) anonim osztály\nnew Thread(){ public void run(){ System.out.println(getName()); } }.start();\n\n// 4) metódusreferencia\nRunnable r = Thread::yield; // bármely () -> void\nnew Thread(feladat).start();\n\n// 5) lambda\nnew Thread(() -> System.out.println(Thread.currentThread().getName())).start();\n```",
        },
        {
          prompt: "Miért nem lehet metódusreferenciaként átadni egy `void f(int n)` szignatúrájú metódust a `new Thread(...)`-nek?",
          solution: "Mert a `Thread` konstruktora `Runnable`-t vár, aminek az egyetlen metódusa `void run()` — **paraméter nélküli**. Egy `int`-et váró metódus szignatúrája nem illeszkedik a `run()`-ra, ezért a fordító nem tudja `Runnable`-lé alakítani. Csak paraméter nélküli, `void` visszatérésű metódus/lambda illik ide.",
        },
        {
          prompt: "Indíts két szálat, amelyek 1-től 5-ig számolnak, majd a főszál `join`-nal várja meg mindkettőt. Figyeld meg, hogy a kimenet nemdeterminisztikus.",
          solution: "```java\nRunnable count = () -> {\n    for (int i = 1; i <= 5; i++)\n        System.out.println(Thread.currentThread().getName() + \": \" + i);\n};\nThread a = new Thread(count, \"A\");\nThread b = new Thread(count, \"B\");\na.start(); b.start();\na.join(); b.join();   // a main megvárja mindkettőt\nSystem.out.println(\"kész\");\n```",
        },
      ],
    },
    {
      slug: "join-sleep-synchronized",
      title: "2. join, sleep, synchronized és a versenyhelyzet",
      summary: "Szálak bevárása, altatás, kölcsönös kizárás; a race condition demója 10 000 szállal; életciklus és interrupt.",
      status: "complete",
      body: `
## Miről szól? (a 2. gyakorlat alapján)

Már tudunk szálakat létrehozni — most **felhasználjuk** őket. A
\`JoinSleepSynchronizedExample\` három dolgot mutat: \`join\`, \`sleep\`,
\`synchronized\`; a \`LifecycleInterruptExample\` pedig a szál **életciklusát** és az
\`interrupt\`-ot.

> **Kódstílus-tipp (ZH/beadandó):** ha van egy állandó, legyen tényleg konstans —
> a legjobb egy **osztályszintű** \`private static final TÍPUS CSUPA_NAGYBETŰ = ...\`.
> Így nem *magic number* lesz a kódban, hanem beszédes, egy helyen módosítható érték.

## sleep — üresjárat egy szálon

\`\`\`java
private static final int MSEC_INCREMENT = 500;
private static final int NUMBER_OF_THREADS = 5;

for (int i = 0; i < NUMBER_OF_THREADS; ++i) {
    int multiplier = i + 1;
    Thread thread = new Thread(() -> sleepAction(multiplier * MSEC_INCREMENT));
    thread.start();   // start, NEM run!
}
\`\`\`

- \`Thread.sleep(ms)\` **blokkoló** művelet: a szál a megadott ideig **nem csinál
  semmit** — nem eszi a CPU-t, nem reagál. Ez nem sima függvényhívás: nem az
  számít, milyen gyors a kód, hanem hogy hány ms telik el.
- \`sleep\` \`InterruptedException\`-t dobhat (checked) — ezt kezelni kell.
- **Fontos:** a \`sleep\` a \`Thread\` osztály **statikus** metódusa (az *aktuális*
  szálat altatja).

## join — várd meg, amíg végez

\`\`\`java
for (Thread thread : threads) {
    try {
        thread.join();   // blokkol, amíg EZ a szál be nem fejezi
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
System.out.println("All threads have finished working");
\`\`\`

- \`join()\` egy **konkrét szál** metódusa: a hívó szál megvárja, amíg az adott
  szál befejezi a futását. Ha a szál már kész, azonnal visszatér (nem blokkol).
- Mivel a ciklusban \`start\`-tal indítottuk (nem \`run\`-nal), a szálak **párhuzamosan**
  futnak, a ciklus nem várja meg őket — a bevárás a \`join\`-nál történik. Emiatt az
  „All threads have finished” **garantáltan az utolsó** kiírás.

> Ha a szálakat egyenként bevárjuk \`join\`-nal, a külön **monitoring szál** akár el
> is hagyható — a program úgysem jut túl a \`join\`-okon, amíg a szálak be nem fejeznek.

## synchronized — a versenyhelyzet (race condition)

A szálak egy közös számlálót növelnek. A \`counter++\` **egyetlen sor, de három
művelet**: (1) kiolvasás, (2) növelés, (3) visszaírás. Ha két szál egyszerre
olvassa ki a régi értéket, mindkettő ugyanarra ír vissza → **elveszik egy növelés**.

\`\`\`java
private int threadCompletionCounter = 0;

private synchronized void incrementCounter() {
    threadCompletionCounter++;          // kritikus szakasz
}
private synchronized int getCounter() {
    return threadCompletionCounter;
}
\`\`\`

**A demó:** indíts **10 000** szálat, mindegyik egyszer növel. \`synchronized\`
**nélkül** az eredmény rendre < 10 000 (pl. 9 842) — a hiányzó növelések a
versenyhelyzet miatt vesztek el. \`synchronized\`-dal **mindig pontosan 10 000**.

- A \`synchronized\` **kölcsönös kizárást** ad: egyszerre **egy** szál lehet a védett
  metódusokban. Mivel itt **osztályszintű** (a példány monitorán), az \`incrementCounter\`
  **és** a \`getCounter\` **egymást is kizárja** — nem lehet két szál egyszerre
  egyikben sem.
- Vigyázat: itt **a metódusok** védettek, nem maga a mező — a helyes hozzáférés a
  fegyelmezett, mindig a szinkronizált metódusokon át történő elérés.

## Életciklus és interrupt

\`\`\`java
Thread thread = new Thread(() -> {
    ExampleHelper.sleepForMsec(60000);          // 1 perc alvás
    System.out.println("Thread finished ...");
});
thread.start();
ExampleHelper.sleepForMsec(2000);
thread.interrupt();                              // 2 mp után megszakítjuk

try {
    thread.start();                              // ❌ újraindítás
} catch (IllegalThreadStateException e) {
    e.printStackTrace();                         // egy szál CSAK EGYSZER indítható
}
\`\`\`

- \`interrupt()\` jelzés a szálnak, hogy **álljon le** (a blokkoló művelet
  \`InterruptedException\`-t kap). **Ökölszabály:** ne az \`interrupt\`-ra építs — jó
  kód a szinkronizáción és a megtervezett leálláson múlik, nem a megszakításon.
- **Egy szál csak egyszer indítható:** újraindítás → \`IllegalThreadStateException\`.
  Ha „még egyszer” kell, hozz létre **új** \`Thread\`-et.
`,
      exercises: [
        {
          prompt: "Magyarázd el, miért ad `synchronized` nélkül gyakran 10 000-nél kevesebbet a 10 000 szálas számláló, és pontosan hol veszik el a növelés.",
          solution: "A `counter++` három lépés: **olvasás → növelés → visszaírás**. Ha A és B szál is kiolvassa ugyanazt az értéket (pl. 41), mindketten 42-re növelik és 42-t írnak vissza — pedig 43-nak kéne lennie. Ez a **versenyhelyzet**: az egyidejű olvasás-módosítás-visszaírás miatt elveszik egy növelés. Emiatt < 10 000 az összeg. A `synchronized` kölcsönös kizárással a három lépést **oszthatatlanná** teszi, így minden növelés megmarad.",
        },
        {
          prompt: "Mi a fő különbség a `sleep` és a `join` között?",
          solution: "A `sleep` a `Thread` **statikus** metódusa: az **aktuális** szálat altatja adott ideig (üresjárat). A `join` egy **konkrét szál példány** metódusa: a hívó szál megvárja, amíg **az a szál** befejezi a futását (ha már kész, azonnal visszatér). A `sleep` időhöz kötött, a `join` egy másik szál befejezéséhez.",
        },
      ],
    },
    {
      slug: "threadcraft",
      title: "3. Feladat — ThreadCraft (bányászok, építők, naplózó)",
      summary: "A gyakorlófeladat: szálak indítása konfigból, thread-safe erőforrások, join-os bevárás.",
      status: "complete",
      body: `
## A feladat

A **ThreadCraft** egy „olcsó Warcraft 3”: **bányász** szálak aranyat termelnek,
**építő** szálak házakat húznak fel, egy **naplózó** szál pedig időnként kiírja a
világ állapotát. A szimuláció addig fut, amíg fel nem épül a \`HOUSE_LIMIT\` ház.
Ez összeköti az eddigieket: szálindítás, \`join\`, \`sleep\`, **thread-safety**.

## Konfiguráció — minden konstans egy helyen

A feladatváz (\`Configuration\`, a \`Resources\` és a \`ThreadCraft\` váza) a gyakorlat anyaga, ezért itt csak a megértéshez szükséges részletei szerepelnek; a \`synchronized\`-os megoldás és a magyarázatok saját.

\`\`\`java
public class Configuration {
    public static final int LOGGING_FREQUENCY = 1000; // msec
    public static final int MINING_FREQUENCY  = 500;
    public static final int BUILD_TIME        = 2500;
    public static final int SLEEP_TIME        = 200;
    public static final int GOLDMINE_CAPACITY = 1000;
    public static final int NUMBER_OF_MINERS  = 3;
    public static final int NUMBER_OF_BUILDERS = 2;
    public static final int HOUSE_COST   = 200;
    public static final int MINING_AMOUNT = 20;
    public static final int HOUSE_LIMIT  = GOLDMINE_CAPACITY / HOUSE_COST;
}
\`\`\`

## Az erőforrások thread-safe-é tétele

A \`Resources\` osztály közös állapot (arany, házak, bánya) — **több szál egyszerre**
piszkálja. A megoldás a **\`synchronized\`**: a módosító/lekérdező metódusok legyenek
szinkronizáltak, hogy ne legyen versenyhelyzet.

\`\`\`java
public synchronized boolean tryToMineGold() {
    if (goldmineCapacity > 0) {
        goldmineCapacity -= Configuration.MINING_AMOUNT;
        gold += Configuration.MINING_AMOUNT;
        return true;
    }
    return false;
}

public synchronized boolean tryToBuildHouse() {
    if (gold >= Configuration.HOUSE_COST) {
        houses++;
        gold -= Configuration.HOUSE_COST;
        return true;
    }
    return false;
}
// getGold(), getHouses(), getGoldmineCapacity() szintén synchronized
\`\`\`

> **Gondolkodtató (a következő órára):** hova érdemes \`synchronized\`-ot tenni és
> hova nem? Ha *mindenhová* vakon odaírjuk, azzal a bányász sem tud dolgozni, amíg
> az építő a (közös, osztályszintű) záron van — feleslegesen sorosítunk.

## A main: szálak indítása és bevárása

\`\`\`java
public static void main(String[] args) {
    List<Thread> workers = new ArrayList<>();

    for (int i = 0; i < Configuration.NUMBER_OF_MINERS; i++)
        workers.add(new Thread(ThreadCraft::mineAction, "Miner-" + i));
    for (int i = 0; i < Configuration.NUMBER_OF_BUILDERS; i++)
        workers.add(new Thread(ThreadCraft::buildAction, "Builder-" + i));

    Thread logger = new Thread(ThreadCraft::loggingAction, "Logger");

    workers.forEach(Thread::start);
    logger.start();

    for (Thread t : workers) {          // várjuk be a dolgozókat
        try { t.join(); } catch (InterruptedException e) { e.printStackTrace(); }
    }
    try { logger.join(); } catch (InterruptedException e) { e.printStackTrace(); }

    System.out.println("Simulation over");
    logStatus();
}
\`\`\`

## A hiányzó sleepForMsec

\`\`\`java
public static void sleepForMsec(int msec) {
    try {
        Thread.sleep(msec);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
\`\`\`

> **Tanács:** még ha tudod is a megoldást, **írd le magadnak**
> is — a reflex, hogy ilyet le tudsz kódolni, sokat segít a ZH-n. A teljes
> feladatváz (\`ThreadCraft\`, \`Resources\`, \`Configuration\`) a Fájlok szekcióban.
`,
      exercises: [
        {
          prompt: "Miért kell a `Resources` metódusait `synchronized`-dá tenni? Mi történhet enélkül a `tryToBuildHouse`-ban?",
          solution: "Több szál (építők) egyszerre hívhatja. `synchronized` nélkül két építő egyszerre láthatja, hogy `gold >= HOUSE_COST`, mindkettő felépít egy házat és levon `HOUSE_COST`-ot — így **kétszer** vonjuk le az aranyat, de az ellenőrzés csak egyszer volt igaz, vagy negatívba mehet az arany. Ez versenyhelyzet a közös `gold`/`houses` mezőkön. `synchronized`-dal az ellenőrzés+módosítás oszthatatlan, egyszerre egy szál végzi.",
        },
        {
          prompt: "Miért `ThreadCraft::mineAction` metódusreferenciát adunk a szálnak, és miért nem lehetne itt is metódusreferenciát használni, ha a metódusnak paramétere volna?",
          solution: "A `Thread` konstruktora `Runnable`-t vár (`() -> void`). A `mineAction` paraméter nélküli, void — pontosan illeszkedik, ezért `ThreadCraft::mineAction` átadható. Ha a metódusnak **paramétere** volna, a szignatúra nem illeszkedne a `Runnable.run()`-ra, ezért metódusreferenciaként nem lehetne átadni — lambdába kellene csomagolni (pl. `() -> f(x)`).",
        },
      ],
    },
  ],
};
