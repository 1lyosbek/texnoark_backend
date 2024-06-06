import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { SubCategoryEntity } from 'src/modules/sub-category/entities/sub-category.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity("product_detail")
export class ProductDetailEntity extends BaseEntity {
    @Column({ name: "quantity", type: "int", nullable: false })
    quantity: number;

    @Column('text', { name: "images", array: true, nullable: false })
    images: Array<string>;

    @Column('text', { name: "colors", array: true, nullable: false })
    colors: Array<string>;

    @Column({ name: "description", type: "text", nullable: false })
    description: string;

    @Column({ name: "discount", type: "numeric", nullable: true })
    discount: number;

    @OneToOne(()=> ProductEntity)
    @JoinColumn({name: "product_id"})
    product_id: ProductEntity;
}

