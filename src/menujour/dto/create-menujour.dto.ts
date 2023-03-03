import { IsMongoId, IsString } from "class-validator";

export class CreateMenujourDto {
    @IsString()
    jour: string;

    @IsMongoId()
    dej: string;

    @IsMongoId()
    din: string;
}
