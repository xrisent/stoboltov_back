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
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: `${process.env.POSTGRES_USERNAME}`, 
      password: `${process.env.POSTGRES_PASSWORD}`, 
      database: 'stoboltov', 
      entities: [Type, Product, User], 
      synchronize: true,
    }),
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, 
      },
    }),
    TypesModule,
    ProductsModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}