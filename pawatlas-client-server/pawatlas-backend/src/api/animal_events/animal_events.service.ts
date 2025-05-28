import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalEventDto } from './dto/create-animal_event.dto';
import { UpdateAnimalEventDto } from './dto/update-animal_event.dto';
import { ANIMAL_EVENT_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { AnimalEvent } from './entities/animal_event.entity';
import { AnimalEventNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class AnimalEventsService {
  constructor(
    @Inject(ANIMAL_EVENT_REPOSITORY)
    private animalEventRepository: Repository<AnimalEvent>,
  ) {}

  // POST /animal-events
  async create(
    createAnimalEventDto: CreateAnimalEventDto,
  ): Promise<AnimalEvent> {
    const animalEvent = this.animalEventRepository.create(createAnimalEventDto);
    return await this.animalEventRepository.save(animalEvent);
  }

  // GET /animal-events
  async findAll(): Promise<AnimalEvent[]> {
    return this.animalEventRepository.find();
  }

  // GET /animal-events/:id
  async findOne(animalEventID: string): Promise<AnimalEvent> {
    return this.animalEventRepository.findOneBy({ animalEventID });
  }

  // PATCH /animal-events/:id
  async update(
    animalEventID: string,
    updateAnimalEventDto: UpdateAnimalEventDto,
  ): Promise<AnimalEvent> {
    const animalEvent = await this.findOne(animalEventID);
    if (!animalEvent) {
      throw new AnimalEventNotFoundException();
    }
    this.animalEventRepository.merge(animalEvent, updateAnimalEventDto);
    return await this.animalEventRepository.save(animalEvent);
  }

  // DELETE /animal-events/:id
  async remove(animalEventID: string): Promise<void> {
    const result = await this.animalEventRepository.delete(animalEventID);
    if (result.affected === 0) {
      throw new AnimalEventNotFoundException();
    }
  }
}
