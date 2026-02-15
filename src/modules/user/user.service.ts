import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types, Promise as PM } from 'mongoose';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
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
import { UserListResponseDto } from './dto/all-user-response.dto';
import { APIKey } from 'src/entities/apiKey.entity';
import * as crypto from 'crypto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
        @InjectModel(APIKey.name) private apiKeyModel: Model<APIKey>,
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
        const isExist = await this.userModel.findOne({email: createUserDto.email}).lean().exec();
        if(isExist){
            throw new ConflictException("Email already is taken for another user")
        }
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

    async findAll(page:number, limit: number): Promise<any> {
        const skip = (page-1)*limit;
        const [users, total] = await Promise.all([
            this.userModel.find({}).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
            this.userModel.countDocuments({})
        ])

        const usersWithDetails = await Promise.all(
            users.map(async (user) => {
                const userId = user._id.toString();
                
                const [intro] = await Promise.all([
                    this.introService.get(userId)
                ]);

                return {
                    ...user,
                    name: intro.name,
                    title: intro.title,
                    image: intro.image,
                };
            })
        );

        return {
            data: usersWithDetails,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email: email}).exec();
        if(!user) throw new NotFoundException("User not found!")
        return user;
    }


    async findOne(id: string): Promise<any> {


        const [user, about, intro, contactInfo, education, experience, post, project, question, skill] = await Promise.all([
            this.userModel.findOne({ _id: id }).select('_id email role isDeleted createdAt').exec(),
            this.aboutService.get(id),
            this.introService.get(id),
            this.contactInfoService.get(id),
            this.educationService.access(id),
            this.experienceService.access(id),
            this.postService.access(id),
            this.projectService.access(id),
            this.questionService.access(id),
            this.skillService.access(id)
        ])

        if(!user){
            throw new NotFoundException("No user is found")
        }

        return {
            _id: user._id,
            email: user.email,
            role: user.role,
            information: {
                about,
                intro,
                contactInfo,
                education,
                experience,
                post,
                project,
                question,
                skill
            }
        };
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
        const user = await this.userModel
        .findOneAndUpdate({ _id: id }, {isDeleted: updateUserDto.isDeleted,role:updateUserDto.role}, { new: true })
        .select('-password')
        .exec();

        if (!user) throw new NotFoundException('User not found');

        return {role: user.role, isDeleted: user.isDeleted};
    }

    async softDelete(id: string): Promise<any> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        

    }



    async hardDelete(id: string, email: string): Promise<{ message: string }> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user ID');
        }


        try {
            const [
                userResult,
                aboutResult,
                introResult,
                contactInfoResult,
                educationResult,
                experienceResult,
                postResult,
                projectResult,
                questionResult,
                skillResult,
                tokenResult,
            ] = await Promise.all([
                this.userModel.deleteOne({ _id: id }).exec(),
                this.aboutService.remove(id),
                this.introService.remove(id),
                this.contactInfoService.removeAll(id),
                this.educationService.removeAll(id),
                this.experienceService.removeAll(id),
                this.postService.removeAll(id),
                this.projectService.removeAll(id),
                this.questionService.removeAll(id),
                this.skillService.removeAll(id),
                this.refreshTokenModel.deleteOne({email: email}),
                this.apiKeyModel.deleteOne({email: email})
            ]);

            if (userResult.deletedCount === 0) {
                throw new NotFoundException('User not found');
            }

            return { message: 'User and all related data deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete user data');
        }
    }


    async generateApiKey(email: string, userId: string): Promise<{ apiKey: string | null }> {
        const obj = await this.apiKeyModel.findById(userId);
        const apiKey = `pk_${crypto.randomBytes(32).toString('hex')}`
        if (!obj) {
            const newApiKey = new this.apiKeyModel({apiKey, email, userId});
            await newApiKey.save();
            return {apiKey}
        }

        if(!(obj?.apiKey)){
            obj.apiKey = apiKey;
            await obj.save();
            return {apiKey}
        }

        return {apiKey: obj.apiKey}
    }

    async revokeApiKey(userId: string): Promise<{ message: string }> {
        const apiKey = await this.apiKeyModel.findById(userId);

        if (!apiKey) {
            throw new NotFoundException('ApiKey is not found');
        }

        apiKey.apiKey = null;

        await apiKey.save();

        return { message: 'API key revoked successfully' };
    }






}
