import { Injectable, UnauthorizedException, ConflictException, NotFoundException,BadRequestException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from 'src/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from 'src/entities/refresh.entity';








@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
        private jwtService : JwtService,
        private configService: ConfigService
    ) {}


    async register(registerDto: RegisterDto) : Promise<AuthResponseDto> {
        const {email, password, role} = registerDto;
        const existingUser = await this.userModel.findOne({email, isDeleted:false})

        if(existingUser){
            throw new ConflictException('User with this eamil already exists')
        }

        const user = new this.userModel({
            email,
            password,
            role,
            isDeleted: false
        })

        await user.save()


        return this.generateTokens(user);

    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const { email, password } = loginDto;

        // Validate input
        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }

        // Find user and explicitly select password field
        const user = await this.userModel.findOne({ 
            email, 
            isDeleted: false
        }).select('+password'); // Important if password is excluded by default

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        // Debug logs
        console.log('Password from request:', password ? 'exists' : 'undefined');
        console.log('Password from DB:', user.password ? 'exists' : 'undefined');

        // Check if password exists
        if (!user.password) {
            throw new UnauthorizedException('Invalid user data');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateTokens(user);
    }

    async refreshToken(refreshToken: string) : Promise<AuthResponseDto> {
        try{
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN')
            });
            const user = await this.userModel.findById(payload.sub);
            const existingToken = await this.refreshTokenModel.findOne({email: user?.email})

            if(!user ||  existingToken?.refreshToken !== refreshToken){
                throw new UnauthorizedException("Invalid refresh token");
            }

            return this.generateTokens(user);
        }catch(error) {
            throw new UnauthorizedException("Invalid refresh token")
        }
    }


    private async generateTokens(user: any): Promise<AuthResponseDto> {
        const payload = {
            email: user.eamil,
            sub: user._id.toString(),
            role: user.role
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });

        const existingToken = await this.refreshTokenModel.findOne({email: user.email}).exec()

        if(existingToken){
            await this.refreshTokenModel.findOneAndUpdate({email:user.email}, {refreshToken}, {new: true})
        }else{
            const userRefreshToken = new this.refreshTokenModel({email:user.eamil, refreshToken})
            await userRefreshToken.save()
        }

        return {
            accessToken,
            refreshToken,

            user: {
                _id: user._id.toString(),
                email: user.email,
                role: user.role
            }
        }


    }

    async logout(email: string): Promise<{ message: string }> {
        await this.refreshTokenModel.findOneAndUpdate({email}, { 
            refreshToken: null 
        });
        return { message: 'Logged out successfully' };
    }

    async validateUser(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }


}
