import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('cart')
 export class CartEntity extends BaseEntity {
    @Column({ name: 'user_id', type: 'int', nullable: false })
    user_id: number;

    @Column({ name: 'product_id', type: 'int', nullable: false })
    product_id: number;
 }