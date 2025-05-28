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
import { VermifugesService } from './vermifuges.service';
import { CreateVermifugeDto } from './dto/create-vermifuge.dto';
import { UpdateVermifugeDto } from './dto/update-vermifuge.dto';

@Controller('vermifuges')
export class VermifugesController {
  constructor(private readonly vermifugesService: VermifugesService) {}

  // POST /vermifuges
  @Post()
  create(@Body() createVermifugeDto: CreateVermifugeDto) {
    return this.vermifugesService.create(createVermifugeDto);
  }

  // GET /vermifuges
  @Get()
  findAll() {
    return this.vermifugesService.findAll();
  }

  // GET /vermifuges/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.vermifugesService.findOne(id);
  }

  // PATCH /vermifuges/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVermifugeDto: UpdateVermifugeDto,
  ) {
    return this.vermifugesService.update(id, updateVermifugeDto);
  }

  // DELETE /vermifuges/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vermifugesService.remove(id);
  }
}
