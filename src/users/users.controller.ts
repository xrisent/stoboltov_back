import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // Импортируем AuthService для логина
import { UsersService } from './users.service'; // Импортируем UsersService для регистрации

@Controller('auth') // Контроллер для аутентификации
export class UsersController {
  constructor(
    private readonly authService: AuthService, // Сервис для аутентификации
    private readonly usersService: UsersService, // Сервис для пользователей
  ) {}

  // Регистрация нового пользователя
  @Post('register')
  async register(
    @Body() body: { email: string; username: string; password: string; phone: string }
  ) {
    const existingUser = await this.usersService.findOneByEmail(body.email);
    if (existingUser) {
      return { message: 'User already exists' }; // Если пользователь с таким email уже существует
    }

    const newUser = await this.usersService.registerUser(
      body.email,
      body.username,
      body.password,
      body.phone
    );
    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        phone: newUser.phone,
      }, // Возвращаем информацию о зарегистрированном пользователе
    };
  }

  // Логин пользователя
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' }; // Если неправильные данные для входа
    }
    return this.authService.login(user); // Возвращаем JWT токен
  }
}
