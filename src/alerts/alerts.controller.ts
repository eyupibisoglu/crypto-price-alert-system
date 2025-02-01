import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatedAlertDto } from './dto/created-alert.dto';
import { User } from '../auth/decorators/user.decorator';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @ApiOperation({ summary: 'Create crypto' })
  @ApiResponse({ status: 201, type: CreatedAlertDto })
  @ApiBody({ type: CreateAlertDto })
  @ApiBearerAuth()
  @Post()
  create(@Body() createAlertDto: CreateAlertDto, @User() user) {
    createAlertDto.user = user._id;
    return this.alertsService.create(createAlertDto);
  }

  @ApiOperation({ summary: 'Get all alerts' })
  @ApiResponse({ status: 200, type: [CreatedAlertDto] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.alertsService.findAll({});
  }
}
