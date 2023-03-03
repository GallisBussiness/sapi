import { Test, TestingModule } from '@nestjs/testing';
import { MenujourController } from './menujour.controller';
import { MenujourService } from './menujour.service';

describe('MenujourController', () => {
  let controller: MenujourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenujourController],
      providers: [MenujourService],
    }).compile();

    controller = module.get<MenujourController>(MenujourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
