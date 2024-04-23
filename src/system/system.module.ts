import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/system/entities/user.entity";
import { Role } from "@/system/entities/role.entity";
import { UserService } from "@/system/service/user.service";
import { UserController } from "@/system/controller/user.controller";
import { MenuService } from "@/system/service/menu.service";
import { Menu } from "@/system/entities/menu";
import { MenuController } from "@/system/controller/menu.controller";
import { RoleController } from "@/system/controller/role.controller";
import { RoleService } from "@/system/service/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Menu])],
  controllers: [UserController, RoleController, MenuController],
  providers: [UserService, RoleService, MenuService],
})
export class SystemModule {}
