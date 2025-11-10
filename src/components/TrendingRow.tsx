import Link from "next/link";

type RowItem = { id: string; name: string; tile: string; wr?: number | null };

export default function TrendingRow({ data }: { data: RowItem[] }) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold">Trending</h2>
        <Link href="/champions" className="text-sm text-white/70 hover:text-white">See all</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {data.map(c => (
          <Link key={c.id} href={`/champion/${c.id.toLowerCase()}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20">
            <img src={c.tile} alt={c.name} className="h-28 w-full object-cover opacity-90 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2">
              <div className="font-medium leading-none">{c.name}</div>
              {typeof c.wr === 'number' && (
                <div className="mt-1 text-xs text-white/80">WR {(c.wr*100).toFixed(1)}%</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
