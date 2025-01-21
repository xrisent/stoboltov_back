import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { Type } from '../types/types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Type])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
