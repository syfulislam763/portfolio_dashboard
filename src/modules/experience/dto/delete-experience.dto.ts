import { ApiProperty } from "@nestjs/swagger";
import { ExperienceResponse } from "./response-experience.dto";



export class DeleteExperienceResponseDto {

  @ApiProperty({
    type: ExperienceResponse,
    description: 'The experience record that was removed',
  })
  removed: ExperienceResponse;

  @ApiProperty({
    type: [ExperienceResponse],
    description: 'Remaining experience records after deletion',
  })
  remaining: ExperienceResponse[];
}
