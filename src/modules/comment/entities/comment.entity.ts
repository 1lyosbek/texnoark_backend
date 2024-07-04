import { BaseEntity } from "src/common/database/base.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('comment')
export class CommentEntity extends BaseEntity {
    @Column({ name: 'comment', type: 'text', nullable: false })
    comment: string;
    
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
    user_id: UserEntity;

    @Column({ name: 'product_id', type: 'int', nullable: false })
    product_id: number;
}
