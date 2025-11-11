type Props = {
  name: string;
  region: string;           // "euw1" etc.
  level: number;
  iconId: number;           // profileIconId from Summoner-v4
  patch: string;            // same patch you use for DDragon assets
  matchCount?: number;      // optional, for a soft stat line
};

export default function SummonerHeader({
  name, region, level, iconId, patch, matchCount
}: Props) {
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${iconId}.png`;
  const regionTag = region?.toUpperCase() ?? "";

  return (
    <header className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-4">
        {/* Icon with level ring */}
        <div className="relative">
          <div
            aria-hidden
            className="h-20 w-20 rounded-full p-[2px]"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #7C5BFF, #35C4FF, #7C5BFF)"
            }}
          >
            <div className="rounded-full bg-[#0f1118] p-1">
              <img
                src={iconUrl}
                alt={`${name} icon`}
                className="h-16 w-16 rounded-full object-cover ring-1 ring-white/10"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-md border border-white/15 bg-black/60 px-2 py-[2px] text-xs">
            Lv {level}
          </div>
        </div>

        {/* Name + meta */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-2xl font-semibold">{name}</h1>
            <span className="rounded-md border border-white/15 bg-white/10 px-2 py-[2px] text-xs">
              {regionTag}
            </span>
          </div>

          <div className="mt-1 text-sm text-white/70">
            {typeof matchCount === "number" ? (
              <span>{matchCount.toLocaleString()} recent matches • Data via Riot API</span>
            ) : (
              <span>Data via Riot API • Refreshed live</span>
            )}
          </div>

          {/* Placeholder rank block (we’ll wire real ranked later) */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
            <span className="opacity-80">Ranked</span>
            <span className="rounded-md border border-white/10 bg-white/10 px-2 py-[1px] text-xs">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
