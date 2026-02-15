import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";


@Schema({timestamps:true})
export class APIKey extends BaseSchema {
    @Prop({ unique: true, sparse: true, required: false }) 
    apiKey: string| null ;

    @Prop({required: true, unique: true})
    email: string

    @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
    userId: string

}

export const APIKeySchema = SchemaFactory.createForClass(APIKey);