import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateEducationDto } from "./create-education.dto";
import { IsNumber, IsString } from "class-validator";


export class EducationResponse {
    @IsString()
    @ApiProperty({example: "dfdfrf340932483243"})
    _id: string

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