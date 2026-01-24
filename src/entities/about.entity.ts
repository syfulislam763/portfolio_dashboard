import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";

@Schema({ timestamps: true })
export class About extends BaseSchema {
  @Prop({ default: 0 })
  projectCompleted: number;

  @Prop({ default: 0 })
  yearOfExperience: number;

  @Prop({ default: 0 })
  jobCompleted: number;

  @Prop()
  introVideo: string;

  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  userId: Types.ObjectId;
}
