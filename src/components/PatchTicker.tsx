export default function PatchTicker({ patch }: { patch: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-sm">
        <span className="opacity-70">Patch</span> <span className="font-medium">{patch}</span>
        <span className="ml-3 text-white/60">Nightly ETL updates builds automatically.</span>
      </div>
      <a href="/champions" className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-sm hover:bg-white/15">
        Browse champions
      </a>
    </div>
  );
}
