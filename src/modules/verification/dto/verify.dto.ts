import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class VerifyDto {
    @IsString()
    @ApiProperty({example: 'example@gmail.com'})
    email: string

    @IsString()
    @ApiProperty({example: '1224'})
    code: string
}