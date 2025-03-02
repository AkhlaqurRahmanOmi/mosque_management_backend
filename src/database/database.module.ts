import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

 // Make the DatabaseModule global

console.log(process.env.MOSQUEMANAGEMENT_DATABASE_URL);
@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: async () => {
        try {
          // Create a connection pool using the connectionString from .env
          const pool = new Pool({
            connectionString: process.env.MOSQUEMANAGEMENT_DATABASE_URL,
            ssl: true, // Enable SSL for secure connections
          });

          // Test the connection
          const client = await pool.connect();
          console.log('Database connected successfully!');
          client.release();

          // Return the Drizzle ORM instance
          return drizzle(pool);
        } catch (error) {
          console.error('Failed to connect to the database:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['DB_CONNECTION'], // Export the DB_CONNECTION provider
})
export class DatabaseModule {}
