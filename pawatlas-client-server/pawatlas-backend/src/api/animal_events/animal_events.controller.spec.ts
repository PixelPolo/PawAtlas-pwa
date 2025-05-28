import { Test, TestingModule } from '@nestjs/testing';
import { AnimalEventsController } from './animal_events.controller';
import { AnimalEventsService } from './animal_events.service';

describe('AnimalEventsController', () => {
  let controller: AnimalEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalEventsController],
      providers: [AnimalEventsService],
    }).compile();

    controller = module.get<AnimalEventsController>(AnimalEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
