import { ApiProperty } from '@nestjs/swagger';

export class CreatedCryptoDto {
  @ApiProperty({
    description: 'Id of the created crypto.',
    example: '6785215f2865d92b37493381',
  })
  _id: string;

  @ApiProperty({
    example: 'Bitcoin',
    description: 'The name of the crypto.',
  })
  name: string;
}
