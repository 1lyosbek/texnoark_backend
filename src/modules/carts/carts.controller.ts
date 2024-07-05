import { Controller, Get, Post, Body, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ICartService } from './interfaces/service-interface';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(@Inject("ICartService") private readonly cartsService: ICartService) {}

  @ApiOperation({summary: "Create new cart"})
  @Auth(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.SUPERADMIN)
  @Post('create')
  async create(@Body() createCartDto: CreateCartDto, @CurrentUser() currentUser: UserEntity) {
    return await this.cartsService.create(currentUser, createCartDto);
  }

  @ApiOperation({summary: "Get carts by user id"})
  @Get('user/:id')
  async findAll(@Param('id', ParseIntPipe) id: number) {
    return await this.cartsService.findAll(id);
  }
  
  @ApiOperation({summary: "Delete cart by id"})
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundCart } = await this.cartsService.findOne(id);
    return await this.cartsService.remove(foundCart);
  }
}
