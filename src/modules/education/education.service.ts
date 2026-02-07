import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Education } from 'src/entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { Promise } from 'mongoose';
import { EducationResponse } from './dto/response-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { DeleteEducationResponseDto } from './dto/delete-education.dto';

@Injectable()
export class EducationService {
    constructor(
        @InjectModel(Education.name) private educationModel: Model<Education>
    ){

    }


    async create(userId: string, createEducationDto: CreateEducationDto): Promise<EducationResponse[]> {
        const education = new this.educationModel({...createEducationDto, userId:userId});
        await education.save()

        return this.educationModel.find({userId: userId}).select("institute location major gpa scale description")
    }
    async update(id: string, userId: string, updateEducationDto: UpdateEducationDto): Promise<EducationResponse[]>{
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const updatedEducation = await this.educationModel.findOneAndUpdate({_id: id, userId:userId},updateEducationDto, {new:true, runValidators:true})

        if(!updatedEducation){
            throw new NotFoundException("Education is not found")
        }

        return await this.educationModel.find({userId: userId}).select("institute location major gpa scale description")
    }
    async access(id: string):Promise<EducationResponse[]>{
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.educationModel.find({userId: id}).select("institute location major gpa scale description")
    }

    async remove(id:string, userId: string): Promise<any> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        const isFound = await this.educationModel.findOne({_id:id, userId:userId}).select("institute location major gpa scale description").exec()
        if(!isFound) {
            throw new NotFoundException('There may no item to be deleted')
        }
        const removed = await this.educationModel.deleteOne({_id:id, userId: userId}).exec();

        if(!removed){
            throw new  Error("Delete is not successfull")
        }

        const remaining = await this.educationModel.find({userId: userId}).select("institute location major gpa scale description")

        return {
            removed: isFound,
            remaining: remaining
        }
    }

    async removeAll (userId:string) {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }

        const isDeletedAll = await this.educationModel.deleteMany({userId:userId}).exec()

    }


}
