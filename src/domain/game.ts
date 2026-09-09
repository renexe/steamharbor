import { z } from 'zod';

export const evidenceSchema = z.object({
  source: z.enum(['steam_web_api', 'steam_store_reviews', 'steam_store', 'steamharbor']),
  kind: z.enum(['observed', 'derived', 'estimated']),
  observedAt: z.string().datetime(),
  freshness: z.enum(['live', 'fresh', 'stale', 'unknown']),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  methodologyId: z.string().optional(),
});

export const availabilitySchema = z.object({
  state: z.enum(['available', 'partial', 'unavailable', 'delayed', 'unsupported']),
  reason: z.enum(['source_error', 'not_provided', 'not_applicable', 'rate_limited', 'source_pending']).optional(),
  checkedAt: z.string().datetime(),
});

export const activitySchema = z.object({
  players: z.number().int().nonnegative(),
  peak24h: z.number().int().nonnegative().optional(),
  allTimePeak: z.number().int().nonnegative().optional(),
  evidence: evidenceSchema,
});

export const reviewSchema = z.object({
  positive: z.number().int().nonnegative(),
  negative: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  steamLabel: z.string().optional(),
  evidence: evidenceSchema,
});

export const gameSchema = z.object({
  appId: z.number().int().positive(),
  name: z.string().min(1),
  type: z.enum(['game', 'dlc', 'software', 'demo', 'unknown']),
  shortDescription: z.string(),
  developers: z.array(z.string()),
  publishers: z.array(z.string()),
  releaseDate: z.string(),
  releaseState: z.enum(['released', 'upcoming', 'early_access', 'unknown']),
  platforms: z.array(z.enum(['Windows', 'macOS', 'Linux'])),
  tags: z.array(z.string()),
  activity: activitySchema.optional(),
  reviews: reviewSchema.optional(),
  availability: z.record(z.string(), availabilitySchema),
});

export type Game = z.infer<typeof gameSchema>;
