import { Controller, Get, Post, Body } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatedCryptoDto } from './dto/created-crypto.dto';

@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @ApiOperation({ summary: 'Create crypto' })
  @ApiResponse({ status: 201, type: CreatedCryptoDto })
  @ApiBody({ type: CreateCryptoDto })
  @ApiBearerAuth()
  @Post()
  create(@Body() createCryptoDto: CreateCryptoDto) {
    return this.cryptoService.create(createCryptoDto);
  }

  @ApiOperation({ summary: 'Get all cryptos.' })
  @ApiResponse({ status: 200, type: [CreatedCryptoDto] })
  @ApiBearerAuth()
  @Get()
  async findAll() {
    const cryptos = await this.cryptoService.findAll();

    return cryptos;
  }
}
