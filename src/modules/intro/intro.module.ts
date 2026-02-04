import { Module } from '@nestjs/common';
import { IntroController } from './intro.controller';
import { IntroService } from './intro.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Intro, IntroSchema } from 'src/entities/intro.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Intro.name, schema: IntroSchema}
    ])
  ],
  controllers: [IntroController],
  providers: [IntroService],
  exports: [IntroService]
})
export class IntroModule {}
