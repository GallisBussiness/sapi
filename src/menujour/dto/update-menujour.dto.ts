import { PartialType } from '@nestjs/mapped-types';
import { CreateMenujourDto } from './create-menujour.dto';

export class UpdateMenujourDto extends PartialType(CreateMenujourDto) {}
