import { CartEntity } from "../entities/cart.entity";

export interface ICartRepository {
    getCarts(userId: number):Promise<ICartEntityCount>;
    getCart(id: number): Promise<CartEntity | null>;
    deleteCart(entity: CartEntity): Promise<CartEntity>;
    createCart(entiy: CartEntity): Promise<CartEntity>;
}

export interface ICartEntityCount {
    carts: CartEntity[];
    count: number;
 }