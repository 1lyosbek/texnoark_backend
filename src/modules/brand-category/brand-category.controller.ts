import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { IBrandCategoryService } from './interface/service-interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/enums';
import { Auth } from 'src/common/decorator/auth.decorator';

@ApiTags("brand-category")
@Controller('brand-category')
export class BrandCategoryController {
  constructor(@Inject("IBrandCategoryService") private readonly brandCategoryService: IBrandCategoryService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({summary: "Create new Brand Category"})
  @Post('create')
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
  @ApiOperation({ summary: "Get Brand Category by brand id" })
  @Get('brand/:id')
  async findByBrandId(@Param('id', ParseIntPipe) id: number, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.brandCategoryService.findByBrandId(id, limit, page);
  }
  @ApiOperation({ summary: "Get Brand Category by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.brandCategoryService.findOneBrandCategory(id);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Update Brand Category by id" })
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandCategoryDto: UpdateBrandCategoryDto) {
    return this.brandCategoryService.updateBrandCategory(id, updateBrandCategoryDto);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Delete Brand Category by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundBrandCategory} = await this.brandCategoryService.findOneBrandCategory(id);
    return this.brandCategoryService.removeBrandCategory(foundBrandCategory);
  }
}
