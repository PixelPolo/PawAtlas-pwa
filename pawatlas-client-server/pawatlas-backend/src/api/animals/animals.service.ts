import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ANIMAL_REPOSITORY } from 'src/common/constants';
import { AnimalNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject(ANIMAL_REPOSITORY) private animalRepository: Repository<Animal>,
  ) {}

  // POST /animals
  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalRepository.create(createAnimalDto);
    return await this.animalRepository.save(animal);
  }

  // GET /animals
  async findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  // GET /animals/:id
  async findOne(animalID: string): Promise<Animal> {
    return this.animalRepository.findOneBy({ animalID });
  }

  // GET /animals/users/:uid
  async findAnimalsByUserID(userID: string): Promise<Animal[]> {
    return this.animalRepository.find({
      relations: ['userAnimalOwnerships'],
      where: {
        userAnimalOwnerships: {
          userID: userID,
        },
      },
    });
  }

  // PATCH /animals/:id
  async update(
    animalID: string,
    updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    const animal = await this.findOne(animalID);
    if (!animal) {
      throw new AnimalNotFoundException();
    }
    this.animalRepository.merge(animal, updateAnimalDto);
    return await this.animalRepository.save(animal);
  }

  // DELETE /animals/:id
  async remove(animalID: string): Promise<void> {
    const result = await this.animalRepository.delete(animalID);
    if (result.affected === 0) {
      throw new AnimalNotFoundException();
    }
  }
}
