import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Promise, Types} from 'mongoose';
import { Post } from 'src/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/response-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostResponseDto } from './dto/delete-post.dto';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private postModel: Model<Post>){}

    private query = "title thumbnail text keywords"
    async create (userId: string, createPostDto:CreatePostDto): Promise<PostResponseDto[]> {
        const post = new this.postModel({...createPostDto, userId: userId});
        await post.save();

        return await this.postModel.find({userId: userId}).select(this.query).exec()
    }


    async update( id: string, userId:string, updatePostDto: UpdatePostDto): Promise<PostResponseDto[]> {
        if(!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)){
            throw new BadRequestException('Invalid post id')
        }


        const updated = await this.postModel.findOneAndUpdate({_id:id, userId:userId}, updatePostDto, {new: true, runValidators: true});

        if(!updated){
            throw new NotFoundException("There is no post in this id")
        }


        return await this.postModel.find({userId: userId}).select(this.query).exec()

    }


    async access (userId: string): Promise<PostResponseDto[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException('Invalid user id')
        }

        return await this.postModel.find({userId: userId}).select(this.query).exec()

    }

    async remove (id: string, userId: string): Promise<DeletePostResponseDto> {
        if(!Types.ObjectId.isValid(userId)|| !Types.ObjectId.isValid(id) ){
            throw new BadRequestException('Invalid user id or post id')
        }

        const isFound = await this.postModel.findOne({_id:id, userId: userId}).select(this.query).exec();

        if(!isFound){
            throw new NotFoundException("No post found")
        }

        const removed = await this.postModel.deleteOne({_id:id, userId: userId}).exec()

        if(!removed){
            throw new NotFoundException("There is no data to be deleted")
        }

        const remaining = await this.postModel.find({userId: userId}).select(this.query).exec();
        
        return {
            removed: isFound,
            remaining
        }


    }

    async removeAll (userId:string) {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException("Invalid user id")
        }

        const isDeletedAll = await this.postModel.deleteMany({userId:userId}).exec()

    }






}
