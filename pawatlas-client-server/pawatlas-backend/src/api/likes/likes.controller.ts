import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // POST /likes
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  // GET /likes
  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  // GET /likes/:mid/:uid
  @Get(':uid/:mid')
  findOne(@Param('uid') uid: string, @Param('mid') mid: string) {
    return this.likesService.findOne(uid, mid);
  }

  // PATCH /likes/:mid/:uid
  @Patch(':uid/:mid')
  update(
    @Param('uid') uid: string,
    @Param('mid') mid: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ) {
    return this.likesService.update(uid, mid, updateLikeDto);
  }

  // DELETE /likes/:mid/:uid
  @Delete(':uid/:mid')
  remove(@Param('uid') uid: string, @Param('mid') mid: string) {
    return this.likesService.remove(uid, mid);
  }
}
