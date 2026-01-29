import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async create (createIntroDto: CreateIntroDto): Promise<Intro> {
        const intro = new this.introModel(createIntroDto);
        return intro.save()
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
        );

        if(!updatedIntro){
            throw new NotFoundException("Intro not found")
        }

        return updatedIntro
    }

    async get (id: string): Promise<IntroResponse> { 
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException("Invalid user id")
        }
        const intro = await this.introModel.findOne({userId:id}).exec();
        if(!intro){
            throw new NotFoundException("Intro is not found")
        }

        return intro
    }


}
