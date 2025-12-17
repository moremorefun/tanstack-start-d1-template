import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="bg-bg-light flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-brand-primary mb-4 text-4xl font-bold">Welcome to My App</h1>
        <p className="mb-8 text-lg text-gray-600">
          A modern full-stack application built with TanStack Start + Cloudflare Workers
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary hover:bg-brand-primary-light rounded-lg px-6 py-3 font-medium text-white transition-colors"
          >
            TanStack Start Docs
          </a>
          <a
            href="https://developers.cloudflare.com/workers/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary rounded-lg border-2 px-6 py-3 font-medium transition-colors hover:text-white"
          >
            Cloudflare Workers Docs
          </a>
        </div>
      </div>

      <div className="mt-16 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard title="React 19" description="Latest React with Server Components support" />
        <FeatureCard title="TypeScript" description="Full type safety with strict mode enabled" />
        <FeatureCard
          title="TanStack Router"
          description="Type-safe routing with file-based routes"
        />
        <FeatureCard title="Cloudflare D1" description="Edge SQLite database with Drizzle ORM" />
        <FeatureCard title="Cloudflare KV" description="Distributed key-value storage" />
        <FeatureCard title="Tailwind CSS 4" description="Utility-first CSS with latest features" />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
