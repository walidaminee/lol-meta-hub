export default function PromoCtas() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {/* Card 1 — Desktop app (soon) */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#201a38] to-[#131523]">
        {/* optional background image (falls back if missing) */}
        <img
          src="/cta/desktop.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }}
        />
        <div className="relative p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Astral Desktop <span className="align-middle ml-2 rounded-md border border-white/20 bg-white/10 px-2 py-[2px] text-xs">Soon</span>
          </h3>
          <p className="mt-3 text-white/80 max-w-[45ch]">
            Auto-import runes, live scouting, and post-game breakdowns—wrapped in our minimal, ad-light aesthetic.
            Join the waitlist and get early builds when we open.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="https://github.com/walidaminee/lol-meta-hub"
              target="_blank" rel="noopener noreferrer"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              View roadmap on GitHub
            </a>
            <a
              href="mailto:hello@astralmeta.gg?subject=Astral%20Desktop%20Waitlist"
              className="rounded-xl border border-white/0 bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </div>

      {/* Card 2 — New to LoL? */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c2032] to-[#121421]">
        <img
          src="/cta/learn.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }}
        />
        <div className="relative p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            New to League of Legends?
          </h3>
          <p className="mt-3 text-white/80 max-w-[45ch]">
            Start your journey the right way: official client, tutorials, and the basics. We’ll be here for builds when you’re ready.
          </p>
          <div className="mt-6">
            <a
              href="https://www.leagueoflegends.com/"
              target="_blank" rel="noopener noreferrer"
              className="rounded-xl border border-white/0 bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white"
            >
              Download League of Legends
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
