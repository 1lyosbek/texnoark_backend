import { InjectRepository } from "@nestjs/typeorm";
import { ICommentEntity, ICommentRepository } from "./interfaces/repository-interface";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { Auth } from "src/common/decorator/auth.decorator";
import { RoleEnum } from "src/common/enums/enums";

export class CommentRepository implements ICommentRepository {
    constructor(@InjectRepository(CommentEntity) private repository: Repository<CommentEntity>) {}
    @Auth(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.SUPERADMIN)
    async createComment(comment: CommentEntity): Promise<CommentEntity> {
        return await this.repository.save(comment);
    }
    async getAll(productId: number): Promise<ICommentEntity> {
        const foundComments = await this.repository.find({where: {product_id: productId}});
        const count = foundComments.length;
        return {comment: foundComments, count};
    }
}