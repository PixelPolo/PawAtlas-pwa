import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserAnimalOwnershipDto {
  // userID : User ID
  @IsString()
  @IsNotEmpty()
  userID: string;

  // animalID : Animal ID
  @IsUUID()
  @IsNotEmpty()
  animalID: string;
}
