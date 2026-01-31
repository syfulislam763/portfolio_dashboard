import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AboutService } from './about.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAboutDto } from './dto/create-about.dto';
import { About } from 'src/entities/about.entity';
import { Promise } from 'mongoose';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutResponse } from './dto/response-about.dto';
import { Roles } from '../auth/guards/roles.guards';
import { User, UserRole } from 'src/entities/user.entity';
import { GetUser } from '../auth/decroators/get-user.decroator';
@ApiTags("About")
@ApiBearerAuth()
@Controller('about')
export class AboutController {
    constructor(
        private readonly aboutService: AboutService
    ){}


    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({})
    @ApiBody({type: CreateAboutDto})
    async create(@GetUser("_id") userId: string, @Body() createAboutDto: CreateAboutDto) : Promise<any> {
        return this.aboutService.create(userId, createAboutDto)
    }

    @Patch("/update")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        type: AboutResponse
    })
    @ApiBody({type: UpdateAboutDto})
    async update (@GetUser("_id") id:string,@Body() updateAboutDto: UpdateAboutDto) : Promise<AboutResponse> {
        return this.aboutService.update(id, updateAboutDto)
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: AboutResponse})
    async get_about(@GetUser("_id") id: string): Promise<AboutResponse> {
        return this.aboutService.get(id);
    }



}
