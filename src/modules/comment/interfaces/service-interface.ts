import { ResData } from "src/lib/resData";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentEntity } from "../entities/comment.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { ICommentEntity } from "./repository-interface";

export interface ICommentService {
    findAll(productId: number): Promise<ResData<ICommentEntity>>;
    create(data: CreateCommentDto, currentUser: UserEntity): Promise<ResData<CommentEntity>>;
}