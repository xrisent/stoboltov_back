import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async getById(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`News with id ${id} not found`);
    }
    return news;
  }

  async create(newsData: Partial<News>): Promise<News> {
    const newNews = this.newsRepository.create(newsData);
    return this.newsRepository.save(newNews);
  }

  async update(id: number, newsData: Partial<News>): Promise<News> {
    const news = await this.getById(id); 
    Object.assign(news, newsData); 
    return this.newsRepository.save(news);
  }

  async delete(id: number): Promise<void> {
    const news = await this.getById(id);
    await this.newsRepository.remove(news);
  }
}
