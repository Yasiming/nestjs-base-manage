import { Module } from "@nestjs/common";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { AuthModule } from "./common/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "src/.env",
    }),
    TypeOrmConfig,
    UserModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {}
