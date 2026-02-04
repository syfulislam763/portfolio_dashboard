import { forwardRef, Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Verification, VerificationSchema } from 'src/entities/verification.entity';
import { EmailService } from './email.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name:Verification.name, schema: VerificationSchema}]),
    forwardRef(() => AuthModule)
  ],
  controllers: [VerificationController],
  providers: [VerificationService, EmailService],
  exports: [VerificationService, EmailService]
})
export class VerificationModule {}
