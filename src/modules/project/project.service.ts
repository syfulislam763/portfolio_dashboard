import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Promise } from 'mongoose';
import { ProjectResponse } from './dto/response-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteProjectResponseDto } from './dto/delete-project.dto';

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project> 
    ){}

    private query = "name projectType githubFrontend githubBackend liveUrl video description technologies features"

    async create (userId: string, createProjectDto: CreateProjectDto): Promise<ProjectResponse[]>  {
        const project = new this.projectModel({...createProjectDto, userId:userId});
        await project.save();
        return await this.projectModel.find({userId: userId}).select(this.query).exec()
    }


    async update (id:string, userId: string,  updateProjectDto: UpdateProjectDto) : Promise<ProjectResponse[]>{
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid project id")
        }


        const updated = await this.projectModel.findOneAndUpdate({_id:id, userId:userId}, updateProjectDto, {new:true, runValidators:true}).exec()


        if(!updated){
            throw new NotFoundException("There is no item")
        }


        return await this.projectModel.find({userId: userId}).select(this.query).exec()

    }



    async access (userId:string): Promise<ProjectResponse[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid project id")
        }

        return await this.projectModel.find({userId: userId}).select(this.query).exec()

    }


    async remove (id: string, userId:string): Promise<DeleteProjectResponseDto> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid project id or user id")
        }

        const isFound = await this.projectModel.findOne({_id: id, userId: userId}).select(this.query).exec();

        if(!isFound){
            throw new NotFoundException("There is no project")
        }

        const removed = await this.projectModel.deleteOne({_id: id, userId: userId}).exec()


        if(!removed){
            throw new NotFoundException("No data deleted")
        }

        const remaining = await this.projectModel.find({userId:userId}).select(this.query).exec();


        return {
            removed: isFound,
            remaining,
        }


    }

    async removeAll (userId:string) {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }

        const isDeletedAll = await this.projectModel.deleteMany({userId:userId}).exec()

    }

    









}
