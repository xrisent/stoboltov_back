import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'; // Импортируем нужные декораторы
import { AuthGuard } from '@nestjs/passport';
import { ProductCreateRequestDto } from './product-create.dto';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Products') // Тег для Swagger, чтобы объединить все эндпоинты с продуктами
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все продукты' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Возвращает список всех продуктов', type: [Product] }) // Описание ответа
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' }) // Описание операции
  @ApiBody({
    description: 'Параметры для создания нового продукта',
    type: ProductCreateRequestDto, // Указываем тип для тела запроса
  })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан', type: Product }) // Описание ответа
  create(@Body() body: { product: Partial<Product>; typeId: number }) {
    const { product, typeId } = body;
    return this.productsService.create(product, typeId);
  }
}
