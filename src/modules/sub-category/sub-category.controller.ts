import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ISubCategoryService } from './interfaces/server-interface';
import { SubCategoryAlreadyExist } from './exceptions/sub-category.exceptions';
import { RoleEnum } from 'src/common/enums/enums';
import { Auth } from 'src/common/decorator/auth.decorator';

@ApiTags("sub_category")
@Controller('sub-category')
export class SubCategoryController {
  constructor(@Inject("ISubCategoryService") private readonly subCategoryService: ISubCategoryService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({summary: "Create new Sub Category"})
  @Post('create')
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const {data: foundSubCategory } = await this.subCategoryService.findSubCategoryByName(createSubCategoryDto.name);
    if (foundSubCategory) {
      throw new SubCategoryAlreadyExist();
    }
    return await this.subCategoryService.createSubCategory(createSubCategoryDto);
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
  @Get('search/:parent_category_id')
  findAll(@Param('parent_category_id') id: number, @Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return this.subCategoryService.findAllSubCategories(id, search, limit, page);
  }

  @ApiOperation({ summary: "Get Sub Category by id" })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoryService.findOneSubCategory(id);
  }


  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)

  @ApiOperation({ summary: "Update Sub Category by id" })
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)

  @ApiOperation({ summary: "Delete Sub Category by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundSubCategory } = await this.subCategoryService.findOneSubCategory(id);
    console.log(3);
    return await this.subCategoryService.removeSubCategory(foundSubCategory);
  }
}
