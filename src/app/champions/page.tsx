import { getChampList, champTile } from "@/lib/ddragon";
import { loadBuilds, approximateWR } from "@/lib/builds";
import ChampGrid from "@/components/ChampGrid";

export const revalidate = 86400;

export default async function Page() {
  const [{ patch, champions }, builds] = await Promise.all([getChampList(), loadBuilds()]);

  const list = champions.map((c: any) => {
    const role = (builds?.[c.key]?.MIDDLE ?? builds?.[c.key]?.TOP ?? builds?.[c.key]?.JUNGLE ?? null);
    const wr = approximateWR(role); // 0–1 or null
    return {
      id: c.id,
      key: c.key,         // numeric string like "103"
      name: c.name,
      title: c.title,
      tags: c.tags || [],
      tile: champTile(c.id),
      wr
    };
  });

  return (
    <main className="py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Champions</h1>
          <p className="opacity-70 text-sm">Patch {patch}</p>
        </div>
      </div>

      <ChampGrid champions={list} />
    </main>
  );
}
