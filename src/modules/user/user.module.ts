import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user.entity';
import { RefreshToken, RefreshTokenSchema } from 'src/entities/refresh.entity';



@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: RefreshToken.name, schema: RefreshTokenSchema}
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
