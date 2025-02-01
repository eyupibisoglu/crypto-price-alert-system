import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  email: 'test@example.com',
  name: 'Test User',
};

const mockSignInResponse = {
  accessToken: 'signed-jwt-token',
  user: mockUser,
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(mockSignInResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token and user data', async () => {
      const signInDto = { email: 'test@example.com', password: 'password' };
      expect(await controller.signIn(signInDto)).toEqual(mockSignInResponse);
    });

    it('should return an access token and user data', async () => {
      const signInDto = { email: mockUser.email, password: 'password' };
      jest
        .spyOn(service, 'signIn')
        .mockRejectedValue(new UnauthorizedException());

      await expect(controller.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
