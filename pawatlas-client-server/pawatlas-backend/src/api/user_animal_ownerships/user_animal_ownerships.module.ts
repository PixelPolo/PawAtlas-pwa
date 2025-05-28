import { Module } from '@nestjs/common';
import { UserAnimalOwnershipsService } from './user_animal_ownerships.service';
import { UserAnimalOwnershipsController } from './user_animal_ownerships.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { userAnimalOwnershipProviders } from './entities/user_animal_ownerships.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserAnimalOwnershipsController],
  providers: [...userAnimalOwnershipProviders, UserAnimalOwnershipsService],
})
export class UserAnimalOwnershipsModule {}
