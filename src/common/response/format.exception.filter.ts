import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class FormatExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };
    const code = exception.getStatus();

    response
      .json({
        code,
        message: "fail",
        data: res?.message?.join ? res?.message?.join(",") : exception.message,
      })
      .end();
  }
}
