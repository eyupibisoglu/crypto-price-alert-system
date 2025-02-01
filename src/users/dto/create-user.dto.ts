import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'ibisoglueyup@gmail.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'Eyüp İbişoğlu', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: '1dt23i0t', description: 'The password of the user' })
  password: string;
}