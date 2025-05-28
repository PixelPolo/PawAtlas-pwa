import { Test, TestingModule } from '@nestjs/testing';
import { VermifugesController } from './vermifuges.controller';
import { VermifugesService } from './vermifuges.service';

describe('VermifugesController', () => {
  let controller: VermifugesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VermifugesController],
      providers: [VermifugesService],
    }).compile();

    controller = module.get<VermifugesController>(VermifugesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
