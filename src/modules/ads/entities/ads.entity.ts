import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";


@Entity('ads')
export class AdsEntity extends BaseEntity {
    @Column({ name: 'image', type: 'text', nullable: false })
    image: string;
    
    @Column({ name: 'position', type: 'numeric', nullable: false })
    position: number;
}
