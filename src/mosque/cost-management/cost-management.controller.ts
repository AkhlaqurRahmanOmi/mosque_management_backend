import { Controller, Get, Param, Post } from '@nestjs/common';
import { CostManagementService } from './cost-management.service';

@Controller('cost-management')
export class CostManagementController {
    constructor(private readonly costManagement: CostManagementService) {}

    // All controllers related to the revenue of a specific mosque

    // Adding a new donation
    @Post('add/revenue')
    async createDonation(data: any) {
        return this.costManagement.createDonation(data);
    }

    // Getting all donations
    @Get('get/revenue/:mosqueId')
    async getDonations(@Param('mosqueId') mosqueId: string) {
        return this.costManagement.getDonations(mosqueId);
    }

    // Getting a single donation
    @Get('get/revenue/:id')
    async getDonation(@Param('id') id: number) {
        return this.costManagement.getDonation(id);
    }

    // Getting donations for a specific month
    @Get('get/revenue/:mosqueId/:year/:month')
    async getDonationsByMonth(@Param('mosqueId') mosqueId: string, @Param('year') year: number, @Param('month') month: number) {
        return this.costManagement.getDonationsByMonth(mosqueId, year, month);
    }

    // Updating a donation
    @Post('update/revenue/:id')
    async updateDonation(@Param('id') id: number, data: any) {
        return this.costManagement.updateDonation(id, data);
    }

    // Deleting a donation
    @Post('delete/revenue/:id')
    async deleteDonation(@Param('id') id: number) {
        return this.costManagement.deleteDonation(id);
    }
}
