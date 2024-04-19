import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Nest通用后台")
    .setDescription("api 接口文档")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      description: "基于jwt的认证",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-doc", app, document);
}
