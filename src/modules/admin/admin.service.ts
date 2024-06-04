import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdminService } from './interfaces/server-interface';
import { IAdminRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { AdminNotFound } from './exceptions/admin.exceptions';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AdminService implements IAdminService {
  constructor(@Inject("IAdminRepository") private readonly adminRepository: IAdminRepository) {}
  async findAll(limit: number, page: number):Promise<ResData<UserEntity[]>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundAdmins = await this.adminRepository.getAdmins(limit, page);
    return new ResData<UserEntity[]>("All available admins", 200, foundAdmins);
  }

  async searchAdmin(word: string): Promise<ResData<Array<UserEntity>>>{
    const foundAdmins = await this.adminRepository.getAdminByWord(word);
    return new ResData<UserEntity[]>("Admins", 200, foundAdmins);
  }

  async findOne(id: number): Promise<ResData<UserEntity>>{
    const foundAdmin = await this.adminRepository.getAdmin(id);
    if (!foundAdmin) {
      throw new AdminNotFound();
    }
    return new ResData<UserEntity>("Admin found", 200, foundAdmin);
  }

  async findByPhoneNumber(phone: string): Promise<ResData<UserEntity>>{
    const foundAdmin = await this.adminRepository.getAdminByPhoneNumber(phone);
    const resData = new ResData<UserEntity>("Admin found by phone number", 200, foundAdmin);
    if (!foundAdmin) {
      resData.message = "admin not found by number";
      resData.statusCode = 404; 
    }
    return resData;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<ResData<UserEntity>> {
    const {data: foundAdmin } = await this.findOne(id);
    foundAdmin.first_name = updateAdminDto.first_name;
    foundAdmin.last_name = updateAdminDto.last_name;
    foundAdmin.phone_number = updateAdminDto.phone_number;
    foundAdmin.email = updateAdminDto.email;
    foundAdmin.password =  updateAdminDto.password;
    const updated = await this.adminRepository.updateAdmin(foundAdmin);
    return new ResData<UserEntity>("Admin updated successfully", 200, updated);
  }

  async remove(entity: UserEntity): Promise<ResData<UserEntity>> {
    const deleted = await this.adminRepository.deleteAdmin(entity);
    return new ResData<UserEntity>("Admin deleted successfully", 200, deleted);
  }
}
