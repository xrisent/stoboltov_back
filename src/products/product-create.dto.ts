import { ApiProperty } from '@nestjs/swagger';
import { Type } from '../types/types.entity'; // Импортируем Type для связи

export class ProductCreateDto {
    @ApiProperty({ description: 'Название продукта' })
    name: string;
  
    @ApiProperty({ description: 'Цена за единицу' })
    price_single: number;
  
    @ApiProperty({ description: 'Цена за упаковку' })
    price_pack: number;
  
    @ApiProperty({ description: 'Описание продукта' })
    description: string;
  
    @ApiProperty({ description: 'Количество в упаковке' })
    pack_amount: string;
  
    @ApiProperty({ description: 'Диаметр продукта' })
    diameter: number;
  
    @ApiProperty({ description: 'Длина продукта' })
    length: number;
  
    @ApiProperty({ description: 'Класс прочности' })
    strength_class: string;
  
    @ApiProperty({ description: 'Материал продукта' })
    material: string;
  }
  
  export class ProductCreateRequestDto {
    @ApiProperty({ description: 'Информация о продукте' })
    product: ProductCreateDto;
  
    @ApiProperty({ description: 'ID типа продукта' })
    typeId: number;
  }