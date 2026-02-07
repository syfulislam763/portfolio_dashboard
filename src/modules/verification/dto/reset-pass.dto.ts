import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class ResetPassDto {
    @ApiProperty({})
    @IsString()
    email: string

    @ApiProperty({})
    @IsString()
    code: string

    @ApiProperty({})
    @IsString()
    newPass: string

}

export class ChangePasswordDto {
    @ApiProperty({})
    @IsString()
    oldPass: string

    @ApiProperty({})
    @IsString()
    newPass: string
}