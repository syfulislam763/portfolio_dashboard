import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { isArgumentsObject } from "util/types";


export class CreateProjectDto {
    
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