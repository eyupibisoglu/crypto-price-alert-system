import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../../notification/notification.service';
import { AlertsService } from '../../alerts/alerts.service';

@Injectable()
export class CryptoPriceUpdatedListener {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly alertsService: AlertsService,
  ) {}

  @OnEvent('crypto.price.updated')
  handleCryptoPriceUpdatedEvent(event) {
    const { alert, crypto } = event;
    // handle and process "OrderCreatedEvent" event
    this.notificationService.notify(alert.user, 'Crypto Price', `Price of ${crypto.name} is now ${crypto.price} ${alert.condition} than your threshold of ${alert.threshold}`);
    this.alertsService.deactivate(alert._id); // set isActive as false.
  }
}