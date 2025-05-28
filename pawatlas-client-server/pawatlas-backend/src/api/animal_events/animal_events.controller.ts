import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AnimalEventsService } from './animal_events.service';
import { CreateAnimalEventDto } from './dto/create-animal_event.dto';
import { UpdateAnimalEventDto } from './dto/update-animal_event.dto';

@Controller('animal-events')
export class AnimalEventsController {
  constructor(private readonly animalEventsService: AnimalEventsService) {}

  // POST /animal-events
  @Post()
  create(@Body() createAnimalEventDto: CreateAnimalEventDto) {
    return this.animalEventsService.create(createAnimalEventDto);
  }

  // GET /animal-events
  @Get()
  findAll() {
    return this.animalEventsService.findAll();
  }

  // GET /animal-events/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalEventsService.findOne(id);
  }

  // PATCH /animal-events/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnimalEventDto: UpdateAnimalEventDto,
  ) {
    return this.animalEventsService.update(id, updateAnimalEventDto);
  }

  // DELETE /animal-events/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalEventsService.remove(id);
  }
}
