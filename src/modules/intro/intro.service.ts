import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Intro } from 'src/entities/intro.entity';
import { CreateIntroDto } from './dto/create-intro.dto';
import { UpdateIntroDto } from './dto/update-intro.dto';
import { IntroResponse } from './dto/intro-response.dto';
@Injectable()
export class IntroService {
    constructor(
        @InjectModel(Intro.name) private introModel: Model<Intro>
    ) {}

    async create (userId:string, createIntroDto: CreateIntroDto): Promise<IntroResponse> {
        const exist = await this.introModel.findOne({userId: userId}).exec()
        if(exist){
            throw new ConflictException("Intro has been created already")
        }
        const intro = new this.introModel({...createIntroDto, userId:userId});
        await intro.save()
        const isFound = await this.introModel.findOne({userId: userId}).select("image name title description file").exec()
        if(!isFound){
            throw new NotFoundException("Intro may not created yet")
        }
        return isFound;
    }

    async update (id:string, updateIntroDto: UpdateIntroDto): Promise<IntroResponse> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const updatedIntro= await this.introModel.findOneAndUpdate(
            {userId:id},
            updateIntroDto,
            {
                new: true,
                runValidators: true
            }
        ).select("image name title description file");

        if(!updatedIntro){
            throw new NotFoundException("Intro not found")
        }

        return updatedIntro
    }

    async get (id: string): Promise<IntroResponse> { 
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const intro = await this.introModel.findOne({userId:id}).select("image name title description file").exec();
        if(!intro){
            //throw new NotFoundException("Intro is not found")
            return new IntroResponse({})
        }

        return intro
    }


    async remove(userId:string) {
        if(!Types.ObjectId.isValid(userId)){
                throw new BadRequestException("Invalid user id")
        }

        const isDeleted = await this.introModel.deleteOne({userId:userId}).exec();

    }


}
