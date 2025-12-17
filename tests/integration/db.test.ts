import { env } from 'cloudflare:test'
import { describe, it, expect } from 'vitest'

/**
 * Database Integration Tests (Placeholder)
 *
 * These tests verify the D1 database binding is available.
 * After generating migrations with `pnpm db:generate` and applying them,
 * you can add actual database tests here.
 *
 * Example test (uncomment after running migrations):
 * ```ts
 * import { createDb } from '@/db'
 * import { users } from '@/db/schema'
 *
 * it('should query users', async () => {
 *   const db = createDb(env.DB)
 *   const result = await db.select().from(users).limit(1)
 *   expect(Array.isArray(result)).toBe(true)
 * })
 * ```
 */
describe('Database Integration', () => {
  it('should have D1 binding available', () => {
    expect(env.DB).toBeDefined()
  })

  it('should execute raw SQL query', async () => {
    const result = await env.DB.prepare('SELECT 1 as value').first<{ value: number }>()
    expect(result?.value).toBe(1)
  })
})
