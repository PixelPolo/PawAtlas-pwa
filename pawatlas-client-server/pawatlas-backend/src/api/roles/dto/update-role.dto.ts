import { CreateRoleDto } from './create-role.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  // roleID : Role ID
  @IsString()
  @IsNotEmpty()
  roleID: string;
}
