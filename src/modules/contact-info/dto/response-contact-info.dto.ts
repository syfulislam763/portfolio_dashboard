import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateContactInfoDto } from "./create-contact-info.dto";
import { Types } from "mongoose";
import { IsMongoId, IsString } from "class-validator";



export class ContactInfoResponse {
    
    @IsMongoId()
    @ApiProperty({example: "2354324dfdsfhds3"})
    _id: Types.ObjectId

    @IsString()
    @ApiProperty({example: 'title'})
    title: string;

    @IsString()
    @ApiProperty({description: "enter your contact number"})
    contact: string;
}