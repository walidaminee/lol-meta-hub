import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

// Google fonts (stable)
const sans = Inter({ subsets: ["latin"] });
const mono = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astral Meta | League Analytics & Builds",
  description:
    "Discover top League of Legends builds, runes, and meta stats. Fan-made analytics for curious summoners.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} ${mono.className} antialiased bg-[hsl(var(--bg))] text-[hsl(var(--text))]`}
      >
        {children}
      </body>
    </html>
  );
}
