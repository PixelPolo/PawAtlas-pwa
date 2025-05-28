import { PartialType } from '@nestjs/mapped-types';
import { CreateVermifugeDto } from './create-vermifuge.dto';

export class UpdateVermifugeDto extends PartialType(CreateVermifugeDto) {}
