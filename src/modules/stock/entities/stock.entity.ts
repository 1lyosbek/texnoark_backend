import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("stock")
export class StockEntity extends BaseEntity {
    @ManyToOne(
        () => CategoryEntity,
        (categoryEntity) => categoryEntity.stocks,
        {
            onDelete: 'SET NULL',
            nullable: true,
        },
    )
    @JoinColumn({ name: 'category_id' })
    category_id: CategoryEntity;

    @ManyToOne(
        () => ProductEntity,
        (productEntity) => productEntity.stocks,
        {
            onDelete: 'SET NULL',
            nullable: true,
        },
    )
    @JoinColumn({ name: 'product_id' })
    product_id: ProductEntity;

    @Column({name: 'brand_id', type: "int", nullable: false})
    brand_id: number;

    @Column({name: 'quantity', type: "numeric", nullable: false})
    quantity: number;
}

