import { InjectRepository } from "@nestjs/typeorm";
import { LikeEntity } from "./entities/like.entity";
import { Repository } from "typeorm";
import { ILikeEntityCount, ILikeRepository } from "./interfaces/repository-interface";

export class LikeRepository implements ILikeRepository {
    constructor(@InjectRepository(LikeEntity) private repository: Repository<LikeEntity>) {}
    async createLike(like: LikeEntity): Promise<LikeEntity> {
        return await this.repository.save(like);
    }
    async getLikes(id: number): Promise<ILikeEntityCount> {
        const foundLikes = await this.repository.find({where: {user_id: id}, relations: ["product_id"]});
        const count = foundLikes.length;
        return { likes: foundLikes, count };
    }
    async getLike(id: number): Promise<LikeEntity> {
        return await this.repository.findOneBy({id})
    }
    async getLikeByProductId(productId: number, userId: number): Promise<LikeEntity | null> {
    const product = await this.repository.createQueryBuilder('likes')
       .where('likes.product_id = :productId', { productId })
       .andWhere('likes.user_id = :userId', { userId })
       .getOne();

    return product;
    }   
    async deleteLike(entity: LikeEntity): Promise<LikeEntity> {
        return await this.repository.remove(entity);
    }
}