'use client';
import { useState } from 'react';

const REGIONS = ['euw1','na1','kr','eune1','br1','la1','la2','oc1','tr1','ru','jp1'];

export default function Home() {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('euw1');
  const enableSummoner = process.env.NEXT_PUBLIC_ENABLE_SUMMONER === '1';

  return (
    <section className="relative mt-12">
      <div className="card p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Win More, Tilt Less.</h1>
        <p className="mt-2 text-white/80">
          One clean hub for champions, builds, and runes — refreshed nightly.
        </p>

        {enableSummoner ? (
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <select
              value={region}
              onChange={(e)=>setRegion(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
            >
              {REGIONS.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
            </select>
            <input
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              placeholder="Summoner name or Riot ID (Name#Tag)"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              onKeyDown={(e)=>{ if(e.key==='Enter' && name) window.location.href=`/summoner/${region}/${encodeURIComponent(name)}`; }}
            />
            <button
              className="rounded-xl border border-white/15 bg-gradient-to-r from-[#7C5BFF] to-[#32C5FF] px-5 py-3 font-medium hover:opacity-95"
              onClick={()=> name && (window.location.href=`/summoner/${region}/${encodeURIComponent(name)}`)}
            >
              Search
            </button>
          </div>
        ) : (
          <div className="mt-6 text-sm text-white/70">
            Summoner search is coming soon (awaiting production API key).
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm hover:bg-white/10" href="/champions">Browse champions</a>
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm hover:bg-white/10" href="/champion/ahri">Ahri build</a>
        </div>
      </div>
    </section>
  );
}
