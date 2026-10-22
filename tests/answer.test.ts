import { describe, expect, it } from "vitest";
import { checkAnswer } from "@/lib/answer";

describe("checkAnswer — text (alapértelmezett)", () => {
  const ex = { prompt: "", answer: "Kölcsönös kizárás" };
  it("kis/nagybetűre és fölösleges szóközökre érzéketlen", () => {
    expect(checkAnswer("  kölcsönös   KIZÁRÁS ", ex)).toBe(true);
  });
  it("más szöveget elutasít", () => {
    expect(checkAnswer("holtpont", ex)).toBe(false);
  });
  it("több elfogadott alak közül bármelyik jó", () => {
    expect(checkAnswer("mutex", { prompt: "", answer: ["kölcsönös kizárás", "mutex"] })).toBe(true);
  });
});

describe("checkAnswer — code", () => {
  const ex = { prompt: "", answer: "f x = x + 1", check: "code" as const };
  it("minden whitespace-t figyelmen kívül hagy", () => {
    expect(checkAnswer("f x=x+1", ex)).toBe(true);
    expect(checkAnswer("f  x =\n x + 1", ex)).toBe(true);
  });
  it("kis/nagybetű-érzékeny", () => {
    expect(checkAnswer("F x = x + 1", ex)).toBe(false);
  });
});

describe("checkAnswer — numeric", () => {
  const ex = { prompt: "", answer: "0.25", check: "numeric" as const };
  it("tizedesvesszőt és tizedespontot is elfogad", () => {
    expect(checkAnswer("0,25", ex)).toBe(true);
    expect(checkAnswer("0.25", ex)).toBe(true);
  });
  it("kis tűréssel hasonlít", () => {
    expect(checkAnswer("0.2500000001", ex)).toBe(true);
    expect(checkAnswer("0.26", ex)).toBe(false);
  });
  it("nem számot elutasít", () => {
    expect(checkAnswer("negyed", ex)).toBe(false);
    expect(checkAnswer("", ex)).toBe(false);
  });
  it("az ezres tagoló szóközt figyelmen kívül hagyja", () => {
    expect(checkAnswer("1 000", { ...ex, answer: "1000" })).toBe(true);
  });
});

describe("checkAnswer — nincs megadott válasz", () => {
  it("mindig hamis", () => {
    expect(checkAnswer("bármi", { prompt: "" })).toBe(false);
  });
});
