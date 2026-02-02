
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Verification extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    expiresAt: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

VerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });