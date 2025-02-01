import { Test, TestingModule } from '@nestjs/testing';
import { CryptoPriceTaskService } from './crypto-price-task.service';
import { CryptoService } from '../crypto/crypto.service';
import { AlertsService } from '../alerts/alerts.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Condition } from '../alerts/enums/condition.enum';
import { get, Types } from 'mongoose';

const mockCryptos = [
  { _id: new Types.ObjectId('507f191e810c19729de860ea'), name: 'Bitcoin', price: 50000 },
  { _id: new Types.ObjectId('507f191e810c19729de860eb'), name: 'Ethereum', price: 3000 },
];

const mockCryptoService = {
  getPrices: jest.fn().mockResolvedValue(mockCryptos),
};

const mockAlerts = [
    { _id: '1', crypto: '1', condition: Condition.GREATER_THAN, threshold: 45000, isActive: true },
    { _id: '2', crypto: '2', condition: Condition.LESS_THAN, threshold: 3500, isActive: true },
];

const mockAlertsService = {
  findAll: jest.fn().mockResolvedValue(mockAlerts),
  getActiveAlertsGreaterThan: jest.fn().mockResolvedValue([mockAlerts[0]]),
  getActiveAlertsLessThan: jest.fn().mockResolvedValue([mockAlerts[1]]),
};

const mockEventEmitter = {
  emit: jest.fn(),
};

describe('CryptoPriceTaskService', () => {
  let service: CryptoPriceTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoPriceTaskService,
        { provide: CryptoService, useValue: mockCryptoService },
        { provide: AlertsService, useValue: mockAlertsService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<CryptoPriceTaskService>(CryptoPriceTaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
