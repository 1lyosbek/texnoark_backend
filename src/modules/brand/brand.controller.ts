import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { ICreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/lib/fileOpitions';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IBrandService } from './interfaces/service-interface';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(@Inject("IBrandService") private readonly brandService: IBrandService) {}
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "Create new brand" })
  @Post()
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        category_id: { type: "number" },
        file: {
          type: "string",
          format: "binary"
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: ICreateBrandDto) {
    return await this.brandService.create(file, dto);
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
  @ApiOperation({ summary: "Get all brands" })
  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.brandService.findAll(limit, page);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'For search'
  })
  @ApiOperation({ summary: "Search brand by name" })
  @Get('/search')
  async searchByBrandName(@Query('search') search: string,) {
    return await this.brandService.searchBrand(search);
  }

  @ApiOperation({ summary: "Get brand by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.brandService.findOne(id);
  }

  @ApiOperation({ summary: "Update brand by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return await this.brandService.update(id, updateBrandDto);
  }

  @ApiOperation({ summary: "Delete brand by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundBrand } = await this.brandService.findOne(id);
    return this.brandService.remove(foundBrand);
  }
}
