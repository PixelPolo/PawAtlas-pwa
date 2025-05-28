import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { typeProviders } from './entities/type.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TypesController],
  providers: [...typeProviders, TypesService],
})
export class TypesModule {}
