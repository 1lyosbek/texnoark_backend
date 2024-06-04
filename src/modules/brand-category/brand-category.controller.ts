import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { IBrandCategoryService } from './interface/service-interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("brand-category")
@Controller('brand-category')
export class BrandCategoryController {
  constructor(@Inject("IBrandCategoryService") private readonly brandCategoryService: IBrandCategoryService) {}

  @ApiOperation({summary: "Create new Brand Category"})
  @Post()
  async create(@Body() createBrandCategoryDto: CreateBrandCategoryDto) {
    return await this.brandCategoryService.createBrandCategory(createBrandCategoryDto);
  }

  @ApiOperation({ summary: "Get Brand Categories"})
  @Get()
  async findAll() {
    return await this.brandCategoryService.findAllBrandCategories();
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
