import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any): Promise<any> {

    const salt = await bcrypt.genSalt(10);
    const tempPassword = await bcrypt.hash(value.password, salt);
    value.password = tempPassword;
    return value;
  }
}
