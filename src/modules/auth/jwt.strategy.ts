import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_ACCESS_SECRET is not set in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
        })
    }

    validate(payload: any) {
        return payload
    }
}