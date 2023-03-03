import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlatDocument = Plat & Document;

@Schema({timestamps: true})
export class Plat {
    @Prop({ type: String, required: true, unique: true })
    nom: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    image: string;
}


export const PlatSchema = SchemaFactory.createForClass(Plat);