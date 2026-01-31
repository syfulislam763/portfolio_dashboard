import { ApiProperty } from "@nestjs/swagger";
import { SkillResponse } from "./response-skill.dto";


export class DeleteSkillResponseDto {
    @ApiProperty({
        type: SkillResponse
    })
    removed: SkillResponse

    @ApiProperty({type: [SkillResponse]})
    remaining: SkillResponse[]
}