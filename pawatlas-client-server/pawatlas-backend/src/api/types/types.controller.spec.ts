import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('TypesController', () => {
  let controller: TypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesController],
      providers: [TypesService],
    }).compile();

    controller = module.get<TypesController>(TypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
