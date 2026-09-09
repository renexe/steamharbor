import { gameSchema, type Game } from '@/domain/game';

const observedAt = '2026-09-09T00:00:00.000Z';
const checkedAt = '2026-09-09T00:00:00.000Z';

const fixtures: Game[] = [
  {
    appId: 730,
    name: 'Counter-Strike 2',
    type: 'game',
    shortDescription: 'A competitive team-based action game with a long-running global community.',
    developers: ['Valve'],
    publishers: ['Valve'],
    releaseDate: '21 Aug 2012',
    releaseState: 'released',
    platforms: ['Windows', 'Linux'],
    tags: ['FPS', 'Competitive', 'Multiplayer'],
    activity: {
      players: 473263,
      peak24h: 1244579,
      allTimePeak: 1862531,
      evidence: { source: 'steamharbor', kind: 'observed', observedAt, freshness: 'fresh' },
    },
    reviews: {
      positive: 8431000,
      negative: 1419000,
      total: 9850000,
      steamLabel: 'Very Positive',
      evidence: { source: 'steamharbor', kind: 'observed', observedAt, freshness: 'fresh' },
    },
    availability: {
      catalog: { state: 'available', checkedAt },
      activity: { state: 'available', checkedAt },
      reviews: { state: 'available', checkedAt },
      price: { state: 'unsupported', reason: 'source_pending', checkedAt },
    },
  },
  {
    appId: 570,
    name: 'Dota 2',
    type: 'game',
    shortDescription: 'A deep competitive strategy game where every match develops differently.',
    developers: ['Valve'],
    publishers: ['Valve'],
    releaseDate: '9 Jul 2013',
    releaseState: 'released',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['MOBA', 'Strategy', 'Free to Play'],
    activity: {
      players: 365950,
      peak24h: 823285,
      allTimePeak: 1295114,
      evidence: { source: 'steamharbor', kind: 'observed', observedAt, freshness: 'fresh' },
    },
    reviews: {
      positive: 1812000,
      negative: 412000,
      total: 2224000,
      steamLabel: 'Very Positive',
      evidence: { source: 'steamharbor', kind: 'observed', observedAt, freshness: 'fresh' },
    },
    availability: {
      catalog: { state: 'available', checkedAt },
      activity: { state: 'available', checkedAt },
      reviews: { state: 'available', checkedAt },
      price: { state: 'unsupported', reason: 'not_applicable', checkedAt },
    },
  },
  {
    appId: 2246340,
    name: 'The Long Signal',
    type: 'game',
    shortDescription: 'An upcoming narrative exploration game used to validate incomplete-data states.',
    developers: ['North Channel'],
    publishers: ['North Channel'],
    releaseDate: 'Coming soon',
    releaseState: 'upcoming',
    platforms: ['Windows'],
    tags: ['Exploration', 'Narrative'],
    availability: {
      catalog: { state: 'available', checkedAt },
      activity: { state: 'unavailable', reason: 'not_applicable', checkedAt },
      reviews: { state: 'unavailable', reason: 'not_applicable', checkedAt },
      price: { state: 'unsupported', reason: 'source_pending', checkedAt },
    },
  },
];

export const games = fixtures.map((game) => gameSchema.parse(game));

export function getGame(appId: number) {
  return games.find((game) => game.appId === appId);
}
