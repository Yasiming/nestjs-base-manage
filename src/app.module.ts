import { Module } from "@nestjs/common";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./common/auth/auth.module";
import { SystemModule } from "@/system/system.module";
import { UploadModule } from "@/tools/upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "src/.env",
    }),
    TypeOrmConfig,
    AuthModule,
    SystemModule,
    UploadModule,
  ],
})
export class AppModule {}
