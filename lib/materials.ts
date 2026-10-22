import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Elérhető-e a hivatkozott anyag a kiadott oldalon? A tananyag-fájlok
 * (`public/materials/…`) csak helyben vannak meg, nincsenek a repóban, ezért a
 * buildben nem léteznek — ilyenkor ne legyen rájuk link (különben 404).
 * Külső (http/https) hivatkozást elérhetőnek tekintünk.
 */
export function isMaterialAvailable(path: string, publicDir = join(process.cwd(), "public")): boolean {
  if (/^https?:\/\//i.test(path)) return true;
  if (!path.startsWith("/")) return false;
  const local = decodeURIComponent(path.split(/[?#]/)[0]);
  if (local.split("/").includes("..")) return false;
  return existsSync(join(publicDir, local));
}
