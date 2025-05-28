import { Test, TestingModule } from '@nestjs/testing';
import { UserAnimalOwnershipsService } from './user_animal_ownerships.service';

describe('UserAnimalOwnershipsService', () => {
  let service: UserAnimalOwnershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnimalOwnershipsService],
    }).compile();

    service = module.get<UserAnimalOwnershipsService>(UserAnimalOwnershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
