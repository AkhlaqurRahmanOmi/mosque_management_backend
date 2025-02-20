import { Module } from '@nestjs/common';
import { MosqueService } from './mosque.service';
import { MosqueController } from './mosque.controller';

@Module({
  providers: [MosqueService],
  controllers: [MosqueController]
})
export class MosqueModule {}
