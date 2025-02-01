import { ConsoleLogger, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [NotificationService, ConsoleLogger],
  exports: [NotificationService],
})
export class NotificationModule {}