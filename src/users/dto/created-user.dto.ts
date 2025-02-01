import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
  @ApiProperty({
    description: 'Id of the user',
    example: '6785215f2865d92b37493381',
  })
  _id: string;

  @ApiProperty({
    example: 'ibisoglueyup@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'Eyüp İbişoğlu',
    description: 'The name of the user',
  })
  name: string;
}
