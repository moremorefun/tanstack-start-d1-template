import { env } from 'cloudflare:test'

/**
 * Apply D1 migrations before integration tests
 *
 * This setup file is run before each integration test file.
 * It applies all migrations to the test D1 database.
 */
export async function applyMigrations() {
  // @ts-expect-error - TEST_MIGRATIONS is injected by vitest config
  const migrations = env.TEST_MIGRATIONS as D1Migration[]

  if (migrations && migrations.length > 0) {
    for (const migration of migrations) {
      await env.DB.exec(migration.queries.join('\n'))
    }
  }
}

// Run migrations before tests
await applyMigrations()

interface D1Migration {
  name: string
  queries: string[]
}
