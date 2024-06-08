import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(@Inject("IStockService") private readonly stockService: StockService) {}

  @ApiOperation({summary: "Create new stock"})
  @Post('create')
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.create(createStockDto);
  }

  @ApiOperation({ summary: "Get all stocks" })
  @Get()
  async findAll() {
    return await this.stockService.findAll();
  }

  @ApiOperation({ summary: "Get stock by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.stockService.findOne(id);
  }

  @ApiOperation({ summary: "Update stock by id" })
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
    return await this.stockService.update(id, updateStockDto);
  }

  @ApiOperation({ summary: "Delete stock by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundStock } = await this.stockService.findOne(id);
    return this.stockService.remove(foundStock);
  }
}
