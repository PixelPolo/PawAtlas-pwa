import { Module } from '@nestjs/common';
import { WeightsService } from './weights.service';
import { WeightsController } from './weights.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { weightProviders } from './entities/weight.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WeightsController],
  providers: [...weightProviders, WeightsService],
})
export class WeightsModule {}
