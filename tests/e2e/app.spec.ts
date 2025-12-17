import { test, expect } from '@playwright/test'

/**
 * E2E Tests (Placeholder)
 *
 * Basic smoke tests to verify the app is running.
 * Add more comprehensive tests as you build features.
 */
test.describe('App', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/.*/)
  })

  test('health check API should respond', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('timestamp')
  })
})
