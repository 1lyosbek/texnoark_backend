import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(@Inject("IStockService") private readonly stockService: StockService) {}

  @Post('create')
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.create(createStockDto);
  }

  @Get()
  async findAll() {
    return await this.stockService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.stockService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
    return await this.stockService.update(id, updateStockDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundStock } = await this.stockService.findOne(id);
    return this.stockService.remove(foundStock);
  }
}
