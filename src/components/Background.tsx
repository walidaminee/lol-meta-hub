'use client';

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* gradient blooms */}
      <div className="absolute -top-40 -left-40 h-[60vh] w-[60vw] rounded-full blur-[120px] opacity-25"
           style={{ background: 'radial-gradient(closest-side, rgba(124,91,255,.6), transparent)' }} />
      <div className="absolute top-10 right-0 h-[50vh] w-[40vw] rounded-full blur-[120px] opacity-30"
           style={{ background: 'radial-gradient(closest-side, rgba(50,197,255,.5), transparent)' }} />
      {/* starfield */}
      <svg className="absolute inset-0 w-full h-full opacity-[.35]">
        <defs>
          <radialGradient id="g" r="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {Array.from({ length: 120 }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const s = Math.random() * 1.2 + .3;
          return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={s} fill="url(#g)" />;
        })}
      </svg>
    </div>
  );
}
