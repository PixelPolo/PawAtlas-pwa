import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { likeProviders } from './entities/like.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LikesController],
  providers: [...likeProviders, LikesService],
})
export class LikesModule {}
