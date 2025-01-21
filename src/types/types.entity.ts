import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Добавьте этот импорт
import { Product } from '../products/products.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор типа' }) // Декоратор для id
  id: number;

  @Column()
  @ApiProperty({ description: 'Название типа' }) // Декоратор для name
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  @ApiProperty({ type: () => Product, isArray: true, description: 'Список продуктов этого типа' }) // Пример для связи с продуктами
  products: Product[];

  @ManyToOne(() => Type, { nullable: true })
  @JoinColumn({ name: 'typeOf' })
  @ApiProperty({ type: () => Type, nullable: true, description: 'Тип родительский для этого типа' }) // Пример для связи с другим типом
  typeOf: Type;
}
