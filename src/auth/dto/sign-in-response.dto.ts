import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatedUserDto } from '../../users/dto/created-user.dto';

export default class SignInResponseDto {
  @ApiProperty({
    description: 'User access token.',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzljZWRmMDhhNGUwZTRhODEzZGRjNjgiLCJuYW1lIjoiU2VsbWEgSGFjxLFvxJ9sdSIsImlhdCI6MTczODM0MTA1MiwiZXhwIjoxNzM4OTQ1ODUyfQ.dy0rCIQSfuDSWydLLttJUyKPDyAOFTtpjYvA7c4umW4"
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: 'Authenticated user',
  })
  @IsNotEmpty()
  user: CreatedUserDto;
}
