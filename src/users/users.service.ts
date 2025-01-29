import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Регистрация нового пользователя с хэшированием пароля
  async registerUser(
    email: string,
    username: string,
    password: string,
    phone: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Хэшируем пароль
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      phone,
    });
    return this.userRepository.save(user); // Сохраняем пользователя в базе данных
  }

  // Поиск пользователя по email
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null; // Если не найден, возвращаем null
  }

  // Поиск пользователя по ID
  async findOneById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user || null; // Если не найден, возвращаем null
  }
}


