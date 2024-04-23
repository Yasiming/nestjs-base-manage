import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request } from "express";
import { RoleKeyConstants } from "@/constants/system.constants";
import { isSubsetOfArray } from "@/utils";

@Injectable()
export class AdminGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) {
      return true;
    }

    const role_keys = request.user.roles.map((role) => role.role_key);

    if (role_keys.includes(RoleKeyConstants.ADMIN)) {
      return true;
    }

    const permission: string[] = request.user.roles.reduce((arr, item) => {
      item.menus.forEach((permission) => {
        if (arr.indexOf(permission) === -1 && permission.perms) {
          arr.push(permission.perms);
        }
      });
      return arr;
    }, []);

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      "require-permission",
      [context.getClass(), context.getHandler()],
    );

    if (!requiredPermissions) {
      return true;
    }

    if (!isSubsetOfArray(requiredPermissions, permission)) {
      throw new ForbiddenException("用户权限不足");
    }
    return true;
  }
}
