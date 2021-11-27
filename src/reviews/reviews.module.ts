import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, SubmissionsService, MentorshipsService, StudentsService, TeachersService, UsersService]
})
export class ReviewsModule {}
