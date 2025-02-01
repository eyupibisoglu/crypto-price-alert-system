import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertSchema } from './schemas/alert.schema';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Alert', schema: AlertSchema }]),
  ],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
