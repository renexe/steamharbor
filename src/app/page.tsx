import Link from 'next/link';
import { GlobalSearch } from '@/components/global-search';
import { games } from '@/fixtures/games';

const number = new Intl.NumberFormat('en-US');

export default function Home() {
  const activeGames = games.filter((game) => game.activity);
  return (
    <>
      <section className="intro" id="discover">
        <div className="eyebrow"><span /> Live signals, clearer decisions</div>
        <h1>Find the story<br />behind every game.</h1>
        <p>Explore player activity, reviews, releases, and price context without fighting the database.</p>
        <GlobalSearch games={games} />
        <div className="trust-line"><span>Independent</span><span>Source-aware</span><span>Accessible by default</span></div>
      </section>

      <section className="signal-strip" aria-label="SteamHarbor data status">
        <div><small>Tracked games</small><strong>{games.length}</strong></div>
        <div><small>Live activity</small><strong>{activeGames.length} sources</strong></div>
        <div><small>Last fixture update</small><strong>9 Sep · 00:00 UTC</strong></div>
        <p>Preview data <span>Fixtures, clearly labeled</span></p>
      </section>

      <section className="section" id="charts">
        <div className="section-heading"><div><span className="kicker">Right now</span><h2>Most played</h2><p>A focused view of activity across currently tracked games.</p></div><a href="#method">How this works</a></div>
        <div className="ranking" role="table" aria-label="Most played tracked games">
          <div className="ranking__head" role="row"><span>Rank</span><span>Game</span><span>Players now</span><span>24h peak</span><span /></div>
          {activeGames.map((game, index) => (
            <Link href={`/games/${game.appId}`} className="ranking__row" role="row" key={game.appId}>
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <span className="game-cell"><span className="game-mark">{game.name.slice(0, 2).toUpperCase()}</span><span><strong>{game.name}</strong><small>{game.tags.slice(0, 2).join(' · ')}</small></span></span>
              <strong className="metric">{number.format(game.activity!.players)}</strong>
              <span className="metric muted">{number.format(game.activity!.peak24h ?? 0)}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section split-section" id="releases">
        <div><span className="kicker">New horizon</span><h2>Coming soon</h2><p>Release discovery will favor clear status and useful context over promotional noise.</p></div>
        <Link className="release-row" href="/games/2246340"><span className="game-mark">TL</span><span><strong>The Long Signal</strong><small>Exploration · Narrative</small></span><time>Coming soon</time><span aria-hidden="true">→</span></Link>
      </section>

      <section className="section method" id="method"><span className="kicker">Built on evidence</span><h2>Every number carries its source.</h2><p>This first slice deliberately uses deterministic fixtures. Production values will show their origin, observation time, coverage, and whether they are observed, derived, or estimated.</p></section>
      <span id="deals" /><span id="updates" />
    </>
  );
}
