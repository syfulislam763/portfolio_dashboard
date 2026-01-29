import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Experience } from 'src/entities/experience.entity';
import { Promise } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceResponse } from './dto/response-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
@Injectable()
export class ExperienceService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>
    ){}


    async create (createExperienceDto: CreateExperienceDto): Promise<ExperienceResponse[]> {
        const experience = new this.experienceModel(createExperienceDto);
        await experience.save();

        return await this.experienceModel.find({userId: createExperienceDto.userId}).exec()
    }

    async update (id: string, updateExperienceDto: UpdateExperienceDto):Promise<ExperienceResponse[]> {

        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid experience id")
        }

        const updated = await this.experienceModel.findOneAndUpdate({_id: id, userId: updateExperienceDto.userId}, updateExperienceDto, {new:true, runValidators:true})

        if(!updated){
            throw new NotFoundException("Item may not exist")
        }

        return await this.experienceModel.find({userId: updateExperienceDto.userId}).exec()


    }

    async access (userId: string) : Promise<ExperienceResponse[]>{
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid experience id")
        }
        return await this.experienceModel.find({userId: userId}).exec()
    }

    async remove (id: string, userId: string): Promise<any> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid experience id")
        }
        const removed = await this.experienceModel.deleteOne({_id: id, userId}).exec()

        return removed
    }

}
