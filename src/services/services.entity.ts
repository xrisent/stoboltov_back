import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор типа' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Название услуги' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Название страницы услуги' })
  title: string;

  @Column()
  @ApiProperty({ description: 'Описание услуги' })
  description: string;

  @Column()
  @ApiProperty({ description: 'URL изображения услуги' })
  imageUrl: string;

  @Column('simple-array')
  @ApiProperty({ description: 'Список характеристик услуги', type: [String] })
  features: string[];
}
