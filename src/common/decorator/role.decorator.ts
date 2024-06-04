import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../consts/consts';
import { RoleEnum } from '../enums/enums';

export const RoleDecorator = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);