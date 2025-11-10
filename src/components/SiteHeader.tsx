'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/champions', label: 'Champions' },
  // { href: '/news', label: 'News' }, // later
  { href: '/legal/terms', label: 'Terms' },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded bg-gradient-to-br from-[#7C5BFF] to-[#32C5FF]" />
      <span className="font-semibold tracking-tight">Astral Meta</span>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>

          <nav className="hidden gap-4 sm:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 rounded-lg transition ${
                    active ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/champions"
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
