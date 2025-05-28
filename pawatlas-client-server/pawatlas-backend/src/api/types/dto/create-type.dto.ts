import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  // typeID : Type ID
  @IsString()
  @IsNotEmpty()
  typeID: string;

  // typeName : Type name (e.g. 'interest', 'danger' or 'service')
  @IsString()
  @IsNotEmpty()
  typeName: string;
}
