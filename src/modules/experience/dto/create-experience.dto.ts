import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
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

    
    @Type(() => Date)
    @IsDate()
    @ApiProperty({example:'2010-12-15T00:00:00.000Z'})
    startDate: Date;

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    @ApiProperty({example:'2022-12-15T00:00:00.000Z'})
    endDate?: Date;

    @IsString()
    @ApiProperty({example: 'description'})
    description: string;

}


// designation companyName location startDate endDate description
