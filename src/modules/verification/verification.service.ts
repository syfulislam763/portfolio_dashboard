// verification.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification } from 'src/entities/verification.entity';
import { EmailService } from './email.service';

@Injectable()
export class VerificationService {
    constructor(
        @InjectModel(Verification.name) 
        private verificationModel: Model<Verification>,
        private emailService: EmailService,
    ) {}

    private generateCode(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    async sendVerificationCode(email: string) {
        await this.verificationModel.deleteMany({ email });

        const code = this.generateCode();

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.verificationModel.create({
            email,
            code,
            expiresAt,
        });

        const res = await this.emailService.sendVerificationCode(email, code);
        console.log(res, "email")
        
        return { 
            message: 'Verification code sent to your email',
            expiresIn: '10 minutes'
        };
    }

    async verifyCode(email: string, code: string): Promise<boolean> {
        const verification = await this.verificationModel.findOne({
            email,
            code,
            expiresAt: { $gt: new Date() }, 
        });

        if (!verification) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        await this.verificationModel.deleteOne({ _id: verification._id });

        return true;
    }


    async checkCode(email: string, code: string): Promise<boolean> {
        const verification = await this.verificationModel.findOne({
            email,
            code,
            expiresAt: { $gt: new Date() },
        });

        return !!verification;
    }

    async resendCode(email: string) {
        const recentCode = await this.verificationModel.findOne({
            email,
            createdAt: { $gt: new Date(Date.now() - 60 * 1000) }, 
        });

        if (recentCode) {
            throw new BadRequestException('Please wait before requesting a new code');
        }

        return this.sendVerificationCode(email);
    }
}