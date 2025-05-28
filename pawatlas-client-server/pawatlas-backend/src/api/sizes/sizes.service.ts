import { Inject, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SIZE_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { SizeNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class SizesService {
  constructor(
    @Inject(SIZE_REPOSITORY) private sizeRepository: Repository<Size>,
  ) {}

  // POST /sizes
  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  // GET /sizes
  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  // GET /sizes/:id
  async findOne(sizeID: string): Promise<Size> {
    return this.sizeRepository.findOneBy({ sizeID });
  }

  // PATCH /sizes/:id
  async update(sizeID: string, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(sizeID);
    if (!size) {
      throw new SizeNotFoundException();
    }
    this.sizeRepository.merge(size, updateSizeDto);
    return await this.sizeRepository.save(size);
  }

  // DELETE /sizes/:id
  async remove(sizeID: string): Promise<void> {
    const result = await this.sizeRepository.delete(sizeID);
    if (result.affected === 0) {
      throw new SizeNotFoundException();
    }
  }
}
