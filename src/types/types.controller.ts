import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TypesService } from './types.service';
import { Type } from './types.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typesService.findOne(id);
  }

  @Post()
  create(@Body() type: Partial<Type>) {
    return this.typesService.create(type);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() type: Partial<Type>) {
    return this.typesService.update(id, type);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.typesService.delete(id);
  }
}
