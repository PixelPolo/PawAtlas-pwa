import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { animalProviders } from './entities/animal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [...animalProviders, AnimalsService],
})
export class AnimalsModule {}
