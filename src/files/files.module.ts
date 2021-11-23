import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
