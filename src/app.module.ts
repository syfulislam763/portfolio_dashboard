import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { IntroModule } from './modules/intro/intro.module';
import { AboutModule } from './modules/about/about.module';
import { EducationModule } from './modules/education/education.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { SkillModule } from './modules/skill/skill.module';
import { ProjectModule } from './modules/project/project.module';
import { PostModule } from './modules/post/post.module';
import { ContactInfoModule } from './modules/contact-info/contact-info.module';
import { SendMailModule } from './modules/send-mail/send-mail.module';
import { QuestionModule } from './modules/question/question.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    UserModule,
    IntroModule,
    AboutModule,
    EducationModule,
    ExperienceModule,
    SkillModule,
    ProjectModule,
    PostModule,
    ContactInfoModule,
    SendMailModule,
    QuestionModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
