import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'; // Импортируем нужные декораторы
import { AuthGuard } from '@nestjs/passport';
import { ProductCreateRequestDto } from './product-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Используем multer для обработки файлов
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('Файл не предоставлен.');
    }

    // Парсим файл
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Читаем первую страницу
    const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(data)

    // Передаём данные в сервис для сохранения в БД
    await this.productsService.importProducts(data);

    return 'Файл успешно обработан и данные загружены в базу.';
  }
}
