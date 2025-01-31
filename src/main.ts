import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Обычный HTTP
  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/selfsigned.crt'),
  };
  const httpsApp = await NestFactory.create(AppModule, { httpsOptions }); // HTTPS

  app.enableCors({ origin: '*', credentials: true });
  httpsApp.enableCors({ origin: '*', credentials: true });

  const config = new DocumentBuilder().setTitle('API').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002, '0.0.0.0'); // HTTP
  await httpsApp.listen(3443, '0.0.0.0'); // HTTPS
}
bootstrap();
