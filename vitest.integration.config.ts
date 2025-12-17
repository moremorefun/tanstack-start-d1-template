import { defineWorkersConfig, readD1Migrations } from '@cloudflare/vitest-pool-workers/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineWorkersConfig(async () => {
  // Read D1 migrations from drizzle directory
  const migrationsPath = path.join(__dirname, 'drizzle')
  const migrations = await readD1Migrations(migrationsPath)

  return {
    plugins: [tsconfigPaths()],
    test: {
      include: ['tests/integration/**/*.test.ts'],
      setupFiles: ['./tests/integration/apply-migrations.ts'],
      poolOptions: {
        workers: {
          main: './tests/workers/test-worker.ts',
          wrangler: { configPath: './wrangler.jsonc' },
          miniflare: {
            bindings: { TEST_MIGRATIONS: migrations },
          },
        },
      },
    },
  }
})
