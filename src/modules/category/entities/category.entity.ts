import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { Entity, Column, OneToMany,  ManyToOne, JoinColumn } from 'typeorm';

@Entity("categories")
export class CategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;
    @ManyToOne(
        () => CategoryEntity,
        (categoryEntity) => categoryEntity.categories,{onDelete: 'CASCADE', nullable: true}
    )
    @JoinColumn({name: "parent_category_id"})
    parent_category_id: CategoryEntity;

    @OneToMany(
        () => CategoryEntity,
        (categoryEntity) => categoryEntity.parent_category_id, { onDelete: 'SET NULL', nullable: true }
    )
    categories: Array<CategoryEntity>;

    @OneToMany(
        () => BrandEntity,
        (brandEntity) => brandEntity.category,
    )
    brands: Array<BrandEntity>;
}
