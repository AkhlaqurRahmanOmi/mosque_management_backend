import { Module } from '@nestjs/common';
import { PrayerTimesController } from './prayer-times.controller';
import { PrayerTimesService } from './prayer-times.service';

@Module({
  controllers: [PrayerTimesController],
  providers: [PrayerTimesService]
})
export class PrayerTimesModule {}
