// scripts/backfill.js
import fs from 'fs/promises';

const KEY = process.env.RIOT_API_KEY;
const HEAD = { 'X-Riot-Token': KEY };

// Adjust seeds later
const SEED = [
  { region: 'euw1', name: 'someplayer1' },
  { region: 'euw1', name: 'someplayer2' },
];

const PLATFORM_TO_ROUTING = {
  euw1: 'europe', eune1: 'europe', tr1: 'europe', ru: 'europe',
  na1: 'americas', br1: 'americas', la1: 'americas', la2: 'americas', oc1: 'americas',
  kr: 'asia', jp1: 'asia'
};

async function summoner(region, name) {
  const r = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`, { headers: HEAD });
  if (!r.ok) throw new Error(`summoner ${region}/${name} ${r.status}`);
  return r.json();
}
async function ids(routing, puuid, count=20) {
  const r = await fetch(`https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`, { headers: HEAD });
  if (!r.ok) throw new Error(`ids ${routing} ${r.status}`);
  return r.json();
}
async function match(routing, id) {
  const r = await fetch(`https://${routing}.api.riotgames.com/lol/match/v5/matches/${id}`, { headers: HEAD });
  if (!r.ok) throw new Error(`match ${id} ${routing} ${r.status}`);
  return r.json();
}

async function main() {
  const out = [];
  for (const s of SEED) {
    const su = await summoner(s.region, s.name);
    const routing = PLATFORM_TO_ROUTING[s.region] || 'europe';
    const list = await ids(routing, su.puuid, 20);
    for (const id of list) {
      const m = await match(routing, id);
      out.push(m);
      await new Promise(r=>setTimeout(r, 250)); // gentle delay
    }
    await new Promise(r=>setTimeout(r, 1000));
  }
  await fs.writeFile('./public/matches.json', JSON.stringify(out));
  console.log('Wrote public/matches.json with', out.length, 'matches');
}
main().catch(err => { console.error(err); process.exit(1); });
