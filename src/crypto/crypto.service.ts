import { Injectable } from '@nestjs/common';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { Crypto } from './interfaces/crypto.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatedCryptoDto } from './dto/created-crypto.dto';

@Injectable()
export class CryptoService {
  constructor(@InjectModel('Crypto') private cryptoModel: Model<Crypto>) {}

  create(createCryptoDto: CreateCryptoDto) {
    const crypto = new this.cryptoModel(createCryptoDto);

    return crypto.save();
  }

  findAll() {
    return this.cryptoModel.find();
  }

  // Mocking price with random generated price.
  async getPrices() {
    const cryptos = await this.cryptoModel.find();
    return cryptos.map((crypto) => ({
      ...crypto.toJSON(),
      price: this.generatePrice(),
    }));
  }

  generatePrice() {
    return Math.floor(Math.random() * 2500);
  }
}
