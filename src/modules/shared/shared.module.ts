import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtKey,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UserService}
  ],
  exports: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UserService}
],
})
export class SharedModule {}
