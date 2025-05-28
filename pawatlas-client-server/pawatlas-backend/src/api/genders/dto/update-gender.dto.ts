import { PartialType } from '@nestjs/mapped-types';
import { CreateGenderDto } from './create-gender.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  // genderID : Gender ID
  @IsString()
  @IsNotEmpty()
  genderID: string;
}
