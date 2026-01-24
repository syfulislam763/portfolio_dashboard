import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Project } from "src/entities/project.entity";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor () {
        const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET;

        if(!jwt_refresh_secret){
            throw new Error('JWT_REFRESH_SECRET is not set in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_refresh_secret
        })
    }

    validate(payload:any) {
        return payload
    }
}