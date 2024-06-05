import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { PhoneOrPasswordWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { hashed, compare } from 'src/lib/bcrypt';
import { RoleEnum } from 'src/common/enums/enums';
import { AdminRepository } from '../admin/admin.repository';
import { AdminService } from '../admin/admin.service';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/admin.dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IAdminService") private readonly adminService: AdminService,
    @Inject("IUserService") private readonly userService: UserService,
    @Inject("IAdminRepository") private readonly adminRepository: AdminRepository,
    @Inject("IUserRepository") private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByPhone(
      dto.phone_number,
    );

    if (!foundUser) {
      throw new PhoneOrPasswordWrongException();
    }

    const compared = await compare(dto.password, foundUser.password);
    if (!compared) {
      throw new PhoneOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>("User successfully logged in", HttpStatus.OK, {
      admin: foundUser,
      token,
    });
  }

  async registerAdmin(dto: UserRegisterDto): Promise<ResData<UserEntity>> {
    const newAdmin = new UserEntity();
    newAdmin.first_name = dto.first_name;
    newAdmin.last_name = dto.last_name;
    newAdmin.phone_number = dto.phone_number;
    newAdmin.role = RoleEnum.ADMIN;
    newAdmin.email = dto.email;
    newAdmin.password = await hashed(dto.password);
    const savedAdmin = await this.adminRepository.createAdmin(newAdmin);
    return new ResData<UserEntity>("Admin created successfully", HttpStatus.CREATED, savedAdmin);
  }

  async registerUser(dto: UserRegisterDto): Promise<ResData<UserEntity>> {
    const newUser = new UserEntity();
    newUser.first_name = dto.first_name;
    newUser.last_name = dto.last_name;
    newUser.phone_number = dto.phone_number;
    newUser.role = RoleEnum.USER;
    newUser.email = dto.email;
    newUser.password = await hashed(dto.password);
    const savedUser = await this.userRepository.createUser(newUser);
    return new ResData<UserEntity>("User created successfully", HttpStatus.CREATED, savedUser);
  }
}
