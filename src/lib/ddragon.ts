import ky from 'ky';

const CDN = 'https://ddragon.leagueoflegends.com';

export async function getLatestPatch(): Promise<string> {
  const patches = await ky.get(`${CDN}/api/versions.json`).json<string[]>();
  return patches[0];
}

export async function getChampList(patch?: string) {
  const v = patch ?? await getLatestPatch();
  const data = await ky.get(`${CDN}/cdn/${v}/data/en_US/champion.json`).json<any>();
  return { patch: v, champions: Object.values(data.data) as any[] };
}

export function champSplash(key: string) {
  // key: 'Ahri' etc.
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`;
}
