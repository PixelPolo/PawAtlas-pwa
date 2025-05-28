import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  // POST /diseases
  @Post()
  create(@Body() createDiseaseDto: CreateDiseaseDto) {
    return this.diseasesService.create(createDiseaseDto);
  }

  // GET /diseases
  @Get()
  findAll() {
    return this.diseasesService.findAll();
  }

  // GET /diseases/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.diseasesService.findOne(id);
  }

  // PATCH /diseases/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiseaseDto: UpdateDiseaseDto,
  ) {
    return this.diseasesService.update(id, updateDiseaseDto);
  }

  // DELETE /diseases/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.diseasesService.remove(id);
  }
}
