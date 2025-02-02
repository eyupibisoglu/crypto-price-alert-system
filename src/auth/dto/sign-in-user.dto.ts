import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class SignInDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'ibisoglueyup@gmail.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'JD123...',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
