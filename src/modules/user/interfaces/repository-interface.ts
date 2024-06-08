import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    createUser(user: UserEntity): Promise<UserEntity>;
    getUsers(word: string, limit: number, offset: number): Promise<IUserEntityCount>;
    getUserById(id: number): Promise<UserEntity>;
    getUserAny(id: number): Promise<UserEntity>;
    getUserByPhone(phone: string): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(user: UserEntity): Promise<UserEntity>;
}

export interface IUserEntityCount {
    users: UserEntity[];
    count: number;
}