import { ResData } from "src/lib/resData";
import { LikeEntity } from "../entities/like.entity";

export interface ILikeRepository {
    getLikes(id: number): Promise<ILikeEntityCount>;
    getLike(id: number): Promise<LikeEntity>;
    getLikeByProductId(id: number): Promise<LikeEntity | null>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(like: LikeEntity): Promise<LikeEntity>;
}

export interface ILikeEntityCount {
    likes: LikeEntity[];
    count: number;
}