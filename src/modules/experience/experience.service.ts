import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Experience } from 'src/entities/experience.entity';
import { Promise } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceResponse } from './dto/response-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { DeleteExperienceResponseDto } from './dto/delete-experience.dto';
@Injectable()
export class ExperienceService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>
    ){}


    async create (userId: string, createExperienceDto: CreateExperienceDto): Promise<ExperienceResponse[]> {


        const experience = new this.experienceModel({...createExperienceDto, userId});
        await experience.save();

        const temp = await this.experienceModel.find({userId: userId}).select("designation companyName location startDate endDate description").exec()

        return temp;
    }

    async update (id: string, userId:string, updateExperienceDto: UpdateExperienceDto):Promise<ExperienceResponse[]> {

        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid experience id")
        }

        const updated = await this.experienceModel.findOneAndUpdate({_id: id, userId:userId}, updateExperienceDto, {new:true, runValidators:true})

        if(!updated){
            throw new NotFoundException("Item may not exist")
        }

        return await this.experienceModel.find({userId: userId}).select("designation companyName location startDate endDate description").exec()


    }

    async access (userId: string) : Promise<ExperienceResponse[]>{
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid experience id")
        }
        return await this.experienceModel.find({userId: userId}).select("designation companyName location startDate endDate description").exec()
    }

    async remove (id: string, userId: string): Promise<DeleteExperienceResponseDto> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid experience id")
        }
        const isFound = await this.experienceModel.findOne({_id:id, userId:userId}).select("designation companyName location startDate endDate description").exec()

        if(!isFound){
            throw new NotFoundException("There may not have experience")
        }


        const removed = await this.experienceModel.deleteOne({_id: id, userId}).exec()

        if(!removed){
            throw new Error("Something went wrong")
        }

        const remaining = await this.experienceModel.find({userId:userId}).select("designation companyName location startDate endDate description").exec()

        return {
            removed: isFound,
            remaining: remaining
        }
    }

}
