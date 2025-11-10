export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Astral Meta. Fan-made. Not affiliated with Riot Games.
          </div>
          <div className="flex gap-4">
            <a className="link" href="/legal/privacy">Privacy</a>
            <a className="link" href="/legal/terms">Terms</a>
            <a className="link" href="https://github.com/walidaminee/lol-meta-hub" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
