import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { IntroService } from './intro.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateIntroDto } from './dto/create-intro.dto';
import { Promise } from 'mongoose';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { UpdateIntroDto } from './dto/update-intro.dto';
import { IntroResponse } from './dto/intro-response.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
@ApiTags("Intro")
@ApiBearerAuth()
@Controller('intro')
export class IntroController {
    constructor(
        private readonly introService: IntroService
    ) {}

    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        status: 201,
        description: "user created",
        type: CreateIntroDto
    })
    @ApiBody({type: CreateIntroDto})
    async createIntro (@Body() createIntroDto: CreateIntroDto): Promise<CreateIntroDto> {
        return this.introService.create(createIntroDto);
    }


    @Patch("/update")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        description: "user updated",
        type:IntroResponse
    })
    @ApiBody({type: UpdateIntroDto})
    async updateIntro (@GetUser("_id") id: string, @Body() updateIntroDto: UpdateIntroDto): Promise<IntroResponse> {
        return this.introService.update(id, updateIntroDto);
    }

    @Get("/user")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        status: 200,
        description: "user fetched",
        type:IntroResponse
    })
    async get_intro(@GetUser("_id") id:string): Promise<IntroResponse> {
        return this.introService.get(id)
    }


}
