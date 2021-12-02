import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';
import { FilesModule } from 'src/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [PrismaModule, FilesModule, ConfigModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, SubmissionsService, MentorshipsService, StudentsService, TeachersService, UsersService, FilesService]
})
export class ReviewsModule {}
