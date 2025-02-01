import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashPasswordPipe } from '../common/pipes/hash-password.pipe';
import { User } from './interfaces/user.interface';
import { CreatedUserDto } from './dto/created-user.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: CreatedUserDto })
  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth()
  @Post()
  async create(@Body(HashPasswordPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...withoutPassword } = user.toJSON();  // In order to delete password from response.
    return withoutPassword;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [CreatedUserDto] })
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}