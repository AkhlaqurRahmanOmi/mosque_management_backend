import 'dotenv/config'; // Load environment variables from .env
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MosqueModule } from './mosque/mosque.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, MosqueModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
