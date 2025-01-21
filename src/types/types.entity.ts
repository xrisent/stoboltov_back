import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];

  @ManyToOne(() => Type, { nullable: true })
  @JoinColumn({ name: 'typeOf' })
  typeOf: Type;
}