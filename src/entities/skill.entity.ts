import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";

@Schema({ timestamps: true })
export class Skill extends BaseSchema {
  @Prop()
  role: string;

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'About' })
  aboutId: Types.ObjectId;
}
