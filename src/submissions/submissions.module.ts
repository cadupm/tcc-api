import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, FilesModule, ConfigModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, MentorshipsService, StudentsService, TeachersService, UsersService, FilesService]
})
export class SubmissionsModule {}
