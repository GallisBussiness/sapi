import { PartialType } from '@nestjs/mapped-types';
import { CreateComminiqueDto } from './create-comminique.dto';

export class UpdateComminiqueDto extends PartialType(CreateComminiqueDto) {}
