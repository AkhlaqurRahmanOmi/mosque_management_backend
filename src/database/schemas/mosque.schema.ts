import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const mosques = pgTable('mosques', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  contactInfo: varchar('contact_info', { length: 255 }),
  createdBy: serial('created_by').references(() => users.id), // Foreign key to users table
  createdAt: timestamp('created_at').defaultNow(),
});