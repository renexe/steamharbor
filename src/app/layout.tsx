import type { Metadata } from 'next';
import Link from 'next/link';
import { GlobalSearch } from '@/components/global-search';
import { games } from '@/fixtures/games';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'SteamHarbor', template: '%s · SteamHarbor' },
  description: 'Clear, accessible insight into Steam game activity, reviews, releases, and trends.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <header className="site-header">
          <div className="site-header__inner">
            <Link className="brand" href="/" aria-label="SteamHarbor home"><span>SH</span>SteamHarbor</Link>
            <nav aria-label="Primary navigation">
              <Link href="/#discover">Discover</Link><Link href="/#charts">Charts</Link><Link href="/#deals">Deals</Link><Link href="/#releases">Releases</Link><Link href="/#updates">Updates</Link>
            </nav>
            <GlobalSearch games={games} compact />
          </div>
        </header>
        <main id="content">{children}</main>
        <footer className="site-footer"><p>Independent game data, explained clearly.</p><p>SteamHarbor is not affiliated with Valve or Steam.</p></footer>
      </body>
    </html>
  );
}
