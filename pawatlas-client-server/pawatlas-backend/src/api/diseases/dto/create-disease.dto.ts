import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDiseaseDto {
  // diseaseDate: Disease date
  @Type(() => Date)
  @IsNotEmpty()
  diseaseDate: Date;

  // diseaseDescription: Disease description
  @IsString()
  @IsNotEmpty()
  diseaseDescription: string;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
