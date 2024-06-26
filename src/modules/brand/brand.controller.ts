import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Inject, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ICreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/lib/fileOpitions';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IBrandService } from './interfaces/service-interface';
import { ThisBrandAlreadyExist } from './exceptions/brand.exceptions';
import { RoleEnum } from 'src/common/enums/enums';
import { RolesDecorator } from 'src/common/decorator/role.decorator';
import { Auth } from 'src/common/decorator/auth.decorator';


@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(@Inject("IBrandService") private readonly brandService: IBrandService) {}
  @ApiConsumes('multipart/form-data')
  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Create new brand" })
  @Post('create')
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
    const {data: foundBrandByName } = await this.brandService.findOneByName(dto.name);
    if (foundBrandByName) {
      throw new ThisBrandAlreadyExist();
    }
    return await this.brandService.create(file, dto);
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

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @ApiOperation({ summary: "Get all brands" })
  @Get('search')
  async findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.brandService.findAll(search, limit, page);
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
  @ApiOperation({ summary: "Get brand by category id" })
  @Get('category/:id')
  async findByCategoryId(@Param('id', ParseIntPipe) id: number, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.brandService.findByCategoryId(id, limit, page);
  }
  @ApiOperation({ summary: "Get brand by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.brandService.findOne(id);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Update brand by id" })
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return await this.brandService.update(id, updateBrandDto);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Delete brand by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundBrand } = await this.brandService.findOne(id);
    return this.brandService.remove(foundBrand);
  }
}
