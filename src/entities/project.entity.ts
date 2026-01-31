


import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/common/schema/base.schema";


@Schema({ timestamps: true })
export class Project extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({required:false})
  projectType: string

  @Prop()
  githubFrontend?: string;

  @Prop()
  githubBackend?: string;

  @Prop()
  liveUrl?: string;

  @Prop()
  video?: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);