import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreatePostDto {
    @IsString()
    @ApiProperty({example:'project title'})
    title: string;

    @IsString()
    @ApiProperty({example: 'upload project thumbail image url'})
    thumbnail?: string;

    @IsString()
    @ApiProperty({example: 'you post'})
    text: string;

    @IsArray()
    @ApiProperty({description:'enter post keywords', example: ['AI/ML', 'Thread']})
    keywords: string[];
}