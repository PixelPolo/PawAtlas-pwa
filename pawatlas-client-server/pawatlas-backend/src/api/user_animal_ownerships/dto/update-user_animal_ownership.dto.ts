import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnimalOwnershipDto } from './create-user_animal_ownership.dto';

export class UpdateUserAnimalOwnershipDto extends PartialType(CreateUserAnimalOwnershipDto) {}
