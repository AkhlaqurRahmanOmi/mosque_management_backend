import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { mosques } from './mosque.schema';

export const prayerTimes = pgTable('prayer_times', {
  id: serial('id').primaryKey(),
  mosqueId: integer('mosque_id').references(() => mosques.id), // Foreign key to mosques table
  fajr: varchar('fajr', { length: 50 }).notNull(), // Format: "HH:mm"
  dhuhr: varchar('dhuhr', { length: 50 }).notNull(),
  asr: varchar('asr', { length: 50 }).notNull(),
  maghrib: varchar('maghrib', { length: 50 }).notNull(),
  isha: varchar('isha', { length: 50 }).notNull(),
  date: timestamp('date').notNull(), // Date for which prayer times are set
  createdAt: timestamp('created_at').defaultNow(),
});