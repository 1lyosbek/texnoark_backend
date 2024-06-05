import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ISubCategoryService } from './interfaces/server-interface';

@ApiTags("sub_category")
@Controller('sub-category')
export class SubCategoryController {
  constructor(@Inject("ISubCategoryService") private readonly subCategoryService: ISubCategoryService) {}

  @ApiOperation({summary: "Create new Sub Category"})
  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
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
  @ApiOperation({ summary: "Get Sub Categories" })
  @Get('search')
  findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return this.subCategoryService.findAllSubCategories(search, limit, page);
  }

  @ApiOperation({ summary: "Get Sub Category by id" })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoryService.findOneSubCategory(id);
  }


  @ApiOperation({ summary: "Update Sub Category by id" })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }

  @ApiOperation({ summary: "Delete Sub Category by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundSubCategory } = await this.subCategoryService.findOneSubCategory(id);
    return await this.subCategoryService.removeSubCategory(foundSubCategory);
  }
}
