import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Promise } from 'mongoose';
import { PostResponseDto } from './dto/response-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { DeletePostResponseDto } from './dto/delete-post.dto';

@ApiTags("Post")
@ApiBearerAuth()
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Post('/create')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type: CreatePostDto})
    @ApiResponse({type: [PostResponseDto]})
    async create(@GetUser("_id") userId: string, @Body() createPostDto: CreatePostDto) : Promise<PostResponseDto[]> {
        return await this.postService.create(userId, createPostDto);
    }


    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBody({type:UpdatePostDto})
    @ApiResponse({type: [PostResponseDto]})
    async update( @Param('id') id:string, @GetUser('_id') userId: string, @Body() updatePostDto: UpdatePostDto): Promise<PostResponseDto[]>{
        return await this.postService.update(id,userId, updatePostDto);
    }


    @Get('/all')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: [PostResponseDto]})
    async access (@GetUser('_id') userId: string): Promise<PostResponseDto[]> {
        return await this.postService.access(userId);
    }


    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({type: DeletePostResponseDto})
    async remove (@Param('id') id: string, @GetUser('_id') userId: string): Promise<DeletePostResponseDto> {
        return await this.postService.remove(id, userId);
    }






}
