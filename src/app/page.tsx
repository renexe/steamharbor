import Link from 'next/link';
import { GlobalSearch } from '@/components/global-search';
import { games } from '@/fixtures/games';

const number = new Intl.NumberFormat('en-US');

export default function Home() {
  const activeGames = games
    .filter((game) => game.activity)
    .sort((a, b) => b.activity!.players - a.activity!.players);

  return (
    <div className="home">
      <section className="home-intro" id="discover" aria-labelledby="home-title">
        <p className="eyebrow">Independent Steam game data</p>
        <h1 id="home-title">Useful game signals, without the database maze.</h1>
        <p className="home-intro__lede">Search a game, compare activity, and understand what the data can actually support. Deeper evidence stays close when you need it.</p>
        <GlobalSearch games={games} />
        <p className="search-support">This preview searches a small fixture catalog by game name or exact AppID.</p>
      </section>

      <section className="preview-summary" aria-label="SteamHarbor preview coverage">
        <dl>
          <div><dt>Tracked games</dt><dd>{games.length}</dd></div>
          <div><dt>Activity samples</dt><dd>{activeGames.length}</dd></div>
          <div><dt>Fixture timestamp</dt><dd>9 Sep · 00:00 UTC</dd></div>
          <div className="preview-summary__status"><dt>Coverage</dt><dd><span>Sample only</span> Clearly labeled fixtures</dd></div>
        </dl>
      </section>

      <section className="section" id="charts" aria-labelledby="most-played-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Player activity</p>
            <h2 id="most-played-title">Most played in this preview</h2>
            <p>{activeGames.length} fixture-backed games, ranked by the current sample. This is not the full Steam catalog.</p>
          </div>
          <a href="#method">How to read this</a>
        </div>

        <div className="ranking-table-wrap" role="region" aria-label="Sample player activity ranking">
          <table className="activity-table">
            <caption className="sr-only">Games ranked by sample connected player count</caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Game</th>
                <th scope="col" className="metric">Players now</th>
                <th scope="col" className="metric">24h peak</th>
              </tr>
            </thead>
            <tbody>
              {activeGames.map((game, index) => (
                <tr key={game.appId}>
                  <td className="rank">{String(index + 1).padStart(2, '0')}</td>
                  <th scope="row">
                    <Link href={`/games/${game.appId}`} className="game-cell">
                      <span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span>
                      <span><strong>{game.name}</strong><small>{game.tags.slice(0, 2).join(' · ')}</small></span>
                    </Link>
                  </th>
                  <td className="metric metric--strong">{number.format(game.activity!.players)}</td>
                  <td className="metric muted">{game.activity!.peak24h === undefined ? 'Unavailable' : number.format(game.activity!.peak24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="ranking-mobile" aria-label="Sample player activity ranking">
          {activeGames.map((game, index) => (
            <li key={game.appId}>
              <Link href={`/games/${game.appId}`}>
                <div className="ranking-mobile__identity">
                  <span className="rank">{String(index + 1).padStart(2, '0')}</span>
                  <span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span>
                  <span><strong>{game.name}</strong><small>{game.tags.slice(0, 2).join(' · ')}</small></span>
                </div>
                <dl>
                  <div><dt>Players now</dt><dd>{number.format(game.activity!.players)}</dd></div>
                  <div><dt>24h peak</dt><dd>{game.activity!.peak24h === undefined ? 'Unavailable' : number.format(game.activity!.peak24h)}</dd></div>
                </dl>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="section availability" id="releases" aria-labelledby="releases-title">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="kicker">Release discovery</p>
            <h2 id="releases-title">Upcoming releases, once the source is ready.</h2>
            <p>Release status will stay useful without pretending missing integrations are data.</p>
          </div>
        </div>
        <div className="availability-state">
          <strong>No verified upcoming-release source is connected.</strong>
          <p>SteamHarbor will show dates and status here when the integration can be sourced and labeled reliably.</p>
        </div>
      </section>

      <section className="section method" id="method" aria-labelledby="method-title">
        <div>
          <p className="kicker">Built on evidence</p>
          <h2 id="method-title">Answer first. Evidence next. Raw data last.</h2>
        </div>
        <div className="method__copy">
          <p>This first slice uses deterministic fixtures so the interface can be tested without presenting invented live statistics.</p>
          <p>Production values will identify their source, observation time, coverage, and whether a value is observed, derived, estimated, or unavailable.</p>
        </div>
      </section>

      <section className="section availability-grid" aria-label="Integrations not connected in this preview">
        <article id="deals" className="availability-item">
          <p className="kicker">Deals · Not connected</p>
          <h2>Price context, without guesswork.</h2>
          <p>Regional pricing and historical lows need a verified source. No offers are shown in this preview.</p>
        </article>
        <article id="updates" className="availability-item">
          <p className="kicker">Updates · Not connected</p>
          <h2>Know what changed, once we can prove it.</h2>
          <p>Patch notes and game updates will appear here only after their source is connected and freshness can be communicated clearly.</p>
        </article>
      </section>
    </div>
  );
}
