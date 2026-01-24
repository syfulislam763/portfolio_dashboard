import { IsEmail, IsSemVer, IsString, isString } from "class-validator";


export class CreateRefreshTokenDto {
    @IsEmail()
    email: string
    @IsString()
    refreshToken: string
}