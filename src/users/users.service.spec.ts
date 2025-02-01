import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
};

class MockUserModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([mockUser]);
  static findOne = jest.fn().mockResolvedValue(mockUser);
  static findById = jest.fn().mockResolvedValue(mockUser);
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(mockUser);
    expect(user).toEqual(mockUser);
  });

  it('should find by email', async () => {
    const user = await service.findByEmail(mockUser.email);
    expect(user).toEqual(mockUser);
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
  });

  it('should find a user by id', async () => {
    const user = await service.findById(mockUser._id);
    expect(user).toEqual(mockUser);
  });
});
