import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// A dátumlogika helyi időt használ: a tesztek mindig budapesti időzónában fussanak,
// hogy az óraátállítás körüli esetek bármelyik gépen és a CI-ban is ugyanúgy fussanak.
process.env.TZ = "Europe/Budapest";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
