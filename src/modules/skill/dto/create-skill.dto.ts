import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateSkillDto {
    
    @IsString()
    @ApiProperty({example:'Frontend'})
    role: string;

    @IsString()
    @ApiProperty({example:'React Js'})
    name: string;
}