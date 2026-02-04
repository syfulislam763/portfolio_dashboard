import { Controller } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify.dto';
import { Promise } from 'mongoose';
import { RegisterResponseDto } from './dto/register-response.dto';
import { AuthResponseDto } from '../auth/dto/auth-response.dto';
import { ResendDto } from './dto/resend.dto';
import { Public } from '../auth/decroators/public.decroator';

@ApiTags("Verification")
@Controller('verification')
export class VerificationController {

    constructor(private readonly verificationService: VerificationService){}

    

    // @Post('send-code')
    // async sendCode( email: string) {
    //     return this.verificationService.sendVerificationCode(email);
    // }

    @Public()
    @Post('verify-code')
    @ApiResponse({type: AuthResponseDto})
    async verifyCode(@Body() verifyDto:VerifyDto): Promise<AuthResponseDto> {
        return await this.verificationService.verifyCode(verifyDto.email, verifyDto.code);
    }

    @Public()
    @Post('resend-code')
    @ApiResponse({type: RegisterResponseDto})
    async resendCode(@Body() resendDto: ResendDto): Promise<RegisterResponseDto> {
        return this.verificationService.resendCode(resendDto.email);
    }



}
