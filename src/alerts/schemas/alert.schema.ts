import mongoose, { Schema } from 'mongoose';
import { Condition } from '../enums/condition.enum';

export const AlertSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    crypto: { type: Schema.Types.ObjectId, ref: 'Crypto', required: true },
    condition: { type: String, enum: Condition },
    isActive: Boolean,
    threshold: Number,
  },
  { versionKey: false },
);
