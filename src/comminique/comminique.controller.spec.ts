import { Test, TestingModule } from '@nestjs/testing';
import { ComminiqueController } from './comminique.controller';
import { ComminiqueService } from './comminique.service';

describe('ComminiqueController', () => {
  let controller: ComminiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComminiqueController],
      providers: [ComminiqueService],
    }).compile();

    controller = module.get<ComminiqueController>(ComminiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
