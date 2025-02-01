import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';
import { NotificationModule } from './notification/notification.module';
import { AlertsModule } from './alerts/alerts.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CryptoPriceTaskModule } from './crypto-price-task/crypto-price-task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(
      'mongodb+srv://' +
        process.env.DATABASE_USER +
        ':' +
        process.env.DATABASE_PASSWORD +
        '@' +
        process.env.CLUSTER_INFO +
        '/' +
        process.env.DATABASE_NAME,
    ),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UsersModule,
    DatabaseModule,
    CryptoModule,
    NotificationModule,
    AlertsModule,
    CryptoPriceTaskModule,
    AuthModule,
  ],
})
export class AppModule {}
