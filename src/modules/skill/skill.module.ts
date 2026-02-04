import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/entities/skill.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Skill.name, schema: SkillSchema}])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService]
})
export class SkillModule {}
