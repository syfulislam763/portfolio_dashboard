import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";


@Schema({ timestamps: true })
export class Post extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  thumbnail?: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], default: [], index: true })
  keywords: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;
}


export const PostSchema = SchemaFactory.createForClass(Post);