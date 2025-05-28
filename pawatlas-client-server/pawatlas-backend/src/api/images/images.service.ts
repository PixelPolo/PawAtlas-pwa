import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { IMAGE_REPOSITORY } from 'src/common/constants';
import { ImageNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGE_REPOSITORY) private imageRepository: Repository<Image>,
  ) {}

  // POST /images/upload
  async upload(file: Express.Multer.File) {
    const createImageDto: CreateImageDto = {
      imageData: file.buffer,
      imageMimeType: file.mimetype,
      imageDate: new Date(),
    };
    const image = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(image);
  }

  // GET /images
  async findAll() {
    return await this.imageRepository.find();
  }

  // GET /images/:id
  async findOne(imageID: string) {
    return await this.imageRepository.findOneBy({ imageID });
  }

  // TODO FIX THIS PATCH METHOD

  // PATCH /images/:id
  async update(
    imageID: string,
    updateImageDto: UpdateImageDto,
    file?: Express.Multer.File,
  ) {
    const image = await this.findOne(imageID);
    if (!image) {
      throw new ImageNotFoundException();
    }
    if (file) {
      updateImageDto.imageData = file.buffer;
      updateImageDto.imageMimeType = file.mimetype;
    }
    this.imageRepository.merge(image, updateImageDto);
    return await this.imageRepository.save(image);
  }

  // DELETE /images/:id
  async remove(imageID: string) {
    const result = await this.imageRepository.delete(imageID);
    if (result.affected === 0) {
      throw new ImageNotFoundException();
    }
  }
}
