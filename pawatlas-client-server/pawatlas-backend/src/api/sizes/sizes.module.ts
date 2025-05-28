import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { sizeProviders } from './entities/size.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SizesController],
  providers: [...sizeProviders, SizesService],
})
export class SizesModule {}
