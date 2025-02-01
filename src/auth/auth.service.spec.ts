import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import SignInResponseDto from './dto/sign-in-response.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
};

const accessToken = 'signed-jwt-token';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockReturnValue(accessToken),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return the user data without password if validation is successful', async () => {
      const signInResponseDto: SignInResponseDto = {
        accessToken: 'signed-jwt-token',
        user: { _id: mockUser._id, email: mockUser.email, name: mockUser.name },
      };

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await service.signIn(mockUser.email, mockUser.password);
      expect(result).toEqual(signInResponseDto);
    });

    it('should return the user data without password if validation is successful', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(service.signIn(mockUser.email, mockUser.password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw not found because email does not exists.', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(service.signIn('notfound@gmail.com', mockUser.password)).rejects.toThrow(NotFoundException);
    });

    // it('should return null if validation fails', async () => {
    //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    //   const result = await service.validateUser(
    //     'test@example.com',
    //     'wrongpassword',
    //   );
    //   expect(result).toBeNull();
    // });
  });
});
