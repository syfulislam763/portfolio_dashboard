import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from 'src/entities/user.entity';
import { RefreshToken, RefreshTokenSchema } from 'src/entities/refresh.entity';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { 
              expiresIn: configService.get('JWT_EXPIRATION') || '15m' 
          },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: RefreshToken.name, schema:RefreshTokenSchema}
    ]),
    ConfigModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
