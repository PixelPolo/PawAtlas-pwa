import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload') // POST /images/upload
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.upload(file);
  }

  @Get() // GET /images
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id') // GET /images/:id
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id') // PATCH /images/:id
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.update(id, updateImageDto, file);
  }

  @Delete(':id') // DELETE /images/:id
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.remove(id);
  }
}
