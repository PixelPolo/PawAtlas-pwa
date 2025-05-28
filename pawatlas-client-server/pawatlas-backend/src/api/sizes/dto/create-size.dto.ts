import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateSizeDto {
  // sizeDate: Size date
  @Type(() => Date)
  @IsNotEmpty()
  sizeDate: Date;

  // sizeValue: Size value
  @IsNumber()
  @IsNotEmpty()
  sizeValue: number;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
