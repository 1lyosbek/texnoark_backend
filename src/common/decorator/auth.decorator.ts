import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ROLES_KEY } from '../consts/consts';
import { RoleEnum } from '../enums/enums';
import { RolesGuard } from 'src/modules/shared/role.guard';
import { JwtAuthGuard } from 'src/modules/shared/guards/auth/jwt-auth.guard';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({description: "Bad Request"}),
    ApiOkResponse({description: "OK"}),
    ApiForbiddenResponse({description: "Forbidden resource"}),
  );
}