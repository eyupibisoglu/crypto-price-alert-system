import { Alert } from '../../alerts/interfaces/alert.interface';
import { Crypto } from '../../crypto/interfaces/crypto.interface';

export class CryptoPriceUpdatedEvent {
  alert: Alert;
  crypto: Crypto;

  constructor(crypto: Crypto, alert: Alert) {
    this.alert = alert;
    this.crypto = crypto;
  }
}
