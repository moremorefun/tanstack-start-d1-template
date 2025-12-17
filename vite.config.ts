import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { PORT } from './config'

const config = defineConfig({
  server: {
    port: PORT,
    strictPort: true,
  },
  plugins: [
    devtools({ eventBusConfig: { port: 0 } }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
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
