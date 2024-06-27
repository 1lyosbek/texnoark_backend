import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), SharedModule],
  controllers: [CommentController],
  providers: [
    {provide: "ICommentService", useClass: CommentService},
    {provide: "ICommentRepository", useClass: CommentRepository}
  ],
})
export class CommentModule {}
