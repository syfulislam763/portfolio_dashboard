import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateIntroDto {

    @IsString()
    @ApiProperty({
        description: 'Profile image url should be intered',
        example: 'https//www.imgdb.com/example.png'
    })
    image: string;

    @IsString()
    @ApiProperty({example: 'Jhon'})
    name: string;

    @IsString()
    @ApiProperty({example: 'Title'})
    title: string;

    @IsString()
    @ApiProperty({example: "description"})
    description: string;

    @IsString()
    @ApiProperty({
        description: 'Store your resume somewhere and upload only downloadable link',
        example: 'https//www.google.com/resume.pdf'
    })
    file: string;

    userId: Types.ObjectId;
}