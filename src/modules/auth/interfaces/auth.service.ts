import { ResData } from 'src/lib/resData';
import { UserRegisterDto } from '../dto/admin.dto';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Response } from 'express';

export interface ILoginData {
  data: UserEntity;
  tokens: ITokens;
}

export interface IAuthService {
  login(data: LoginDto, res: Response): Promise<ResData<ILoginData>>;
  registerAdmin(data: UserRegisterDto, res: Response): Promise<ResData<ILoginData>>;
  registerUser(data: UserRegisterDto, res: Response): Promise<ResData<ILoginData>>;
  // refreshToken(id: number, refreshToken: string, res: Response): Promise<ResData<ILoginData>>;
}

interface ITokens {
  access_token: string;
  refresh_token: string;
}