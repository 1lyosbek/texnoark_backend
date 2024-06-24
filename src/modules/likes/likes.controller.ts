import { Controller, Get, Post, Body, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
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

  @ApiOperation({summary: "Get all likes"})
  @Get()
  async findAll() {
    return await this.likesService.findAll();
  }

  @ApiOperation({summary: "Delete like by id"})
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundLike } = await this.likesService.findOne(id);
    return await this.likesService.remove(foundLike);
  }
}
