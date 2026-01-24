
import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";


@Schema({ timestamps: true })
export class ContactInfo extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  contact: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}
