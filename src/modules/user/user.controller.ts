import { Controller, Get, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/service-interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(@Inject("IUserService") private readonly userService: IUserService) {}
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
  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @ApiOperation({ summary: "Get all users"})
  @Get('search')
  async findAll(@Query('search') search: string, @Query('limit') limit: number, @Query('page') page: number) {
    return await this.userService.findAll(search, limit, page);
  }

  @ApiOperation({ summary: "Get one user by id"})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: "Update user by id" })
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Deleting user by id" })
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundUser } = await this.userService.findOne(id);
    return await this.userService.remove(foundUser);
  }
}
