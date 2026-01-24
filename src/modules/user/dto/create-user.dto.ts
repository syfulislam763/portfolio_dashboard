import { IsEmail, IsOptional,IsString,isString } from "class-validator";
import { UserRole } from "src/entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsOptional()
    role?: UserRole
}