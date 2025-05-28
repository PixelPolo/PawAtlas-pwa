import { MarkersService } from './markers.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MarkersService', () => {
  let service: MarkersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkersService],
    }).compile();

    service = module.get<MarkersService>(MarkersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
