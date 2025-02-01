import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { getModelToken } from '@nestjs/mongoose';

const mockCrypto = {
  _id: '507f191e810c19729de860ea',
  name: 'Bitcoin',
};

class MockCryptoModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  toJSON = jest.fn().mockImplementation(function() {
    return this;
  });
  static find = jest.fn().mockResolvedValue([new MockCryptoModel(mockCrypto)]);
  static findOne = jest.fn().mockResolvedValue(mockCrypto);
  static findById = jest.fn().mockResolvedValue(mockCrypto);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockCrypto);
  static findByIdAndDelete = jest.fn().mockResolvedValue(mockCrypto);
}

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: getModelToken('Crypto'),
          useValue: MockCryptoModel,
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a crypto', async () => {
    const crypto = await service.create(mockCrypto);
    expect(crypto).toEqual(mockCrypto);
  });

  it('should find all cryptos', async () => {
    const cryptos = await service.findAll();
    expect(cryptos[0]).toHaveProperty('_id', mockCrypto._id);
  });

  it('should find all cryptos & get prices', async () => {
    const randomValue = 2000;
    jest.spyOn(service, 'generatePrice').mockReturnValue(randomValue);
    const cryptos = await service.getPrices();
    expect(cryptos[0]).toHaveProperty('price', randomValue);
  });

  it('should generate a random value', () => {
    const randomValue = 2000;
    jest.spyOn(Math, 'floor').mockReturnValue(randomValue);

    const result = service.generatePrice();
    expect(result).toBe(randomValue);
  });
});
