import { ResData } from "src/lib/resData";
import { ICartEntityCount } from "./repository-interface";
import { CartEntity } from "../entities/cart.entity";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";

export interface ICartService {
    findAll(userId: number): Promise<ResData<ICartEntityCount>>;
    findOne(id: number): Promise<ResData<CartEntity>>;
    create(currentUser: UserEntity, cart: CreateCartDto): Promise<ResData<CartEntity>>;
    remove(entity: CartEntity): Promise<ResData<CartEntity>>;
}