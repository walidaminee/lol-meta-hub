'use client';

import ItemTooltip from "./ItemTooltip";

export default function BuildGrid({
  items, patch, itemsDict
}: {
  items: { itemId: number; uses: number; wr: number }[];
  patch: string;
  itemsDict: Record<string, any>;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {items.map(it => {
        const meta = itemsDict[String(it.itemId)];
        const name = meta?.name ?? `Item ${it.itemId}`;
        const icon = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${it.itemId}.png`;
        const cost = meta?.gold?.total;
        // Data Dragon has "plaintext" (clean summary) and "description" (HTML). Use plaintext to stay clean.
        const text = meta?.plaintext || undefined;

        return (
          <div key={it.itemId} className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center gap-2">
              <ItemTooltip name={name} cost={cost} text={text}>
                <img src={icon} alt={name} className="h-10 w-10 rounded ring-1 ring-white/10" />
              </ItemTooltip>
              <div className="min-w-0">
                <div className="text-sm truncate">{name}</div>
                <div className="text-xs opacity-80">Pick {it.uses} · WR {(it.wr*100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
