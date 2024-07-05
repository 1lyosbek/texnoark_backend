import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { ICartService } from './interfaces/service-interface';
import { ICartEntityCount, ICartRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class CartService implements ICartService {
  constructor(@Inject("ICartRepository") private readonly cartRepository: ICartRepository) {}
  async create(currentUser: UserEntity, createCartDto: CreateCartDto): Promise<ResData<CartEntity>> {
    const newCart = new CartEntity();
    newCart.user_id = currentUser.id;
    newCart.product_id = createCartDto.product_id;
    const created = await this.cartRepository.createCart(newCart);
    return new ResData<CartEntity>("Cart created successfully", 201, created);
  }

  async findAll(userId: number): Promise<ResData<ICartEntityCount>> {
    const foundCarts = await this.cartRepository.getCarts(userId);
    return new ResData<ICartEntityCount>("All available carts", 200, {carts: foundCarts.carts, count: foundCarts.count} );
  }

  async findOne(id: number): Promise<ResData<CartEntity>> {
    const foundCart = await this.cartRepository.getCart(id);
    return new ResData<CartEntity>("Cart found", 200, foundCart);
  }

  async remove(entity: CartEntity): Promise<ResData<CartEntity>> {
    const deleted = await this.cartRepository.deleteCart(entity);
    return new ResData<CartEntity>("Cart deleted successfully", 200, deleted);
  }
}
