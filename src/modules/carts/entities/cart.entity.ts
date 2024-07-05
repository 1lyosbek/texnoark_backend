import { BaseEntity } from "src/common/database/base.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('cart')
 export class CartEntity extends BaseEntity {
    @Column({ name: 'user_id', type: 'int', nullable: false })
    user_id: number;

    @ManyToOne(() => ProductEntity, (productEntity) => productEntity.carts)
    @JoinColumn({ name: 'product_id'})
    product_id: number;
 }