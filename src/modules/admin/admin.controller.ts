import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(@Inject("IAdminService") private readonly adminService: AdminService) {}

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
  @Auth(RoleEnum.SUPERADMIN)
  @ApiOperation({ summary: "Get all admins" })
  @Get('search')
  async findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.adminService.findAll(search, limit, page);
  }

  @ApiOperation({ summary: "Get admin by id" })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }

  @Auth(RoleEnum.SUPERADMIN)
  @ApiOperation({ summary: "Update admin by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Auth(RoleEnum.SUPERADMIN)
  @ApiOperation({ summary: "Delete admin by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundAdmin } = await this.adminService.findOne(id);
    return this.adminService.remove(foundAdmin);
  }
}
