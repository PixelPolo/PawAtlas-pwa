import { Test, TestingModule } from '@nestjs/testing';
import { UserAnimalOwnershipsController } from './user_animal_ownerships.controller';
import { UserAnimalOwnershipsService } from './user_animal_ownerships.service';

describe('UserAnimalOwnershipsController', () => {
  let controller: UserAnimalOwnershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnimalOwnershipsController],
      providers: [UserAnimalOwnershipsService],
    }).compile();

    controller = module.get<UserAnimalOwnershipsController>(UserAnimalOwnershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
