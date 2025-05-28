import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  // POST /genders
  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  // GET /genders
  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  // GET /genders/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(id);
  }

  // PATCH /genders/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(id, updateGenderDto);
  }

  // DELETE /genders/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gendersService.remove(id);
  }
}
