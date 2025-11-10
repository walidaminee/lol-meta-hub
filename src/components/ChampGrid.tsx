'use client';

import { useMemo, useState } from "react";

type Champ = {
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
  tile: string;
  wr: number | null; // 0..1
};

const ROLES = ["All","Assassin","Fighter","Mage","Marksman","Support","Tank"] as const;

export default function ChampGrid({ champions }: { champions: Champ[] }) {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return champions.filter(c => {
      const roleOk = role === "All" || c.tags.includes(role);
      const textOk = !needle || c.name.toLowerCase().includes(needle) || c.id.toLowerCase().includes(needle);
      return roleOk && textOk;
    });
  }, [champions, q, role]);

  return (
    <section>
      {/* Controls */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Search champion…"
            className="w-full sm:w-[360px] rounded-xl border border-white/10 bg-white/5 px-4 py-2"
            aria-label="Search champions"
          />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by role">
            {ROLES.map(r => (
              <button
                key={r}
                onClick={()=>setRole(r)}
                className={`rounded-xl px-3 py-1 text-sm border transition
                  ${role===r ? "bg-white/15 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                aria-pressed={role===r}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filtered.map(c => (
          <a
            key={c.id}
            href={`/champion/${c.id.toLowerCase()}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition will-change-transform
                       hover:border-white/20 hover:shadow-[0_12px_40px_rgba(124,91,255,.15)]"
            aria-label={`${c.name} details`}
          >
            <div className="relative">
              <img
                src={c.tile}
                alt={c.name}
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = 'none';
                  const fallback = el.nextElementSibling as HTMLDivElement | null;
                  if (fallback) fallback.style.display = 'block';
                }}
                className="h-32 w-full object-cover opacity-85 transition group-hover:scale-[1.03] group-hover:opacity-100"
              />
              <div style={{ display: 'none' }} className="h-32 w-full bg-gradient-to-br from-[#1a1728] to-[#0e1019]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

              {/* WR badge (top-right) */}
              {typeof c.wr === 'number' && (
                <div className="absolute right-2 top-2 rounded-md border border-white/15 bg-black/50 px-2 py-[2px] text-xs font-medium">
                  WR {(c.wr*100).toFixed(1)}%
                </div>
              )}
            </div>

            <div className="p-3">
              <div className="font-medium truncate">{c.name}</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {c.tags.map(t => (
                  <span key={t} className="text-[11px] rounded border border-white/10 bg-white/5 px-2 py-[2px] text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-white/70">No champions match your search.</div>
      )}
    </section>
  );
}
