import { Schema, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";



@Schema({ timestamps: true })
export class SendMail {
  @Prop()
  name: string;

  @Prop()
  yourMail: string;

  @Prop()
  subject: string;

  @Prop()
  message: string;
}
