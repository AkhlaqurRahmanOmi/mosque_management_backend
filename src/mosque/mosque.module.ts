import { Module } from '@nestjs/common';
import { MosqueService } from './mosque.service';
import { MosqueController } from './mosque.controller';
import { CostManagementModule } from './cost-management/cost-management.module';

@Module({
  providers: [MosqueService],
  controllers: [MosqueController],
  imports: [CostManagementModule]
})
export class MosqueModule {}
