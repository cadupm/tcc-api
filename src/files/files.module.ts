import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { FilesService } from './files.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [],
  providers: [FilesService]
})
export class FilesModule {}
