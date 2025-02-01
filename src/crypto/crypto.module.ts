import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { DatabaseModule } from '../database/database.module';
import { CryptoSchema } from './schemas/crypto.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Crypto', schema: CryptoSchema }]),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
