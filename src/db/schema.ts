import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

/**
 * Database Schema
 *
 * Define your database tables here using Drizzle ORM.
 * After making changes, run:
 * - pnpm db:generate - Generate migration files
 * - pnpm db:migrate:local - Apply migrations locally
 * - pnpm db:migrate:remote - Apply migrations to production
 */

/**
 * Example Users Table
 *
 * Uncomment and customize for your needs
 */
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Export types for use in application code
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
