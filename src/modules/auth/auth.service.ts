import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Promise } from 'mongoose';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService){}


    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        if (!user || user.isDeleted) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
    }

    async login(user: User) {
        const payload = { sub: user._id.toString(), roles: user.role ?? 'user' };

        const accessSecret = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!accessSecret || !refreshSecret) {
            throw new Error('JWT secrets are not defined');
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: accessSecret,
            expiresIn:  '1d',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        await this.userService.updateRefreshToken(user.email, refreshToken);

        return { accessToken, refreshToken };
    }

}
