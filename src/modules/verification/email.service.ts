import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configService.get('EMAIL'),
                pass: configService.get('EMAIL_PASS'),
            },
        });
    }

    async sendVerificationCode(email: string, code: string) {
        try {
            const result = await this.transporter.sendMail({
                from: `"Reflex Portfolio" <${this.configService.get('EMAIL')}>`,
                to: email,
                subject: 'Email Verification Code',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                        <!-- Logo -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="https://i.ibb.co.com/r23nqwRz/Port-Folio-1.png" 
                                alt="Portfolio Image" 
                                style="width: 80px; height: auto; object-fit:'cover" />
                        </div>
                        
                        <h2 style="color: #333; text-align: center;">Email Verification</h2>
                        <p>Your verification code is:</p>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #4F46E5; letter-spacing: 8px; margin: 0;">${code}</h1>
                        </div>
                        <p>This code will expire in <strong>10 minutes</strong>.</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            If you didn't request this code, please ignore this email.
                        </p>
                    </div>
                `
            });

            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send verification email. Try again');
        }
    }
}