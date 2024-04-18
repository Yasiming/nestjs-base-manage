import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./admin.guard";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          //设置加密使用的 secret
          secret: config.get("jwt_secret"),
          //过期时间
          signOptions: { expiresIn: "7d" },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
