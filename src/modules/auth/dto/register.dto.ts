import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password123!', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ enum: UserRole })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}