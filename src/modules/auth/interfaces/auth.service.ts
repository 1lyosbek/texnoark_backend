import { ResData } from 'src/lib/resData';
import { UserRegisterDto } from '../dto/admin.dto';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ILoginData {
  admin: UserEntity;
  token: string;
}

export interface IAuthService {
  login(data: LoginDto): Promise<ResData<ILoginData>>;
  registerAdmin(data: UserRegisterDto): Promise<ResData<UserEntity>>;
}
