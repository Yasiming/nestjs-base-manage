import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { User } from "../../user/entities/user.entity";

declare module "express" {
  interface Request {
    user: User;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride("require-login", [
      context.getClass(),
      context.getHandler(),
    ]);

    const AdminRequire = this.reflector.getAllAndOverride<string>(
      "require-admin",
      [context.getClass(), context.getHandler()],
    );

    if (!requireLogin && !AdminRequire) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new HttpException("未登录", HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = authorization.split(" ")[1];
      request.user = this.jwtService.verify<User>(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException("token 失效，请重新登录");
    }
  }
}
