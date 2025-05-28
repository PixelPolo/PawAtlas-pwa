import { Inject, Injectable } from '@nestjs/common';
import { CreateVermifugeDto } from './dto/create-vermifuge.dto';
import { UpdateVermifugeDto } from './dto/update-vermifuge.dto';
import { VERMIFUGE_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Vermifuge } from './entities/vermifuge.entity';
import { VermifugeNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class VermifugesService {
  constructor(
    @Inject(VERMIFUGE_REPOSITORY)
    private vermifugeRepository: Repository<Vermifuge>,
  ) {}

  // POST /vermifuges
  async create(createVermifugeDto: CreateVermifugeDto): Promise<Vermifuge> {
    const vermifuge = this.vermifugeRepository.create(createVermifugeDto);
    return await this.vermifugeRepository.save(vermifuge);
  }

  // GET /vermifuges
  async findAll(): Promise<Vermifuge[]> {
    return this.vermifugeRepository.find();
  }

  // GET /vermifuges/:id
  async findOne(vermifugeID: string): Promise<Vermifuge> {
    return this.vermifugeRepository.findOneBy({ vermifugeID });
  }

  // PATCH /vermifuges/:id
  async update(
    vermifugeID: string,
    updateVermifugeDto: UpdateVermifugeDto,
  ): Promise<Vermifuge> {
    const vermifuge = await this.findOne(vermifugeID);
    if (!vermifuge) {
      throw new VermifugeNotFoundException();
    }
    this.vermifugeRepository.merge(vermifuge, updateVermifugeDto);
    return await this.vermifugeRepository.save(vermifuge);
  }

  // DELETE /vermifuges/:id
  async remove(vermifugeID: string): Promise<void> {
    const result = await this.vermifugeRepository.delete(vermifugeID);
    if (result.affected === 0) {
      throw new VermifugeNotFoundException();
    }
  }
}
