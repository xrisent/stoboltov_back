import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TypesService } from './types.service';
import { Type } from './types.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'; // Добавьте эти импорты
import { AuthGuard } from '@nestjs/passport';
import { TypeCreateDto } from './type-create.dto';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Types') // Добавляет группу тегов для Swagger
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все типы' }) // Описание метода
  @ApiResponse({ status: 200, description: 'Возвращает все типы', type: [Type] }) // Описание ответа
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тип по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает тип по ID', type: Type })
  findOne(@Param('id') id: number) {
    return this.typesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый тип' })
  @ApiBody({
    description: 'Параметры для создания типа',
    type: TypeCreateDto,
  })
  @ApiResponse({ status: 201, description: 'Тип успешно создан', type: Type })
  create(@Body() type: Partial<Type>) {
    return this.typesService.create(type);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить тип' })
  @ApiResponse({ status: 200, description: 'Тип успешно обновлен', type: Type })
  update(@Param('id') id: number, @Body() type: Partial<Type>) {
    return this.typesService.update(id, type);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тип' })
  @ApiResponse({ status: 200, description: 'Тип успешно удален' })
  delete(@Param('id') id: number) {
    return this.typesService.delete(id);
  }
}
