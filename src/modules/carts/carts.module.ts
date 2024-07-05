import { Module } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartRepository } from './cart.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), SharedModule],
  controllers: [CartsController],
  providers: [
    { provide: "ICartService", useClass: CartService },
     { provide: "ICartRepository", useClass: CartRepository }
    ],
})
export class CartsModule {}
