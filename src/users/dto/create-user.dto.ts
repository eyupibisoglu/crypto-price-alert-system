import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ibisoglueyup@gmail.com', description: 'The email of the user' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({ example: 'Eyüp İbişoğlu', description: 'The name of the user' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({ example: '1dt23i0t', description: 'The password of the user' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
