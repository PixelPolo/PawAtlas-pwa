import { Inject, Injectable } from '@nestjs/common';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { WEIGHT_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Weight } from './entities/weight.entity';
import { WeightNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class WeightsService {
  constructor(
    @Inject(WEIGHT_REPOSITORY) private weightRepository: Repository<Weight>,
  ) {}

  // POST /weights
  async create(createWeightDto: CreateWeightDto): Promise<Weight> {
    const weight = this.weightRepository.create(createWeightDto);
    return await this.weightRepository.save(weight);
  }

  // GET /weights
  async findAll(): Promise<Weight[]> {
    return this.weightRepository.find();
  }

  // GET /weights/:id
  async findOne(weightID: string): Promise<Weight> {
    return this.weightRepository.findOneBy({ weightID });
  }

  // PATCH /weights/:id
  async update(
    weightID: string,
    updateWeightDto: UpdateWeightDto,
  ): Promise<Weight> {
    const weight = await this.findOne(weightID);
    if (!weight) {
      throw new WeightNotFoundException();
    }
    this.weightRepository.merge(weight, updateWeightDto);
    return await this.weightRepository.save(weight);
  }

  // DELETE /weights/:id
  async remove(weightID: string): Promise<void> {
    const result = await this.weightRepository.delete(weightID);
    if (result.affected === 0) {
      throw new WeightNotFoundException();
    }
  }
}
