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