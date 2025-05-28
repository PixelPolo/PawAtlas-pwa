import { Inject, Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { DISEASE_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Disease } from './entities/disease.entity';
import { DiseaseNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class DiseasesService {
  constructor(
    @Inject(DISEASE_REPOSITORY) private diseaseRepository: Repository<Disease>,
  ) {}

  // POST /diseases
  async create(createDiseaseDto: CreateDiseaseDto): Promise<Disease> {
    const disease = this.diseaseRepository.create(createDiseaseDto);
    return await this.diseaseRepository.save(disease);
  }

  // GET /diseases
  async findAll(): Promise<Disease[]> {
    return this.diseaseRepository.find();
  }

  // GET /diseases/:id
  async findOne(diseaseID: string): Promise<Disease> {
    return this.diseaseRepository.findOneBy({ diseaseID });
  }

  // PATCH /diseases/:id
  async update(
    diseaseID: string,
    updateDiseaseDto: UpdateDiseaseDto,
  ): Promise<Disease> {
    const disease = await this.findOne(diseaseID);
    if (!disease) {
      throw new DiseaseNotFoundException();
    }
    this.diseaseRepository.merge(disease, updateDiseaseDto);
    return await this.diseaseRepository.save(disease);
  }

  // DELETE /diseases/:id
  async remove(diseaseID: string): Promise<void> {
    const result = await this.diseaseRepository.delete(diseaseID);
    if (result.affected === 0) {
      throw new DiseaseNotFoundException();
    }
  }
}
