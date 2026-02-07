import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class RegisterResponseDto {
    @IsString()
    @ApiProperty({example: 'response message'})
    message: string

    @IsString()
    @ApiProperty({example: 'time of expiration'})
    expiresIn: string
}

export class PassChangedDto {
    @IsString()
    @ApiProperty({example: 'response message'})
    message: string
}

export class SendPassDto {
    @IsString()
    @ApiProperty({example: 'dev.syfulislam@gmail.com'})
    email: string
}