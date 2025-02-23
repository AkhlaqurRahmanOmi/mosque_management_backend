import { Inject, Injectable } from '@nestjs/common';
import { and, eq, gte, lt } from 'drizzle-orm';
import { donations } from 'src/database/schemas/donations.schema';

@Injectable()
export class CostManagementService {
    constructor(@Inject('DB_CONNECTION') private db: any) {}

    // Adding a new donation
    async createDonation(data: any) {
        await this.db.insert(donations).values(data);
        return { message: 'Donation added successfully' };
      }

      // Getting all donations
        async getDonations() {
            const donationList = await this.db.select().from(donations);
            return donationList;
        }

        // Getting a single donation
        async getDonation(id: number) {
            const [donation] = await this.db
            .select()
            .from(donations)
            .where(eq(donations.id, id));
            if (!donation) {
                throw new Error('Donation not found');
            }
            return donation;
        }

        // Getting donations for a specific month
        async getDonationsByMonth(year: number, month: number) {
            // Get the first and last day of the month
            const startDate = new Date(year, month - 1, 1); // First day of the month
            const endDate = new Date(year, month, 1); // First day of next month

            // Get the donations for the month
            const donationList = await this.db.select().from(donations).where(and(gte(donations.date, startDate), lt(donations.date, endDate)));

            // Calculate the total amount
            const totalDonations = await this.db.select({total: this.db.fn.sum(donations.amount)}).from(donations).where(and(gte(donations.date, startDate), lt(donations.date, endDate)));

            return{
                month: `${year}-${month}`,
                totalDonations: totalDonations[0].total,
                donations: donationList,
            }
        }
}
