import { Module } from '@nestjs/common';
import { AnimalEventsService } from './animal_events.service';
import { AnimalEventsController } from './animal_events.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { animalEventProviders } from './entities/animal_event.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalEventsController],
  providers: [...animalEventProviders, AnimalEventsService],
})
export class AnimalEventsModule {}
