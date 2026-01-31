import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";
import { IsArray, IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";




export class PostResponseDto {
    @IsMongoId()
    @ApiProperty({example: '23453dhfdhfg343hf'})
    _id: Types.ObjectId

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


// title thumbnail text keywords


