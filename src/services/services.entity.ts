import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

class Feature {
  @ApiProperty({ description: 'Название характеристики' })
  name: string;

  @ApiProperty({ description: 'Описание характеристики' })
  description: string;
}

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

  @Column('json')
  @ApiProperty({ description: 'Список характеристик услуги', type: [Feature] })
  features: Feature[];
}
