import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('product-detail')
@Controller('product-detail')
export class ProductDetailController {
  constructor(@Inject("IProductDetailService") private readonly productDetailService: ProductDetailService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({summary: "Create new product detail"})
  @Post('create')
  async create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return await this.productDetailService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: "Get product details" })
  @Get()
  async findAll() {
    return await this.productDetailService.findAll();
  }

  @ApiOperation({ summary: "Get product detail by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productDetailService.findOne(id);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Update product detail by id" })
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDetailDto: UpdateProductDetailDto) {
    return await this.productDetailService.update(id, updateProductDetailDto);
  }
  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Delete product detail by id"})
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundProductDetail } = await this.findOne(id);
    return await this.productDetailService.remove(foundProductDetail);
  }
}
