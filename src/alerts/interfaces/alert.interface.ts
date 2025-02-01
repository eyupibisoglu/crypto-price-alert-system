import { Document, Types } from 'mongoose';
import { Condition } from '../enums/condition.enum';

export interface Alert extends Document {
  user: Types.ObjectId;
  crypto: Types.ObjectId;
  condition: Condition;
  isActive: boolean;
  threshold: number;
}
