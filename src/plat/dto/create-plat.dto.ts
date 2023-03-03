import { IsOptional, IsString } from "class-validator";

export class CreatePlatDto {
    @IsString()
    nom: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;
}
