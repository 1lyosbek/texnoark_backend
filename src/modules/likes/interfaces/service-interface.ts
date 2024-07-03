import { ResData } from "src/lib/resData";
import { LikeEntity } from "../entities/like.entity";
import { CreateLikeDto } from "../dto/create-like.dto";
import { ILikeEntityCount } from "./repository-interface";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { ProductDetailEntity } from "src/modules/product-detail/entities/product-detail.entity";

export interface ILikeService {
    findAll(id: number): Promise<ResData<ILikeEntityCount>>;
    findOne(id: number): Promise<ResData<LikeEntity>>;
    findOneByProductId(id: number): Promise<ResData<LikeEntity | null>>;
    create(createLikeDto: CreateLikeDto, currentUser: UserEntity): Promise<ResData<LikeEntity>>;
    remove(entity: LikeEntity): Promise<ResData<LikeEntity>>;
}


