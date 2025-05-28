import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  // street : Address street
  @IsString()
  @IsOptional()
  street?: string;

  // city : Address city
  @IsString()
  @IsOptional()
  city?: string;

  // postalCode : Address postal code
  @IsString()
  @IsOptional()
  postalCode?: string;

  // state : Address state
  @IsString()
  @IsOptional()
  state?: string;

  // country : Address country
  @IsString()
  @IsOptional()
  country?: string;
}
