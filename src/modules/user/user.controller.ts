import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { Public } from '../auth/decroators/public.decroator';

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
    @Public()
    @Get("/all")
    // @Roles(UserRole.ADMIN)
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    
    @Patch(':id')
    @Roles(UserRole.ADMIN)
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
    remove(@Param('id') id:string) {
        console.log("ID: ", id)
        return this.userService.softDelete(id);
    }

    



}
