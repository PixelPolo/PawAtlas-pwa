import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAnimalDto {
  // chipNumber: Chip number
  @IsString()
  @IsOptional()
  chipNumber?: string;

  // animalName: Animal name
  @IsString()
  @IsNotEmpty()
  animalName: string;

  // animalBirthName: Animal birth name
  @IsString()
  @IsOptional()
  animalBirthName?: string;

  // animalBirthDate: Animal birth date
  @Type(() => Date)
  @IsNotEmpty()
  animalBirthDate: Date;

  // animalType: Animal type
  @IsString()
  @IsNotEmpty()
  animalType: string;

  // animalBreed: Animal breed
  @IsString()
  @IsNotEmpty()
  animalBreed: string;

  // genderID : gender ID
  @IsString()
  @IsNotEmpty()
  genderID: string;

  // animalColor: Animal color
  @IsString()
  @IsNotEmpty()
  animalColor: string;

  // animalDescription: Animal description
  @IsString()
  @IsOptional()
  animalDescription?: string;

  // sterile: Sterile
  @IsBoolean()
  @IsNotEmpty()
  sterile: boolean;

  // humanFriendly: Human friendly
  @IsBoolean()
  @IsNotEmpty()
  humanFriendly: boolean;

  // animalFriendly: Animal friendly
  @IsBoolean()
  @IsNotEmpty()
  animalFriendly: boolean;

  // allergies: Allergies
  @IsString()
  @IsOptional()
  allergies?: string;

  // imageID : Image ID
  @IsUUID()
  @IsOptional()
  imageID?: string;

  // veterinarianID : Veterinarian ID
  @IsUUID()
  @IsOptional()
  veterinarianID?: string;
}
