import { BaseEntity } from 'src/common/database/base.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("brand_category")
export class BrandCategoryEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", nullable: false, unique: true })
    name: string;

    @ManyToOne(()=> BrandEntity, (brandEntity)=> brandEntity.categories)
    @JoinColumn({name: "brand_id"})
    brand_id: BrandEntity;
}

