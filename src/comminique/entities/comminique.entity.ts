import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ComminiqueDocument = Comminique & Document;

@Schema({timestamps: true})
export class Comminique {
    @Prop({type: String, required: true})
    title: string;
    
    @Prop({type: String, required: true})
    subtitle: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: String, required: true})
    image: string;
}


export const ComminiqueSchema = SchemaFactory.createForClass(Comminique);