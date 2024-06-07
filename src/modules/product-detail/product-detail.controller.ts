import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Inject, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ICreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/lib/fileOpitions';

@ApiTags('product-detail')
@Controller('product-detail')
export class ProductDetailController {
  constructor(@Inject("IProductDetailService") private readonly productDetailService: ProductDetailService) {}

  @ApiOperation({summary: "Create new product detail"})
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        quantity: { type: "number" },
        description: { type: "string" },
        discount: { type: "number" },
        colors: {type: "string" },
        product_id: { type: "number" },
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
  @UseInterceptors(FilesInterceptor('files', 4, fileOptions))
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any) {
    console.log(files);
    const dto: ICreateProductDetailDto = {
      ...body,
      quantity: Number(body.quantity),
      discount: Number(body.discount),
      product_id: Number(body.product_id),
      colors: body.colors.split(',').map(color => color.trim()),
    };
    return await this.productDetailService.create(files, dto);
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

  @ApiOperation({ summary: "Update product detail by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDetailDto: UpdateProductDetailDto) {
    return await this.productDetailService.update(id, updateProductDetailDto);
  }

  @ApiOperation({ summary: "Delete product detail by id"})
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundProductDetail } = await this.findOne(id);
    return await this.productDetailService.remove(foundProductDetail);
  }
}
