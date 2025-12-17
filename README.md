# TanStack Start + Cloudflare Workers Template

A modern full-stack application template built with TanStack Start and deployed on Cloudflare Workers.

## Tech Stack

### Frontend

- **React 19** - Latest React with Server Components support
- **TanStack Start 1.140** - Full-stack React framework with SSR/RSC
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Server state management
- **Zustand 5** - Client state management
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend / Infrastructure

- **Cloudflare Workers** - Edge computing with Node.js compatibility
- **Cloudflare D1** - Edge SQLite database
- **Cloudflare KV** - Distributed key-value storage
- **Cloudflare R2** - Object storage (optional)
- **Drizzle ORM** - Type-safe database ORM
- **jose** - JWT authentication
- **Zod** - Schema validation

### Development

- **TypeScript 5.7** - Strict mode enabled
- **Vite 7** - Fast build tooling
- **ESLint 9** - Flat config with React + TypeScript
- **Prettier** - Code formatting with Tailwind plugin
- **Vitest** - Unit + Integration testing
- **Playwright** - E2E testing

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Cloudflare account (free tier works)
- Wrangler CLI: `npm install -g wrangler`

### Setup

1. **Clone and install dependencies**

   ```bash
   git clone <this-repo> my-app
   cd my-app
   pnpm install
   ```

2. **Create Cloudflare resources**

   ```bash
   # Login to Cloudflare
   wrangler login

   # Create D1 database
   wrangler d1 create my-app-db
   # Copy the database_id to wrangler.jsonc

   # Create KV namespace
   wrangler kv:namespace create KV
   # Copy the id to wrangler.jsonc

   # (Optional) Create R2 bucket
   wrangler r2 bucket create my-app
   ```

3. **Configure wrangler.jsonc**
   - Update `name` to your project name
   - Update `database_id` from step 2
   - Update KV namespace `id` from step 2

4. **Set up secrets**

   ```bash
   # Generate a JWT secret (at least 32 characters)
   wrangler secret put JWT_SECRET

   # For local development, copy .dev.vars.example
   cp .dev.vars.example .dev.vars
   # Edit .dev.vars with your values
   ```

5. **Generate and apply database migrations**

   ```bash
   # Generate initial migration
   pnpm db:generate

   # Apply to local D1
   pnpm db:migrate:local
   ```

6. **Start development server**
   ```bash
   pnpm dev
   # Open http://localhost:3000
   ```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   ├── db/
│   │   ├── index.ts        # Database connection
│   │   └── schema.ts       # Drizzle schema
│   ├── lib/
│   │   ├── api/error.ts    # API error utilities
│   │   └── cn.ts           # Tailwind class merge
│   ├── routes/
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Home page
│   │   └── api/
│   │       └── health.ts   # Health check endpoint
│   └── styles.css          # Tailwind CSS entry
├── tests/
│   ├── unit/               # Unit tests (Vitest + jsdom)
│   ├── integration/        # Integration tests (D1/KV)
│   └── e2e/                # E2E tests (Playwright)
├── drizzle/                # Database migrations
├── public/                 # Static assets
├── wrangler.jsonc          # Cloudflare Workers config
├── drizzle.config.ts       # Drizzle ORM config
├── vite.config.ts          # Vite + TanStack Start config
├── vitest.config.ts        # Unit test config
├── vitest.integration.config.ts  # Integration test config
└── playwright.config.ts    # E2E test config
```

## Commands

| Command                  | Description                          |
| ------------------------ | ------------------------------------ |
| `pnpm dev`               | Start development server (port 3000) |
| `pnpm build`             | Build for production                 |
| `pnpm deploy`            | Build and deploy to Cloudflare       |
| `pnpm test`              | Run all tests (unit + integration)   |
| `pnpm test:unit`         | Run unit tests                       |
| `pnpm test:integration`  | Run integration tests                |
| `pnpm test:e2e`          | Run E2E tests                        |
| `pnpm test:coverage`     | Run unit tests with coverage         |
| `pnpm lint`              | Run ESLint                           |
| `pnpm format`            | Format code with Prettier            |
| `pnpm db:generate`       | Generate database migrations         |
| `pnpm db:migrate:local`  | Apply migrations locally             |
| `pnpm db:migrate:remote` | Apply migrations to production       |
| `pnpm cf-typegen`        | Generate Cloudflare types            |

## Configuration

### TanStack Start Prerender

The template is configured with prerendering enabled in `vite.config.ts`:

```typescript
tanstackStart({
  prerender: {
    enabled: true,
    autoStaticPathsDiscovery: true, // Auto-discover static routes
    crawlLinks: true, // Crawl and prerender linked pages
  },
  sitemap: {
    host: 'https://example.com', // Update for sitemap generation
  },
})
```

This generates static HTML for static routes at build time, improving SEO and initial load performance.

### Database Schema

Define your tables in `src/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  // ... add your fields
})
```

After changes:

```bash
pnpm db:generate      # Generate migration
pnpm db:migrate:local # Apply locally
pnpm db:migrate:remote # Apply to production
```

### API Routes

Create API routes in `src/routes/api/`:

```typescript
// src/routes/api/users.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { createDb } from '@/db'
import { users } from '@/db/schema'

export const APIRoute = createAPIFileRoute('/api/users')({
  GET: async ({ request }) => {
    const env = (request as Request & { cf?: { env?: Env } }).cf?.env
    if (!env?.DB) {
      return json({ error: 'Database not configured' }, { status: 500 })
    }

    const db = createDb(env.DB)
    const allUsers = await db.select().from(users)
    return json({ users: allUsers })
  },
})
```

## Optional Modules

### Authentication (from storykit)

Copy these directories for a complete auth system:

- `src/services/auth/` - JWT, OTP, email services
- `src/routes/api/auth/` - Auth API endpoints
- `src/lib/auth/` - Auth types and constants

### Internationalization

Add i18next for multi-language support:

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

### AI Integration

Add Google Gemini API:

```bash
pnpm add @google/genai
```

## Deployment

```bash
# Deploy to Cloudflare Workers
pnpm deploy

# Or with custom domain (configure in wrangler.jsonc)
# routes: [{ "pattern": "example.com", "custom_domain": true }]
```

## Cloudflare Free Tier Limits

- **Workers**: 100,000 requests/day
- **D1**: 5GB storage, 5M rows read/day, 100K rows written/day
- **KV**: 100,000 reads/day, 1,000 writes/day
- **R2**: 10GB storage, 10M class A ops/month, 1M class B ops/month

## License

MIT
