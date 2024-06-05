import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { IBrandCategoryService } from './interface/service-interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("brand-category")
@Controller('brand-category')
export class BrandCategoryController {
  constructor(@Inject("IBrandCategoryService") private readonly brandCategoryService: IBrandCategoryService) {}

  @ApiOperation({summary: "Create new Brand Category"})
  @Post()
  async create(@Body() createBrandCategoryDto: CreateBrandCategoryDto) {
    return await this.brandCategoryService.createBrandCategory(createBrandCategoryDto);
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
  @ApiOperation({ summary: "Get Brand Categories"})
  @Get('search')
  async findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.brandCategoryService.findAllBrandCategories(search, limit, page);
  }

  @ApiOperation({ summary: "Get Brand Category by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.brandCategoryService.findOneBrandCategory(id);
  }

  @ApiOperation({ summary: "Update Brand Category by id" })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandCategoryDto: UpdateBrandCategoryDto) {
    return this.brandCategoryService.updateBrandCategory(id, updateBrandCategoryDto);
  }

  @ApiOperation({ summary: "Delete Brand Category by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundBrandCategory} = await this.brandCategoryService.findOneBrandCategory(id);
    return this.brandCategoryService.removeBrandCategory(foundBrandCategory);
  }
}
