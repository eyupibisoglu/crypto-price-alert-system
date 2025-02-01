import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String },
    password: { type: String },
  },
  { versionKey: false },
);
