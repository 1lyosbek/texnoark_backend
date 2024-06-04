import { UserEntity } from "src/modules/user/entities/user.entity";


export interface IAdminRepository {
    getAdmins(limit: number, offset: number): Promise<UserEntity[]>;
    getAdmin(id: number): Promise<UserEntity>;
    getAdminByWord(word: string): Promise<UserEntity[]>;
    getAdminByPhoneNumber(phone: string): Promise<UserEntity>;
    createAdmin(entity: UserEntity): Promise<UserEntity>;
    updateAdmin(entity: UserEntity): Promise<UserEntity>;
    deleteAdmin(entity: UserEntity): Promise<UserEntity>;
}