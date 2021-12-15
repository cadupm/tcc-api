import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
