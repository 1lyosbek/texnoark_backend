import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';
import { JwtStrategy } from './guards/auth/jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        JwtModule.register({
          global: true,
          secret: config.jwtKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }),
      ],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtStrategy]
})
export class SharedModule { }
