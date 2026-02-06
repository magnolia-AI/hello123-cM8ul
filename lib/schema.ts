import { pgTable, serial, varchar, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

// Import neon_auth table for FK references (but don't re-export it!)
// This is the key - Drizzle only generates migrations for EXPORTED tables
import { neonAuthUser } from './neon-auth-schema';

/**
 * YOUR APPLICATION TABLES
 * 
 * These tables are managed by Drizzle and live in the 'public' schema.
 * 
 * To reference neon_auth.user, use .references(() => neonAuthUser.id).
 * The neonAuthUser table is imported but NOT exported, so Drizzle won't
 * try to manage it in migrations.
 * 
 * Workflow:
 * 1. Define your tables here
 * 2. Run `bun run db:generate` to create migrations
 * 3. Run `bun run db:migrate` to apply migrations
 */

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

/**
 * Re-export neon auth TYPES only (not tables!) for convenience.
 * 
 * For querying neon_auth tables with Drizzle, import tables from './neon-auth-schema':
 * 
 *   import { neonAuthUser } from './neon-auth-schema';
 *   const user = await db.select().from(neonAuthUser).where(eq(neonAuthUser.id, id));
 */
export type {
  NeonAuthUser,
  NeonAuthSession,
  NeonAuthAccount,
  NeonAuthVerification,
  NeonAuthOrganization,
  NeonAuthMember,
  NeonAuthInvitation,
} from './neon-auth-schema';
