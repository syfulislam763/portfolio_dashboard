
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @ApiProperty({description:'set user role (admin or user'})
    role: string

    @IsBoolean()
    @ApiProperty({description: 'you can retrive a user or make a soft delete'})
    isDeleted: boolean
}

export class UpdateSuccessResponseDto {
    @ApiProperty({description:'set user role (admin or user)', example:'user'})
    role: string

    @ApiProperty({description: 'you can retrive a user or make a soft delete', example: false})
    isDeleted: boolean
}

export class DeleteUserResponseDto {
    @ApiProperty({})
    message: 'User is deleted'
}