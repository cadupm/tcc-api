import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [StudentsController],
  providers: [StudentsService, UsersService, FilesService]
})
export class StudentsModule {}
