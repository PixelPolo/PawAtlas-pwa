import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LIKE_REPOSITORY } from 'src/common/constants';
import { LikeNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class LikesService {
  constructor(
    @Inject(LIKE_REPOSITORY) private likeRepository: Repository<Like>,
  ) {}

  // POST /likes
  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const like = this.likeRepository.create(createLikeDto);
    return await this.likeRepository.save(like);
  }

  // GET /likes
  async findAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  // GET /likes/:uid/:mid
  async findOne(userID: string, markerID: string): Promise<Like> {
    return this.likeRepository.findOneBy({ userID, markerID });
  }

  // PATCH /likes/:uid/:mid
  async update(
    userID: string,
    markerID: string,
    updateLikeDto: UpdateLikeDto,
  ): Promise<Like> {
    const like = await this.findOne(userID, markerID);
    if (!like) {
      throw new LikeNotFoundException();
    }
    this.likeRepository.merge(like, updateLikeDto);
    return await this.likeRepository.save(like);
  }

  // DELETE /likes/:uid/:mid
  async remove(userID: string, markerID: string): Promise<void> {
    const result = await this.likeRepository.delete({ userID, markerID });
    if (result.affected === 0) {
      throw new LikeNotFoundException();
    }
  }
}
