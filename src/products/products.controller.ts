
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductCreateRequestDto } from './product-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все продукты' })
  @ApiResponse({ status: 200, description: 'Возвращает список всех продуктов', type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает продукт', type: Product })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiBody({ description: 'Параметры для создания нового продукта', type: ProductCreateRequestDto })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан', type: Product })
  create(@Body() body: { product: Partial<Product>; typeId: number }) {
    const { product, typeId } = body;
    return this.productsService.create(product, typeId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт по ID' })
  @ApiBody({ description: 'Параметры для обновления продукта', type: ProductCreateRequestDto })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлён', type: Product })
  update(@Param('id') id: number, @Body() body: { product: Partial<Product>; typeId?: number }) {
    const { product, typeId } = body;
    return this.productsService.update(id, product, typeId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт по ID' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удалён' })
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('Файл не предоставлен.');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await this.productsService.importProducts(data);

    return 'Файл успешно обработан и данные загружены в базу.';
  }
}