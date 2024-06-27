import { CommentEntity } from "../entities/comment.entity";

export interface ICommentRepository {
    getAll(productId: number): Promise<ICommentEntity>;
    createComment(entity: CommentEntity): Promise<CommentEntity>;
}

export interface ICommentEntity {
    comment: CommentEntity[];
    count: number;
}