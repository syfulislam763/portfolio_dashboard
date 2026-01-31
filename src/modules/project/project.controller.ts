import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Promise } from 'mongoose';
import { ProjectResponse } from './dto/response-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';


@ApiTags("Project")
@ApiBearerAuth()
@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService){}


    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: CreateProjectDto})
    @ApiResponse({type: [ProjectResponse]})
    async create (@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponse[]> {
        return await this.projectService.create(createProjectDto);
    }

    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type:UpdateProjectDto})
    @ApiResponse({type: [ProjectResponse]})
    async update (@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectResponse[]>{
        return await this.projectService.update(id, updateProjectDto)
    }


    @Get("/all")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [ProjectResponse]})
    async access (@GetUser("_id") userId:string): Promise<ProjectResponse[]> {
        return await this.projectService.access(userId);
    }


    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: ProjectResponse})
    async remove (@Param('id') id:string, @GetUser("_id") userId:string) : Promise<any>{
        return this.projectService.remove(id, userId);
    }










}
