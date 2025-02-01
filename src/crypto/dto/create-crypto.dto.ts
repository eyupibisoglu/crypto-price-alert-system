import { ApiProperty } from '@nestjs/swagger';

export class CreateCryptoDto {
  @ApiProperty({
    example: 'Bitcoin',
    description: 'The name of the crypto.',
  })
  name: string;
}
