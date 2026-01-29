import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Education } from 'src/entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { Promise } from 'mongoose';
import { EducationResponse } from './dto/response-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
    constructor(
        @InjectModel(Education.name) private educationModel: Model<Education>
    ){

    }


    async create(createEducationDto: CreateEducationDto): Promise<EducationResponse[]> {
        const education = new this.educationModel(createEducationDto);
        await education.save()

        return this.educationModel.find({userId: createEducationDto.userId})
    }
    async update(id: string, updateEducationDto: UpdateEducationDto): Promise<EducationResponse[]>{
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const updatedEducation = await this.educationModel.findOneAndUpdate({_id: id, userId:updateEducationDto.userId},updateEducationDto, {new:true, runValidators:true})

        if(!updatedEducation){
            throw new NotFoundException("Education is not found")
        }

        return await this.educationModel.find({userId: updateEducationDto.userId})
    }
    async access(id: string):Promise<EducationResponse[]>{
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.educationModel.find({userId: id})
    }

    async remove(id:string, userId: string): Promise<any> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        const removed = this.educationModel.deleteOne({_id:id, userId: userId}).exec()
        return removed
    }


}
