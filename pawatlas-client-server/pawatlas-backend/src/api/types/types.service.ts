import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TYPE_REPOSITORY } from 'src/common/constants';
import { TypeNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class TypesService {
  constructor(
    @Inject(TYPE_REPOSITORY) private typeRepository: Repository<Type>,
  ) {}

  // POST /types
  async create(createTypeDto: CreateTypeDto) {
    const type = this.typeRepository.create(createTypeDto);
    return await this.typeRepository.save(type);
  }

  // GET /types
  async findAll() {
    return await this.typeRepository.find();
  }

  // GET /types/:id
  async findOne(typeID: string) {
    return await this.typeRepository.findOneBy({ typeID });
  }

  // PATCH /types/:id
  async update(typeID: string, updateTypeDto: UpdateTypeDto) {
    const type = await this.findOne(typeID);
    if (!type) {
      throw new TypeNotFoundException();
    }
    this.typeRepository.merge(type, updateTypeDto);
    return await this.typeRepository.save(type);
  }

  // DELETE /types/:id
  async remove(typeID: string) {
    const result = await this.typeRepository.delete(typeID);
    if (result.affected === 0) {
      throw new TypeNotFoundException();
    }
  }
}
