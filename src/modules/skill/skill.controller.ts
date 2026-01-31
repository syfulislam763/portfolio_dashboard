import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Promise } from 'mongoose';
import { SkillResponse } from './dto/response-skill.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { DeleteSkillResponseDto } from './dto/delete-skill.dto';

@ApiTags("Skills")
@ApiBearerAuth()
@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: CreateSkillDto})
    @ApiResponse({
        type: [SkillResponse]
    })
    async create (@GetUser("_id") userId:string, @Body() createSkillDto: CreateSkillDto):  Promise<SkillResponse[]> {
        return await this.skillService.create(userId, createSkillDto);
    }

    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: UpdateSkillDto})
    @ApiResponse({
        type: [SkillResponse]
    })
    async update(@Param("id") id:string, @GetUser("_id") userId: string, @Body() updateSkillDto: UpdateSkillDto): Promise<SkillResponse[]> {
        return await this.skillService.update(id, userId, updateSkillDto);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [SkillResponse]})
    async access (@GetUser("_id") userId: string): Promise<SkillResponse[]>{
        return this.skillService.access(userId);
    }

    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: DeleteSkillResponseDto})
    async remove (@Param('id') id:string, @GetUser("_id") userId: string):Promise<DeleteSkillResponseDto> {
        return await this.skillService.remove(id, userId);
    }

}
