import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICurrentUser } from 'src/common/types/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }

    handleRequest<ICurrentUser>(err: any, user: ICurrentUser) {
        if (err) {
            throw err; 
        }
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

