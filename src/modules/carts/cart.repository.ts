import { InjectRepository } from "@nestjs/typeorm";
import { ICartEntityCount, ICartRepository } from "./interfaces/repository-interface";
import { CartEntity } from "./entities/cart.entity";
import { Repository } from "typeorm";

export class CartRepository implements ICartRepository {
    constructor(@InjectRepository(CartEntity) private repository: Repository<CartEntity>) {}
    async getCarts(userId: number): Promise<ICartEntityCount> {
        const foundCarts = await this.repository.find({where: {user_id: userId}, relations: ["product_id"]});
        return { carts: foundCarts, count: foundCarts.length };
    }
    async getCart(id: number): Promise<CartEntity | null> {
        return await this.repository.findOneBy({id});
    }
    async deleteCart(entity: CartEntity): Promise<CartEntity> {
        return await this.repository.remove(entity);
    }
    async createCart(entity: CartEntity): Promise<CartEntity> {
        return await this.repository.save(entity);
    }
}