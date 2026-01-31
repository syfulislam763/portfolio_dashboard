import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";



export class CreateContactInfoDto {

    @IsString()
    @ApiProperty({example: 'title'})
    title: string;

    @IsString()
    @ApiProperty({description: "enter your contact number"})
    contact: string;

}