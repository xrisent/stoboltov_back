import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService], 
})
export class ServicesModule {}
