import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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


    async create (userId:string, createAboutDto: CreateAboutDto): Promise<any> {
        const about = new this.aboutModel({...createAboutDto, userId});
        return await about.save()
    }

    async update (id: string , updateAboutDto: UpdateAboutDto): Promise<any> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }

        const updatedAbout = await this.aboutModel.findOneAndUpdate({userId: id}, updateAboutDto, {new:true})

        if(!updatedAbout){
            throw new NotFoundException("Item is not found")
        }

        return updatedAbout
    }

    async get(id:string) : Promise<any> {
        if(!Types.ObjectId.isValid(id)){
             throw new BadRequestException("Invalid user id")
        }
        const about =  await this.aboutModel.findOne({userId:id}).exec()

        if(!about){
            throw new NotFoundException("There is no about")
        }

        return about;
    }

}
