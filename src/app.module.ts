import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesModule } from './types/types.module';
import { Type } from './types/types.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/products.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';
import { NewsModule } from './news/news.module';
import * as dotenv from 'dotenv';
import { News } from './news/news.entity';
import { ServicesModule } from './services/services.module';
import { Services } from './services/services.entity';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Type, Product, User, News, Services],
      synchronize: true,
    }),
    MulterModule.register({
      limits: {
        fileSize: 50 * 1024 * 1024, // 10 MB
      },
    }),
    TypesModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    MailModule,
    NewsModule,
    ServicesModule
  ],
})
export class AppModule {}
