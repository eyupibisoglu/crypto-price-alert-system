import { Module } from '@nestjs/common';
import { CryptoPriceTaskService } from './crypto-price-task.service';
import { CryptoModule } from '../crypto/crypto.module';
import { AlertsModule } from '../alerts/alerts.module';
import { CryptoPriceUpdatedListener } from './listeners/crypto-price-updated.listener';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [CryptoModule, AlertsModule, NotificationModule],
  providers: [CryptoPriceTaskService, CryptoPriceUpdatedListener],
})
export class CryptoPriceTaskModule {}
