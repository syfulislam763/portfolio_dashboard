import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateExperienceDto {

    @IsString()
    @ApiProperty({example:'Software Eng.'})
    designation: string;

    @IsString()
    @ApiProperty({example:'Example LTD'})
    companyName: string;

    @IsString()
    @ApiProperty({example: 'Remote'})
    location: string;

    @IsDate()
    @ApiProperty({example: 'Enter date'})
    startDate: Date;

    @IsDate()
    @ApiProperty({example: 'Enter date'})
    endDate: Date;

    @IsString()
    @ApiProperty({example: 'description'})
    description: string;


    userId: Types.ObjectId;

    aboutId: Types.ObjectId;
}