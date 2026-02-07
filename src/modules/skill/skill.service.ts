import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Skill } from 'src/entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Promise } from 'mongoose';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillResponse } from './dto/response-skill.dto';
import { DeleteSkillResponseDto } from './dto/delete-skill.dto';
@Injectable()
export class SkillService {
    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>
    ){}


    async create (userId:string,createSkillDto: CreateSkillDto): Promise<SkillResponse[]> { 
        const skill = new this.skillModel({...createSkillDto, userId: userId})
        await skill.save()
        return await this.skillModel.find({userId: userId}).select("role name").exec()
    }

    async update (id: string, userId:string, updateSkillDto: UpdateSkillDto): Promise<SkillResponse[]> { 
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid skill id")
        }
        const updated = await this.skillModel.findOneAndUpdate({_id: id, userId:userId}, updateSkillDto, {new: true})

        if(!updated){
            throw new NotFoundException("Skill my not exist")
        }

        return await this.skillModel.find({userId: userId}).select("role name").exec()
        
    }
  
    async access (userId: string):Promise<SkillResponse[]> { 
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid skill id")
        }
        return await this.skillModel.find({userId: userId}).select("role name").exec()
    }

    async remove (id: string, userId:string): Promise<DeleteSkillResponseDto> { 
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid skill id")
        }

        const isFound = await this.skillModel.findOne({_id:id, userId:userId}).select("role name").exec();

        if(!isFound){
            throw new NotFoundException("Skill is not found")
        }

        const removed = await this.skillModel.findOneAndDelete({_id: id, userId: userId}).exec()

        if(!removed){
            throw new Error("Something went wrong")
        }

        const remaining = await this.skillModel.find({userId: userId}).select("role name").exec();

        return {
            removed:isFound,
            remaining:remaining
        }
    }

    async removeAll (userId:string) {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }

        const isDeletedAll = await this.skillModel.deleteMany({userId:userId}).exec()

    }




}

