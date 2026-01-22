import { Module } from '@nestjs/common';
import { IntroController } from './intro.controller';
import { IntroService } from './intro.service';

@Module({
  controllers: [IntroController],
  providers: [IntroService]
})
export class IntroModule {}
