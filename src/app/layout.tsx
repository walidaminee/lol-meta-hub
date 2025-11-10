import './globals.css';
import type { Metadata } from 'next';
import Background from '@/components/Background';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: { default: 'Astral Meta', template: '%s · Astral Meta' },
  description: 'Beautiful, lightweight League analytics. Fan-made; not affiliated with Riot Games.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://astral-meta.vercel.app'),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
        <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>

  return (
    <html lang="en">
      <body className="antialiased selection:bg-white/20">
        <Background />
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
