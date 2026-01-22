import { Module } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';

@Module({
  controllers: [ContactInfoController],
  providers: [ContactInfoService]
})
export class ContactInfoModule {}
