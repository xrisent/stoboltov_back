import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email пользователя' })
  email: string;

  @ApiProperty({ description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;

  @ApiProperty({ description: 'Телефон пользователя' })
  phone: string;
}
