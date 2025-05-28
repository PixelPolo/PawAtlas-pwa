import { IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  // firstName : First name
  @IsString()
  @IsOptional()
  firstName?: string;

  // lastName : Last name
  @IsString()
  @IsOptional()
  lastName?: string;

  // phoneNumber : Phone number
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  // email : Email
  @IsString()
  @IsOptional()
  email?: string;

  // website : Category website
  @IsString()
  @IsOptional()
  website?: string;
}
