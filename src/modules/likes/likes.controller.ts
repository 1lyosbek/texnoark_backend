import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { ILikeService } from './interfaces/service-interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(@Inject("ILikeService") private readonly likesService: ILikeService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.USER)
  @ApiOperation({summary: "Create new like"})
  @Post('create')
  async create(@Body() createLikeDto: CreateLikeDto, @CurrentUser() currentUser: UserEntity) {
    return await this.likesService.create(createLikeDto, currentUser);
  }

  @ApiOperation({summary: "Get user's likes"})
  @Get('user/likes/:id')
  async findAll(@Param('id', ParseIntPipe) id: number) {
    return await this.likesService.findAll(id);
  }
}
