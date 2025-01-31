import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/selfsigned.crt'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Stoboltov Documentation')
    .setDescription('Swagger для Stoboltov')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002, '0.0.0.0');
}
bootstrap();
