import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {  }

    @Post()
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
    createRefreshToken(@Body() createRefreshToken: CreateRefreshTokenDto) {
        return this.userService.createRefreshToken(createRefreshToken)
    }
    @Get()
    findAll() {
        return this.userService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }
    @Patch('refresh-token/:email')
    updateRefreshToken(@Param('email') email: string, @Body() updateRefreshToken: UpdateRefreshTokenDto){
        return this.userService.updateRefreshToken(email, updateRefreshToken)
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        console.log("ID: ", id)
        return this.userService.softDelete(id);
    }

    



}
