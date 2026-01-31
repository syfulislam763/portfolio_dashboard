import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateExperienceDto } from "./create-experience.dto";
import { IsDate, IsString } from "class-validator";
import { Types } from "mongoose";

export class ExperienceResponse {
    @IsString()
    @ApiProperty({example: '23423kjdf2345324'})
    _id: Types.ObjectId

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
    endDate?: Date ;

    @IsString()
    @ApiProperty({example: 'description'})
    description: string; 
}