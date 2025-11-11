// src/app/summoner/[region]/[name]/page.tsx
import {
  getSummonerByName,
  getMatchesByPUUID,
  getMatch,
  getAccountByRiotId,
  getSummonerByPUUID,
  type Routing,
} from "@/lib/riot";

const REGION_TO_ROUTING: Record<string, Routing> = {
  euw1: "europe", eune1: "europe", tr1: "europe", ru: "europe",
  na1: "americas", br1: "americas", la1: "americas", la2: "americas", oc1: "americas",
  kr: "asia", jp1: "asia",
};

export default async function Page({ params }: { params: { region: string; name: string } }) {
  // Hide in production unless explicitly enabled
  if (process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_SUMMONER !== "1") {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Summoner Search (Coming soon)</h1>
        <p className="opacity-75">We’ll enable this once the production Riot API key is approved.</p>
      </div>
    );
  }

  const { region, name } = params;
  const decoded = decodeURIComponent(name);
  const routing = REGION_TO_ROUTING[region] || "europe";

  try {
    let summoner: Awaited<ReturnType<typeof getSummonerByName>>;

    // If user typed a Riot ID (Name#Tag), resolve via Account API first
    if (decoded.includes("#") || decoded.includes("%23")) {
      const [gameName, tagLine] = decoded.replace("%23", "#").split("#");
      const account = await getAccountByRiotId(routing, gameName.trim(), (tagLine || "").trim());
      summoner = await getSummonerByPUUID(region as any, account.puuid);
    } else {
      summoner = await getSummonerByName(region as any, decoded);
    }

    const matchIds = await getMatchesByPUUID(routing, summoner.puuid, 10);
    const matches = await Promise.all(matchIds.map((id) => getMatch(routing, id)));

    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">
          {summoner.name} — {region.toUpperCase()}
        </h1>
        <p className="opacity-80 my-2">Level {summoner.summonerLevel}</p>

        <div className="mt-6 space-y-3">
          {matches.map((m) => {
            const me = m.info.participants.find((p) => p.puuid === summoner.puuid);
            return (
              <div key={m.metadata.matchId} className="rounded-xl bg-white/5 p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    {m.info.gameMode} — Patch {m.info.gameVersion?.split(".").slice(0, 2).join(".")}
                  </div>
                  <div className={me?.win ? "text-emerald-400" : "text-rose-400"}>
                    {me?.win ? "Victory" : "Defeat"}
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
  } catch (e: any) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Summoner Search</h1>
        <p className="mt-2 text-rose-400">{String(e?.message ?? e)}</p>
        <p className="opacity-75 mt-2 text-sm">
          Tips: Use a Summoner Name (no <code>#tag</code>) with the correct platform (e.g., <b>EUW1</b>).<br />
          Riot dev keys expire every 24h — refresh your key if you’re testing locally.
        </p>
      </div>
    );
  }
}
