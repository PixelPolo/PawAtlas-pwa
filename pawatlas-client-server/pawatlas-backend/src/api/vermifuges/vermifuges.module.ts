import { Module } from '@nestjs/common';
import { VermifugesService } from './vermifuges.service';
import { VermifugesController } from './vermifuges.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { vermifugeProviders } from './entities/vermifuge.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VermifugesController],
  providers: [...vermifugeProviders, VermifugesService],
})
export class VermifugesModule {}
