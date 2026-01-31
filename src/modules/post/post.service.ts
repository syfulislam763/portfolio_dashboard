import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Promise, Types} from 'mongoose';
import { Post } from 'src/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/response-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private postModel: Model<Post>){}


    async create (createPostDto:CreatePostDto): Promise<PostResponseDto[]> {
        const post = new this.postModel(createPostDto);
        await post.save();

        return await this.postModel.find({userId: createPostDto.userId}).exec()
    }


    async update( id: string, updatePostDto: UpdatePostDto): Promise<PostResponseDto[]> {
        if(!Types.ObjectId.isValid(id)){
            throw new BadRequestException('Invalid post id')
        }


        const updated = await this.postModel.findOneAndUpdate({_id:id, userId: updatePostDto.userId}, updatePostDto, {new: true, runValidators: true});

        if(!updated){
            throw new NotFoundException("There is no post in this id")
        }


        return await this.postModel.find({userId: updatePostDto.userId}).exec()

    }


    async access (userId: string): Promise<PostResponseDto[]> {
        if(!Types.ObjectId.isValid(userId)){
            throw new BadRequestException('Invalid user id')
        }

        return await this.postModel.find({userId: userId}).exec()

    }

    async remove (id: string, userId: string): Promise<any> {
        if(!Types.ObjectId.isValid(userId)|| !Types.ObjectId.isValid(id) ){
            throw new BadRequestException('Invalid user id or post id')
        }


        const removed = await this.postModel.deleteOne({_id:id, userId: userId}).exec()

        if(!removed){
            throw new NotFoundException("There is no data to be deleted")
        }

        return removed;


    }






}
