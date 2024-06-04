import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { IAdminRepository } from "./interfaces/repository-interface";
import { UserEntity } from "../user/entities/user.entity";
import { RoleEnum } from "src/common/enums/enums";

export class AdminRepository implements IAdminRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async createAdmin(admin: UserEntity): Promise<UserEntity> {
        return await this.repository.save(admin);
    }
    async getAdmins(limit: number, offset: number): Promise<UserEntity[]> {
        return await this.repository.find({skip: offset, take: limit, where: {role: RoleEnum.ADMIN}});
    }
    async getAdmin(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id:id, role: RoleEnum.ADMIN});
    }
    async getAdminByWord(word: string): Promise<UserEntity[]> {
        return await this.repository.find({where: {role: RoleEnum.ADMIN, first_name: ILike(`%${word}%`)}});
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