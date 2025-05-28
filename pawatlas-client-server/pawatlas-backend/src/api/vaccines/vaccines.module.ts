import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { vaccineProviders } from './entities/vaccine.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VaccinesController],
  providers: [...vaccineProviders, VaccinesService],
})
export class VaccinesModule {}
