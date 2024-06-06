import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject("IProductService") private readonly productsService: ProductsService
  ) {}
  @ApiOperation({summary: "Create new product"})
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'For search'
  })
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
  @ApiOperation({ summary: "Get products and search" })
  @Get('search')
  async findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.productsService.findAll(search, limit, page);
  }

  @ApiOperation({ summary: "Get product by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @ApiOperation({ summary: "Update product by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: "Delete product by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundProduct } = await this.productsService.findOne(id);
    return this.productsService.remove(foundProduct);
  }
}
