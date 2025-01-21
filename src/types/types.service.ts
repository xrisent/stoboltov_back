import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './types.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async findAll() {
    return this.typeRepository.find({
      relations: ['typeOf'],
    });
  }

  async findOne(id: number) {
    return this.typeRepository.findOne({
      where: { id },
      relations: ['typeOf'],
    });
  }

  async create(type: Partial<Type>) {
    const newType = this.typeRepository.create(type);
    return this.typeRepository.save(newType);
  }

  async update(id: number, type: Partial<Type>) {
    await this.typeRepository.update(id, type);
    return this.findOne(id); 
  }

  async delete(id: number) {
    return this.typeRepository.delete(id);
  }
}
