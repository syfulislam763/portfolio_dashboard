import { ApiProperty } from "@nestjs/swagger";
import { ProjectResponse } from "./response-project.dto";



export class DeleteProjectResponseDto {
    
    @ApiProperty({type: ProjectResponse})
    removed: ProjectResponse

    @ApiProperty({type: [ProjectResponse]})
    remaining: ProjectResponse[]

}