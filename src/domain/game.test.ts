import { describe, expect, it } from 'vitest';
import { gameSchema } from './game';
import { games } from '@/fixtures/games';

describe('canonical game fixtures', () => {
  it('conform to the normalized game contract', () => {
    expect(games.every((game) => gameSchema.safeParse(game).success)).toBe(true);
  });

  it('never presents unavailable price data as zero', () => {
    expect(games.every((game) => game.availability.price.state !== 'available')).toBe(true);
  });
});
