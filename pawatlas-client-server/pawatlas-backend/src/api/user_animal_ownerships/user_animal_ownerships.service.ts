import { Inject, Injectable } from '@nestjs/common';
import { CreateUserAnimalOwnershipDto } from './dto/create-user_animal_ownership.dto';
import { UpdateUserAnimalOwnershipDto } from './dto/update-user_animal_ownership.dto';
import { USER_ANIMAL_OWNERSHIP_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { UserAnimalOwnership } from './entities/user_animal_ownership.entity';
import { UserAnimalOwnershipNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class UserAnimalOwnershipsService {
  constructor(
    @Inject(USER_ANIMAL_OWNERSHIP_REPOSITORY)
    private userAnimalOwnershipRepository: Repository<UserAnimalOwnership>,
  ) {}

  // POST /user-animal-ownerships
  async create(
    createUserAnimalOwnershipDto: CreateUserAnimalOwnershipDto,
  ): Promise<UserAnimalOwnership> {
    const userAnimalOwnership = this.userAnimalOwnershipRepository.create(
      createUserAnimalOwnershipDto,
    );
    return await this.userAnimalOwnershipRepository.save(userAnimalOwnership);
  }

  // GET /user-animal-ownerships
  async findAll(): Promise<UserAnimalOwnership[]> {
    return await this.userAnimalOwnershipRepository.find();
  }

  // GET /user-animal-ownerships/:uid/:aid
  async findOne(
    userID: string,
    animalID: string,
  ): Promise<UserAnimalOwnership> {
    return this.userAnimalOwnershipRepository.findOneBy({ userID, animalID });
  }

  // GET /user-animal-ownerships/user/:uid/animals
  findAnimalsForUser(userID: string): Promise<UserAnimalOwnership[]> {
    return this.userAnimalOwnershipRepository.find({ where: { userID } });
  }

  // GET /user-animal-ownerships/animal/:aid/users
  findUsersForAnimal(animalID: string): Promise<UserAnimalOwnership[]> {
    return this.userAnimalOwnershipRepository.find({ where: { animalID } });
  }

  // PATCH /user-animal-ownerships/:uid/:aid
  async update(
    userID: string,
    animalID: string,
    updateUserAnimalOwnershipDto: UpdateUserAnimalOwnershipDto,
  ): Promise<UserAnimalOwnership> {
    const userAnimalOwnership = await this.findOne(userID, animalID);
    if (!userAnimalOwnership) {
      throw new UserAnimalOwnershipNotFoundException();
    }
    this.userAnimalOwnershipRepository.merge(
      userAnimalOwnership,
      updateUserAnimalOwnershipDto,
    );
    return await this.userAnimalOwnershipRepository.save(userAnimalOwnership);
  }

  // DELETE /user-animal-ownerships/:uid/:aid
  async remove(userID: string, animalID: string): Promise<void> {
    const result = await this.userAnimalOwnershipRepository.delete({
      userID,
      animalID,
    });
    if (result.affected === 0) {
      throw new UserAnimalOwnershipNotFoundException();
    }
  }
}
