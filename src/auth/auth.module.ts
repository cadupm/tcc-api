import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule, UsersModule, PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '7200s'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService], 
  controllers: [AuthController],
  
})
export class AuthModule {}
