import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200', // URL of your Angular app
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  dotenv.config({ path: 'src/example.env' });
}
bootstrap();
