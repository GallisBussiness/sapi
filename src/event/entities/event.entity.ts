import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type EventDocument = Event & Document;

@Schema({timestamps: true})
export class Event {
    @Prop({type: String, required: true})
    title: string;
    
    @Prop({type: String, required: true})
    subtitle: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: String, required: true})
    image: string;

    @Prop({type: String, required: true})
    date: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
