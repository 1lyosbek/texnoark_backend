import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ResData } from 'src/lib/resData';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ICommentService } from './interfaces/service-interface';
import { ICommentEntity, ICommentRepository } from './interfaces/repository-interface';

@Injectable()
export class CommentService implements ICommentService {
  constructor(@Inject("ICommentRepository") private readonly commentRepository: ICommentRepository) {}
  async create(createCommentDto: CreateCommentDto, currentUser: UserEntity):Promise<ResData<CommentEntity>> {
    const newComment = new CommentEntity();
    newComment.comment = createCommentDto.comment;
    newComment.user_id = currentUser;
    newComment.product_id = createCommentDto.product_id;
    const created = await this.commentRepository.createComment(newComment);
    return new ResData<CommentEntity>("Comment created successfully", 201, created);
  }

  async findAll(productId: number):Promise<ResData<ICommentEntity>> {
    const foundCommentsByProductId = await this.commentRepository.getAll(productId);
    return new ResData<ICommentEntity>("All available comments", 200, { comment: foundCommentsByProductId.comment, count: foundCommentsByProductId.count });
  }
}
