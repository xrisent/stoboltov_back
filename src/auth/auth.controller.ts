import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' }; // Если пользователь не найден
    }
    return this.authService.login(user); // Возвращаем JWT токен
  }

  @Post('register')
  async register(@Body() body: { email: string; username: string; password: string; phone: string }) {
    const existingUser = await this.usersService.findOneByEmail(body.email);
    if (existingUser) {
      return { message: 'User already exists' }; // Если пользователь с таким email уже существует
    }

    const newUser = await this.usersService.registerUser(body.email, body.username, body.password, body.phone);
    return { message: 'User registered successfully', user: newUser }; // Успешная регистрация
  }
}
