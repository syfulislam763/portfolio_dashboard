
import { BaseSchema } from "src/common/schema/base.schema";
import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
@Schema({ timestamps: true })
export class Question extends BaseSchema {
  @Prop({ required: true })
  question: string;

  @Prop()
  answer: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}
