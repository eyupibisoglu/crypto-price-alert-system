import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlertsService } from '../alerts/alerts.service';
import { CryptoService } from '../crypto/crypto.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CryptoPriceUpdatedEvent } from './events/crypto-price-updated.event';

@Injectable()
export class CryptoPriceTaskService {
  constructor(
    private cryptoService: CryptoService,
    private alertsService: AlertsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleFluctiations() {
    const cryptoWithPrices: Record<string, any> = await this.cryptoService.getPrices();
    console.log(new Date().toLocaleString());

    const fluctiations = await Promise.all(cryptoWithPrices.map(crypto => this.handleFluctiationAndEmit(crypto)));

    // const promises = [];
    // cryptoWithPrices.forEach(async crypto => {
    //   console.log(crypto._id, crypto.name, crypto.price);
    //   const query = this.alertsService.findAll({ isActive: true, crypto: crypto._id, condition: Condition.GREATER_THAN, threshold: { $lt: crypto.price } });
    //   const query2 = this.alertsService.findAll({ isActive: true, crypto: crypto._id, condition: Condition.LESS_THAN, threshold: { $gt: crypto.price } });
    //   promises.push(query, query2);
    // });

    // const results = await Promise.all(promises);

    // results.flat().forEach((alert) => {
    //   this.eventEmitter.emit('crypto.price.updated', new CryptoPriceUpdatedEvent( cryptoWithPrices.find( crypto => crypto._id.equals(alert.crypto) ), alert));
    // });

    return fluctiations.flat();
  }

  async handleFluctiationAndEmit(crypto) {
    console.log(crypto.name, crypto.price);
    const query = this.alertsService.getActiveAlertsLessThan(crypto.price, crypto._id);
    const query2 = this.alertsService.getActiveAlertsGreaterThan(crypto.price, crypto._id);

    const results = await Promise.all([query, query2]);

    results.flat().forEach((alert) => {
      this.eventEmitter.emit('crypto.price.updated', new CryptoPriceUpdatedEvent( crypto, alert));
    });

    return results.flat();
  }
}
