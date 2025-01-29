import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'Breaking News', description: 'Название новостей' })
  name: string;

  @ApiProperty({ example: 'This is the content of the news.', description: 'Содержание новостей' })
  content: string;

  @ApiProperty({
    example: '2025-01-27T14:00:00.000Z',
    description: 'Дата публикации в формате ISO 8601',
  })
  date: Date;
}

export class UpdateNewsDto {
  @ApiProperty({ example: 'Updated News', description: 'Название новостей', required: false })
  name?: string;

  @ApiProperty({ example: 'Updated content of the news.', description: 'Содержание новостей', required: false })
  content?: string;

  @ApiProperty({
    example: '2025-02-01T10:00:00.000Z',
    description: 'Дата публикации в формате ISO 8601',
    required: false,
  })
  date?: Date;
}
