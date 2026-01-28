import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";
@Schema({ timestamps: true })
export class Intro extends BaseSchema {
  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  file: string;

  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  userId: Types.ObjectId;
}

export const IntroSchema = SchemaFactory.createForClass(Intro);