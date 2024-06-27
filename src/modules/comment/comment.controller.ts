import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comment')
export class CommentController {
  constructor(@Inject('ICommentService') private readonly commentService: CommentService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() currentUser: UserEntity) {
    return this.commentService.create(createCommentDto, currentUser);
  }

  @Get('product/:id')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findAll(id);
  }
}
