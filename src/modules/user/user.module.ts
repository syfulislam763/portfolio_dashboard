import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user.entity';
import { RefreshToken, RefreshTokenSchema } from 'src/entities/refresh.entity';
import { AboutModule } from '../about/about.module';
import { ContactInfoModule } from '../contact-info/contact-info.module';
import { EducationModule } from '../education/education.module';
import { ExperienceModule } from '../experience/experience.module';
import { IntroModule } from '../intro/intro.module';
import { PostModule } from '../post/post.module';
import { ProjectModule } from '../project/project.module';
import { QuestionModule } from '../question/question.module';
import { SkillModule } from '../skill/skill.module';
import { APIKey, APIKeySchema } from 'src/entities/apiKey.entity';



@Module({
  imports: [MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: RefreshToken.name, schema: RefreshTokenSchema},
      {name: APIKey.name, schema: APIKeySchema},
    ]),

    AboutModule,
    ContactInfoModule,
    EducationModule,
    ExperienceModule,
    IntroModule,
    PostModule,
    ProjectModule,
    QuestionModule,
    SkillModule,
    

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
