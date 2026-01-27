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
import { Types } from 'mongoose';

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

        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }

        const user = await this.userModel.findOne({ 
            email, 
            isDeleted: false
        }).select('+password');

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        console.log('Password from request:', password ? 'exists' : 'undefined');
        console.log('Password from DB:', user.password ? 'exists' : 'undefined');

        if (!user.password) {
            throw new UnauthorizedException('Invalid user data');
        }

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
            console.log(JSON.stringify(payload, null, 2), "payload")
            const user = await this.userModel.findById(new Types.ObjectId(payload.sub));
           
            const existingToken = await this.refreshTokenModel.findOne({email: user?.email, isDeleted:false})
            
            console.log(JSON.stringify(user, null, 2), "refre");
            console.log(existingToken, "-existing token")


            if(!user ||  existingToken?.refreshToken !== refreshToken){
                console.log("curprit", existingToken?.refreshToken !== refreshToken)
                throw new UnauthorizedException("Invalid refresh token");
            }

            const accessToken_payload = {
                email: user.email,
                sub: user._id.toString(),
                role: user.role
            }

            

            const accessToken = this.jwtService.sign(accessToken_payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '15m',
            })


            return {
                accessToken,
                refreshToken,

                user: {
                    _id: user._id.toString(),
                    email: user.email,
                    role: user.role
                }
            }
        }catch(error) {
            throw new UnauthorizedException("Invalid refresh token")
        }
    }


    private async generateTokens(user: any): Promise<AuthResponseDto> {
        const payload = {
            email: user.email,
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

        const existingToken = await this.refreshTokenModel.findOne({email: user.email, isDeleted:false}).exec()


        if(existingToken){
            await this.refreshTokenModel.findOneAndUpdate({email:user.email}, {refreshToken}, {new: true})
        }else{
            const userRefreshToken = new this.refreshTokenModel({email:user.email, refreshToken})
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

    async remove(id: string): Promise<{message: string}> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.isDeleted = true;

        await this.refreshTokenModel.findOneAndUpdate({email: user.email, isDeleted: false}, {isDeleted: true}, {new: true})

        await user.save()

        return {message: "User is deleted"}
    }

    async validateUser(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }


}
