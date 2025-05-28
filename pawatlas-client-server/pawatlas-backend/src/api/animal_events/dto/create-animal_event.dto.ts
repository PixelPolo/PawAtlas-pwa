import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAnimalEventDto {
  // animalEventDate: Animal event date
  @Type(() => Date)
  @IsNotEmpty()
  animalEventDate: Date;

  // animalEventDescription: Animal event description
  @IsString()
  @IsNotEmpty()
  animalEventDescription: string;

  // animalID: Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
