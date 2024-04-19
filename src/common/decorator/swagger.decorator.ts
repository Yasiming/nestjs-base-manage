//文件上传
import { applyDecorators, Type } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
// eslint-disable-next-line @typescript-eslint/ban-types
type dtoType = Type<unknown> | Function | [Function] | string;
export const SwaggerBody = (title: string, type: dtoType, isAuth = true) => {
  const arr = [ApiOperation({ summary: title }), ApiBody({ type })];
  isAuth && arr.push(ApiBearerAuth());
  return applyDecorators(...arr);
};

export const SwaggerQuery = (title: string, isAuth = true) => {
  const arr = [ApiOperation({ summary: title })];
  isAuth && arr.push(ApiBearerAuth());
  return applyDecorators(...arr);
};
