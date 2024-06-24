import { LikeEntity } from "../entities/like.entity";

export interface ILikeRepository {
    getLikes(): Promise<ILikeEntityCount>;
    getLike(id: number): Promise<LikeEntity>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(like: LikeEntity): Promise<LikeEntity>;
}

export interface ILikeEntityCount {
    likes: LikeEntity[];
    count: number;
}