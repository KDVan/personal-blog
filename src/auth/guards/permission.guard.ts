/**********************************************************************************************************************
 *                                                                                                                    *
 *                            Copyright (C) 2021 - 2022 Duy Kh. Van Ba duyvbkh134@gmail.com                           *
 *                                                                                                                    *
 *                                This file is part of Hexon System (www.hexon.systems)                               *
 *                                                                                                                    *
 *                              -----------------PROPRIETARY INFORMATION-----------------                             *
 *                                                                                                                    *
 *                                             This file can NOT be copied                                            *
 *                                                                                                                    *
 *                         and/or distributed without the express permission of Duy Kh. Van Ba                        *
 *                                                                                                                    *
 * ********************************************************************************************************************
 *                                                                                                                    *
 *                                  -----------------FILE INFORMATION-----------------                                *
 *                                  - Project: Personal blog                                                          *
 *                                  - Class: permission.guard.ts                                                      *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionEnum } from '../../enums/permission.enum';
import { PERMISSIONS_KEY } from '../../decorators/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.some((permission) =>
      user.roles.some((r) => r.permissions.includes(permission)),
    );
  }
}
