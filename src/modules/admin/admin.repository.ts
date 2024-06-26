import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { IAdminEntityCount, IAdminRepository } from "./interfaces/repository-interface";
import { UserEntity } from "../user/entities/user.entity";
import { RoleEnum } from "src/common/enums/enums";

export class AdminRepository implements IAdminRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async createAdmin(admin: UserEntity): Promise<UserEntity> {
        return await this.repository.save(admin);
    }
    async getAdmins(word: string, limit: number, offset: number): Promise<IAdminEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { role: RoleEnum.ADMIN, first_name: ILike(`%${word}%`) };
            const foundAdmins = await this.repository.find({ skip: offset, take: limit, where: { role: RoleEnum.ADMIN } });
            const count = foundAdmins.length;
            return { admins: foundAdmins, count }
        } else {
            const count = await this.repository.createQueryBuilder('users')
                .select('COUNT(*) count')
                .getRawOne();
            const foundAdmins = await this.repository.find({ skip: offset, take: limit, where: {role: RoleEnum.ADMIN} });
            return { admins: foundAdmins, count: parseInt(count.count, 10)};
        }
    }
    async getAdmin(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id:id, role: RoleEnum.ADMIN});
    }
    async getAdminByPhoneNumber(phone: string): Promise<UserEntity> {
        return await this.repository.findOneBy({phone_number: phone});
    }
    async updateAdmin(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async deleteAdmin(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
}