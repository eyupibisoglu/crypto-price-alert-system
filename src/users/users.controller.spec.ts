import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreatedUserDto } from './dto/created-user.dto';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
};

class MockUserModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  toJSON = jest.fn().mockImplementation(function () {
    return this.data;
  });
  static find = jest.fn().mockResolvedValue([new MockUserModel(mockUser)]);
  static findOne = jest.fn().mockResolvedValue(mockUser);
  static findById = jest.fn().mockResolvedValue(mockUser);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
  static findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);
}

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockUser]),
            create: jest.fn().mockResolvedValue(new MockUserModel(mockUser)),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createdUser: CreatedUserDto = {
        _id: mockUser._id,
        email: mockUser.email,
        name: mockUser.name,
      };

      expect(await controller.create(mockUser)).toEqual(createdUser);
    });
  });
});
