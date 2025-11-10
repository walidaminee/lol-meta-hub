// src/lib/ddragon.ts
import ky from 'ky';

const CDN = 'https://ddragon.leagueoflegends.com';

export async function getLatestPatch(): Promise<string> {
  const patches = await ky.get(`${CDN}/api/versions.json`).json<string[]>();
  return patches[0];
}

export async function getChampList(patch?: string) {
  const v = patch ?? (await getLatestPatch());
  const data = await ky.get(`${CDN}/cdn/${v}/data/en_US/champion.json`).json<any>();
  // champion objects are in data.data keyed by name, convert to array
  return { patch: v, champions: Object.values(data.data) as any[] };
}

/** ---------- ITEMS ---------- **/
export async function getItems(patch?: string) {
  const v = patch ?? (await getLatestPatch());
  const data = await ky.get(`${CDN}/cdn/${v}/data/en_US/item.json`).json<any>();
  // returns a dict keyed by string item id -> item metadata
  return { patch: v, items: data.data as Record<string, any> };
}
export function itemIcon(patch: string, id: number) {
  return `${CDN}/cdn/${patch}/img/item/${id}.png`;
}

/** ---------- RUNES ---------- **/
export async function getRunes(patch?: string) {
  const v = patch ?? (await getLatestPatch());
  const data = await ky.get(`${CDN}/cdn/${v}/data/en_US/runesReforged.json`).json<any[]>();
  return { patch: v, trees: data };
}
export function runeIcon(iconPath: string) {
  // iconPath example: "perk-images/Styles/Domination/Electrocute/Electrocute.png"
  return `${CDN}/cdn/img/${iconPath}`;
}

/** ---------- CHAMP ART ---------- **/
export function champSplash(key: string) {
  return `${CDN}/cdn/img/champion/splash/${key}_0.jpg`;
}
export function champTile(key: string) {
  return `${CDN}/cdn/img/champion/tiles/${key}_0.jpg`;
}
