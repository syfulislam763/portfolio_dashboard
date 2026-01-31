import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateQuestionDto } from "./create-question.dto";
import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";




export class QuestionResponse {
    @IsMongoId()
    @ApiProperty({example: '43534534fdfdfdfdfd'})
    _id: Types.ObjectId

    @IsString()
    @ApiProperty({example: 'what is your strongest point'})
    question: string;

    @IsString()
    @ApiProperty({example: 'i can work in stress'})
    answer: string;
}