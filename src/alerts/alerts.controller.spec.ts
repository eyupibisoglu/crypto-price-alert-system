import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';

describe('AlertsController', () => {
  let controller: AlertsController;

  const mockAlert = {
    _id: '507f191e810c19729de860ea',
    user: '507f191e810c19729de860eb',
    crypto: '507f191e810c19729de860ec',
    condition: 'greater',
    isActive: true,
    threshold: 1000,
  };

  const mockUser = {
    _id: '507f191e810c19729de860eb',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [
        {
          provide: AlertsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockAlert),
            findAll: jest.fn().mockResolvedValue([mockAlert]),
          },
        },
      ],
    }).compile();

    controller = module.get<AlertsController>(AlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an alert', async () => {
    const createAlertDto: CreateAlertDto = {
      crypto: '507f191e810c19729de860ec',
      condition: 'greater',
      threshold: 1000,
      isActive: true,
    };

    const result = await controller.create(createAlertDto, mockUser);
    expect(result).toEqual(mockAlert);
  });

  it('should get all alerts', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockAlert]);
  });
});
