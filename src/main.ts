import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { FormatInterceptor } from "./common/response/format.interceptor";
import { FormatExceptionFilter } from "./common/response/format.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatExceptionFilter());
  app.useGlobalInterceptors(new FormatInterceptor());
  await app.listen(3000);
}
bootstrap();
