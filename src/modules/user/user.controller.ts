import { Controller, Get, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/service-interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(@Inject("IUserService") private readonly userService: IUserService) {}
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
  @ApiOperation({ summary: "Get all users"})
  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.userService.findAll(limit, page);
  }

  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'For search'
  })
  @ApiOperation({summary: "Search user by first_name"})
  @Get('/search')
  async searchUser(@Query('search') search: string,) {
    return await this.userService.searchUser(search);
  }

  @ApiOperation({ summary: "Get one user by id"})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: "Update user by id" })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Deleting user by id" })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundUser } = await this.userService.findOne(id);
    return await this.userService.remove(foundUser);
  }
}
