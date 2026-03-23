import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { PORT } from './config'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: PORT,
    strictPort: true,
  },
  build: {
    target: 'esnext',
  },
  plugins: [
    devtools({ eventBusConfig: { port: 0 } }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Auto-discover static routes
        autoStaticPathsDiscovery: true,
        // Crawl links and prerender them
        crawlLinks: true,
      },
      sitemap: {
        // TODO: Change to your domain
        host: 'https://example.com',
      },
    }),
    viteReact(),
  ],
})

export default config
