import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';
import { AboutResponse } from 'src/modules/about/dto/response-about.dto';
import { IntroResponse } from 'src/modules/intro/dto/intro-response.dto';
import { ContactInfoResponse } from 'src/modules/contact-info/dto/response-contact-info.dto';
import { EducationResponse } from 'src/modules/education/dto/response-education.dto';
import { ExperienceResponse } from 'src/modules/experience/dto/response-experience.dto';
import { PostResponseDto } from 'src/modules/post/dto/response-post.dto';
import { ProjectResponse } from 'src/modules/project/dto/response-project.dto';
import { QuestionResponse } from 'src/modules/question/dto/response-question.dto';
import { SkillResponse } from 'src/modules/skill/dto/response-skill.dto';
import { Project } from 'src/entities/project.entity';

export class UserInformationDto {
    @ApiProperty({ 
        type: AboutResponse,
        description: 'About information - empty object if no data',
        example: {
            _id: '697dd5964363326cb05dbeb6',
            projectCompleted: 10,
            yearOfExperience: 3,
            jobCompleted: 4,
            introVideo: 'https://www.youtube.com/myvideo.mp4'
        }
    })
    about: AboutResponse | {};

    @ApiProperty({ 
        type: IntroResponse,
        description: 'Intro information - empty object if no data',
        example: {
            _id: '697dcbc7b47bac91fea56878',
            image: 'https://www.imgdb.com/example.png',
            name: 'Syful',
            title: 'Software Engineer',
            description: 'description',
            file: 'https://www.google.com/resume.pdf'
        }
    })
    intro: IntroResponse | {};

    @ApiProperty({ 
        type: [ContactInfoResponse],
        description: 'Contact information - empty array if no data'
    })
    contactInfos: ContactInfoResponse[];

    @ApiProperty({ 
        type: [EducationResponse],
        description: 'Education history - empty array if no data'
    })
    educations: EducationResponse[];

    @ApiProperty({ 
        type: [ExperienceResponse],
        description: 'Work experience - empty array if no data'
    })
    experiences: ExperienceResponse[];

    @ApiProperty({ 
        type: [PostResponseDto],
        description: 'Posts - empty array if no data'
    })
    posts: PostResponseDto[];

    @ApiProperty({ 
        type: [ProjectResponse],
        description: 'Projects - empty array if no data'
    })
    projects: ProjectResponse[];

    @ApiProperty({ 
        type: [QuestionResponse],
        description: 'Q&A - empty array if no data'
    })
    questions: QuestionResponse[];

    @ApiProperty({ 
        type: [SkillResponse],
        description: 'Skills - empty array if no data'
    })
    skills: SkillResponse[];
}

export class UserDetailResponseDto {
    @ApiProperty({ example: '6977d4a8095e952625f1a83f' })
    _id: string;

    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ enum: UserRole, example: UserRole.USER })
    role: UserRole;

    @ApiProperty({ type: UserInformationDto })
    information: UserInformationDto;
}