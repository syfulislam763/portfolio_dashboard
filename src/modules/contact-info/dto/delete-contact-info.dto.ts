import { ApiProperty } from "@nestjs/swagger";
import { ContactInfoResponse } from "./response-contact-info.dto";



export class DeleteContactInfoResponseDto {

    @ApiProperty({type: ContactInfoResponse})
    removed: ContactInfoResponse

    @ApiProperty({type: [ContactInfoResponse]})
    remaining: ContactInfoResponse[]

}