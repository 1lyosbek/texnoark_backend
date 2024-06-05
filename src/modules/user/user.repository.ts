import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IUserEntityCount, IUserRepository } from "./interfaces/repository-interface";
import { RoleEnum } from "src/common/enums/enums";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async createUser(user: UserEntity): Promise<UserEntity> {
        return await this.repository.save(user);
    }
    async getUsers(word: string, limit: number, offset: number): Promise<IUserEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
        }
        const count = await this.repository.createQueryBuilder("users")
            .select("COUNT(*)", 'count')
            .getRawOne();
        const foundUsers = await this.repository.find({skip: offset, take: limit, where: {role: RoleEnum.USER, first_name: ILike(`%${word}%`)}});
        return {users: foundUsers, count: parseInt(count.count, 10)}
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