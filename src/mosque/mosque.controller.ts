import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { MosqueService } from './mosque.service';
import { CreateMosqueDto } from './dto/create-mosque.dto';
import { UpdateMosqueDto } from './dto/update-mosque.dto';
import { User } from '../auth/decorators/user.decorator'; // Custom decorator to extract user info

@Controller('mosques')
export class MosqueController {
  constructor(private mosqueService: MosqueService) {}

  @Post()
  createMosque(@User() user: any, @Body() createMosqueDto: CreateMosqueDto) {
    return this.mosqueService.createMosque(user.userId, createMosqueDto);
  }

  @Get()
  getMosquesByAdmin(@User() user: any) {
    return this.mosqueService.getMosquesByAdmin(user.userId);
  }

  @Get(':id')
  getMosqueById(@Param('id') id: string) {
    return this.mosqueService.getMosqueById(parseInt(id, 10));
  }

  @Patch(':id')
  updateMosque(@Param('id') id: string, @Body() updateMosqueDto: UpdateMosqueDto) {
    return this.mosqueService.updateMosque(parseInt(id, 10), updateMosqueDto);
  }

  @Delete(':id')
  deleteMosque(@Param('id') id: string) {
    return this.mosqueService.deleteMosque(parseInt(id, 10));
  }
}