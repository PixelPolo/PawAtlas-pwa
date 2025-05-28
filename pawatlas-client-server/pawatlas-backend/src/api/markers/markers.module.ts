import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersController } from './markers.controller';
import { markerProviders } from './entities/marker.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MarkersController],
  providers: [...markerProviders, MarkersService],
})
export class MarkersModule {}
