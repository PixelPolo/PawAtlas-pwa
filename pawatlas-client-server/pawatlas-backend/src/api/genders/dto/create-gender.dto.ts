import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  // genderID : Gender ID
  @IsString()
  @IsNotEmpty()
  genderID: string;

  // genderName : gender Name (eg. 'male' or 'female')
  @IsString()
  @IsNotEmpty()
  genderName: string;
}
