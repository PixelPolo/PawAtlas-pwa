import { Test, TestingModule } from '@nestjs/testing';
import { VermifugesService } from './vermifuges.service';

describe('VermifugesService', () => {
  let service: VermifugesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VermifugesService],
    }).compile();

    service = module.get<VermifugesService>(VermifugesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
