import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  email: string;

  @IsPhoneNumber('SN')
  tel: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: string;
}
