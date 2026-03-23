import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}'],
      thresholds: {
        lines: 60,
        functions: 40,
        branches: 50,
        statements: 60,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['tests/unit/**/*.test.{ts,tsx}'],
          setupFiles: ['./tests/setup.ts'],
        },
      },
    ],
  },
})
