import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateSkillDto } from "./create-skill.dto";
import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";



export class SkillResponse {
    @IsMongoId()
    @ApiProperty({example:'324234dfsd234532d'})
    _id: Types.ObjectId

    @IsString()
    @ApiProperty({example:'Frontend'})
    role: string;

    @IsString()
    @ApiProperty({example:'React Js'})
    name: string;
}