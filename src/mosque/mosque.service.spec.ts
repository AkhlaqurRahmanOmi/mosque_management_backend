import { Test, TestingModule } from '@nestjs/testing';
import { MosqueService } from './mosque.service';

describe('MosqueService', () => {
  let service: MosqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MosqueService],
    }).compile();

    service = module.get<MosqueService>(MosqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
