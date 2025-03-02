import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { mosques } from '../database/schemas/mosque.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MosqueService {
  constructor(@Inject('DB_CONNECTION') private db: any) {}

  // Create a new mosque profile
  async createMosque(userId: number, data: any) {
    return await this.db.insert(mosques).values({
      ...data,
      createdBy: userId,
    });
  }

  // Get all mosques created by a specific admin
  async getMosquesByAdmin(userId: number) {
    return await this.db.select().from(mosques).where(eq(mosques.createdBy, userId));
  }

  // Get a single mosque by ID
  async getMosqueById(id: number) {
    const [mosque] = await this.db.select().from(mosques).where(eq(mosques.id, id));
    if (!mosque) throw new Error('Mosque not found');
    return mosque;
  }

  // Update a mosque profile
  async updateMosque(id: number, data: any) {
    return await this.db.update(mosques).set(data).where(eq(mosques.id, id));
  }

  // Delete a mosque profile
  async deleteMosque(id: number) {
    return await this.db.delete(mosques).where(eq(mosques.id, id));
  }
}