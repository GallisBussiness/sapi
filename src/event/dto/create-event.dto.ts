import { IsString } from "class-validator";
import { CreateComminiqueDto } from "src/comminique/dto/create-comminique.dto";

export class CreateEventDto extends CreateComminiqueDto{
    @IsString()
    date: string;
}
