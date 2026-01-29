import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from 'src/entities/about.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: About.name, schema: AboutSchema
    }])
  ],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
