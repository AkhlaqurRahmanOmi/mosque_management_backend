import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'), // 'admin', 'committee', 'staff', 'user'
  isVerified: boolean('is_verified').notNull().default(false), // Tracks if the user is verified
  otp: varchar('otp', { length: 6 }), // Stores the OTP
  otpExpiresAt: timestamp('otp_expires_at'), // Tracks OTP expiration
  createdAt: timestamp('created_at').defaultNow(),
});