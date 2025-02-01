import { Document } from 'mongoose';

export interface Crypto extends Document {
  name: string;
}
