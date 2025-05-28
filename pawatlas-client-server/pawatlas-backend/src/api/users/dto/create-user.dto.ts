import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  // userID : User ID
  @IsString()
  @IsNotEmpty()
  userID: string;

  // displayName : User's display name
  @IsString()
  @IsNotEmpty()
  displayName: string;

  // roleID : Role ID
  @IsString()
  @IsNotEmpty()
  roleID: string;

  // contactID : Contact ID
  @IsUUID()
  @IsOptional()
  contactID?: string;

  // addressID : Address ID
  @IsUUID()
  @IsOptional()
  addressID?: string;
}
