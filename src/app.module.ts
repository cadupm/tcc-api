import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module'
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [PrismaModule, UsersModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
