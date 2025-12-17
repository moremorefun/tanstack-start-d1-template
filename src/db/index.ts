import { drizzle } from 'drizzle-orm/d1'

/**
 * Create a Drizzle ORM database instance from D1 binding
 *
 * Usage in API routes:
 * ```ts
 * const env = (request as Request & { cf?: { env?: Env } }).cf?.env
 * if (!env?.DB) throw new Error('Database not configured')
 * const db = createDb(env.DB)
 * ```
 */
export function createDb(d1: D1Database) {
  return drizzle(d1)
}

export type Database = ReturnType<typeof createDb>
