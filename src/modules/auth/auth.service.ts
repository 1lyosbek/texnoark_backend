import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { InvalidRefreshToken, PhoneOrPasswordWrongException } from './exception/auth.exception';
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
import { config } from 'src/common/config/config';
import { Response } from 'express';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IAdminService") private readonly adminService: AdminService,
    @Inject("IUserService") private readonly userService: UserService,
    @Inject("IAdminRepository") private readonly adminRepository: AdminRepository,
    @Inject("IUserRepository") private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto, res: Response): Promise<ResData<ILoginData>> {
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
    const access_token = await this.jwtService.signAsync({ id: foundUser.id });
    const refresh_token = await this.jwtService.signAsync({ id: foundUser.id }, { secret: config.jwtRefreshKey, expiresIn: config.jwtRefreshExpiresIn });
    foundUser.hashed_refresh_token = await hashed(refresh_token);
    const updated = await this.adminRepository.updateAdmin(foundUser);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: config.jwtCookieTime,
    });
    return new ResData<ILoginData>("User successfully logged in", HttpStatus.OK, {
      data: foundUser,
      tokens: {access_token, refresh_token},
    });
  }

  async refreshToken(id: number, refreshToken: string, res: Response): Promise<ResData<ILoginData>> {
    const verified = await this.jwtService.verifyAsync(refreshToken, {secret: config.jwtRefreshKey} );
    if (!verified || verified.id != id) {
      throw new InvalidRefreshToken();
    }    
    const { data: foundUser } = await this.userService.findUserAny(id);
    const tokenMatch = await compare(refreshToken, foundUser.hashed_refresh_token);
    if (!tokenMatch) {
      throw new InvalidRefreshToken();
    }
    const access_token = await this.jwtService.signAsync({ id: foundUser.id });
    const refresh_token = await this.jwtService.signAsync({ id: foundUser.id }, { secret: config.jwtRefreshKey, expiresIn: config.jwtRefreshExpiresIn });
    foundUser.hashed_refresh_token = await hashed(refresh_token);
    const updated = await this.userRepository.updateUser(foundUser);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: config.jwtCookieTime,
    });
    return new ResData<ILoginData>("User refreshed", HttpStatus.OK, {
      data: updated,
      tokens: {access_token, refresh_token},
    });
  }

  async registerAdmin(dto: UserRegisterDto, res: Response): Promise<ResData<ILoginData>> {
    const newAdmin = new UserEntity();
    newAdmin.first_name = dto.first_name;
    newAdmin.last_name = dto.last_name;
    newAdmin.phone_number = dto.phone_number;
    newAdmin.role = RoleEnum.ADMIN;
    newAdmin.email = dto.email;
    newAdmin.password = await hashed(dto.password);
    const savedAdmin = await this.adminRepository.createAdmin(newAdmin);
    const access_token = await this.jwtService.signAsync({ id: savedAdmin.id });
    const refresh_token = await this.jwtService.signAsync({ id: savedAdmin.id }, { secret: config.jwtRefreshKey, expiresIn: config.jwtRefreshExpiresIn });
    const {data: foundUser } = await this.adminService.findOne(savedAdmin.id);
    foundUser.hashed_refresh_token = await hashed(refresh_token);
    const updated = await this.adminRepository.updateAdmin(foundUser);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: config.jwtCookieTime,
    });
    return new ResData<ILoginData>("Admin created successfully", HttpStatus.CREATED, { data: updated, tokens: { access_token, refresh_token} });
  }

  async registerUser(dto: UserRegisterDto, res: Response): Promise<ResData<ILoginData>> {
    const newUser = new UserEntity();
    newUser.first_name = dto.first_name;
    newUser.last_name = dto.last_name;
    newUser.phone_number = dto.phone_number;
    newUser.role = RoleEnum.USER;
    newUser.email = dto.email;
    newUser.password = await hashed(dto.password);
    const savedUser = await this.userRepository.createUser(newUser);
    const access_token = await this.jwtService.signAsync({ id: savedUser.id });
    const refresh_token = await this.jwtService.signAsync({ id: savedUser.id }, { secret: config.jwtRefreshKey, expiresIn: config.jwtRefreshExpiresIn });
    const { data: foundUser } = await this.userService.findOne(savedUser.id);
    foundUser.hashed_refresh_token = await hashed(refresh_token);
    const updated = await this.userRepository.updateUser(foundUser);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: config.jwtCookieTime,
    });
    return new ResData<ILoginData>("User created successfully", HttpStatus.CREATED, {data: updated, tokens: {access_token, refresh_token}});
  }
}
