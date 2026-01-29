
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";


@Schema({ timestamps: true })
export class ContactInfo extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  contact: string;

  @Prop({ type: Types.ObjectId, ref: 'User', unique: false })
  userId: Types.ObjectId;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo)
