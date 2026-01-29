import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Promise } from 'mongoose';
import { ExperienceResponse } from './dto/response-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Request } from '@nestjs/common';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
@ApiTags("Experience")
@ApiBearerAuth()
@Controller('experience')
export class ExperienceController {
    constructor(
        private readonly experienceService: ExperienceService
    ){}


    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: CreateExperienceDto})
    @ApiResponse({type: [ExperienceResponse] })
    async create (@Body() createExperienceDto: CreateExperienceDto) : Promise<ExperienceResponse[]> {
        return this.experienceService.create(createExperienceDto);
    }

    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: UpdateExperienceDto})
    @ApiResponse({type: [ExperienceResponse]})
    async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto): Promise<ExperienceResponse[]>{
        return this.experienceService.update(id, updateExperienceDto);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type:[ExperienceResponse]})
    async access (@GetUser() user:{ _id: string; email: string; role: string }) : Promise<ExperienceResponse[]> {
        return this.experienceService.access(user._id)
    }


    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    async remove(@Param('id') id:string, @GetUser("_id") userId: string) {
        return this.experienceService.remove(id, userId)
    }


}
