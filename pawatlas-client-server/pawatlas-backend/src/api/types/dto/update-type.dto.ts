import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDto } from './create-type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  // typeID : Type ID
  @IsString()
  @IsNotEmpty()
  typeID: string;
}
