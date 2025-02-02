import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCryptoDto {
  @ApiProperty({
    example: 'Bitcoin',
    description: 'The name of the crypto.',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}
