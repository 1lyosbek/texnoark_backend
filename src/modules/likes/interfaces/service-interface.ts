import { ResData } from "src/lib/resData";
import { LikeEntity } from "../entities/like.entity";
import { CreateLikeDto } from "../dto/create-like.dto";
import { ILikeEntityCount } from "./repository-interface";
import { UserEntity } from "src/modules/user/entities/user.entity";

export interface ILikeService {
    findAll(): Promise<ResData<ILikeEntityCount>>;
    findOne(id: number): Promise<ResData<LikeEntity>>;
    create(createLikeDto: CreateLikeDto, currentUser: UserEntity): Promise<ResData<LikeEntity>>;
    remove(entity: LikeEntity): Promise<ResData<LikeEntity>>;
}