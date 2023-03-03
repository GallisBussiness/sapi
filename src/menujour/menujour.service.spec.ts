import { Test, TestingModule } from '@nestjs/testing';
import { MenujourService } from './menujour.service';

describe('MenujourService', () => {
  let service: MenujourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenujourService],
    }).compile();

    service = module.get<MenujourService>(MenujourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
