import { getChampList, champSplash } from "@/lib/ddragon";
import fs from 'fs/promises';

export default async function Page({ params }: { params: { key: string } }) {
  const { key } = params; // e.g., "Ahri"
  const { patch, champions } = await getChampList();
  const champ = champions.find((c:any)=>c.id.toLowerCase()===key.toLowerCase());
  if (!champ) return <div className="p-6">Not found</div>;

  // load aggregates
  let builds:any = {};
  try {
    const raw = await fs.readFile(process.cwd() + '/public/builds.json', 'utf-8');
    builds = JSON.parse(raw);
  } catch {}

  const topItemsForMid = (builds[champ.key]?.MIDDLE ?? []).slice(0, 6);

  return (
    <div className="relative">
      <div className="h-[320px] w-full overflow-hidden">
        <img src={champSplash(champ.id)} alt={champ.name} className="w-full h-full object-cover opacity-70" />
      </div>
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative">
        <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
          <h1 className="text-3xl font-semibold">{champ.name} <span className="opacity-70 text-base">Patch {patch}</span></h1>
          <p className="opacity-80 mt-2">{champ.title}</p>

          <section className="mt-6">
            <h2 className="text-xl mb-3">Top Items — Mid</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {topItemsForMid.map((it:any)=>(
                <div key={it.itemId} className="rounded-xl bg-white/5 border border-white/10 p-3 text-sm">
                  <div className="opacity-80">Item {it.itemId}</div>
                  <div className="mt-1 text-xs">Pick {it.uses} · WR {(it.wr*100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
