import { IsOptional, IsString } from "class-validator";

export class CreateComminiqueDto {
    @IsString()
    title: string;
    
    @IsString()
    subtitle: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;
}
