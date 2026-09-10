import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games, getGame } from '@/fixtures/games';
import styles from './page.module.css';

const number = new Intl.NumberFormat('en-US');
const percent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const timestamp = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
  timeZoneName: 'short',
});

const sections = [
  ['overview', 'Overview'],
  ['activity', 'Activity'],
  ['reviews', 'Reviews'],
  ['prices', 'Prices'],
  ['updates', 'Updates'],
  ['details', 'Details'],
  ['advanced', 'Advanced'],
] as const;

function titleCase(value: string) {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatTimestamp(value?: string) {
  if (!value) return 'Time unavailable';
  return timestamp.format(new Date(value)).replace('GMT', 'UTC');
}

function priceUnavailableCopy(reason?: string) {
  switch (reason) {
    case 'not_applicable':
      return 'Regional pricing is marked as not applicable for this fixture. SteamHarbor does not substitute a guessed price.';
    case 'source_pending':
      return 'A verified regional price source has not been connected. Price, discount, and historical-low claims remain intentionally unavailable.';
    case 'rate_limited':
      return 'The price source is temporarily rate limited. A production page would preserve the last useful value and explain its age.';
    case 'source_error':
      return 'The price source is unavailable. SteamHarbor keeps the rest of the game page useful instead of turning a provider failure into a blank page.';
    default:
      return 'No verified regional price value is available for this fixture.';
  }
}

export function generateStaticParams() {
  return games.map((game) => ({ appId: String(game.appId) }));
}

export async function generateMetadata({ params }: { params: Promise<{ appId: string }> }): Promise<Metadata> {
  const { appId } = await params;
  const game = getGame(Number(appId));
  return { title: game?.name ?? 'Game not found' };
}

export default async function GamePage({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  const game = getGame(Number(appId));
  if (!game) notFound();

  const reviewDenominator = game.reviews ? game.reviews.positive + game.reviews.negative : 0;
  const positivePercent = game.reviews && reviewDenominator > 0 ? (game.reviews.positive / reviewDenominator) * 100 : undefined;
  const observedAt = game.activity?.evidence.observedAt ?? game.reviews?.evidence.observedAt;
  const priceAvailability = game.availability.price;
  const availabilityKeys = ['catalog', 'activity', 'reviews', 'price'] as const;

  return (
    <article className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Discover</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{game.name}</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.cover} aria-hidden="true">
          <span>{game.name.slice(0, 2).toUpperCase()}</span>
        </div>

        <div className={styles.identity}>
          <p className={styles.status}>{titleCase(game.releaseState)}</p>
          <h1>{game.name}</h1>
          <p className={styles.description}>{game.shortDescription}</p>
          <p className={styles.byline}>
            {game.developers.join(', ')}
            {game.publishers.length ? ` · ${game.publishers.join(', ')}` : ''}
          </p>
          <div className={styles.tags} aria-label="Game tags">
            {game.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a
            className={styles.steamLink}
            href={`https://store.steampowered.com/app/${game.appId}/`}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${game.name} on Steam (opens in a new tab)`}
          >
            View on Steam <span aria-hidden="true">↗</span>
          </a>
        </div>

        <dl className={styles.quickFacts}>
          <div><dt>Released</dt><dd>{game.releaseDate}</dd></div>
          <div><dt>Platforms</dt><dd>{game.platforms.join(', ')}</dd></div>
          <div><dt>Type</dt><dd>{titleCase(game.type)}</dd></div>
          <div><dt>AppID</dt><dd>{game.appId}</dd></div>
        </dl>
      </header>

      <nav className={styles.sectionNav} aria-label="Game sections">
        {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>

      <details className={styles.sectionMenu}>
        <summary>Jump to section</summary>
        <nav aria-label="Game sections on mobile">
          {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
      </details>

      <section className={styles.section} id="overview" aria-labelledby="overview-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Overview</p>
            <h2 id="overview-heading">The useful answer first.</h2>
            <p>Current activity, review sentiment, release context, and explicit gaps before deeper evidence.</p>
          </div>
          <p className={styles.freshness}>
            Fixture snapshot · <time dateTime={observedAt}>{formatTimestamp(observedAt)}</time>
          </p>
        </div>

        <dl className={styles.metrics}>
          <div>
            <dt>Players now</dt>
            <dd>{game.activity ? number.format(game.activity.players) : 'Unavailable'}</dd>
            <span>{game.activity ? 'Connected-player fixture' : 'No current activity observation'}</span>
          </div>
          <div>
            <dt>24h peak</dt>
            <dd>{game.activity?.peak24h !== undefined ? number.format(game.activity.peak24h) : 'Unavailable'}</dd>
            <span>{game.activity?.peak24h !== undefined ? 'Fixture peak reference' : 'Insufficient history'}</span>
          </div>
          <div>
            <dt>All-time peak</dt>
            <dd>{game.activity?.allTimePeak !== undefined ? number.format(game.activity.allTimePeak) : 'Unavailable'}</dd>
            <span>{game.activity?.allTimePeak !== undefined ? 'Fixture peak reference' : 'No verified peak reference'}</span>
          </div>
          <div>
            <dt>Positive reviews</dt>
            <dd>{positivePercent !== undefined ? `${percent.format(positivePercent)}%` : 'Unavailable'}</dd>
            <span>{game.reviews ? `${number.format(game.reviews.total)} reviews in fixture` : 'No review summary'}</span>
          </div>
          <div>
            <dt>Price context</dt>
            <dd className={styles.metricText}>{priceAvailability ? titleCase(priceAvailability.state) : 'Unavailable'}</dd>
            <span>{priceAvailability?.reason ? titleCase(priceAvailability.reason) : 'No verified regional price'}</span>
          </div>
        </dl>

        <div className={styles.answerStrip}>
          <p className={styles.answerLabel}>What this page can answer now</p>
          <p>
            This deterministic fixture can show current player activity and review sentiment. Historical movement, regional price quality,
            and update history are not connected, so SteamHarbor does not infer trends, causes, or deal quality from missing evidence.
          </p>
        </div>
      </section>

      <section className={styles.section} id="activity" aria-labelledby="activity-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Activity</p>
            <h2 id="activity-heading">A snapshot before a trend.</h2>
            <p>Current observations stay useful even when a trustworthy time series does not exist yet.</p>
          </div>
        </div>

        <div className={styles.moduleGrid}>
          <div className={styles.moduleMain}>
            <dl className={styles.statList}>
              <div><dt>Players now</dt><dd>{game.activity ? number.format(game.activity.players) : 'Unavailable'}</dd></div>
              <div><dt>24h peak</dt><dd>{game.activity?.peak24h !== undefined ? number.format(game.activity.peak24h) : 'Unavailable'}</dd></div>
              <div><dt>All-time peak</dt><dd>{game.activity?.allTimePeak !== undefined ? number.format(game.activity.allTimePeak) : 'Unavailable'}</dd></div>
            </dl>
            <div className={styles.unavailableState}>
              <p className={styles.stateEyebrow}>History not collected</p>
              <strong>No activity timeline yet</strong>
              <p>A single fixture snapshot cannot support a chart, average, momentum claim, or percentage-change story. Those controls stay absent until dated observations meet coverage rules.</p>
            </div>
          </div>

          <aside className={styles.evidenceCard} aria-label="Activity evidence">
            <p className={styles.kicker}>Evidence</p>
            <h3>Know what the number means.</h3>
            {game.activity ? (
              <dl>
                <div><dt>Source</dt><dd>{titleCase(game.activity.evidence.source)}</dd></div>
                <div><dt>Kind</dt><dd>{titleCase(game.activity.evidence.kind)}</dd></div>
                <div><dt>Freshness</dt><dd>{titleCase(game.activity.evidence.freshness)}</dd></div>
                <div><dt>Observed</dt><dd><time dateTime={game.activity.evidence.observedAt}>{formatTimestamp(game.activity.evidence.observedAt)}</time></dd></div>
              </dl>
            ) : <p>No activity evidence is attached to this fixture.</p>}
          </aside>
        </div>
      </section>

      <section className={styles.section} id="reviews" aria-labelledby="reviews-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Reviews</p>
            <h2 id="reviews-heading">Sentiment with its sample size.</h2>
            <p>The summary keeps Steam&apos;s label and the underlying positive/negative counts visible together.</p>
          </div>
        </div>

        {game.reviews ? (
          <div className={styles.reviewSummary}>
            <div className={styles.reviewLead}>
              <span>{game.reviews.steamLabel ?? 'Review summary'}</span>
              <strong>{positivePercent !== undefined ? `${percent.format(positivePercent)}% positive` : 'Percentage unavailable'}</strong>
              <p>{number.format(game.reviews.total)} total reviews in this deterministic fixture.</p>
            </div>
            <dl>
              <div><dt>Positive</dt><dd>{number.format(game.reviews.positive)}</dd></div>
              <div><dt>Negative</dt><dd>{number.format(game.reviews.negative)}</dd></div>
              <div><dt>Observed</dt><dd><time dateTime={game.reviews.evidence.observedAt}>{formatTimestamp(game.reviews.evidence.observedAt)}</time></dd></div>
            </dl>
          </div>
        ) : (
          <div className={styles.unavailableState}>
            <strong>No review signal yet</strong>
            <p>This fixture does not contain a review summary. SteamHarbor does not render an empty rating as zero.</p>
          </div>
        )}
      </section>

      <section className={styles.section} id="prices" aria-labelledby="prices-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Prices</p>
            <h2 id="prices-heading">Regional price context stays gated.</h2>
            <p>Price and discount claims require an approved source, region, currency, observation time, and history coverage.</p>
          </div>
        </div>
        <div className={styles.availabilityBlock}>
          <span className={styles.availabilityBadge}>{priceAvailability ? titleCase(priceAvailability.state) : 'Unavailable'}</span>
          <strong>{priceAvailability?.reason ? titleCase(priceAvailability.reason) : 'No price source'}</strong>
          <p>{priceUnavailableCopy(priceAvailability?.reason)}</p>
          {priceAvailability?.checkedAt && <small>Availability checked <time dateTime={priceAvailability.checkedAt}>{formatTimestamp(priceAvailability.checkedAt)}</time>.</small>}
        </div>
      </section>

      <section className={styles.section} id="updates" aria-labelledby="updates-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Updates</p>
            <h2 id="updates-heading">No update source connected.</h2>
            <p>This means patch/news data is outside the fixture, not that the game has no updates.</p>
          </div>
        </div>
        <div className={styles.availabilityBlock}>
          <span className={styles.availabilityBadge}>Not connected</span>
          <strong>Update history will remain empty until its source contract is verified.</strong>
          <p>When connected, this section should prioritize meaningful recent changes and their timestamps instead of an undifferentiated event dump.</p>
        </div>
      </section>

      <section className={styles.section} id="details" aria-labelledby="details-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Details</p>
            <h2 id="details-heading">Store and catalog facts.</h2>
            <p>Stable identity facts stay grouped separately from activity and review evidence.</p>
          </div>
        </div>
        <dl className={styles.detailGrid}>
          <div><dt>Developer</dt><dd>{game.developers.join(', ') || 'Not provided'}</dd></div>
          <div><dt>Publisher</dt><dd>{game.publishers.join(', ') || 'Not provided'}</dd></div>
          <div><dt>Release date</dt><dd>{game.releaseDate || 'Not provided'}</dd></div>
          <div><dt>Release state</dt><dd>{titleCase(game.releaseState)}</dd></div>
          <div><dt>Platforms</dt><dd>{game.platforms.join(', ') || 'Not provided'}</dd></div>
          <div><dt>Content type</dt><dd>{titleCase(game.type)}</dd></div>
          <div><dt>AppID</dt><dd>{game.appId}</dd></div>
        </dl>
      </section>

      <section className={styles.section} id="advanced" aria-labelledby="advanced-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Advanced</p>
            <h2 id="advanced-heading">Evidence and availability, without ambiguity.</h2>
            <p>Raw delivery state is available for investigation, but it does not compete with the overview.</p>
          </div>
        </div>

        <details className={styles.evidenceDisclosure}>
          <summary>Evidence and availability details</summary>
          <div className={styles.availabilityGrid}>
            {availabilityKeys.map((key) => {
              const value = game.availability[key];
              return (
                <div key={key}>
                  <dt>{titleCase(key)}</dt>
                  <dd>
                    <strong>{value ? titleCase(value.state) : 'Not provided'}</strong>
                    {value?.reason && <span>{titleCase(value.reason)}</span>}
                    {value?.checkedAt && <small>Checked <time dateTime={value.checkedAt}>{formatTimestamp(value.checkedAt)}</time></small>}
                  </dd>
                </div>
              );
            })}
          </div>
          <div className={styles.rawEvidence}>
            <div>
              <span>Data mode</span>
              <strong>Deterministic fixture</strong>
            </div>
            <div>
              <span>Activity evidence</span>
              <strong>{game.activity ? `${titleCase(game.activity.evidence.kind)} · ${titleCase(game.activity.evidence.source)}` : 'Unavailable'}</strong>
            </div>
            <div>
              <span>Review evidence</span>
              <strong>{game.reviews ? `${titleCase(game.reviews.evidence.kind)} · ${titleCase(game.reviews.evidence.source)}` : 'Unavailable'}</strong>
            </div>
          </div>
        </details>
      </section>
    </article>
  );
}
