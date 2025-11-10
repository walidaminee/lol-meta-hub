import fs from "fs/promises";
import { getChampList, champTile } from "@/lib/ddragon";
import SearchHero from "@/components/SearchHero";
import PatchTicker from "@/components/PatchTicker";
import TrendingRow from "@/components/TrendingRow";
import FeatureCards from "@/components/FeatureCards";

export const revalidate = 3600;

export default async function Home() {
  const { patch, champions } = await getChampList();

  // Prepare light list for hero search
  const list = champions.map((c:any) => ({
    id: c.id, name: c.name, tile: champTile(c.id)
  }));

  // Try to assemble "trending" from builds.json;
  // otherwise use a tasteful static fallback of iconic champs
  let builds: any = {};
  try {
    const raw = await fs.readFile(process.cwd() + "/public/builds.json", "utf-8");
    builds = JSON.parse(raw);
  } catch {}

  const trending = (() => {
    const entries: {id:string; name:string; tile:string; wr:number|null}[] = [];
    for (const c of champions) {
      const b = builds?.[String(c.key)];
      const role = b?.MIDDLE ?? b?.TOP ?? b?.JUNGLE ?? b?.BOTTOM ?? b?.UTILITY;
      if (!role?.items?.length) continue;
      const arr = role.items.slice(0, 6);
      const wr = arr.reduce((a:number, x:any)=> a + (x.wr||0), 0) / arr.length || null;
      entries.push({ id: c.id, name: c.name, tile: champTile(c.id), wr });
    }
    if (entries.length >= 6) {
      return entries.sort((a,b)=> (b.wr??0)-(a.wr??0)).slice(0,6);
    }
    // fallback curated set
    const fallbackIds = ["Ahri","Yasuo","Lux","LeeSin","Jinx","Thresh"];
    return fallbackIds.map(id => {
      const ch = champions.find((c:any)=>c.id===id)!;
      return { id: ch.id, name: ch.name, tile: champTile(ch.id), wr: null };
    });
  })();

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
      <SearchHero champions={list} />
      <PatchTicker patch={patch} />
      <TrendingRow data={trending} />
      <FeatureCards />
      <div className="text-center text-xs text-white/50 mt-6">
        Not affiliated with Riot Games. Data from Riot API & Data Dragon.
      </div>
    </main>
  );
}
