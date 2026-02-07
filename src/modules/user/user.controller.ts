import { Controller, Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto} from './dto/create-user.dto';
import { DeleteUserResponseDto, UpdateSuccessResponseDto, UpdateUserDto } from './dto/update-user.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { Public } from '../auth/decroators/public.decroator';
import { UserListItemDto, UserListResponseDto } from './dto/all-user-response.dto';
import { UserDetailResponseDto } from './dto/user-detail-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
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
