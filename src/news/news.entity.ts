import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; 

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор типа' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Название новостей' }) 
  name: string;

  @Column()
  @ApiProperty({description: 'Содержание новостей'})
  content: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({description: 'Дата публикации', type: String, format: 'date-time' })
  date: Date;
}
