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

  async importProducts(data: any[]): Promise<void> {
    for (const row of data) {
      // Проверяем, существует ли тип продукта
      let productType = await this.typeRepository.findOne({ where: { name: row.type } });
      if (!productType) {
        productType = this.typeRepository.create({ name: row.type });
        await this.typeRepository.save(productType);
      }

      // Создаём продукт
      const product = this.productRepository.create({
        name: row.name,
        price_single: row.price_single,
        price_pack: row.price_pack,
        description: row.description,
        pack_amount: row.pack_amount,
        diameter: row.diameter,
        length: row.length,
        strength_class: row.strength_class,
        material: row.material,
        type: productType,
      });

      await this.productRepository.save(product);
    }
  }
}
