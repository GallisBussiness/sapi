import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Plat } from "src/plat/entities/plat.entity";

export type MenujourDocument = Menujour & Document;

@Schema({timestamps: true})
export class Menujour {
    @Prop({type: String, required: true})
    jour: string;

    @Prop({ type: Types.ObjectId, ref: Plat.name, required: true, autopopulate: true })
    dej: string;

    @Prop({ type: Types.ObjectId, ref: Plat.name, required: true, autopopulate: true })
    din: string;

}

export const MenujourSchepma = SchemaFactory.createForClass(Menujour);