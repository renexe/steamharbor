import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces, Inter } from 'next/font/google';
import { GlobalSearch } from '@/components/global-search';
import { games } from '@/fixtures/games';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: { default: 'SteamHarbor', template: '%s · SteamHarbor' },
  description: 'Clear, accessible insight into Steam game activity, reviews, releases, and trends.',
  robots: { index: false, follow: false },
};

const navigation = [
  ['Discover', '/#discover'],
  ['Charts', '/#charts'],
  ['Deals', '/#deals'],
  ['Releases', '/#releases'],
  ['Updates', '/#updates'],
] as const;

function BrandSignature() {
  return (
    <Link className="brand" href="/" aria-label="SteamHarbor home">
      <Image
        className="brand__logo brand__logo--light"
        src="/brand/steamharbor-horizontal.png"
        width={788}
        height={215}
        alt=""
        priority
        sizes="(max-width: 700px) 184px, 218px"
      />
      <Image
        className="brand__logo brand__logo--dark"
        src="/brand/steamharbor-horizontal-reverse.png"
        width={788}
        height={215}
        alt=""
        priority
        sizes="(max-width: 700px) 184px, 218px"
      />
    </Link>
  );
}

function PrimaryNavigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? 'mobile-nav__links' : 'site-nav'} aria-label={mobile ? 'Mobile navigation' : 'Primary navigation'}>
      {navigation.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
    </nav>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <header className="site-header">
          <div className="site-header__inner">
            <BrandSignature />
            <PrimaryNavigation />
            <GlobalSearch games={games} compact />
            <details className="mobile-nav">
              <summary>Menu</summary>
              <PrimaryNavigation mobile />
            </details>
          </div>
        </header>
        <div className="preview-notice" role="note">
          <div className="preview-notice__inner">
            <strong>Demo data</strong>
            <span>Fixtures only — player counts, dates, and availability states are not live Steam statistics.</span>
          </div>
        </div>
        <main id="content" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            <div>
              <strong>SteamHarbor</strong>
              <p>Independent game data, organized for quick answers and deeper inspection.</p>
            </div>
            <div className="site-footer__meta">
              <p>SteamHarbor is independent and is not affiliated with Valve or Steam.</p>
              <Link href="/#method">Methodology</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
