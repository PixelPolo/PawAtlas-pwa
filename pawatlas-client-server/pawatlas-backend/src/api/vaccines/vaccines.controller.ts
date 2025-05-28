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
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  // POST /vaccines
  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccinesService.create(createVaccineDto);
  }

  // GET /vaccines
  @Get()
  findAll() {
    return this.vaccinesService.findAll();
  }

  // GET /vaccines/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.vaccinesService.findOne(id);
  }

  // PATCH /vaccines/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVaccineDto: UpdateVaccineDto,
  ) {
    return this.vaccinesService.update(id, updateVaccineDto);
  }

  // DELETE /vaccines/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vaccinesService.remove(id);
  }
}
