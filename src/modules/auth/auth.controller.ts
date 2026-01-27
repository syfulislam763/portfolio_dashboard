import { Controller, Post, Body, UseGuards, Get, HttpCode, HttpStatus, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthResponseDto } from './dto/auth-response.dto'
import { Public } from './decroators/public.decroator'
import { CurrentUser } from './decroators/current-user.decroator'
import { Roles } from './guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, type: AuthResponseDto })
    @ApiResponse({ status: 409, description: 'User already exists' })
    async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
        return this.authService.register(registerDto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);
    }


    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @ApiResponse({ status: 401, description: 'Invalid refresh token' })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }


    @Post('logout')
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200, description: 'Logged out successfully' })
    async logout(@CurrentUser() user: any) {
        return this.authService.logout(user.userId);
    }

    @Delete('delete/:id')
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "delete user"})
    @ApiResponse({status: 200, description: "User is deleted successfully"})
    async remove(@Param("id") id: string) {
        return this.authService.remove(id);
    }

}