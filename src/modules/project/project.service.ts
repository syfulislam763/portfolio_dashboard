import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Promise } from 'mongoose';
import { ProjectResponse } from './dto/response-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project> 
    ){}


    async create (createProjectDto: CreateProjectDto): Promise<ProjectResponse[]>  {
        const project = new this.projectModel(createProjectDto);
        await project.save();
        return await this.projectModel.find({userId: createProjectDto.userId}).exec()
    }


    async update (id:string, updateProjectDto: UpdateProjectDto) : Promise<ProjectResponse[]>{
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid project id")
        }


        const updated = await this.projectModel.findOneAndUpdate({_id:id, userId:updateProjectDto.userId}, updateProjectDto, {new:true, runValidators:true}).exec()


        if(!updated){
            throw new NotFoundException("There is no item")
        }


        return await this.projectModel.find({userId: updateProjectDto.userId}).exec()


    }



    async access (userId:string): Promise<ProjectResponse[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid project id")
        }

        return await this.projectModel.find({userId: userId}).exec()

    }


    async remove (id: string, userId:string): Promise<any> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid project id or user id")
        }

        const removed = await this.projectModel.deleteOne({_id: id, userId: userId}).exec()


        if(!removed){
            throw new NotFoundException("No data deleted")
        }


        return removed


    }

    









}
