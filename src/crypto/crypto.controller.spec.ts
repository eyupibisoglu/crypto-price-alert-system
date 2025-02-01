import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreatedCryptoDto } from './dto/created-crypto.dto';

const mockCrypto: CreatedCryptoDto = {
  _id: '507f191e810c19729de860ea',
  name: 'Bitcoin',
};

class MockCryptoModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  toJSON = jest.fn().mockImplementation(function () {
    return this;
  });
  static find = jest.fn().mockResolvedValue([new MockCryptoModel(mockCrypto)]);
  static findOne = jest.fn().mockResolvedValue(mockCrypto);
  static findById = jest.fn().mockResolvedValue(mockCrypto);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockCrypto);
  static findByIdAndDelete = jest.fn().mockResolvedValue(mockCrypto);
}

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: CryptoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockCrypto]),
            create: jest.fn().mockResolvedValue(mockCrypto),
          },
        },
        {
          provide: getModelToken('Crypto'),
          useValue: MockCryptoModel,
        },
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  describe('findAll', () => {
    it('should return an array of crypto', async () => {
      expect(await controller.findAll()).toEqual([mockCrypto]);
    });

    it('should return created crypto', async () => {
      expect(await controller.create(mockCrypto)).toEqual(mockCrypto);
    });
  });
});
