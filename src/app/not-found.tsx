import Link from 'next/link';

export default function NotFound() {
  return <section className="not-found"><span className="kicker">404 · Off the chart</span><h1>We could not find that game.</h1><p>Try searching by title or exact Steam AppID.</p><Link href="/">Return to discovery</Link></section>;
}
