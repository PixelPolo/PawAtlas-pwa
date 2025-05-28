import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateImageDto {
  // imageData : Image data in base64 format
  @IsNotEmpty()
  imageData: Buffer;

  // imageMimeType : Image MIME type (e.g. 'image/jpeg' or 'image/png')
  @IsString()
  @IsNotEmpty()
  imageMimeType: string;

  // imageDate : Date and time of the image
  @Type(() => Date)
  @IsNotEmpty()
  imageDate?: Date;
}
