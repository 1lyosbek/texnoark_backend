import { BaseEntity } from 'src/common/database/base.entity';
import { BrandCategoryEntity } from 'src/modules/brand-category/entities/brand-category.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity("sub_category")
export class SubCategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string;

    // @ManyToOne(
    //     () => CategoryEntity,
    //     (categoryEntity) => categoryEntity.categories, { onDelete: 'CASCADE', nullable: true }
    // )
    // @JoinColumn({ name: "parent_category_id" })
    @Column({ name: "parent_category_id", type: "varchar", nullable: false })
    parent_category_id: number;
}

