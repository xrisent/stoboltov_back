import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Services } from './services.entity';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './create-service.dto';
import { UpdateServiceDto } from './update-service.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую услугу' })
  @ApiResponse({ status: 201, description: 'Услуга создана', type: Services })
  create(@Body() serviceData: CreateServiceDto): Promise<Services> {
    return this.servicesService.create(serviceData);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все услуги' })
  @ApiResponse({ status: 200, description: 'Список услуг', type: [Services] })
  findAll(): Promise<Services[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить услугу по ID' })
  @ApiResponse({ status: 200, description: 'Найденная услуга', type: Services })
  findOne(@Param('id') id: number): Promise<Services> {
    return this.servicesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить услугу по ID' })
  @ApiResponse({ status: 200, description: 'Обновленная услуга', type: Services })
  update(@Param('id') id: number, @Body() serviceData: UpdateServiceDto): Promise<Services> {
    return this.servicesService.update(id, serviceData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить услугу по ID' })
  @ApiResponse({ status: 200, description: 'Услуга удалена' })
  remove(@Param('id') id: number): Promise<void> {
    return this.servicesService.remove(id);
  }
}
