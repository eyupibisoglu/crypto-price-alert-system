import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Alert } from './interfaces/alert.interface';
import { Model } from 'mongoose';
import { Condition } from './enums/condition.enum';

@Injectable()
export class AlertsService {
  constructor(@InjectModel('Alert') private alertModel: Model<Alert>) {}

  create(createAlertDto: CreateAlertDto) {
    const alert = new this.alertModel(createAlertDto);

    return alert.save();
  }

  findAll(condition) {
    return this.alertModel.find(condition);
  }

  getActiveAlertsGreaterThan(price: number, crypto: string) {
    return this.alertModel.find({
      isActive: true,
      threshold: { $gt: price },
      crypto,
      condition: Condition.LESS_THAN,
    });
  }

  getActiveAlertsLessThan(price: number, crypto: string) {
    return this.alertModel.find({
      isActive: true,
      threshold: { $lt: price },
      crypto,
      condition: Condition.GREATER_THAN,
    });
  }

  async deactivate(id: string) {
    const alert = await this.alertModel.findById(id);

    alert.set('isActive', false);
    return alert.save();
  }
}
