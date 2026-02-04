import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  PUBLIC = 'public'
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, index: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});




UserSchema.virtual('abouts', {
  ref: 'About',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('contactinfos', {
  ref: 'ContactInfo',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('educations', {
  ref: 'Education',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('experiences', {
  ref: 'Experience',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('intros', {
  ref: 'Intro',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'userId'
});

UserSchema.virtual('skills', {
  ref: 'Skill',
  localField: '_id',
  foreignField: 'userId'
});


UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
