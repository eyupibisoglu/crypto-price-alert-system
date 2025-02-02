import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Condition } from '../enums/condition.enum';
import { IsEnum, IsNotEmpty, IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({
    description: 'Id of the cryptocurrency for which the alert is set.',
    example: '6785215f2865d92b37493382',
  })
  @IsNotEmpty({ message: 'Crypto ID should not be empty' })
  @IsMongoId({ message: 'Crypto ID must be a valid MongoDB ObjectId' })
  crypto: Types.ObjectId | string;

  @ApiProperty({
    description: 'Condition for the alert (e.g., GREATER_THAN, LESS_THAN).',
    example: Condition.GREATER_THAN,
    enum: Condition,
    enumName: 'Condition',
  })
  @IsNotEmpty({ message: 'Condition should not be empty' })
  @IsEnum(Condition, { message: 'Condition must be a valid enum value' })
  condition: string;

  @ApiProperty({
    description: 'Alert status. if it triggered then false else true.',
    example: true,
  })
  @IsNotEmpty({ message: 'isActive should not be empty' })
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive: boolean;

  @ApiProperty({
    description: 'Threshold value for the alert.',
    example: 1000,
  })
  @IsNotEmpty({ message: 'Threshold should not be empty' })
  threshold: number;
}
