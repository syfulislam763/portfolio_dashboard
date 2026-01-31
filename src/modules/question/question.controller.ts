import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Promise } from 'mongoose';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { QuestionResponse } from './dto/response-question.dto';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';

@ApiTags("Questions")
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService){}


    @Post('/create')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: CreateQuestionDto})
    @ApiResponse({type: [QuestionResponse]})
    async create (@Body() createQuestionDto: CreateQuestionDto): Promise<CreateQuestionDto[]> {
        return this.questionService.create(createQuestionDto);
    }


    @Patch('/update/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: UpdateQuestionDto})
    @ApiResponse({type: [QuestionResponse]})
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<UpdateQuestionDto[]>{
        return this.questionService.update(id, updateQuestionDto)
    }

    @Get('/all')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [QuestionResponse]})
    async access (@GetUser("_id") userId: string): Promise<QuestionResponse[]> {
        return this.questionService.access(userId);
    }

    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    async remove (@Param('id') id:string, @GetUser('_id') userId:string) {
        return this.questionService.remove(id, userId);
    }




}
