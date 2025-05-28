import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post() // POST /types
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get() // GET /types
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id') // GET /types/:id
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(id);
  }

  @Patch(':id') // PATCH /types/:id
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @Delete(':id') // DELETE /types/:id
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}
