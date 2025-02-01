import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class SignInDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'ibisoglueyup@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'JD123...',
  })
  @IsNotEmpty()
  password: string;
}
