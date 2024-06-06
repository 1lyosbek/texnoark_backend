import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { SubCategoryEntity } from 'src/modules/sub-category/entities/sub-category.entity';
import { Entity, Column, OneToMany,  ManyToOne, JoinColumn } from 'typeorm';

@Entity("categories")
export class CategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    // @OneToMany(
    //     () => SubCategoryEntity,
    //     (subCategoryEntity) => subCategoryEntity.parent_category_id, { onDelete: 'SET NULL', nullable: true }
    // )
    // categories: Array<SubCategoryEntity>;

    @OneToMany(
        () => BrandEntity,
        (brandEntity) => brandEntity.category_id,
    )
    brands: Array<BrandEntity>;

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.category_id)
    products: ProductEntity[];
}
