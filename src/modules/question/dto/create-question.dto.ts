import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";



export class CreateQuestionDto {
    
    @IsString()
    @ApiProperty({example: 'what is your strongest point'})
    question: string;

    @IsString()
    @ApiProperty({example: 'i can work in stress'})
    answer: string;

}