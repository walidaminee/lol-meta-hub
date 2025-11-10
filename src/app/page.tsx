// src/app/page.tsx
'use client';

import { useState } from 'react';

const REGIONS = ['euw1','na1','kr','eune1','br1','la1','la2','oc1','tr1','ru','jp1'];

export default function Home() {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('euw1');
  const enableSummoner = process.env.NEXT_PUBLIC_ENABLE_SUMMONER === '1';

  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold tracking-tight">
        Astral Meta
      </h1>
      <p className="opacity-80 mt-2">
        Beautiful, lightweight League analytics. Fan-made. Not affiliated with Riot Games.
      </p>

      {/* Summoner Search (hide in production until you have a production key) */}
      {enableSummoner ? (
        <div className="mt-8 flex gap-2">
          <select
            value={region}
            onChange={(e)=>setRegion(e.target.value)}
            className="bg-white/5 border border-white/10 rounded px-3 py-2"
          >
            {REGIONS.map(r=> <option key={r} value={r}>{r.toUpperCase()}</option>)}
          </select>
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            placeholder="Summoner name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==='Enter' && name) window.location.href=`/summoner/${region}/${encodeURIComponent(name)}`; }}
          />
          <button
            className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/15"
            onClick={()=> name && (window.location.href=`/summoner/${region}/${encodeURIComponent(name)}`)}
          >
            Search
          </button>
        </div>
      ) : (
        <div className="mt-8 text-sm opacity-75">
          Summoner search is coming soon (awaiting production API key).
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-medium mb-3">Quick links</h2>
        <ul className="space-y-2">
          <li><a className="underline opacity-90 hover:opacity-100" href="/champion/ahri">Ahri build</a></li>
          <li><a className="underline opacity-90 hover:opacity-100" href="/legal/privacy">Privacy</a></li>
          <li><a className="underline opacity-90 hover:opacity-100" href="/legal/terms">Terms</a></li>
        </ul>
      </section>
    </main>
  );
}
