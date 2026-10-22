import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isMaterialAvailable } from "@/lib/materials";

const pub = mkdtempSync(join(tmpdir(), "public-"));
mkdirSync(join(pub, "diagrams"));
writeFileSync(join(pub, "diagrams", "tm ábra.svg"), "<svg/>");

describe("isMaterialAvailable", () => {
  it("létező publikus fájl elérhető (URL-kódolt névvel is)", () => {
    expect(isMaterialAvailable("/diagrams/tm ábra.svg", pub)).toBe(true);
    expect(isMaterialAvailable("/diagrams/tm%20%C3%A1bra.svg", pub)).toBe(true);
  });
  it("a repóban nem lévő tananyag nem elérhető", () => {
    expect(isMaterialAvailable("/materials/Adatb2/01.pdf", pub)).toBe(false);
  });
  it("külső link elérhetőnek számít", () => {
    expect(isMaterialAvailable("https://example.com/a.pdf", pub)).toBe(true);
  });
  it("a public mappán kívülre mutató útvonal nem elérhető", () => {
    expect(isMaterialAvailable("/../package.json", pub)).toBe(false);
    expect(isMaterialAvailable("relativ/ut.pdf", pub)).toBe(false);
  });
});
