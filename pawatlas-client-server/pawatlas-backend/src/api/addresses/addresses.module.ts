import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { addressProviders } from './entities/address.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressesController],
  providers: [...addressProviders, AddressesService],
})
export class AddressesModule {}
