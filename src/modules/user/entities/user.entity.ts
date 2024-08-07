import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enums';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity("users")
export class UserEntity extends BaseEntity {
    @Column({ name: "first_name", type: "varchar", nullable: false })
    first_name: string;

    @Column({ name: "last_name", type: "varchar", nullable: false })
    last_name: string;

    @Column({ name: 'phone_number', type: 'varchar', nullable: false, unique: true })
    phone_number: string;

    @Column({ name: 'role', type: 'enum', enum: RoleEnum, nullable: false })
    role: RoleEnum;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ name: "hashed_refresh_token", type: 'varchar', nullable: true })
    hashed_refresh_token: string;

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.user_id)
    comments: CommentEntity[];
}



