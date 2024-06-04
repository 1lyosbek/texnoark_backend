import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { AdminRepository } from '../admin/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [
     AuthService,
     {provide: "IUserService", useClass: UserService},
     {provide: "IUserRepository", useClass: UserRepository},
     {provide: "IAdminService", useClass: AdminService },
     {provide: "IAdminRepository", useClass: AdminRepository }
    ],
})
export class AuthModule {}
