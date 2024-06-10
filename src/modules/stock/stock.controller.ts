import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(@Inject("IStockService") private readonly stockService: StockService) {}

  @ApiOperation({summary: "Create new stock"})
  @Post('create')
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.create(createStockDto);
  }

  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'For limit'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'For page'
  })
  @ApiOperation({ summary: "Get all stocks" })
  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.stockService.findAll(limit, page);
  }
  @ApiOperation({ summary: "Get stocks by brand id" })
  @Get('brand/:id')
  async findByBrandId(@Param('id', ParseIntPipe) id: number) {
    return await this.stockService.findByBrandId(id);
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
