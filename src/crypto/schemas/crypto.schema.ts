import mongoose from 'mongoose';

export const CryptoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { versionKey: false },
);
