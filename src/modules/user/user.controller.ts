import { Controller, Body, Delete, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto} from './dto/create-user.dto';
import { DeleteUserResponseDto, UpdateSuccessResponseDto, UpdateUserDto } from './dto/update-user.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { Public } from '../auth/decroators/public.decroator';
import { ApiKeyResponseDto, UserListItemDto, UserListResponseDto } from './dto/all-user-response.dto';
import { UserDetailResponseDto } from './dto/user-detail-response.dto';
import { GetUser } from '../auth/decroators/get-user.decroator';
import { ApiKeyGuard } from './api-key.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {  }

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiResponse({
        status: 201,
        description: "user created",
        type: UserResponseDto
    })
    @ApiBody({type:CreateUserDto})
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post("/refresh-token")
    @Roles(UserRole.ADMIN)
    createRefreshToken(@Body() createRefreshToken: CreateRefreshTokenDto) {
        return this.userService.createRefreshToken(createRefreshToken)
    }
    @Get("/all")
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        description: 'List of all users',
        type: UserListResponseDto
    })
    findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<UserListResponseDto> {
        return this.userService.findAll(page, limit)
    }

    @Get('me')
    @Public()
    @ApiOperation({security: []})
    @UseGuards(ApiKeyGuard)
    @ApiHeader({name: 'x-api-key', required:true})
    @ApiOkResponse({
        type: UserDetailResponseDto
    })
    async getAllData(@Request() req) {
        return this.userService.findOne(req.user._id)
    }


    @Get("me/generate/apiKey")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOkResponse({
        description: 'An api key will be generated',
        type: ApiKeyResponseDto
    })
    generate(@GetUser() user: {_id:string, email:string, role: string}): Promise<any>{
        return this.userService.generateApiKey(user.email, user._id)
    }



    @Get("me/revoke/apiKey")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOkResponse({
        description: 'An api key will be generated',
        type: ApiKeyResponseDto
    })
    revoke(@GetUser() user: {_id:string, email:string, role: string}): Promise<any>{
        return this.userService.revokeApiKey(user._id)
    }



    @Get(':id')
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        description: 'all data of an user',
        type: UserDetailResponseDto
    })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    
    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        type: UpdateSuccessResponseDto
    })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }
    @Patch('refresh-token/:email')
    @Roles(UserRole.ADMIN)
    updateRefreshToken(@Param('email') email: string, @Body() updateRefreshToken: UpdateRefreshTokenDto){
        return this.userService.updateRefreshToken(email, updateRefreshToken)
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({type: DeleteUserResponseDto})
    remove(@Param('id') id:string, @Query("email") email:string) {
        return this.userService.hardDelete(id, email);
    }

    



}
