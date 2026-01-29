import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";



export class CreateAboutDto {
    @IsNumber()
    @ApiProperty({example: 2})
    projectCompleted: number;

    @IsNumber()
    @ApiProperty({example: 3})
    yearOfExperience: number;

    @IsNumber()
    @ApiProperty({example: 4})
    jobCompleted: number;

    @IsString()
    @ApiProperty({example: 'https//www.youtube.com/myvideo.mp4', description:'upload your introduction video'})
    introVideo: string;

    userId: Types.ObjectId;
}