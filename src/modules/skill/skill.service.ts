import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Skill } from 'src/entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Promise } from 'mongoose';
import { UpdateSkillDto } from './dto/update-skill.dto';
@Injectable()
export class SkillService {
    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>
    ){}


    async create (createSkillDto: CreateSkillDto): Promise<CreateSkillDto[]> { 
        const skill = new this.skillModel(createSkillDto)
        await skill.save()
        return await this.skillModel.find({userId: createSkillDto.userId}).exec()
    }

    async update (id: string, updateSkillDto: UpdateSkillDto): Promise<CreateSkillDto[]> { 
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid skill id")
        }
        const updated = await this.skillModel.findOneAndUpdate({_id: id, userId: updateSkillDto.userId}, updateSkillDto, {new: true})

        if(!updated){
            throw new NotFoundException("Skill my not exist")
        }

        return await this.skillModel.find({userId: updateSkillDto.userId}).exec()
        
    }
  
    async access (userId: string):Promise<CreateSkillDto[]> { 
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid skill id")
        }
        return await this.skillModel.find({userId: userId}).exec()
    }

    async remove (id: string, userId:string) { 
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid skill id")
        }

        const removed = await this.skillModel.findOneAndDelete({_id: id, userId: userId}).exec()

        return removed
    }



}

