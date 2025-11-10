type ItemAgg = { uses: number; wins: number };
type Role = 'TOP'|'JUNGLE'|'MIDDLE'|'BOTTOM'|'UTILITY'|'UNKNOWN';

export function roleFromLane(lane?: string, role?: string): Role {
  const l = (lane||'').toUpperCase();
  const r = (role||'').toUpperCase();
  if (l === 'TOP') return 'TOP';
  if (l === 'JUNGLE') return 'JUNGLE';
  if (l === 'MIDDLE') return 'MIDDLE';
  if (l === 'BOTTOM' && r === 'CARRY') return 'BOTTOM';
  if (l === 'BOTTOM' && r === 'SUPPORT') return 'UTILITY';
  return 'UNKNOWN';
}

export function aggregateBuilds(matches: any[]) {
  // return: Map<championId, Map<Role, Map<itemId, ItemAgg>>>
  const map = new Map<number, Map<Role, Map<number, ItemAgg>>>();

  for (const m of matches) {
    const info = m.info;
    for (const p of info.participants) {
      const champ = p.championId as number;
      const r: Role = roleFromLane(p.lane, p.role);
      const items = [p.item0,p.item1,p.item2,p.item3,p.item4,p.item5].filter(Boolean);
      const win = p.win ? 1 : 0;
      if (!map.has(champ)) map.set(champ, new Map());
      const byRole = map.get(champ)!;
      if (!byRole.has(r)) byRole.set(r, new Map());
      const byItem = byRole.get(r)!;
      for (const it of items) {
        const cur = byItem.get(it) || { uses: 0, wins: 0 };
        cur.uses += 1;
        cur.wins += win;
        byItem.set(it, cur);
      }
    }
  }

  return map;
}

export function topItems(agg: Map<number, Map<Role, Map<number, {uses:number;wins:number}>>>, championId: number, role: Role, minUses=20) {
  const roleMap = agg.get(championId)?.get(role);
  if (!roleMap) return [];
  return [...roleMap.entries()]
    .filter(([,v]) => v.uses >= minUses)
    .map(([itemId, v]) => ({ itemId, uses: v.uses, wr: v.wins / v.uses }))
    .sort((a,b) => b.uses - a.uses)
    .slice(0, 6);
}
