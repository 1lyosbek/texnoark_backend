import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResData } from 'src/lib/resData';
import { IUserService } from './interfaces/service-interface';
import { IUserEntityCount, IUserRepository } from './interfaces/repository-interface';
import { UserEntity } from './entities/user.entity';
import { UserNotFound } from './exceptions/user.exceptions';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository) {}
  async findAll(word: string, limit: number, page: number): Promise<ResData<IUserEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundUsers = await this.userRepository.getUsers(word, limit, page);
    return new ResData<IUserEntityCount>("All available users", 200, {users: foundUsers.users, count: foundUsers.count});
  }

  async findOne(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.getUserById(id);
    if (!foundUser) {
      throw new UserNotFound();
    }
    return new ResData<UserEntity>("User found", 200, foundUser);
  }
  
  async findOneByPhone(phone: string):Promise<ResData<UserEntity | null>>{
     const foundUserByPhone = await this.userRepository.getUserByPhone(phone);
     const resData = new ResData<UserEntity>("User found by phone", 200, foundUserByPhone)
     if (!foundUserByPhone) {
      resData.message = "User not found by phone";
      resData.statusCode = 404;
    }
    return resData;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto):Promise<ResData<UserEntity>> {
    const {data: foundUser} = await this.findOne(id);
    foundUser.first_name = updateUserDto.first_name;
    foundUser.last_name = updateUserDto.last_name;
    foundUser.phone_number = updateUserDto.phone_number;
    foundUser.email = updateUserDto.email;
    foundUser.password =   updateUserDto.password;
    const updated = await this.userRepository.updateUser(foundUser); 
    return new ResData<UserEntity>("User updated successfully", 200, updated);
  }

  async remove(entity: UserEntity): Promise<ResData<UserEntity>> {
    const deleted = await this.userRepository.deleteUser(entity);
    return new ResData<UserEntity>("User deleted successfully", 200, deleted);
  }
}
