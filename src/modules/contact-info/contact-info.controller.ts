import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { Promise } from 'mongoose';
import { ContactInfoResponse } from './dto/response-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { Roles } from '../auth/guards/roles.guards';
import { UserRole } from 'src/entities/user.entity';
import { GetUser } from '../auth/decroators/get-user.decroator';

@ApiTags('Contact Info')
@ApiBearerAuth()
@Controller('contact-info')
export class ContactInfoController {

    constructor(private readonly contactInfoService: ContactInfoService){

    }

    @Post("/create")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        status:201,
        type: [ContactInfoResponse]
    })
    @ApiBody({type: CreateContactInfoDto})
    async create (@Body() createContactInfoDto: CreateContactInfoDto): Promise<ContactInfoResponse[]> {
        return this.contactInfoService.create(createContactInfoDto)
    }

    @Patch("/update/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        type: [ContactInfoResponse]
    })
    @ApiBody({type: UpdateContactInfoDto})
    async update(@Param('id') id: string, @Body() updateContactInfoDto: UpdateContactInfoDto) : Promise<ContactInfoResponse[]> {
        return this.contactInfoService.update(id, updateContactInfoDto);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiResponse({
        type: [ContactInfoResponse]
    })
    async get_all(@GetUser('_id') userId: string): Promise<ContactInfoResponse[]> {
        return this.contactInfoService.get(userId)
    }

    @Delete("/:id")
    @Roles(UserRole.ADMIN, UserRole.USER)
    async remove(@Param('id') id:string, @GetUser('_id') userId:string){
        return this.contactInfoService.remove(id, userId)
    }


}
