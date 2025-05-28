import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { genderProviders } from './entities/gender.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GendersController],
  providers: [...genderProviders, GendersService],
})
export class GendersModule {}
