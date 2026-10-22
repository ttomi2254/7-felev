import { describe, expect, it } from "vitest";
import { daysUntil, formatHuDate, relativeHu } from "@/lib/events";

describe("daysUntil", () => {
  it("egyszerű különbség előre és hátra", () => {
    expect(daysUntil("2026-10-19", "2026-10-15")).toBe(4);
    expect(daysUntil("2026-10-15", "2026-10-19")).toBe(-4);
    expect(daysUntil("2026-10-15", "2026-10-15")).toBe(0);
  });

  it("a téli óraátállításon (2026. okt. 25., 25 órás nap) át is egész napot ad", () => {
    expect(daysUntil("2026-10-26", "2026-10-24")).toBe(2);
    expect(daysUntil("2026-10-25", "2026-10-24")).toBe(1);
  });

  it("a nyári óraátállításon (2027. márc. 28., 23 órás nap) át is egész napot ad", () => {
    expect(daysUntil("2027-03-29", "2027-03-27")).toBe(2);
  });

  it("hónap- és évhatáron át", () => {
    expect(daysUntil("2027-01-01", "2026-12-31")).toBe(1);
  });
});

describe("relativeHu", () => {
  it.each([
    [-3, "3 napja volt"],
    [0, "ma"],
    [1, "holnap"],
    [6, "6 nap múlva"],
    [7, "jövő héten"],
    [13, "jövő héten"],
    [14, "14 nap múlva"],
  ])("%i nap → %s", (days, text) => {
    expect(relativeHu(days)).toBe(text);
  });
});

describe("formatHuDate", () => {
  it("magyar dátumformátum a hét napjával", () => {
    expect(formatHuDate("2026-10-19")).toBe("2026. október 19. (hétfő)");
  });
});
