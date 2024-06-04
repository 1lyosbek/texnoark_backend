import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    createUser(user: UserEntity): Promise<UserEntity>;
    getUsers(limit: number, offset: number): Promise<UserEntity[]>
    getUserById(id: number): Promise<UserEntity>;
    getUserByPhone(phone: string): Promise<UserEntity>;
    getUserByWord(word: string): Promise<UserEntity[]>;
    updateUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(user: UserEntity): Promise<UserEntity>;
}