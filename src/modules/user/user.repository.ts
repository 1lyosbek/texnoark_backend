import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IUserEntityCount, IUserRepository } from "./interfaces/repository-interface";
import { RoleEnum } from "src/common/enums/enums";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) { }
    async createUser(user: UserEntity): Promise<UserEntity> {
        return await this.repository.save(user);
    }
    async getUsers(word: string, limit: number, offset: number): Promise<IUserEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { role: RoleEnum.USER, first_name: ILike(`%${word}%`) };
            const foundUsers = await this.repository.find({ skip: offset, take: limit, where: { role: RoleEnum.USER } });
            const count = foundUsers.length;
            return { users: foundUsers, count };
        } else {
            const foundUsers = await this.repository.find({ skip: offset, take: limit, where: { role: RoleEnum.USER } });
            const count = await this.repository.createQueryBuilder('brands')
                .select('COUNT(*) count')
                .getRawOne();
            return { users: foundUsers, count: parseInt(count.count, 10) };
        }
    }
    async getUserById(userId: number): Promise<UserEntity | null> {
        const foundUser = await this.repository.findOne({ where: [{ id: userId }, { role: RoleEnum.USER }]});
        return foundUser;
    }

    async getUserAny(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({ id: id});
    }
    async getUserByPhone(phone: string): Promise<UserEntity> {
        return await this.repository.findOneBy({ phone_number: phone });
    }
    async updateUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async deleteUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
}