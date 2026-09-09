# SteamHarbor — Data Foundation

_Status: initial data contract · 9 September 2026_

This document turns the product direction into an evidence and data plan. It is not a backend design. Source approval must precede implementation choices.

## 1. Decision summary

SteamHarbor will not scrape SteamDB or depend on SteamDB as a runtime data source.

The first usable product should be built around documented Steam sources:

- Steam catalog identity and change signals;
- live concurrent-player counts;
- review summaries;
- public news/patch information where supported.

Price, discount, release-detail, media, tag, and historical datasets must remain behind source adapters and feature flags until their source is documented, licensed, or explicitly approved for production use.

**Recommended launch sequence:** activity/search/reviews first; current pricing only after source validation; price history after SteamHarbor has collected trustworthy snapshots or licensed historical data.

## 2. Source policy

Every field exposed to the UI must carry enough internal metadata to answer:

- Where did it come from?
- When was it fetched?
- What period does it describe?
- Is it observed, calculated, estimated, or unavailable?
- How stale may it become before the UI warns or hides it?
- May it be stored and redistributed?

Source adapters return normalized domain records plus provenance. UI code never consumes provider payloads directly.

API keys and source credentials remain server-side. The frontend must never call authenticated Steam APIs directly or expose a Steam Web API key.

## 3. Source matrix

| Data capability | Candidate source | Status | MVP decision |
|---|---|---:|---|
| Catalog AppID, name, type, last modification | Steamworks `IStoreService/GetAppList` | Documented; API key required | Use |
| Live players for one app | Steamworks `ISteamUserStats/GetNumberOfCurrentPlayers` | Documented; connected players only | Use |
| Review totals and sentiment | Steam Store Reviews endpoint documented by Steamworks | Documented | Use summary; do not ingest review text unless needed |
| Global achievement percentages | Steamworks `ISteamUserStats` | Documented | Defer from first vertical slice |
| News/patch feed | Steamworks `ISteamNews` and public Steam announcements | Documented interface; verify response contract | Pilot |
| Full store description, media, tags, platforms, release details | Steam Store page / commonly used store endpoints | Publicly visible, but production API contract is not clearly documented for this use | Adapter prototype only; legal/operational review required |
| Current regional price and discount | Steam Store surfaces / potential approved provider | No sufficiently clear documented public contract selected | Block from production until approved |
| Historical regional prices | SteamHarbor snapshots or licensed dataset | Not supplied as a ready official history | Build forward-only collector after current-price source approval |
| Historical concurrent players | SteamHarbor snapshots | Official endpoint supplies current value, not historical series | Collect after launch; seed only from licensed/approved data |
| Rankings/trending | SteamHarbor calculations over observations | Derived | Use only when sampling coverage is sufficient |
| Owner estimates | Third-party estimators | Estimated and source-dependent | Defer |
| Packages, depots, configuration, raw changes | Steam technical sources | Complex and partly undocumented for this product | Post-MVP investigation |
| Steam account/library/wishlist | User-authorized Steam APIs | Personal data and privacy obligations | Post-MVP |

“Publicly visible” does not automatically mean suitable for automated collection or redistribution.

## 4. Legal and operational constraints

Current Steam Web API terms require, among other things:

- the application and key to be identified and the key kept confidential;
- Steam data to be presented without implying Valve or Steam endorsement;
- nonpublic user data to be requested by the user and covered by a privacy policy;
- data to be provided on an “as is” basis with appropriate disclaimers;
- usage that does not degrade Steam services;
- no unsolicited marketing use;
- a stated limit of 100,000 Web API calls per day;
- acceptance that APIs and access can change or be discontinued.

Before production ingestion:

1. Register the API key for SteamHarbor and keep it only in server secrets.
2. Publish privacy, data-source, methodology, attribution, independence, and “as is” pages.
3. Review Steam branding requirements before using Valve/Steam names, logos, or store assets.
4. Confirm caching and redistribution rights for every non-Web-API source.
5. Add per-source rate limiting, backoff, circuit breaking, and kill switches.
6. Do not collect account data until consent, deletion, retention, and regional storage rules are designed.

This document is an engineering/product interpretation, not legal advice.

## 5. Evidence model

Every externally sourced or derived value should implement this conceptual envelope:

```ts
type EvidenceKind = 'observed' | 'derived' | 'estimated';

type DataEvidence = {
  source: 'steam_web_api' | 'steam_store_reviews' | 'steam_store' | 'steamharbor';
  sourceUrl?: string;
  kind: EvidenceKind;
  observedAt: string;       // ISO timestamp of retrieval
  periodStart?: string;     // for aggregates and changes
  periodEnd?: string;
  freshness: 'live' | 'fresh' | 'stale' | 'unknown';
  methodologyId?: string;   // required for derived/estimated values
};
```

Provider responses are stored separately from normalized public models when storage terms allow it. This enables reprocessing without leaking provider-specific fields into the UI.

## 6. Canonical MVP records

### Game

```ts
type Game = {
  appId: number;
  name: string;
  type: 'game' | 'dlc' | 'software' | 'demo' | 'unknown';
  slug: string;
  lastSourceModification?: string;
  store: {
    shortDescription?: string;
    developers?: string[];
    publishers?: string[];
    releaseDate?: string;
    releaseState: 'released' | 'upcoming' | 'early_access' | 'unknown';
    platforms?: Array<'windows' | 'macos' | 'linux'>;
    tags?: string[];
    capsuleImageUrl?: string;
  };
  availability: Partial<Record<'catalog' | 'store' | 'activity' | 'reviews' | 'price', DataAvailability>>;
};
```

### Data availability

```ts
type DataAvailability = {
  state: 'available' | 'partial' | 'unavailable' | 'delayed' | 'unsupported';
  reason?: 'source_error' | 'not_provided' | 'not_applicable' | 'rate_limited' | 'source_pending';
  checkedAt: string;
};
```

### Activity snapshot

```ts
type ActivitySnapshot = {
  appId: number;
  players: number;
  observedAt: string;
  evidence: DataEvidence;
};
```

The label in the UI is “Players now,” with help text explaining that disconnected/offline players are not included.

### Activity aggregate

```ts
type ActivityAggregate = {
  appId: number;
  period: '24h' | '7d' | '30d' | '1y' | 'all';
  sampleIntervalMinutes: number;
  current?: number;
  peak?: number;
  average?: number;
  changePercent?: number;
  coveragePercent: number;
  periodStart: string;
  periodEnd: string;
  evidence: DataEvidence;
};
```

Do not publish peak, average, change, or ranking when coverage is below the threshold defined for that metric.

### Review summary

```ts
type ReviewSummary = {
  appId: number;
  scope: 'all' | 'recent';
  positive: number;
  negative: number;
  total: number;
  positivePercent?: number;
  steamLabel?: string;
  language: string | 'all';
  offTopicFiltered: boolean;
  observedAt: string;
  evidence: DataEvidence;
};
```

SteamHarbor may calculate `positivePercent` as `positive / total`; it must not invent a competing rating formula for MVP. Always display the sample size and filtering scope.

### Price snapshot (gated)

```ts
type PriceSnapshot = {
  appId: number;
  countryCode: string;
  currency: string;
  initialMinor?: number;
  finalMinor?: number;
  discountPercent?: number;
  isFree: boolean;
  observedAt: string;
  evidence: DataEvidence;
};
```

Money is stored as integer minor units. Country and currency are mandatory. Historical-low claims require a defined observation window and sufficient collection continuity.

## 7. Metric definitions

| UI label | Definition | Publication rule |
|---|---|---|
| Players now | Latest connected-player value from Steam | Show observation time; stale after 10 minutes |
| 24h peak | Maximum valid sample in rolling 24 hours | Require at least 90% expected samples |
| 7d/30d average | Time-weighted average across valid samples | Require at least 90% coverage |
| Change | Difference between comparable complete periods | Never compare unequal or incomplete windows |
| Positive reviews | Positive / (positive + negative) | Show total and selected scope |
| Historical low | Minimum observed final price for country/currency | Show since-date and coverage; never imply all-time without complete/approved history |
| Trending | Weighted activity acceleration with minimum scale/coverage | Publish methodology and the factual reason for placement |
| Freshness | Age relative to source-specific service target | Text + icon; never color alone |

Percent change with a zero baseline is “new/no baseline,” not infinity. Missing values render as “Unavailable” or “Not provided,” never zero.

## 8. Freshness and collection targets

| Dataset | Collection target | Freshness shown to user | Retention |
|---|---:|---:|---|
| Catalog changes | Incremental every 6 hours | Stale after 24 hours | Current + change audit |
| Players: tracked/high-interest apps | Every 5 minutes | Stale after 10 minutes | Raw 90 days; hourly/daily aggregates long-term |
| Players: long tail | Adaptive 15–60 minutes | State exact observation time | Raw 30 days; aggregates long-term |
| Review summaries | Every 6 hours; faster after releases/spikes | Stale after 24 hours | Daily snapshots long-term |
| Store details | Daily or change-triggered after source approval | Stale after 7 days | Current + change audit |
| Prices | 1–4 hours and change-triggered after source approval | Stale after 6 hours | Long-term snapshots |
| News/patches | Every 15–60 minutes | Stale after 6 hours | Long-term normalized events |

These are initial service targets, not promises. Adaptive sampling is required to stay within provider limits. A queue must prioritize visible/tracked apps and cap retries.

## 9. Ranking and sampling rules

SteamHarbor cannot request live players for the entire catalog every five minutes within the documented daily limit. Initial ranking coverage therefore uses a managed tracked set:

1. Seed from publicly documented/approved discovery sources.
2. Include recently searched, recently released, and explicitly tracked games.
3. Refresh high-activity games more frequently.
4. Decay inactive games to a slower schedule.
5. Clearly label rankings as covering “tracked games” until coverage is defensible.

Do not label a ranking “all Steam games” unless the sampling universe and freshness support that claim.

## 10. Failure and UI contract

Each module loads independently.

| Condition | UI behavior |
|---|---|
| First load | Layout-stable skeleton for that module only |
| Source timeout | Preserve last good value, mark delayed, show timestamp |
| Stale cache | Display if still useful, with “Last updated…” warning |
| Rate limited | Serve cache; suppress retry storms; do not blame the user |
| Unsupported app/data | Explain “Steam does not provide this data” |
| Insufficient history | Show collection start and avoid low/average/trend claims |
| Partial game details | Render identity and available modules; omit empty decoration |
| Global outage | Small status notice plus usable cached/searchable content |
| Derived metric unavailable | Show source observations without inventing a conclusion |

Errors must not collapse the whole game page. Logs capture provider, operation, response class, retry, and correlation ID without secrets or unnecessary personal data.

## 11. Search contract

The searchable index begins with AppID, normalized name, type, and last-modified signal from the catalog. It should support:

- exact AppID lookup;
- normalized prefix and typo-tolerant name matching;
- type filtering;
- deterministic ordering with exact matches first;
- keyboard navigation and grouped result labels;
- an explicit “details pending” state when catalog identity exists but enrichment has not completed.

Search analytics must not store raw queries indefinitely. Define retention and redaction before enabling analytics.

## 12. Initial API boundary

The UI should depend on SteamHarbor endpoints, not providers:

- `GET /api/search?q=&type=&cursor=`
- `GET /api/games/:appId`
- `GET /api/games/:appId/activity?period=`
- `GET /api/games/:appId/reviews?scope=&language=`
- `GET /api/games/:appId/price?country=` — feature-gated
- `GET /api/charts/players?period=&tag=&cursor=` — tracked-universe label initially
- `GET /api/status/sources`

Responses include availability, evidence, and cache metadata. Pagination uses opaque cursors. Dates are ISO 8601 UTC; the UI localizes them while preserving timezone context.

## 13. Representative fixtures required before UI work

Create fixtures for:

1. A popular released paid game with complete activity and reviews.
2. A free-to-play game with very high activity.
3. An upcoming game with no players or reviews.
4. A newly released game with insufficient history.
5. An obscure game with zero current players.
6. A delisted/unavailable store entry still present in the catalog.
7. DLC or demo that must not be mistaken for a base game.
8. Partial store details.
9. Stale activity with a last-known value.
10. Provider failure and rate-limit states.
11. A long/non-Latin title and missing artwork.
12. Price data absent, and later price data for multiple countries/currencies.

Fixtures must be deterministic, hand-reviewed, and carry the same evidence metadata as production responses.

## 14. Go/no-go gates

Before scaffolding the full application:

- **Go:** catalog, live players, review summary, source status, normalized contracts, deterministic fixtures.
- **Verify:** news/patch contract, store-detail/media permission and stability.
- **No-go for production:** current prices, historical prices, global “all Steam” rankings, or advanced technical data until their source and coverage are approved.
- **Security gate:** server-only credentials, secret scanning, quotas, timeout/backoff, and provider-specific circuit breakers.
- **Product gate:** independence and methodology copy reviewed before public release.

## 15. Next implementation milestone

Build a thin vertical proof before the complete shell:

1. Choose the minimum production React/backend stack.
2. Implement shared TypeScript domain schemas for `Game`, activity, reviews, evidence, and availability.
3. Add deterministic fixtures covering complete, partial, stale, empty, and error states.
4. Implement a responsive global search and one game overview against those contracts.
5. Keep providers mocked behind adapters; prove data acquisition separately in server-side integration tests.
6. Validate keyboard behavior, 320px layout, 200% zoom, reduced motion, and module-level failure isolation.

This de-risks the hardest product promise—clear answers from imperfect data—before broad navigation or visual polish.

## 16. Primary references

- [Steamworks IStoreService](https://partner.steamgames.com/doc/webapi/IStoreService)
- [Steamworks ISteamUserStats](https://partner.steamgames.com/doc/webapi/ISteamUserStats)
- [Steamworks user reviews endpoint](https://partner.steamgames.com/doc/store/getreviews)
- [Steam Web API documentation](https://steamcommunity.com/dev)
- [Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms)
