import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Импортируем декоратор
import { Type } from '../types/types.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор продукта' }) // Декоратор для id
  id: number;

  @Column()
  @ApiProperty({ description: 'Название продукта' }) // Декоратор для name
  name: string;

  @Column('float')
  @ApiProperty({ description: 'Цена за единицу' }) // Декоратор для price_single
  price_single: number;

  @Column('float')
  @ApiProperty({ description: 'Цена за упаковку' }) // Декоратор для price_pack
  price_pack: number;

  @Column('text')
  @ApiProperty({ description: 'Описание продукта' }) // Декоратор для description
  description: string;

  @Column()
  @ApiProperty({ description: 'Количество в упаковке' }) // Декоратор для pack_amount
  pack_amount: string;

  @Column('float')
  @ApiProperty({ description: 'Диаметр продукта' }) // Декоратор для diameter
  diameter: number;

  @Column('float')
  @ApiProperty({ description: 'Длина продукта' }) // Декоратор для length
  length: number;

  @Column()
  @ApiProperty({ description: 'Класс прочности' }) // Декоратор для strength_class
  strength_class: string;

  @Column()
  @ApiProperty({ description: 'Материал продукта' }) // Декоратор для material
  material: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'путь к картинке' })
  image: string;

  @ManyToOne(() => Type, (type) => type.products, { nullable: true, onDelete: 'SET NULL' })
  @ApiProperty({ type: () => Type, description: 'Тип продукта' })
  type: Type;
}
