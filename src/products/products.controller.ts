
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
  UploadedFiles,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductCreateRequestDto } from './product-create.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, parse } from 'path';
import * as path from 'path';
import * as fs from 'fs'
import { Response } from 'express';
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
  @UseInterceptors(
    FilesInterceptor('files', 11, { // Handle images and xlsx files
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', 'uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  async uploadProducts(
    @UploadedFiles() files: Express.Multer.File[] // Receive all files
  ) {
    // Split files into xlsx and image files
    const xlsxFile = files.find(file => file.originalname.endsWith('.xlsx'));
    const imageFiles = files.filter(file => file.originalname.endsWith('.jpg') || file.originalname.endsWith('.png'));

    if (!xlsxFile) {
      throw new Error('Файл с товарами (.xlsx) не предоставлен.');
    }

    // Log the file buffer and size to debug
    console.log('File buffer:', xlsxFile.buffer);
    console.log('File size:', xlsxFile.size);

    // Read the XLSX file
    let workbook;
    try {
      workbook = XLSX.read(fs.readFileSync(xlsxFile.path), { type: 'buffer' });
    } catch (error) {
      console.error('Error reading XLSX file:', error);
      throw new Error('Не удалось прочитать файл XLSX.');
    }

    const sheetNames = workbook.SheetNames;

    if (sheetNames.length === 0) {
      throw new Error('Файл не содержит листов.');
    }

    const sheetName = sheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(`Лист с именем ${sheetName} не найден.`);
    }

    const products: any[] = XLSX.utils.sheet_to_json(sheet);

    if (products.length === 0) {
      throw new Error('Лист с товарами пуст.');
    }

    console.log(products); // For debugging

    // Convert image files into a map { name_without_extension: path }
    const filesMap = Object.fromEntries(
      imageFiles.map(image => [parse(image.originalname).name.toLowerCase(), image.filename])
    );

    // Match products with images by name
    const processedProducts = products.map(product => {
      const productName = product.name?.toLowerCase();
      return {
        ...product,
        image: filesMap[productName] || null,
      };
    });

    await this.productsService.importProducts(processedProducts);

    return { message: 'Файл успешно обработан и данные загружены', data: processedProducts };
  }


  @Get('images/:imageName')
  getImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const directoryPath = path.join(__dirname, '..', 'uploads');
    const imagePath = path.join(directoryPath, imageName);

    console.log()
    
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
  }
}
