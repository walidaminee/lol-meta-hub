'use client';

import { useMemo, useState } from "react";

type ChampLite = { id: string; name: string; tile: string };

export default function SearchHero({ champions }: { champions: ChampLite[] }) {
  const [q, setQ] = useState("");

  const suggestions = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return [];
    return champions
      .filter(c => c.name.toLowerCase().includes(n) || c.id.toLowerCase().includes(n))
      .slice(0, 6);
  }, [q, champions]);

  const go = (slug: string) => {
    window.location.href = `/champion/${slug.toLowerCase()}`;
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10">
      <img
        src="/hero/astral-1.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
      />
      <div className="relative z-10 p-8 md:p-14 bg-gradient-to-t from-black/40 to-black/10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Astral Meta</h1>
        <p className="mt-2 max-w-xl text-white/80">
          Beautiful, fast League insights. Search a champion to see meta builds and runes.
        </p>

        <div className="mt-6 relative max-w-xl">
          <input
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-3 pr-28 outline-none backdrop-blur placeholder:text-white/50"
            placeholder="Search champion…"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            onKeyDown={(e)=>{ if (e.key === 'Enter' && suggestions[0]) go(suggestions[0].id); }}
            aria-label="Search for a champion"
          />
          <button
            onClick={()=>{ if (suggestions[0]) go(suggestions[0].id); }}
            className="absolute right-2 top-2 rounded-xl px-4 py-2 border border-white/15 bg-white/10 hover:bg-white/15"
          >
            Go
          </button>

          {suggestions.length > 0 && (
            <div className="absolute mt-2 w-full rounded-xl border border-white/15 bg-[#11121a]/95 backdrop-blur">
              {suggestions.map(s => (
                <button
                  key={s.id}
                  onClick={()=>go(s.id)}
                  className="flex w-full items-center gap-3 p-2 text-left hover:bg-white/5"
                >
                  <img src={s.tile} alt={s.name} className="h-8 w-8 rounded object-cover ring-1 ring-white/10" />
                  <div className="text-sm">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-white/60 text-xs">Open build & runes</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-white/70">
          Tip: start typing—hit <span className="px-1 rounded bg-white/10">Enter</span> to jump to the top result.
        </div>
      </div>
    </section>
  );
}
