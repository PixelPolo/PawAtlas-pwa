import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateWeightDto {
  // weightDate: Weight date
  @Type(() => Date)
  @IsNotEmpty()
  weightDate: Date;

  // weightValue: Weight value
  @IsNumber()
  @IsNotEmpty()
  weightValue: number;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
