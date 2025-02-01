import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly usersService: UsersService,
    private logger: ConsoleLogger,
  ) {}

  async notify(id: string, subject: string, text: string) {
    try {
      const user = await this.usersService.findById(id);

      console.log(user.email, subject, text);
    } catch (error) {
      console.log(error);
    }
  }
}
