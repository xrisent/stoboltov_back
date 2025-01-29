import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
  import { NewsService } from './news.service';
  import { CreateNewsDto, UpdateNewsDto } from './news-create.dto';
  import { News } from './news.entity';
import { AuthGuard } from '@nestjs/passport';
  

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('News') 
  @Controller('news')
  export class NewsController {
    constructor(private readonly newsService: NewsService) {}
  
    @ApiOperation({ summary: 'Получить все новости' })
    @ApiResponse({ status: 200, description: 'Список новостей', type: [News] })
    @Get()
    async getAll() {
      return this.newsService.getAll();
    }
  
    @ApiOperation({ summary: 'Получить новость по ID' })
    @ApiParam({ name: 'id', description: 'Уникальный идентификатор новости' })
    @ApiResponse({ status: 200, description: 'Данные новости', type: News })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    @Get(':id')
    async getById(@Param('id') id: number) {
      return this.newsService.getById(+id);
    }
  
    @ApiOperation({ summary: 'Создать новость' })
    @ApiBody({ description: 'Данные для создания новости', type: CreateNewsDto })
    @ApiResponse({ status: 201, description: 'Новость создана', type: News })
    @Post()
    async create(@Body() createNewsDto: CreateNewsDto) {
      return this.newsService.create(createNewsDto);
    }
  
    @ApiOperation({ summary: 'Обновить новость' })
    @ApiParam({ name: 'id', description: 'Уникальный идентификатор новости' })
    @ApiBody({ description: 'Данные для обновления новости', type: UpdateNewsDto })
    @ApiResponse({ status: 200, description: 'Новость обновлена', type: News })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
      return this.newsService.update(+id, updateNewsDto);
    }
  
    @ApiOperation({ summary: 'Удалить новость' })
    @ApiParam({ name: 'id', description: 'Уникальный идентификатор новости' })
    @ApiResponse({ status: 200, description: 'Новость удалена' })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    @Delete(':id')
    async delete(@Param('id') id: number) {
      return this.newsService.delete(+id);
    }
  }
  