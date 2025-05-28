import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  // categoryID : Category ID
  @IsString()
  @IsNotEmpty()
  categoryID: string;

  // typeID : Type ID
  @IsString()
  @IsNotEmpty()
  typeID: string;

  // categoryName : Category name (e.g. 'veterinary' or 'toxic')
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  // categoryDescription : Category description
  @IsString()
  @IsNotEmpty()
  categoryDescription: string;
}
