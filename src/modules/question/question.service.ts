import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from 'src/entities/question.entity';
import { Promise } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAboutDto } from '../about/dto/update-about.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>
    ){}


    async create (createQuestionDto: CreateQuestionDto): Promise<CreateQuestionDto[]> {
        const question = new this.questionModel(createQuestionDto);
        await question.save();
        return await this.questionModel.find({userId: createQuestionDto.userId}).exec()
    }

    async update (id:string, updateQuestionDto: UpdateAboutDto): Promise<CreateQuestionDto[]> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid item id")
        }

        const updated = await  this.questionModel.findOneAndUpdate({_id: id, userId:updateQuestionDto.userId}, updateQuestionDto, {new:true, runValidators:true})

        if(!updated){
            throw new NotFoundException("There is no item");
        }

        return await this.questionModel.find({userId: updateQuestionDto.userId}).exec()

    }


    async access (userId: string): Promise<CreateQuestionDto[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }
        return await this.questionModel.find({userId: userId}).exec()
    }

    async remove (id:string, userId:string): Promise<any> {
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id or item id")
        }

        const removed = await this.questionModel.deleteOne({_id: id, userId:userId}).exec()

        if(!removed){
            throw new NotFoundException("There is no item");
        }

        return removed

    }






}
