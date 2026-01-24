import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";

@Schema()
export class RefreshToken extends BaseSchema {
    @Prop({ref:"User"})
    email: string
    @Prop()
    refreshToken:string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);