import { Inject, Injectable } from '@nestjs/common';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { VETERINARIAN_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Veterinarian } from './entities/veterinarian.entity';
import { VeterinarianNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class VeterinariansService {
  constructor(
    @Inject(VETERINARIAN_REPOSITORY)
    private veterinarianRepository: Repository<Veterinarian>,
  ) {}

  // POST /veterinarians
  async create(
    createVeterinarianDto: CreateVeterinarianDto,
  ): Promise<Veterinarian> {
    const veterinarian = this.veterinarianRepository.create(
      createVeterinarianDto,
    );
    return await this.veterinarianRepository.save(veterinarian);
  }

  // GET /veterinarians
  async findAll(): Promise<Veterinarian[]> {
    return this.veterinarianRepository.find();
  }

  // GET /veterinarians/:id
  async findOne(veterinarianID: string): Promise<Veterinarian> {
    return this.veterinarianRepository.findOneBy({ veterinarianID });
  }

  // PATCH /veterinarians/:id
  async update(
    veterinarianID: string,
    updateVeterinarianDto: UpdateVeterinarianDto,
  ): Promise<Veterinarian> {
    const veterinarian = await this.findOne(veterinarianID);
    if (!veterinarian) {
      throw new VeterinarianNotFoundException();
    }
    this.veterinarianRepository.merge(veterinarian, updateVeterinarianDto);
    return await this.veterinarianRepository.save(veterinarian);
  }

  // DELETE /veterinarians/:id
  async remove(veterinarianID: string): Promise<void> {
    const result = await this.veterinarianRepository.delete(veterinarianID);
    if (result.affected === 0) {
      throw new VeterinarianNotFoundException();
    }
  }
}
