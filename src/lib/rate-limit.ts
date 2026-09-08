/**
 * Simple in-memory rate limiter for spam protection.
 * Replace with Redis / Upstash in production for multi-instance deployments.
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export type RateLimitConfig = {
  /** Max requests allowed in the window */
  limit: number;
  /** Window length in milliseconds */
  windowMs: number;
};

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

const DEFAULT_CONFIG: RateLimitConfig = {
  limit: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + config.windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: config.limit - 1, resetAt };
  }

  if (existing.count >= config.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    success: true,
    remaining: config.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Test helper — clears the in-memory store */
export function clearRateLimitStore(): void {
  store.clear();
}
