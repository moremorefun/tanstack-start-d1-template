import { json } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

/**
 * Health Check API
 *
 * GET /api/health
 *
 * Returns the health status of the application and its dependencies.
 * Useful for monitoring and deployment health checks.
 */
export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: async () => {
        const checks: Record<string, 'ok' | 'error' | 'not_configured'> = {
          server: 'ok',
          d1: 'not_configured',
          kv: 'not_configured',
        }

        // Check D1 and KV in parallel
        await Promise.all([
          env.DB &&
            env.DB
              .prepare('SELECT 1')
              .first()
              .then(() => { checks.d1 = 'ok' })
              .catch(() => { checks.d1 = 'error' }),
          env.KV &&
            env.KV
              .get('__health_check__')
              .then(() => { checks.kv = 'ok' })
              .catch(() => { checks.kv = 'error' }),
        ])

        const allOk = Object.values(checks).every((status) => status === 'ok')
        const hasErrors = Object.values(checks).some((status) => status === 'error')

        return json({
          status: hasErrors ? 'unhealthy' : allOk ? 'healthy' : 'partial',
          timestamp: new Date().toISOString(),
          checks,
        })
      },
    },
  },
})
