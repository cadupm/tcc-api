import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors()

  await app.listen(process.env.API_PORT);
}
bootstrap();
