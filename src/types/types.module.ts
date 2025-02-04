import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Type } from './types.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypesService],
  controllers: [TypesController]
})
export class TypesModule {}
