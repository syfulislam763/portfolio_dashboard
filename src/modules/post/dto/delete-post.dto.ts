import { ApiProperty } from "@nestjs/swagger";
import { PostResponseDto } from "./response-post.dto";



export class DeletePostResponseDto {
    @ApiProperty({type: PostResponseDto})
    removed: PostResponseDto
    @ApiProperty({type: [PostResponseDto]})
    remaining: PostResponseDto[]
}