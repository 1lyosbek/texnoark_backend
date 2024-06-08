import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { SubCategoryEntity } from 'src/modules/sub-category/entities/sub-category.entity';
import { Entity, Column, OneToMany,  ManyToOne, JoinColumn } from 'typeorm';

@Entity("categories")
export class CategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string;

    @OneToMany(
        () => BrandEntity,
        (brandEntity) => brandEntity.category_id,
    )
    brands: Array<BrandEntity>;

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.category_id)
    products: ProductEntity[];

    @OneToMany(
        () => StockEntity,
        (stockEntity) => stockEntity.category_id,
    )
    stocks: Array<StockEntity>;
}
