import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, FilesModule, ConfigModule],
  controllers: [TeachersController],
  providers: [TeachersService, UsersService, FilesService]
})
export class TeachersModule {}
