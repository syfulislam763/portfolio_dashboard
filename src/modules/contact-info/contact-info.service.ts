import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContactInfo } from 'src/entities/contact-info.entity';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { Promise } from 'mongoose';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ContactInfoResponse } from './dto/response-contact-info.dto';
@Injectable()
export class ContactInfoService {
    constructor(
        @InjectModel(ContactInfo.name) private contactInfoModel: Model<ContactInfo>
    ){}

    async create (createContactInfoDto: CreateContactInfoDto) : Promise<ContactInfoResponse[]> {
        const contactInfo = new this.contactInfoModel(createContactInfoDto);
        await contactInfo.save()

        return  await this.contactInfoModel.find({userId: createContactInfoDto.userId}).exec()
    }

    async update(id:string, updateContactInfoDto: UpdateContactInfoDto): Promise<ContactInfoResponse[]> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const updatedContactInfo = await this.contactInfoModel.findOneAndUpdate({_id:id, userId:updateContactInfoDto.userId}, updateContactInfoDto, {new:true, runValidators:true})

        if(!updatedContactInfo){
            throw new NotFoundException("There is no contact info")
        }

        return await this.contactInfoModel.find({userId:updateContactInfoDto.userId}).exec()
        
    }

    async get(userId: string) : Promise<ContactInfoResponse[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.contactInfoModel.find({userId: userId}).exec()
    }

    async remove(id:string, userId:string) : Promise<any> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        const removed = this.contactInfoModel.deleteOne({_id:id, userId}).exec();
        
        return removed
    }



}
