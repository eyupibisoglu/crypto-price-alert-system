import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Condition } from '../enums/condition.enum';

export class CreateAlertDto {
  @ApiProperty({
    description: 'Id of the user who set the alert.',
    example: '6785215f2865d92b37493382',
  })
  user?: Types.ObjectId;

  @ApiProperty({
    description: 'Id of the cryptocurrency for which the alert is set.',
    example: '6785215f2865d92b37493382',
  })
  crypto: Types.ObjectId | string;

  @ApiProperty({
    description: 'Condition for the alert (e.g., GREATER_THAN, LESS_THAN).',
    example: Condition.GREATER_THAN,
    enum: Condition,
    enumName: 'Condition',
  })
  condition: string;

  @ApiProperty({
    description: 'Alert status. if it triggered then false else true.',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Threshold value for the alert.',
    example: 1000,
  })
  threshold: number;
}
