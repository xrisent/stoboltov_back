import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // HTTP-сервер
  const httpsOptions = {
    key: fs.readFileSync('ssl/selfsigned.key'),
    cert: fs.readFileSync('ssl/selfsigned.crt'),
  };
  const httpsApp = await NestFactory.create(AppModule, { httpsOptions }); // HTTPS-сервер

  app.enableCors({ origin: '*', credentials: true });
  httpsApp.enableCors({ origin: '*', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Stoboltov API')
    .setDescription('Документация API Stoboltov')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api', httpsApp, document);

  await app.listen(3002, '0.0.0.0'); // HTTP
  await httpsApp.listen(3443, '0.0.0.0'); // HTTPS
}

bootstrap();
