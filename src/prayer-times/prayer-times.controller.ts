import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PrayerTimesService } from './prayer-times.service';
import { CreatePrayerTimesDto } from './dto/create-prayer-times.dto';
import { UpdatePrayerTimesDto } from './dto/update-prayer-times.dto';

@Controller('prayer-times')
export class PrayerTimesController {
  constructor(private prayerTimesService: PrayerTimesService) {}

  @Post()
  createPrayerTimes(@Body() createPrayerTimesDto: CreatePrayerTimesDto) {
    const { mosqueId, ...data } = createPrayerTimesDto;
    return this.prayerTimesService.createPrayerTimes(mosqueId, data);
  }

  @Get('mosque/:mosqueId')
  getPrayerTimesByMosque(@Param('mosqueId') mosqueId: string) {
    return this.prayerTimesService.getPrayerTimesByMosque(parseInt(mosqueId, 10));
  }

  @Get(':id/:date')
  getPrayerTimesById(@Param('id') id: string, @Param('date') date: string) {
    return this.prayerTimesService.getPrayerTimesByDate(parseInt(id, 10), new Date(date));
  }

  @Patch(':id')
  updatePrayerTimes(@Param('id') id: string, @Body() updatePrayerTimesDto: UpdatePrayerTimesDto) {
    return this.prayerTimesService.updatePrayerTimes(parseInt(id, 10), updatePrayerTimesDto);
  }

  @Delete(':id')
  deletePrayerTimes(@Param('id') id: string) {
    return this.prayerTimesService.deletePrayerTimes(parseInt(id, 10));
  }
}