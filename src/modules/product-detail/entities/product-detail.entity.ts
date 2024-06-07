import { BaseEntity } from 'src/common/database/base.entity';
import { Entity, Column } from 'typeorm';

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

    @Column({ name: "product_id", type: "int", nullable: false })
    product_id: number;
}

