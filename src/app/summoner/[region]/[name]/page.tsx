import { getSummonerByName, getMatchesByPUUID, getMatch } from "@/lib/riot";
import { Suspense } from "react";

const REGION_TO_ROUTING: Record<string,'europe'|'americas'|'asia'> = {
  euw1: 'europe', eune1: 'europe', tr1: 'europe', ru: 'europe',
  na1: 'americas', br1: 'americas', la1: 'americas', la2: 'americas', oc1: 'americas',
  kr: 'asia', jp1: 'asia'
};

export default async function Page({ params }: { params: { region: string; name: string } }) {
  const { region, name } = params;
  const summ = await getSummonerByName(region, decodeURIComponent(name));
  const routing = REGION_TO_ROUTING[region] || 'europe';
  const matchIds = await getMatchesByPUUID(routing, summ.puuid, 10);
  const matches = await Promise.all(matchIds.map(id => getMatch(routing, id)));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{summ.name} — {region.toUpperCase()}</h1>
      <p className="opacity-80 my-2">Level {summ.summonerLevel}</p>

      <div className="mt-6 space-y-3">
        {matches.map((m:any) => {
          const me = m.info.participants.find((p:any)=>p.puuid===summ.puuid);
          return (
            <div key={m.metadata.matchId} className="rounded-xl bg-white/5 p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>{m.info.gameMode} — Patch {m.info.gameVersion?.split('.').slice(0,2).join('.')}</div>
                <div className={me?.win ? 'text-emerald-400' : 'text-rose-400'}>
                  {me?.win ? 'Victory' : 'Defeat'}
                </div>
              </div>
              <div className="mt-2 text-sm opacity-80">
                {me?.championName} · KDA {me?.kills}/{me?.deaths}/{me?.assists} · CS {me?.totalMinionsKilled}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
