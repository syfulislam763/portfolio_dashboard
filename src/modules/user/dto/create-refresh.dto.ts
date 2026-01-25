import { IsEmail, IsSemVer, IsString, isString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateRefreshTokenDto {
    @ApiProperty({
        example: 'user@example.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: "sdufhdsjf239dhsfbjsdfhnsidfhsdiuhf293"
    })
    @IsString()
    refreshToken: string
}