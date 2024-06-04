import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from "src/common/config/config";
import { ICurrentUser } from "src/common/types/types";
import { UserService } from "src/modules/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtKey
        })
    }

    async validate(payload: { id: number }): Promise<ICurrentUser>{
        const {data: foundUser} = await this.userService.findOne(payload.id);
        return foundUser
    }
}