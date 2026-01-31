import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProjectDto } from "./create-project.dto";
import { IsArray, IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";



export class ProjectResponse {
    @IsMongoId()
    @ApiProperty({example: "23424nn434n34nn34n"})
    _id: Types.ObjectId

    @IsString()
    @ApiProperty({example: 'project name'})
    name: string;

    @IsString()
    @ApiProperty({enum: ['Research', 'AI/ML', 'Backend', 'Frontend']})
    projectType: string

    @IsString()
    @ApiProperty({example: 'enter an url'})
    githubFrontend?: string;

    @IsString()
    @ApiProperty({example: 'enter an url'})
    githubBackend?: string;

    @IsString()
    @ApiProperty({example: 'enter an url'})
    liveUrl?: string;

    @IsString()
    @ApiProperty({example: 'enter an url'})
    video?: string;

    @IsString()
    @ApiProperty({example: 'project description'})
    description?: string;

    @IsArray()
    @ApiProperty({example: ['Nest Js', 'Node Js']})
    technologies: string[];

    @IsArray()
    @ApiProperty({example: ['Email validation', 'Role based access']})
    features: string[];
}


// name projectType githubFrontend githubBackend liveUrl video description technologies features