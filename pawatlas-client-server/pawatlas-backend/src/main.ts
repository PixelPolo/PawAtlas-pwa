import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;
const origin = process.env.FRONTEND_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // 'http://localhost:4200', for development ONLY
    origin: [origin, 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();

/*
CREATE THE DATABASE SCHEMA 
npx typeorm schema:sync -d dist/common/database/database.provider.js
*/
