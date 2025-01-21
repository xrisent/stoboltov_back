import { ApiProperty } from '@nestjs/swagger';

export class TypeCreateDto {
  @ApiProperty({ description: 'Название типа' })
  name: string;

  @ApiProperty({ description: 'Id родительского типа (необязательное поле)', required: false })
  typeOf: number;
}
