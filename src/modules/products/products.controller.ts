import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ICreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';
import { IProductService } from './interfaces/server-interface';
import { BrandService } from '../brand/brand.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/lib/fileOpitions';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject("IProductService") private readonly productsService: IProductService,
    @Inject("IBrandService") private readonly brandService: BrandService,
  ) {}
  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        price: { type: "number" },
        category_id: { type: "number" },
        brand_category_id: {type: "number" },
        brand_id: { type: "number" },
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor('files', 4, fileOptions))
  @ApiOperation({summary: "Create new product"})
  @Post('create')
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createProductDto: ICreateProductDto) {
    return await this.productsService.create(files, createProductDto);
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
  @ApiOperation({ summary: "Get products by brand id" })
  @Get('brand/:id')
  async findByrandId(@Param('id', ParseIntPipe) id: number) {
    await this.brandService.findOne(id);
    return await this.productsService.findByBrandId(id);
  }

  @ApiOperation({ summary: "Get product by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }
  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Update product by id" })
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Delete product by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundProduct } = await this.productsService.findOne(id);
    return this.productsService.remove(foundProduct.product);
  }
}
