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
import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@Controller('weights')
export class WeightsController {
  constructor(private readonly weightsService: WeightsService) {}

  // POST /weights
  @Post()
  create(@Body() createWeightDto: CreateWeightDto) {
    return this.weightsService.create(createWeightDto);
  }

  // GET /weights
  @Get()
  findAll() {
    return this.weightsService.findAll();
  }

  // GET /weights/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.weightsService.findOne(id);
  }

  // PATCH /weights/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWeightDto: UpdateWeightDto,
  ) {
    return this.weightsService.update(id, updateWeightDto);
  }

  // DELETE /weights/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.weightsService.remove(id);
  }
}
