import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";

@Schema({ timestamps: true })
export class Education extends BaseSchema {
  @Prop()
  institute: string;

  @Prop()
  location: string;

  @Prop()
  major: string;

  @Prop()
  gpa: number;

  @Prop()
  scale: number;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'About' })
  aboutId: Types.ObjectId;
}
