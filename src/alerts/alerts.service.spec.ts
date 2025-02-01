import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

const mockAlert = {
  _id: '507f191e810c19729de860ea',
  user: new Types.ObjectId('507f191e810c19729de860eb'),
  crypto: new Types.ObjectId('507f191e810c19729de860ec'),
  condition: 'greater',
  isActive: true,
  threshold: 1000,
};

class MockAlertModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  set = jest.fn().mockImplementation(function (key, value) {
    this.data[key] = value;
    return this;
  });
  static find = jest.fn().mockResolvedValue([mockAlert]);
  static findOne = jest.fn().mockResolvedValue(mockAlert);
  static findById = jest.fn().mockResolvedValue(new MockAlertModel(mockAlert));
}

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getModelToken('Alert'),
          useValue: MockAlertModel,
        },
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an alert', async () => {
    const alert = await service.create(mockAlert);
    expect(alert).toEqual(mockAlert);
  });

  it('should find all alerts', async () => {
    const condition = { isActive: true };
    const alerts = await service.findAll(condition);
    expect(alerts).toEqual([mockAlert]);
  });

  it('should deactivate alert.', async () => {
    const alert = await service.deactivate('507f191e810c19729de860ea');
    expect(alert).toHaveProperty('isActive', false);
  });
});
