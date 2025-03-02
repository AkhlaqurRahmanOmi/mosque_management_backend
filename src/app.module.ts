import 'dotenv/config'; // Load environment variables from .env
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MosqueModule } from './mosque/mosque.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { PrayerTimesModule } from './prayer-times/prayer-times.module';

@Module({
  imports: [AuthModule, MosqueModule, DatabaseModule, ConfigModule.forRoot(), PrayerTimesModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
