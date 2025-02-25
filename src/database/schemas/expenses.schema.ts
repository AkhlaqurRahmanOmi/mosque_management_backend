import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  mosqueId: text('organization_id').notNull(), // Linking to a mosque
  costType: text('cost_type').notNull(), // salary, rent, utilities, construction etc.
  amount: integer('amount').notNull(),
  date: timestamp('date').defaultNow(),
  paidBy: text('paid_by').notNull(),
  notes: text('notes'),
  paymentMethod: text('payment_method').notNull(), // cash, bank transfer, donation box etc.
});
