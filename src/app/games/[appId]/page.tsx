import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games, getGame } from '@/fixtures/games';

const number = new Intl.NumberFormat('en-US');
const percent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

export function generateStaticParams() { return games.map((game) => ({ appId: String(game.appId) })); }

export async function generateMetadata({ params }: { params: Promise<{ appId: string }> }): Promise<Metadata> {
  const { appId } = await params;
  const game = getGame(Number(appId));
  return { title: game?.name ?? 'Game not found' };
}

export default async function GamePage({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  const game = getGame(Number(appId));
  if (!game) notFound();
  const positive = game.reviews ? (game.reviews.positive / game.reviews.total) * 100 : undefined;

  return (
    <article className="game-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Discover</Link><span>/</span><span aria-current="page">{game.name}</span></nav>
      <header className="game-hero">
        <div className="game-cover" aria-hidden="true"><span>{game.name.slice(0, 2).toUpperCase()}</span></div>
        <div className="game-identity"><span className="status">{game.releaseState.replace('_', ' ')}</span><h1>{game.name}</h1><p>{game.shortDescription}</p><div className="tags">{game.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <dl className="game-facts"><div><dt>Developer</dt><dd>{game.developers.join(', ')}</dd></div><div><dt>Released</dt><dd>{game.releaseDate}</dd></div><div><dt>Platforms</dt><dd>{game.platforms.join(', ')}</dd></div><div><dt>AppID</dt><dd>{game.appId}</dd></div></dl>
      </header>

      <nav className="section-nav" aria-label="Game sections"><a href="#overview" aria-current="page">Overview</a><a href="#activity">Activity</a><a href="#reviews">Reviews</a><a href="#updates">Updates</a><a href="#details">Details</a><a href="#advanced">Advanced</a></nav>

      <section id="overview" className="game-section"><div className="section-heading"><div><span className="kicker">At a glance</span><h2>The useful answer first.</h2></div><span className="freshness"><i /> Fixture observed 9 Sep, 00:00 UTC</span></div>
        <div className="metrics-grid">
          <div><small>Players now</small><strong>{game.activity ? number.format(game.activity.players) : 'Unavailable'}</strong><span>{game.activity ? 'Connected players' : 'Not available before release'}</span></div>
          <div><small>24-hour peak</small><strong>{game.activity?.peak24h ? number.format(game.activity.peak24h) : '—'}</strong><span>{game.activity ? 'Rolling 24-hour window' : 'No activity history'}</span></div>
          <div><small>Positive reviews</small><strong>{positive !== undefined ? `${percent.format(positive)}%` : 'Unavailable'}</strong><span>{game.reviews ? `${number.format(game.reviews.total)} total reviews` : 'No reviews yet'}</span></div>
          <div><small>Price context</small><strong>Source pending</strong><span>Never guessed or silently missing</span></div>
        </div>
      </section>

      <section className="game-section two-column" id="activity">
        <div className="panel activity-panel"><div className="panel-heading"><div><span className="kicker">Activity</span><h2>Player signal</h2></div><div className="range" aria-label="Chart range"><button aria-pressed="false">24h</button><button aria-pressed="true">7d</button><button aria-pressed="false">30d</button></div></div>
          {game.activity ? <div className="chart" role="img" aria-label="Illustrative fixture activity chart. A data table will accompany production charts."><div className="chart-line" /><span className="chart-label chart-label--top">{number.format(game.activity.peak24h ?? 0)}</span><span className="chart-label chart-label--bottom">0</span></div> : <div className="empty-state"><strong>No activity yet</strong><p>Player activity becomes available after release when Steam reports connected players.</p></div>}
        </div>
        <aside className="panel insight"><span className="kicker">What it means</span><h2>{game.activity ? 'Active now, with context still accumulating.' : 'This game has not released yet.'}</h2><p>{game.activity ? 'This prototype avoids a trend claim because fixture history does not meet the documented coverage threshold.' : 'We keep the page useful without rendering zero as if it were observed activity.'}</p><a href="#advanced">See evidence details →</a></aside>
      </section>

      <section className="game-section" id="reviews"><span className="kicker">Reviews</span><h2>{game.reviews?.steamLabel ?? 'No review signal yet'}</h2><p>{game.reviews ? `${number.format(game.reviews.positive)} positive and ${number.format(game.reviews.negative)} negative reviews in this fixture.` : 'Reviews are unavailable until players can review the released game.'}</p></section>
      <section className="game-section advanced" id="advanced"><span className="kicker">Evidence</span><h2>Data without ambiguity.</h2><dl><div><dt>Data mode</dt><dd>Deterministic fixture</dd></div><div><dt>Catalog</dt><dd>{game.availability.catalog.state}</dd></div><div><dt>Activity</dt><dd>{game.availability.activity.state}</dd></div><div><dt>Reviews</dt><dd>{game.availability.reviews.state}</dd></div><div><dt>Price</dt><dd>{game.availability.price.state}</dd></div></dl></section>
      <span id="updates" /><span id="details" />
    </article>
  );
}
