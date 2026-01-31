import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from 'src/entities/question.entity';
import { Promise } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAboutDto } from '../about/dto/update-about.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionResponse } from './dto/response-question.dto';
import { DeleteQuestionResponseDto } from './dto/delete-question.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>
    ){}

    private query = "question answer"


    async create (userId:string, createQuestionDto: CreateQuestionDto): Promise<QuestionResponse[]> {
        const question = new this.questionModel({...createQuestionDto, userId: userId});
        await question.save();
        return await this.questionModel.find({userId: userId}).select(this.query).exec()
    }

    async update (id:string, userId: string, updateQuestionDto: UpdateQuestionDto): Promise<QuestionResponse[]> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid item id")
        }

        const updated = await  this.questionModel.findOneAndUpdate({_id: id, userId:userId}, updateQuestionDto, {new:true, runValidators:true})

        if(!updated){
            throw new NotFoundException("There is no item");
        }

        return await this.questionModel.find({userId: userId}).select(this.query).exec()

    }


    async access (userId: string): Promise<QuestionResponse[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.questionModel.find({userId: userId}).select(this.query).exec()
    }

    async remove (id:string, userId:string): Promise<DeleteQuestionResponseDto> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id or item id")
        }

        const isFound = await this.questionModel.findOne({_id: id, userId: userId}).select(this.query).exec()

        if(!isFound){
            throw new NotFoundException("There is no question is found")
        }

        const removed = await this.questionModel.deleteOne({_id: id, userId:userId}).exec()

        if(!removed){
            throw new NotFoundException("There is no item");
        }

        const remaining = await this.questionModel.find({userId:userId}).select(this.query).exec();

        return {
            removed: isFound,
            remaining
        }

    }






}
