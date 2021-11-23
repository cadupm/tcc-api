import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module'
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { MentorshipsModule } from './mentorships/mentorships.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './errors/all-exception.filter';

@Module({
  imports: [PrismaModule, UsersModule, StudentsModule, TeachersModule, MentorshipsModule],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }],
})
export class AppModule {}
