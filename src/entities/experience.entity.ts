
import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";

@Schema({ timestamps: true })
export class Experience extends BaseSchema {
  @Prop()
  designation: string;

  @Prop()
  companyName: string;

  @Prop()
  location: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'About' })
  aboutId: Types.ObjectId;
}
