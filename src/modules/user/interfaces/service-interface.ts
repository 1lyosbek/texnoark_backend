import { ResData } from "src/lib/resData";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUserService {
    findAll(limit: number, page: number): Promise<ResData<Array<UserEntity>>>;
    searchUser(word: string): Promise<ResData<Array<UserEntity>>>;
    findOne(id: number): Promise<ResData<UserEntity>>;
    update(id: number, user: UpdateUserDto): Promise<ResData<UserEntity>>;
    remove(entity: UserEntity): Promise<ResData<UserEntity>>;
}