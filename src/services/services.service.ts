import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from './services.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private readonly servicesRepository: Repository<Services>,
  ) {}

  async create(serviceData: Partial<Services>): Promise<Services> {
    const service = this.servicesRepository.create(serviceData);
    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<Services[]> {
    return this.servicesRepository.find();
  }

  async findOne(id: number): Promise<Services> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new Error(`Услуга с ID ${id} не найдена`);
    }
    return service;
  }

  async update(id: number, serviceData: Partial<Services>): Promise<Services> {
    await this.servicesRepository.update(id, serviceData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
