import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVermifugeDto {
  // vermifugeDate: Vermifuge date
  @Type(() => Date)
  @IsNotEmpty()
  vermifugeDate: Date;

  // vermifugeName: Vermifuge name
  @IsString()
  @IsNotEmpty()
  vermifugeName: string;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
