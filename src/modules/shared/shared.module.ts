import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';
import { JwtStrategy } from './guards/auth/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        JwtModule.register({
          global: true,
          secret: config.jwtKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }),
      ],
    providers: [
      {provide: "IUserService", useClass: UserService },
      {provide: "IUserRepository", useClass: UserRepository},
      JwtStrategy
    ],
    exports: [
    { provide: "IUserService", useClass: UserService },
    { provide: "IUserRepository", useClass: UserRepository },
    JwtStrategy
  ]
})
export class SharedModule { }
