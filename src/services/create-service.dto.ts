import { ApiProperty } from '@nestjs/swagger';

export class Feature {
  @ApiProperty({ description: 'Название характеристики' })
  name: string;

  @ApiProperty({ description: 'Описание характеристики' })
  description: string;
}

export class CreateServiceDto {
  @ApiProperty({ description: 'Название услуги' })
  name: string;

  @ApiProperty({ description: 'Название страницы услуги' })
  title: string;

  @ApiProperty({ description: 'Описание услуги' })
  description: string;

  @ApiProperty({ description: 'URL изображения услуги' })
  imageUrl: string;

  @ApiProperty({ description: 'Список характеристик услуги', type: [Feature] })
  features: Feature[];
}



