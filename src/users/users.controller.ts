import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // Импортируем AuthService для логина
import { UsersService } from './users.service'; // Импортируем UsersService для регистрации
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Импортируем декораторы для Swagger
import { RegisterDto } from './user-register.dto';
import { LoginDto } from './user-login.dto';

@Controller('auth') // Контроллер для аутентификации
@ApiTags('Authentication') // Группа для Swagger
export class UsersController {
  constructor(
    private readonly authService: AuthService, // Сервис для аутентификации
    private readonly usersService: UsersService, // Сервис для пользователей
  ) {}

  // Регистрация нового пользователя
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({
    description: 'Параметры для регистрации нового пользователя',
    type: RegisterDto, // Указываем тип данных для тела запроса
  })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Пользователь с таким email уже существует' })
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
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiBody({
    description: 'Параметры для логина',
    type: LoginDto, // Указываем тип данных для тела запроса
  })
  @ApiResponse({ status: 200, description: 'Возвращает JWT токен при успешной аутентификации' })
  @ApiResponse({ status: 401, description: 'Неверные данные для входа' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' }; // Если неправильные данные для входа
    }
    return this.authService.login(user); // Возвращаем JWT токен
  }
}
