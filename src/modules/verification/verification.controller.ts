import { Controller } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Post, Body } from '@nestjs/common';

@Controller('verification')
export class VerificationController {

    constructor(private readonly verificationService: VerificationService){}

    

    // @Post('send-code')
    // async sendCode( email: string) {
    //     return this.verificationService.sendVerificationCode(email);
    // }

    // @Post('verify-code')
    // async verifyCode(
    //     @Body('email') email: string,
    //     @Body('code') code: string,
    // ) {
    //     const isValid = await this.verificationService.verifyCode(email, code);
    //     return { verified: isValid };
    // }

    // @Post('resend-code')
    // async resendCode(@Body('email') email: string) {
    //     return this.verificationService.resendCode(email);
    // }



}
