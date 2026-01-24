import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types, Promise } from 'mongoose';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { RefreshToken } from 'src/entities/refresh.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>
    ){}

    async create(createUserDto: CreateUserDto) : Promise<User> {
        const user = new this.userModel(createUserDto);
        return user.save()
    }

    async createRefreshToken(createRefreshTokenDto: CreateRefreshTokenDto): Promise<RefreshToken> {
        const refresh = new this.refreshTokenModel(createRefreshTokenDto);
        return refresh.save()
    }

    async updateRefreshToken(email: string, refreshToken: string): Promise<RefreshToken> {
        const refresh = await this.refreshTokenModel.findOne({email: email}).select('-id').exec()
        if(!refresh)
            throw new NotFoundException("No refresh token found!")

        await this.refreshTokenModel.updateOne({email: email}, {refreshToken: refreshToken}).exec()

        const updated = await this.refreshTokenModel.findOne({email:email}).select("-id").exec()

        if(!updated)
            throw new NotFoundException("No refresh token found!")

        return updated
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({isDeleted: false}).select("-password").exec()
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email: email}).exec();
        if(!user) throw new NotFoundException("User not found!")
        return user;
    }


    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: id, isDeleted: false }).select('-password').exec();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
        }
        const user = await this.userModel
        .findOneAndUpdate({ _id: id, isDeleted: false }, updateUserDto, { new: true })
        .select('-password')
        .exec();

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async softDelete(id: string): Promise<void> {
        const res = await this.userModel.updateOne({ _id: id }, { isDeleted: true }).exec();
        if (res.matchedCount === 0) throw new NotFoundException('User not found');
    }

}
