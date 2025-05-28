import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVaccineDto {
  // vaccineDate: Vaccine date
  @Type(() => Date)
  @IsNotEmpty()
  vaccineDate: Date;

  // vaccineName: Vaccine name
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
