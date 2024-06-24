import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";


@Entity('likes')
export class LikeEntity extends BaseEntity {
    @Column({ name: 'product_id', type: 'int', nullable: false })
    product_id: number;
    
    @Column({ name: 'user_id', type: 'int', nullable: false })
    user_id: number;
}

