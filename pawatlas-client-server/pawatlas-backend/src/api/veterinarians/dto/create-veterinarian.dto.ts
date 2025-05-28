import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVeterinarianDto {
  // contactID : Contact ID
  @IsUUID()
  @IsOptional()
  contactID?: string;

  // addressID : Address ID
  @IsUUID()
  @IsOptional()
  addressID?: string;
}
