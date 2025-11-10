// /scripts/backfill.js
import fs from 'fs/promises';
import fetch from 'node-fetch';

const KEY = process.env.RIOT_API_KEY;
const HEAD = { 'X-Riot-Token': KEY };

const SEED = [
  { region: 'euw1', name: 'someplayer1' },
  { region: 'euw1', name: 'someplayer2' },
  // add ~10 names you can find later
];

const ROUTING = { euw1: 'europe' };

async function summoner(region, name) {
  const r = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`, { headers: HEAD });
  return r.json();
}
async function ids(routing, puuid, count=20) {
  const r = await fetch(`https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`, { headers: HEAD });
  return r.json();
}
async function match(routing, id) {
  const r = await fetch(`https://${routing}.api.riotgames.com/lol/match/v5/matches/${id}`, { headers: HEAD });
  return r.json();
}

async function main() {
  const out = [];
  for (const s of SEED) {
    const su = await summoner(s.region, s.name);
    const routing = ROUTING[s.region] || 'europe';
    const list = await ids(routing, su.puuid, 20);
    for (const id of list) {
      const m = await match(routing, id);
      out.push(m);
      await new Promise(r=>setTimeout(r, 250)); // gentle delay; respect limits
    }
    await new Promise(r=>setTimeout(r, 1000));
  }
  await fs.writeFile('./public/matches.json', JSON.stringify(out));
  console.log('Wrote public/matches.json with', out.length, 'matches');
}
main().catch(console.error);
