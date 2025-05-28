import { Inject, Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { VACCINE_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Vaccine } from './entities/vaccine.entity';
import { VaccineNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class VaccinesService {
  constructor(
    @Inject(VACCINE_REPOSITORY) private vaccineRepository: Repository<Vaccine>,
  ) {}

  // POST /vaccines
  async create(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    const vaccine = this.vaccineRepository.create(createVaccineDto);
    return await this.vaccineRepository.save(vaccine);
  }

  // GET /vaccines
  async findAll(): Promise<Vaccine[]> {
    return this.vaccineRepository.find();
  }

  // GET /vaccines/:id
  async findOne(vaccineID: string): Promise<Vaccine> {
    return this.vaccineRepository.findOneBy({ vaccineID });
  }

  // PATCH /vaccines/:id
  async update(
    vaccineID: string,
    updateVaccineDto: UpdateVaccineDto,
  ): Promise<Vaccine> {
    const vaccine = await this.findOne(vaccineID);
    if (!vaccine) {
      throw new VaccineNotFoundException();
    }
    this.vaccineRepository.merge(vaccine, updateVaccineDto);
    return await this.vaccineRepository.save(vaccine);
  }

  // DELETE /vaccines/:id
  async remove(vaccineID: string): Promise<void> {
    const result = await this.vaccineRepository.delete(vaccineID);
    if (result.affected === 0) {
      throw new VaccineNotFoundException();
    }
  }
}
