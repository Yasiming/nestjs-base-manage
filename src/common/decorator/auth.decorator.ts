import { Request } from "express";
import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
} from "@nestjs/common";
import { UserConstants } from "@/constants/system.constants";

export const RequireLogin = () => SetMetadata("require-login", true);

export const RequireAdmin = () =>
  SetMetadata("require-admin", UserConstants.ADMIN);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata("require-permission", permissions);

export const RequireLoginKey = (...permissions: string[]) => {
  return applyDecorators(RequireLogin(), RequirePermission(...permissions));
};

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) {
      return null;
    }
    return data ? request.user[data] : request.user;
  },
);
