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

    const user_type = request.user.user_type;
    const AdminRequire = this.reflector.getAllAndOverride<string>(
      "require-admin",
      [context.getClass(), context.getHandler()],
    );

    if (!AdminRequire) {
      return true;
    }

    if (AdminRequire !== user_type) {
      throw new ForbiddenException("用户权限不足");
    }
    return true;
  }
}
