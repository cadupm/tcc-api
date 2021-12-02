import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsService } from 'src/students/students.service';
import { UsersService } from 'src/users/users.service';
import { FilesModule } from 'src/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [PrismaModule, FilesModule, ConfigModule],
  controllers: [MetricsController],
  providers: [MetricsService, ReviewsService, SubmissionsService, MentorshipsService, TeachersService, StudentsService, UsersService, FilesService]
})
export class MetricsModule {}
