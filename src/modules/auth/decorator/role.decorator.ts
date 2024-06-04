import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../../common/consts/consts';
import { RoleEnum } from '../../../common/enums/enums';

export const RoleDecorator = (...roles: Array<RoleEnum>) =>
  SetMetadata(ROLES_KEY, roles);
