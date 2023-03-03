import { Test, TestingModule } from '@nestjs/testing';
import { ComminiqueService } from './comminique.service';

describe('ComminiqueService', () => {
  let service: ComminiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComminiqueService],
    }).compile();

    service = module.get<ComminiqueService>(ComminiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
