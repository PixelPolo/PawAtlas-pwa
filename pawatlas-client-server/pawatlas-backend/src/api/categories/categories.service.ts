import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CATEGORY_REPOSITORY } from 'src/common/constants';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private categoryRepository: Repository<Category>,
  ) {}

  // POST /category
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // GET /category
  async findAll() {
    return await this.categoryRepository.find();
  }

  // GET /category/:id
  async findOne(categoryID: string) {
    return await this.categoryRepository.findOneBy({ categoryID });
  }

  // PATCH /category/:id
  async update(categoryID: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(categoryID);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    this.categoryRepository.merge(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // DELETE /category/:id
  async remove(categoryID: string) {
    const result = await this.categoryRepository.delete(categoryID);
    if (result.affected === 0) {
      throw new CategoryNotFoundException();
    }
  }
}
