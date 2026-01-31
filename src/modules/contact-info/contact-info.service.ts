import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContactInfo } from 'src/entities/contact-info.entity';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { Promise } from 'mongoose';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ContactInfoResponse } from './dto/response-contact-info.dto';
import { DeleteContactInfoResponseDto } from './dto/delete-contact-info.dto';
@Injectable()
export class ContactInfoService {
    constructor(
        @InjectModel(ContactInfo.name) private contactInfoModel: Model<ContactInfo>
    ){}

    private query = "title contact"

    async create (userId: string, createContactInfoDto: CreateContactInfoDto) : Promise<ContactInfoResponse[]> {
        const contactInfo = new this.contactInfoModel({...createContactInfoDto, userId: userId});
        await contactInfo.save()

        return  await this.contactInfoModel.find({userId: userId}).select(this.query).exec()
    }

    async update(id:string,userId:string, updateContactInfoDto: UpdateContactInfoDto): Promise<ContactInfoResponse[]> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        const updatedContactInfo = await this.contactInfoModel.findOneAndUpdate({_id:id, userId:userId}, updateContactInfoDto, {new:true, runValidators:true})

        if(!updatedContactInfo){
            throw new NotFoundException("There is no contact info")
        }

        return await this.contactInfoModel.find({userId:userId}).select(this.query).exec()
        
    }

    async get(userId: string) : Promise<ContactInfoResponse[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.contactInfoModel.find({userId: userId}).select(this.query).exec()
    }

    async remove(id:string, userId:string) : Promise<DeleteContactInfoResponseDto> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        const isFound = await this.contactInfoModel.findOne({_id:id, userId: userId}).select(this.query).exec();

        if(!isFound){
            throw new NotFoundException("Contact info id is wrong")
        }


        const removed = this.contactInfoModel.deleteOne({_id:id, userId}).exec();

        if(!removed){
            throw new Error("Something went wrong")
        }

        const remaining = await this.contactInfoModel.find({userId: userId}).select(this.query).exec();
        
        return {
            removed: isFound,
            remaining
        }
    }



}
