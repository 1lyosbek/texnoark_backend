import { UserEntity } from "src/modules/user/entities/user.entity";


export interface IAdminRepository {
    getAdmins(word: string, limit: number, offset: number): Promise<IAdminEntityCount>;
    getAdmin(id: number): Promise<UserEntity>;
    getAdminByPhoneNumber(phone: string): Promise<UserEntity>;
    createAdmin(entity: UserEntity): Promise<UserEntity>;
    updateAdmin(entity: UserEntity): Promise<UserEntity>;
    deleteAdmin(entity: UserEntity): Promise<UserEntity>;
}

export interface IAdminEntityCount {
    admins: UserEntity[];
    count: number;
}