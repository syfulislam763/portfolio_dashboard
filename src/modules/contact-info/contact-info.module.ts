import { Module } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactInfo, ContactInfoSchema } from 'src/entities/contact-info.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: ContactInfo.name, schema: ContactInfoSchema}])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService],
  exports: [ContactInfoService]
})
export class ContactInfoModule {}
