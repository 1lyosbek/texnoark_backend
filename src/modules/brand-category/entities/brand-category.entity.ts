import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity("brand_category")
export class BrandCategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "brand_id", type: "int", nullable: false})
    brand_id: number;

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.brand_category_id)
    products: ProductEntity[];
}

