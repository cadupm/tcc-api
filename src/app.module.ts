import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module'
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { MentorshipsModule } from './mentorships/mentorships.module';

@Module({
  imports: [PrismaModule, UsersModule, StudentsModule, TeachersModule, MentorshipsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
