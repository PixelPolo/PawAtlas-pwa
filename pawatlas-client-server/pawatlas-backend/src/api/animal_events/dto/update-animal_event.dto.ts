import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalEventDto } from './create-animal_event.dto';

export class UpdateAnimalEventDto extends PartialType(CreateAnimalEventDto) {}
