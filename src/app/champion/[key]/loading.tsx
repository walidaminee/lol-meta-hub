export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-[320px] w-full rounded-xl bg-white/5" />
      <div className="mx-auto -mt-24 max-w-6xl px-6">
        <div className="card p-6">
          <div className="h-6 w-40 rounded bg-white/10" />
          <div className="mt-3 h-4 w-64 rounded bg-white/10" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            {Array.from({length:6}).map((_,i)=> <div key={i} className="h-16 rounded bg-white/10" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
