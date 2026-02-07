import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { About } from 'src/entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { Promise } from 'mongoose';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutResponse } from './dto/response-about.dto';
@Injectable()
export class AboutService {
    constructor(
        @InjectModel(About.name) private aboutModel: Model<About>
    ){}


    async create (userId:string, createAboutDto: CreateAboutDto): Promise<AboutResponse> {
        const isExist = await this.aboutModel.findOne({userId: userId}).exec();
        if(isExist){
            throw new ConflictException("About has been created already")
        }
        const about = new this.aboutModel({...createAboutDto, userId});
        await about.save()
        const isFound = await this.aboutModel.findOne({userId:userId}).select("projectCompleted yearOfExperience jobCompleted introVideo").exec()

        if(!isFound){
            throw new NotFoundException("About may not created yet")
        }

        return isFound;
    }

    async update (id: string , updateAboutDto: UpdateAboutDto): Promise<AboutResponse> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }

        const updatedAbout = await this.aboutModel.findOneAndUpdate({userId: id}, updateAboutDto, {new:true}).select("projectCompleted yearOfExperience jobCompleted introVideo")

        if(!updatedAbout){
            throw new NotFoundException("About may not created yet")
        }

        return updatedAbout
    }

    async get(id:string) : Promise<AboutResponse> {
        if(!Types.ObjectId.isValid(id)){
             throw new BadRequestException("Invalid user id")
        }
        const about =  await this.aboutModel.findOne({userId:id}).select("projectCompleted yearOfExperience jobCompleted introVideo").exec()

        if(!about){
            // throw new NotFoundException("About may not created yet")
            return new AboutResponse({})
        }

        return about;
    }

    async remove(userId:string) {
        if(!Types.ObjectId.isValid(userId)){
             throw new BadRequestException("Invalid user id")
        }

        const isDeleted = await this.aboutModel.deleteOne({userId:userId}).exec();

    }

}
