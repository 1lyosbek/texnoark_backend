import { BaseEntity } from "src/common/database/base.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('likes')
export class LikeEntity extends BaseEntity {
    @ManyToOne(() => ProductEntity, (productEntity) => productEntity.likes, {onDelete: "CASCADE", nullable: false})
    @JoinColumn({name: "product_id"})
    product_id: number;

    @Column({ name: 'is_liked', type: 'boolean', nullable: false })
    is_liked: boolean;
    
    @Column({ name: 'user_id', type: 'int', nullable: false })
    user_id: number;
}

