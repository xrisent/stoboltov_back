import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Type } from '../types/types.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price_single: number;

  @Column('float')
  price_pack: number;

  @Column('text')
  description: string;

  @Column()
  pack_amount: string;

  @Column('float')
  diameter: number;

  @Column('float')
  length: number;

  @Column()
  strength_class: string;

  @Column()
  material: string;

  @ManyToOne(() => Type, (type) => type.id)
  type: Type;
}
