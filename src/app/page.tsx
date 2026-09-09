import Link from 'next/link';
import { GlobalSearch } from '@/components/global-search';
import { games } from '@/fixtures/games';

const number = new Intl.NumberFormat('en-US');

export default function Home() {
  const activeGames = games.filter((game) => game.activity).sort((a, b) => b.activity!.players - a.activity!.players);
  return (
    <>
      <section className="intro" id="discover">
        <div className="eyebrow"><span /> Your independent game atlas</div>
        <h1>Less noise. More game insight.</h1>
        <p>Explore player activity, reviews, releases, and price context without fighting the database.</p>
        <GlobalSearch games={games} />
      </section>

      <section className="signal-strip" aria-label="SteamHarbor data status">
        <div><small>Tracked games</small><strong>{games.length}</strong></div>
        <div><small>Activity samples</small><strong>{activeGames.length} games</strong></div>
        <div><small>Last fixture update</small><strong>9 Sep · 00:00 UTC</strong></div>
        <p>Preview data <span>Fixtures, clearly labeled</span></p>
      </section>

      <section className="section" id="charts">
        <div className="section-heading"><div><span className="kicker">Explore activity</span><h2>Most played</h2><p>Sample ranking · {activeGames.length} games, not the full Steam catalog.</p></div><a href="#method">About these numbers</a></div>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Sample ranking, scroll horizontally for all columns"><table className="ranking">
          <caption className="sr-only">Games ranked by sample player count</caption>
          <thead><tr><th scope="col">Rank</th><th scope="col">Game</th><th scope="col" className="metric">Players now</th><th scope="col" className="metric">24h peak</th></tr></thead><tbody>
          {activeGames.map((game, index) => (
            <tr key={game.appId}>
              <td className="rank">{String(index + 1).padStart(2, '0')}</td>
              <th scope="row"><Link href={`/games/${game.appId}`} className="game-cell"><span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span><span><strong>{game.name}</strong><small>{game.tags.slice(0, 2).join(' · ')}</small></span></Link></th>
              <td className="metric">{number.format(game.activity!.players)}</td>
              <td className="metric muted">{game.activity!.peak24h === undefined ? 'Unavailable' : number.format(game.activity!.peak24h)}</td>
            </tr>
          ))}
        </tbody></table></div>
      </section>

      <section className="section split-section" id="releases">
        <div><span className="kicker">New horizon</span><h2>Coming soon</h2><p>Release discovery will favor clear status and useful context over promotional noise.</p></div>
        <div className="panel"><h3>Release calendar coming next</h3><p className="muted">No verified upcoming releases are connected in this preview.</p></div>
      </section>

      <section className="section method" id="method"><span className="kicker">Built on evidence</span><h2>Every number carries its source.</h2><p>This first slice deliberately uses deterministic fixtures. Production values will show their origin, observation time, coverage, and whether they are observed, derived, or estimated.</p></section>
      <section className="section pending-grid"><div id="deals" className="panel"><span className="kicker">Deals · Not connected</span><h2>Price context, without guesswork.</h2><p className="muted">Regional pricing and historical lows need a verified source. No offers are available in this preview.</p></div><div id="updates" className="panel"><span className="kicker">Updates · Not connected</span><h2>Know what changed.</h2><p className="muted">Patch notes and game updates will appear here once their source is connected.</p></div></section>
    </>
  );
}
