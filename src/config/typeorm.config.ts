import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/entities/user.entity";
import { Role } from "../role/entities/role.entity";
export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  useFactory(configService: ConfigService) {
    return {
      type: "mysql",
      host: configService.get("mysql_server_host"),
      port: configService.get("mysql_server_port"),
      username: configService.get("mysql_server_username"),
      password: configService.get("mysql_server_password"),
      database: configService.get("mysql_server_database"),
      synchronize: true,
      entities: [User, Role],
      logging: false,
      poolSize: 10,
      connectorPackage: "mysql2",
      timezone: "+08:00",
      dateStrings: true,
    };
  },
  inject: [ConfigService],
});
