import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryService } from './interface/service-interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(@Inject("ICategoryService") private readonly categoryService: ICategoryService) {}

  @ApiOperation({ summary: "Create new category" })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
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
  @ApiOperation({ summary: "Get categories" })
  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.categoryService.findAll(limit, page);
  }

  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'For search'
  })
  @ApiOperation({ summary: "Search category by category name"})
  @Get('/search')
  async searchByCategory(@Query('search') search: string,) {
    return await this.categoryService.searchCategory(search);
  }

  @ApiOperation({ summary: "Get category by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: "Update category by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Delete category by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundCategory } = await this.categoryService.findOne(id);
    return this.categoryService.remove(foundCategory);
  }
}
