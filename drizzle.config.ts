import 'dotenv/config'; // Load environment variables from .env
import { defineConfig } from 'drizzle-kit';

// Log the loaded environment variables
console.log('Loaded environment variables:');
console.log(
  '- MOSQUEMANAGEMENT_DATABASE_URL:',
  process.env.MOSQUEMANAGEMENT_DATABASE_URL,
);

export default defineConfig({
  out: './drizzle', // Output folder for migration files
  schema: ['./src/database/schemas/*.ts'], // Path to your schema files
  dialect: 'postgresql', // Database dialect (PostgreSQL)
  dbCredentials: {
    url: process.env.MOSQUEMANAGEMENT_DATABASE_URL!, // Use the connection string from .env
  },
  verbose: true, // Enable verbose logging for debugging
  strict: true, // Enforce strict schema validation
});
