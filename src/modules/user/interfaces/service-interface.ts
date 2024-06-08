import { ResData } from "src/lib/resData";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUserEntityCount } from "./repository-interface";

export interface IUserService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IUserEntityCount>>;
    findOne(id: number): Promise<ResData<UserEntity>>;
    findUserAny(id: number): Promise<ResData<UserEntity>>; 
    update(id: number, user: UpdateUserDto): Promise<ResData<UserEntity>>;
    remove(entity: UserEntity): Promise<ResData<UserEntity>>;
}