/**
 * Test Worker Entry Point
 *
 * This worker is used for integration tests with @cloudflare/vitest-pool-workers.
 * It provides access to Cloudflare bindings (D1, KV, R2) in tests.
 */

export default {
  async fetch(_request: Request, _env: Env) {
    return new Response('Test Worker')
  },
}
