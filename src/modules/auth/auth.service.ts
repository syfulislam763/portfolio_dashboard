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
import { VerificationService } from '../verification/verification.service';
import { TempUser } from 'src/entities/user.temp.entity';
import { RegisterResponseDto } from '../verification/dto/register-response.dto';
import passport from 'passport';
import { ChangePasswordDto, ResetPassDto } from '../verification/dto/reset-pass.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
        @InjectModel(TempUser.name) private tempUserModel: Model<TempUser>,
        private jwtService : JwtService,
        private configService: ConfigService,
        private verificationService: VerificationService
    ) {}


    async register(registerDto: RegisterDto) : Promise<RegisterResponseDto> {
        const {email, password, role} = registerDto;
        const existingTempUser = await this.tempUserModel.findOne({email, isDeleted:false})

        if(existingTempUser){
            throw new ConflictException({message: 'Please verify email', code: 'VERIFY_EMAIL'})
        }

        const isVerifiedUser = await this.userModel.findOne({email, isDeleted:false})

        if(isVerifiedUser){
            throw new ConflictException({message: "User is already exist with this email", code: "USER_EXIST"})
        }

        const isExist = await this.userModel.findOne({email:email, isDeleted: true})

        if(isExist){
            throw new ConflictException({message:"Contact to support to retrieve your account", code: "DELETED_USER"})
        }

        const res = await this.verificationService.sendVerificationCode(email)

       
        const user = new this.tempUserModel({
            email,
            password,
            role,
            isDeleted: false
        })

        await user.save()

        return res;

    }

    async registerVerifiedUser(email: string): Promise<AuthResponseDto> {
        const tempUser = await this.tempUserModel.findOneAndDelete({email})

        if(!tempUser){
            throw new NotFoundException('There is no user to be registered')
        }

        //console.log(tempUser, 'deleted temp user')

        const payload = {
            email: tempUser.email,
            password: tempUser.password,
            role: tempUser.role,
            isDeleted: tempUser.isDeleted
        }

        const newUser = new this.userModel(payload);

        await newUser.save();

        return this.generateTokens(newUser);

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
                throw new UnauthorizedException("Invalid refresh token");
            }

            const accessToken_payload = {
                email: user.email,
                sub: user._id.toString(),
                role: user.role
            }

            

            const accessToken = this.jwtService.sign(accessToken_payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1d',
            })


            return {
                accessToken,
                refreshToken
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
            expiresIn: '1d',
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
        if(user.isDeleted){
            throw new NotFoundException('User does not exist');
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

    async resetPassword (resetPassDto: ResetPassDto): Promise<any>{
        return this.verificationService.resetPasswordVerify(resetPassDto);
    }

    async resetPasswordOtp (email: string): Promise<any>{
        return this.verificationService.resendCode(email);
    }

    async resetPasswordForVarifiedEamil(resetPassDto: ResetPassDto):Promise<any> {
        if (!resetPassDto.email || !resetPassDto.newPass) {
            throw new BadRequestException('Email and password are required');
        }

        const user = await this.userModel.findOne({ 
            email: resetPassDto.email, 
            isDeleted: false
        }).select('+password');

        if (!user) {
            throw new NotFoundException('User does not exist');
        }


        if (!user.password) {
            throw new UnauthorizedException('Invalid user data');
        }

        user.password = await bcrypt.hash(resetPassDto.newPass, 12);

        await this.userModel.findOneAndUpdate({email:resetPassDto.email}, user, {new:true})


        return {
            message: 'Password has updated'
        }
        
    }

    async changePassword(userId: string, changePassDto: ChangePasswordDto): Promise<any>{
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid user id');
        }

        const user = await this.userModel.findOne({ 
            _id: userId, 
            isDeleted: false
        }).select('+password');

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        if (!user.password) {
            throw new UnauthorizedException('Invalid user data');
        }

        const isPasswordValid = await bcrypt.compare(changePassDto.oldPass, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }


        user.password = await bcrypt.hash(changePassDto.newPass, 12);

        await this.userModel.findOneAndUpdate({_id:userId}, user, {new:true})


        return {
            message: 'Password has changed'
        }


    }


}
