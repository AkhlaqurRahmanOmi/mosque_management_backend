import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  donorName: text('donor_name').notNull(),
  amount: integer('amount').notNull(),
  date: timestamp('date').defaultNow(),
  paymentMethod: text('payment_method').notNull(), // cash, bank transfer, etc.
  notes: text('notes'), //  "Anonymous donation", "For mosque expansion", etc.
});
