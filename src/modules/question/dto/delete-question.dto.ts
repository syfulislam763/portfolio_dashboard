import { ApiProperty } from "@nestjs/swagger";
import { QuestionResponse } from "./response-question.dto";


export class DeleteQuestionResponseDto {
    @ApiProperty({type: QuestionResponse})
    removed: QuestionResponse
    @ApiProperty({type: [QuestionResponse]})
    remaining: QuestionResponse[]
}