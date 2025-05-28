import { Test, TestingModule } from '@nestjs/testing';
import { AnimalEventsService } from './animal_events.service';

describe('AnimalEventsService', () => {
  let service: AnimalEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalEventsService],
    }).compile();

    service = module.get<AnimalEventsService>(AnimalEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
