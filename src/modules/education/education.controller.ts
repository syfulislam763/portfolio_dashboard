import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { EducationResponse } from './dto/response-education.dto';
import { Promise } from 'mongoose';
import { UpdateAboutDto } from '../about/dto/update-about.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { DeleteEducationResponseDto } from './dto/delete-education.dto';

@ApiTags("Education")
@ApiBearerAuth()
@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}


    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        status:201,
        type: [EducationResponse]
    })
    @ApiBody({type: CreateEducationDto})
    async create (@GetUser("_id") userId: string, @Body() createEducationDto: CreateEducationDto): Promise<EducationResponse[]> {
        return this.educationService.create(userId, createEducationDto)
    }


    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [EducationResponse]})
    @ApiBody({type:UpdateEducationDto})
    async update (@Param("id") id: string, @GetUser("_id") userId: string, @Body() updateEducationDto: UpdateEducationDto): Promise<EducationResponse[]>{
        return this.educationService.update(id, userId, updateEducationDto)
    }

    @Get("")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [EducationResponse]})
    async access (@GetUser('_id') userId: string): Promise<EducationResponse[]> {
        return this.educationService.access(userId);
    }


    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: DeleteEducationResponseDto})
    async remove (@Param('id') id: string, @GetUser('_id') userId:string): Promise<any> {
        return this.educationService.remove(id, userId)
    }

}
