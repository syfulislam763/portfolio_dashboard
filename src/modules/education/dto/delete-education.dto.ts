import { ApiProperty } from '@nestjs/swagger';
import { EducationResponse } from './response-education.dto';

export class DeleteEducationResponseDto {

  @ApiProperty({
    type: EducationResponse,
    description: 'The education record that was removed',
  })
  removed: EducationResponse;

  @ApiProperty({
    type: [EducationResponse],
    description: 'Remaining education records after deletion',
  })
  remaining: EducationResponse[];
}
