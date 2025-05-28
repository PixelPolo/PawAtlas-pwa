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
import { VeterinariansService } from './veterinarians.service';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';

@Controller('veterinarians')
export class VeterinariansController {
  constructor(private readonly veterinariansService: VeterinariansService) {}

  // POST /veterinarians
  @Post()
  create(@Body() createVeterinarianDto: CreateVeterinarianDto) {
    return this.veterinariansService.create(createVeterinarianDto);
  }

  // GET /veterinarians
  @Get()
  findAll() {
    return this.veterinariansService.findAll();
  }

  // GET /veterinarians/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.veterinariansService.findOne(id);
  }

  // PATCH /veterinarians/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVeterinarianDto: UpdateVeterinarianDto,
  ) {
    return this.veterinariansService.update(id, updateVeterinarianDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.veterinariansService.remove(id);
  }
}
