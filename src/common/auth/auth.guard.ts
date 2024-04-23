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
import { User } from "@/system/entities/user.entity";

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

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride("require-login", [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new HttpException("未登录", HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = authorization.split(" ")[1];
      const user_id = this.jwtService.verify<User>(token).user_id;
      request.user = await User.findOne({
        where: {
          user_id,
        },
        relations: {
          roles: {
            menus: true,
          },
        },
      });
      return true;
    } catch (e) {
      throw new UnauthorizedException("token 失效，请重新登录");
    }
  }
}
