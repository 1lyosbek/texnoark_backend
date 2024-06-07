import { BaseEntity } from 'src/common/database/base.entity';
import { BrandCategoryEntity } from 'src/modules/brand-category/entities/brand-category.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity("products")
export class ProductEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "price", type: "numeric", nullable: false })
    price: number;

    @ManyToOne(
        () => BrandEntity,
        (brandEntity) => brandEntity.products,
        {
            onDelete: 'SET NULL',
            nullable: true,
        },
    )
    @JoinColumn({ name: 'brand_id' })
    brand_id: BrandEntity;

    @ManyToOne(
        () => CategoryEntity,
        (categoryEntity) => categoryEntity.products,
        {
            onDelete: 'SET NULL',
            nullable: true,
        },
    )
    @JoinColumn({ name: 'category_id' })
    category_id: CategoryEntity;
    @ManyToOne(
        () => BrandCategoryEntity,
        (brandCategoryEntity) => brandCategoryEntity.products,
        {
            onDelete: 'SET NULL',
            nullable: true,
        },
    )
    @JoinColumn({ name: 'brand_category_id' })
    brand_category_id: BrandCategoryEntity;

    @OneToMany(() => StockEntity, (stockEntity) => stockEntity.product_id)
    stocks: StockEntity[];
}


