import { BaseEntity } from 'src/common/database/base.entity';
import { BrandCategoryEntity } from 'src/modules/brand-category/entities/brand-category.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity("brands")
export class BrandEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({type: 'varchar', nullable: false})
    image: string;

    @Column({name: 'category_id', type: 'int', nullable: false })
    category_id: number;
    
    @OneToMany(() => BrandCategoryEntity, (brandCategoryEntity)=> brandCategoryEntity.brand_id)
    categories: BrandCategoryEntity[];

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.brand_id)
    products: ProductEntity[];

    @OneToMany(() => StockEntity, (stockEntity) => stockEntity.brand_id)
    stocks: StockEntity[];
}

