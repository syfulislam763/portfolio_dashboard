import { IsBoolean, IsEmail, IsNumber, IsOptional,IsString,isString } from "class-validator";
import { UserRole } from "src/entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({
        example: 'user@example.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'StrongPassword123!',
        minLength: 8
    })
    @IsString()
    password: string

    @ApiPropertyOptional({
        enum: UserRole,
        example: UserRole.USER
    })
    @IsOptional()
    @IsString()
    role?: UserRole

    @ApiPropertyOptional({
        example: false
    })
    @IsOptional()
    @IsBoolean()
    isDeleted: boolean
}



export class UserResponseDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    _id: string;

    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ enum: UserRole, example: UserRole.USER })
    role: UserRole;

    @ApiProperty({ example: '2024-01-26T10:30:00.000Z' })
    createdAt: Date;

    @ApiProperty({example:false})
    isDeleted: boolean
}
