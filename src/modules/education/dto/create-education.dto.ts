import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateEducationDto {
    
    @IsString()
    @ApiProperty({example: 'Institude name'})
    institute: string;

    @IsString()
    @ApiProperty({example: 'Dhaka'})
    location: string;

    @IsString()
    @ApiProperty({example:"CSE"})
    major: string;

    @IsNumber()
    @ApiProperty({example: 3.70})
    gpa: number;

    @IsNumber()
    @ApiProperty({example: 4})
    scale: number;

    @IsString()
    @ApiProperty({example: "your description here"})
    description: string;
}



// institute location major gpa scale description