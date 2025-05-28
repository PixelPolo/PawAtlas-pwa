import { CreateLikeDto } from './create-like.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {}
