import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Type } from '../types/types.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async findAll() {
    return this.productRepository.find({ relations: ['type', 'type.typeOf'] });
  }

  async create(productData: Partial<Product>, typeId: number) {
    console.log(productData)
    const type = await this.typeRepository.findOne({ where: { id: typeId } });
    if (!type) {
      throw new Error('Type not found');
    }

    const product = this.productRepository.create({ ...productData, type });
    return this.productRepository.save(product);
  }
}
