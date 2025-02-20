import { Test, TestingModule } from '@nestjs/testing';
import { MosqueController } from './mosque.controller';

describe('MosqueController', () => {
  let controller: MosqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MosqueController],
    }).compile();

    controller = module.get<MosqueController>(MosqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
