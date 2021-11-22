import { Module } from '@nestjs/common';
import { MentorshipsService } from './mentorships.service';
import { MentorshipsController } from './mentorships.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [MentorshipsController],
  providers: [MentorshipsService, StudentsService, TeachersService, UsersService]
})
export class MentorshipsModule {}
