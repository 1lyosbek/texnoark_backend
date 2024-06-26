import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdminService } from './interfaces/server-interface';
import { IAdminEntityCount, IAdminRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { AdminNotFound } from './exceptions/admin.exceptions';
import { UserEntity } from '../user/entities/user.entity';
import { hashed } from 'src/lib/bcrypt';

@Injectable()
export class AdminService implements IAdminService {
  constructor(@Inject("IAdminRepository") private readonly adminRepository: IAdminRepository) {}
  async findAll(word: string, limit: number, page: number): Promise<ResData<IAdminEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundAdmins = await this.adminRepository.getAdmins(word, limit, page);
    return new ResData<IAdminEntityCount>("All available admins", 200, {admins: foundAdmins.admins, count: foundAdmins.count});
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
    foundAdmin.password =  await hashed(updateAdminDto.password);
    const updated = await this.adminRepository.updateAdmin(foundAdmin);
    return new ResData<UserEntity>("Admin updated successfully", 200, updated);
  }

  async remove(entity: UserEntity): Promise<ResData<UserEntity>> {
    const deleted = await this.adminRepository.deleteAdmin(entity);
    return new ResData<UserEntity>("Admin deleted successfully", 200, deleted);
  }
}
