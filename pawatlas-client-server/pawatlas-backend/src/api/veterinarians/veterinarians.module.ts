import { Module } from '@nestjs/common';
import { VeterinariansService } from './veterinarians.service';
import { VeterinariansController } from './veterinarians.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { veterinarianProviders } from './entities/veterinarian.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VeterinariansController],
  providers: [...veterinarianProviders, VeterinariansService],
})
export class VeterinariansModule {}
