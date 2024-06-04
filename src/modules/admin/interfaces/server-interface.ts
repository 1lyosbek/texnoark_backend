import { ResData } from "src/lib/resData";
import { UpdateAdminDto } from "../dto/update-admin.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";

export interface IAdminService {
    findAll(limit: number, page: number): Promise<ResData<UserEntity[]>>;
    findOne(id: number): Promise<ResData<UserEntity>>;
    update(id: number, admin: UpdateAdminDto): Promise<ResData<UserEntity>>;
    remove(entity: UserEntity): Promise<ResData<UserEntity>>;
}