import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IUserRepository } from "./interfaces/repository-interface";
import { RoleEnum } from "src/common/enums/enums";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async createUser(user: UserEntity): Promise<UserEntity> {
        return await this.repository.save(user);
    }
    async getUsers(limit: number, offset: number): Promise<UserEntity[]> {
        return await this.repository.find({skip: offset, take: limit, where: {role: RoleEnum.USER}});
    }
    async getUserByWord (word: string): Promise<UserEntity[]> {
        return await this.repository.find({ where: {role: RoleEnum.USER, first_name: ILike(`%${word}%`) } });
    }
    async getUserById (id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id:id, role: RoleEnum.USER});
    }
    async getUserByPhone (phone: string): Promise<UserEntity> {
        return await this.repository.findOneBy({phone_number: phone});
    }
    async updateUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async deleteUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
}