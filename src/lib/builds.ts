import fs from "fs/promises";

export type RoleKey = 'TOP'|'JUNGLE'|'MIDDLE'|'BOTTOM'|'UTILITY'|'UNKNOWN';
export type BuildItem = { itemId: number; uses: number; wr: number };
export type BuildRole = { items: BuildItem[]; runes?: { primary:number; keystone:number; second:number } };
export type Builds = Record<string, Record<RoleKey, BuildRole>>; // champKey -> role -> data

export async function loadBuilds(): Promise<Builds> {
  try {
    const raw = await fs.readFile(process.cwd() + "/public/builds.json", "utf-8");
    return JSON.parse(raw);
  } catch {
    return {} as Builds;
  }
}

/** Very simple WR proxy: average of top items WR if present */
export function approximateWR(role: BuildRole | undefined): number | null {
  if (!role?.items?.length) return null;
  const arr = role.items.slice(0, 6);
  const wr = arr.reduce((a, b) => a + (b.wr ?? 0), 0) / arr.length;
  return Math.max(0, Math.min(1, wr));
}
