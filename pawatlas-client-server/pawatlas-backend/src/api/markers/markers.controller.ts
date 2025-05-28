import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
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

@Controller('markers')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  // POST /markers
  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markersService.create(createMarkerDto);
  }

  // GET /markers
  @Get()
  findAll() {
    return this.markersService.findAll();
  }

  // GET /markers/interest
  @Get('interest')
  findByInterest() {
    return this.markersService.findByInterest();
  }

  // GET /markers/danger
  @Get('danger')
  findByDanger() {
    return this.markersService.findByDanger();
  }

  // GET /markers/service
  @Get('service')
  findByService() {
    return this.markersService.findByService();
  }

  // GET /markers/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.markersService.findOne(id);
  }

  // PATCH /markers/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMarkerDto: UpdateMarkerDto,
  ) {
    return this.markersService.update(id, updateMarkerDto);
  }

  // DELETE /markers/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.markersService.remove(id);
  }
}
