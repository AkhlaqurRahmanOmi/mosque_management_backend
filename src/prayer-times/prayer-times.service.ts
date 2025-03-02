import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { prayerTimes } from '../database/schemas/prayer-times.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PrayerTimesService {
  constructor(@Inject('DB_CONNECTION') private db: any) {}

  // Create prayer times for a specific mosque
  async createPrayerTimes(mosqueId: number, data: any) {
    return await this.db.insert(prayerTimes).values({
      ...data,
      mosqueId,
    });
  }

  // Get prayer times for a specific mosque
  async getPrayerTimesByMosque(mosqueId: number) {
    return await this.db.select().from(prayerTimes).where(eq(prayerTimes.mosqueId, mosqueId));
  }

  // Get prayer times for a specific date
  async getPrayerTimesByDate(mosqueId: number, date: Date) {
    const [times] = await this.db.select().from(prayerTimes)
      .where(eq(prayerTimes.mosqueId, mosqueId) && eq(prayerTimes.date, date));
    if (!times) throw new Error('Prayer times not found');
    return times;
  }

  // Update prayer times
  async updatePrayerTimes(id: number, data: any) {
    return await this.db.update(prayerTimes).set(data).where(eq(prayerTimes.id, id));
  }

  // Delete prayer times
  async deletePrayerTimes(id: number) {
    return await this.db.delete(prayerTimes).where(eq(prayerTimes.id, id));
  }
}