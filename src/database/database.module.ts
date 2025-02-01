import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class DatabaseModule {
  static forRoot(databaseUrl: string) {
    return MongooseModule.forRoot(databaseUrl);
  }

  static forFeature(models) {
    return MongooseModule.forFeature(models);
  }
}
