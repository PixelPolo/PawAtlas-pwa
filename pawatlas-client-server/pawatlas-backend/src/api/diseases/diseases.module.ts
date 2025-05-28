import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesController } from './diseases.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { diseaseProviders } from './entities/disease.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DiseasesController],
  providers: [...diseaseProviders, DiseasesService],
})
export class DiseasesModule {}
