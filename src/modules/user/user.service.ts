import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types, Promise } from 'mongoose';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { RefreshToken } from 'src/entities/refresh.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh.dto';
import { AboutService } from '../about/about.service';
import { ContactInfoService } from '../contact-info/contact-info.service';
import { EducationService } from '../education/education.service';
import { ExperienceService } from '../experience/experience.service';
import { IntroService } from '../intro/intro.service';
import { PostService } from '../post/post.service';
import { ProjectService } from '../project/project.service';
import { QuestionService } from '../question/question.service';
import { Skill } from 'src/entities/skill.entity';
import { SkillService } from '../skill/skill.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
        private aboutService: AboutService,
        private contactInfoService: ContactInfoService,
        private educationService: EducationService,
        private experienceService: ExperienceService,
        private introService: IntroService,
        private postService: PostService,
        private projectService: ProjectService,
        private questionService: QuestionService,
        private skillService: SkillService
    ){}

    async create(createUserDto: CreateUserDto) : Promise<User> {
        const user = new this.userModel(createUserDto);
        return user.save()
    }

    async createRefreshToken(createRefreshTokenDto: CreateRefreshTokenDto): Promise<RefreshToken> {
        const refresh = new this.refreshTokenModel(createRefreshTokenDto);
        return refresh.save()
    }

    async updateRefreshToken(email: string, refreshTokenDto: UpdateRefreshTokenDto): Promise<RefreshToken> {
        const refresh = await this.refreshTokenModel.findOne({email: email}).select('-id').exec()
        if(!refresh)
            throw new NotFoundException("No refresh token found!")

        await this.refreshTokenModel.updateOne({email: email}, {refreshToken: refreshTokenDto.refreshToken}).exec()

        const updated = await this.refreshTokenModel.findOne({email:email}).select("-id").exec()

        if(!updated)
            throw new NotFoundException("No refresh token found!")

        return updated
    }

    async findAll(): Promise<any> {
        return this.userModel.find({}).select("-password")
                                     .populate('abouts')
                                     .populate('contactinfos')
                                     .populate('educations')
                                     .populate('experiences')
                                     .populate('intros')
                                     .populate('posts')
                                     .populate('projects')
                                     .populate('questions')
                                     .populate('skills')
                                     .exec()
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email: email}).exec();
        if(!user) throw new NotFoundException("User not found!")
        return user;
    }


    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: id, isDeleted: false }).select('-password').exec();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
        }
        const user = await this.userModel
        .findOneAndUpdate({ _id: id, isDeleted: false }, updateUserDto, { new: true })
        .select('-password')
        .exec();

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async softDelete(id: string): Promise<User> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.isDeleted = true;

        return user.save()
    }

}
