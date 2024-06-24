import { InjectRepository } from "@nestjs/typeorm";
import { LikeEntity } from "./entities/like.entity";
import { Repository } from "typeorm";
import { ILikeEntityCount, ILikeRepository } from "./interfaces/repository-interface";

export class LikeRepository implements ILikeRepository {
    constructor(@InjectRepository(LikeEntity) private repository: Repository<LikeEntity>) {}
    async createLike(like: LikeEntity): Promise<LikeEntity> {
        return await this.repository.save(like);
    }
    async getLikes(): Promise<ILikeEntityCount> {
        const foundLikes = await this.repository.find();
        const count = foundLikes.length;
        return { likes: foundLikes, count };
    }
    async getLike(id: number): Promise<LikeEntity> {
        return await this.repository.findOneBy({id})
    }
    async deleteLike(entity: LikeEntity): Promise<LikeEntity> {
        return await this.repository.remove(entity);
    }
}