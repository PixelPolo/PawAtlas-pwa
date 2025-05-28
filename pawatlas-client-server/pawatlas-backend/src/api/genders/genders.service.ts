import { Inject, Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GENDER_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
import { GenderNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class GendersService {
  constructor(
    @Inject(GENDER_REPOSITORY) private genderRepository: Repository<Gender>,
  ) {}

  // POST /genders
  async create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const gender = this.genderRepository.create(createGenderDto);
    return await this.genderRepository.save(gender);
  }

  // GET /genders
  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  // GET /genders/:id
  async findOne(genderID: string): Promise<Gender> {
    return this.genderRepository.findOneBy({ genderID });
  }

  // PATCH /genders/:id
  async update(
    genderID: string,
    updateGenderDto: UpdateGenderDto,
  ): Promise<Gender> {
    const gender = await this.findOne(genderID);
    if (!gender) {
      throw new GenderNotFoundException();
    }
    this.genderRepository.merge(gender, updateGenderDto);
    return await this.genderRepository.save(gender);
  }

  // DELETE /genders/:id
  async remove(genderID: string): Promise<void> {
    const result = await this.genderRepository.delete(genderID);
    if (result.affected === 0) {
      throw new GenderNotFoundException();
    }
  }
}
