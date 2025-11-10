import ky from 'ky';

const RIOT = {
  ROUTING: {
    // map game regions to routing values e.g., 'europe' for EUW/EUNE etc.
    europe: 'https://europe.api.riotgames.com',
    americas: 'https://americas.api.riotgames.com',
    asia: 'https://asia.api.riotgames.com',
  }
};

function auth() {
  const key = process.env.RIOT_API_KEY!;
  return { headers: { 'X-Riot-Token': key } };
}

export async function getSummonerByName(regionPlatform: string, name: string) {
  // regionPlatform examples: 'euw1', 'na1' etc.
  const base = `https://${regionPlatform}.api.riotgames.com`;
  return ky.get(`${base}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`, auth()).json<any>();
}

export async function getMatchesByPUUID(routing: 'europe'|'americas'|'asia', puuid: string, count=10) {
  return ky.get(`${RIOT.ROUTING[routing]}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`, auth()).json<string[]>();
}

export async function getMatch(routing: 'europe'|'americas'|'asia', matchId: string) {
  return ky.get(`${RIOT.ROUTING[routing]}/lol/match/v5/matches/${matchId}`, auth()).json<any>();
}
