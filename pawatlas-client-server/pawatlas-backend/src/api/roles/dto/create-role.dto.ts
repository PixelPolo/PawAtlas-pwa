import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  // roleID : Role ID
  @IsString()
  @IsNotEmpty()
  roleID: string;

  // roleName : Role name
  @IsString()
  @IsNotEmpty()
  roleName: string;

  // roleDescription : Role description
  @IsString()
  @IsNotEmpty()
  roleDescription: string;
}
