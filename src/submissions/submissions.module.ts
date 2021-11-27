import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, MentorshipsService, StudentsService, TeachersService, UsersService]
})
export class SubmissionsModule {}
