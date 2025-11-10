import { getChampList, champSplash, getItems, getRunes } from "@/lib/ddragon";
import fs from 'fs/promises';
import BuildGrid from "@/components/BuildGrid";
import RuneCard from "@/components/RuneCard";
import type { Metadata } from "next";

export const revalidate = 86400;
export async function generateMetadata({ params }: { params: { key: string } }): Promise<Metadata> {
  const { champions } = await getChampList();
  const champ = champions.find((c:any)=>c.id.toLowerCase()===params.key.toLowerCase());
  const name = champ?.name ?? "Champion";
  return {
    title: `${name} Build & Runes`,
    description: `Best ${name} items and runes based on real matches, refreshed nightly.`,
    openGraph: { title: `${name} — Astral Meta`, description: `Meta build and runes for ${name}.` },
  };
}
export default async function Page({ params }: { params: { key: string } }) {
  const { key } = params;
  const { patch, champions } = await getChampList();
  const champ = champions.find((c:any)=>c.id.toLowerCase()===key.toLowerCase());
  if (!champ) return <div className="p-6">Not found</div>;

  let builds:any = {};
  try {
    const raw = await fs.readFile(process.cwd() + '/public/builds.json', 'utf-8');
    builds = JSON.parse(raw);
  } catch {}

  const cid = Number(champ.key);
  const role = 'MIDDLE';
  const roleData = builds[cid]?.[role];

  const [{ items: itemsDict }, { trees }] = await Promise.all([
    getItems(patch),
    getRunes(patch),
  ]);

  return (
    <div className="relative">
      <div className="h-[320px] w-full overflow-hidden">
        <img src={champSplash(champ.id)} alt={champ.name} className="w-full h-full object-cover opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-24 relative">
        <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
          <h1 className="text-3xl font-semibold">
            {champ.name} <span className="opacity-70 text-base">Patch {patch}</span>
          </h1>
          <p className="opacity-80 mt-2">{champ.title}</p>

          <section className="mt-6 space-y-6">
            <div>
              <h2 className="text-xl mb-3">Top Items — {role}</h2>
              {!roleData?.items?.length ? (
                <div className="opacity-75 text-sm">
                  Not enough data yet. Our nightly job will update this page automatically.
                </div>
              ) : (
                <BuildGrid items={roleData.items.slice(0,6)} patch={patch} itemsDict={itemsDict} />
              )}
            </div>

            {roleData?.runes ? (
              <RuneCard runes={roleData.runes} trees={trees} />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
